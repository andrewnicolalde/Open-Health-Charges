from bottle import route, run, request
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

def parseZipCodes(list):
	zip_codes = dict()
	for object in list:
		zip_code = object["ZIP"]

		zip_codes[zip] = list()
		zip_codes[zip].append(object["LAT"])
		zip_codes[zip].append(object["LNG"])

	return zip_codes

@route("/")
def getMap():
	zip_lat_long = parseCSV("../zip_lat_long.csv")
	provider_data = parseCSV("../Medicare_Provider_Charge_Inpatient_DRGALL_FY2015.csv")

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

		location_obj = zip_codes_dict[zip_code]

		if not location_obj == None:
			lat = location_obj[0]
			lon = location_obj[1]
			point.append(lat)
			point.append(lon)
			point.append(1)
			heatPoints.append(point)
		index += 1

	template = env.get_template("index.html")
	return template.render(heatPoints=heatPoints)

run(host='localhost', port=8080)