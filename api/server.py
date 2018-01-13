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


def searchForZip(codes, zip_code):
	for obj in codes:
		if(obj["ZIP"] == zip_code):
			return obj


@route("/")
def getMap():
	zip_lat_long = parseCSV("../zip_lat_long.csv")
	provider_data = parseCSV("../Medicare_Provider_Charge_Inpatient_DRGALL_FY2015.csv")

	heatPoints = list()

	for provider in provider_data:
		point = list()
		zip_code = provider["Provider Zip Code"]

		location_obj = searchForZip(zip_lat_long, zip_code)

		if not location_obj == None:
			lat = location_obj["LAT"]
			lon = location_obj["LNG"]
			point.append(lat)
			point.append(lon)
			point.append(1)
			heatPoints.append(point)

	template = env.get_template("index.html")
	return template.render(heatPoints=heatPoints)


print(len(parseCSV("../zip_lat_long.csv")))
print(searchForZip(parseCSV("../zip_lat_long.csv"), '99929'))

run(host='localhost', port=8080)