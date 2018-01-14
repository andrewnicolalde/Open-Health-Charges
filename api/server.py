from bottle import route, run, request, static_file
from jinja2 import Environment, FileSystemLoader
import json
import csv

env = Environment(
	loader=FileSystemLoader('./templates/'),
)

def parseCSV(fp):
	with open(fp, "r") as f:
		reader = csv.DictReader(f)
		return list(reader)

def parseZipCodes(listObj):
	zip_codes = dict()
	for object in listObj:
		zip_code = object["ZIP"]

		zip_codes[zip_code] = list()
		zip_codes[zip_code].append(object["LAT"])
		zip_codes[zip_code].append(object["LNG"])

	return zip_codes

def highestTotalPayment():
	provider_data = parseCSV("../Medicare_Provider_Charge_Inpatient_DRGALL_FY2015.csv")
	max_total_average_payments = 0
	for provider in provider_data:
		avg_total_payments = float(provider["Average Total Payments"])
		if(avg_total_payments > max_total_average_payments):
			max_total_average_payments = avg_total_payments
	return max_total_average_payments

def generateMap():
	zip_lat_long = parseCSV("../zip_lat_long.csv")
	provider_data = parseCSV("../Medicare_Provider_Charge_Inpatient_DRGALL_FY2015.csv")
	max_total_average_payments = highestTotalPayment()

	heatPoints = list()
	index = 0
	for provider in provider_data:
		index += 1

	totalNum = str(index)

	zip_codes_dict = parseZipCodes(zip_lat_long)

	index = 0
	for provider in provider_data:
		print(str(index) + "/" + totalNum)
		point = list()
		zip_code = provider["Provider Zip Code"]
		location_obj = None
		try:
			location_obj = zip_codes_dict[zip_code]
		except:
			print("Zip code could not be found")

		if not location_obj == None:
			print(max_total_average_payments)
			print(provider["Average Total Payments"])
			lat = location_obj[0]
			lon = location_obj[1]
			point.append(lat)
			point.append(lon)
			point.append(max_total_average_payments / float(provider["Average Total Payments"]))
			heatPoints.append(point)
		index += 1

	template = env.get_template("map_template_script.js")
	output = template.render(heatPoints=heatPoints)

	with open("./output/mapping_script.js", "w") as file:
		file.write(output)

@route("/")
def returnHeatSpots():
	return static_file("./output/mapping_script.js", "./")

generateMap()
run(host='0.0.0.0', port=80)