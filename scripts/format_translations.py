""" Convert translation spreadsheet (downloaded as a csv file) to json.
    Keys that include a "." indicate nesting, so 'flag.chooseLanguage' is converted to {flag:{chooseLanguage: value}}

    Steps:
    1. Obtain access to translation spreadsheet for the desired locale from client
    2. Download the spreadsheet as a csv file and add it to the isp/scripts directory
    3. Run the script, passing in the csv file's name:
       e.g. `python -m scripts.format_translations --filename en-us.csv`
    4. Copy & paste the json from the generated file to the translations.js file in isp/app/locales/<locale>/
       See isp/app/locales/en/translations.js as an example.
       Note: If the locale folder does not exist, run 'ember generate locale <locale> in the isp/app directory.


This assumes a CSV file of the following format:
       Column 1 = JSON key
       Column 2 = English text
       Column 3 = Translation
       Column 4 = Back translation
       Column 5 = Discrepancies
       Column 6 = Final translation
       Column 7 = Comments
"""
import argparse
import collections
import csv
import json
import os


numbers = {
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "10": "10",
    "11": "11",
    "12": "12",
    "13": "13",
    "14": "14",
    "15": "15",
    "16": "16",
    "17": "17",
    "18": "18",
    "19": "19",
    "20": "20",
    "21": "21",
    "22": "22",
    "23": "23",
    "24": "24",
    "25": "25",
    "26": "26",
    "27": "27",
    "28": "28",
    "29": "29",
    "30": "30",
    "31": "31",
    "32": "32",
    "33": "33",
    "34": "34",
    "35": "35",
    "36": "36",
    "37": "37",
    "38": "38",
    "39": "39",
    "40": "40",
    "41": "41",
    "42": "42",
    "43": "43",
    "44": "44",
    "45": "45",
    "46": "46",
    "47": "47",
    "48": "48",
    "49": "49",
    "50": "50",
    "51": "51",
    "52": "52",
    "53": "53",
    "54": "54",
    "55": "55",
    "56": "56",
    "57": "57",
    "58": "58",
    "59": "59",
    "60": "60",
    "61": "61",
    "62": "62",
    "63": "63",
    "64": "64",
    "65": "65",
    "66": "66",
    "67": "67",
    "68": "68",
    "69": "69",
    "70": "70",
    "71": "71",
    "72": "72",
    "73": "73",
    "74": "74",
    "75": "75",
    "76": "76",
    "77": "77",
    "78": "78",
    "79": "79",
    "80": "80",
    "81": "81",
    "82": "82",
    "83": "83",
    "84": "84",
    "85": "85",
    "86": "86",
    "87": "87",
    "88": "88",
    "89": "89",
    "90": "90",
    "91": "91",
    "92": "92",
    "93": "93",
    "94": "94",
    "95": "95",
    "96": "96",
    "97": "97",
    "98": "98",
    "99": "99",
    "100": "100"
}

data = collections.defaultdict(dict)


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('-f', '--filename', dest='filename', required=True)
    parser.add_argument('-o', '--out', dest='out', help='The output filename; defaults to <filename>.json')
    parser.add_argument('--test', dest='use_column', default=5, action='store_const', const=1,
                        help='Testing mode (always writes the english text)')
    return parser.parse_args()


def main():
    args = parse_args()
    # If no output filename specified, use same path, but with a JSON extension
    out_fn = args.out or os.path.splitext(args.filename)[0] + os.path.sep + 'json'
    if os.path.isfile(out_fn):
        raise OSError('Specified output filename already exists')

    with open(args.filename, 'rb') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            keys = row[0].split('.')
            merge(data, format_dict(keys, row[args.use_column].strip(" ")))
    with open(args.out, 'w') as f:
        data.update(numbers)
        f.write(json.dumps(data, indent=4, sort_keys=True))


def format_dict(keys, value):
    if len(keys) == 1:
        return {keys[0]: value}
    return {keys[0]: format_dict(keys[1:], value)}


# h/t: http://stackoverflow.com/questions/3232943/update-value-of-a-nested-dictionary-of-varying-depth
def merge(d, u):
    for key, value in u.iteritems():
        if isinstance(value, collections.Mapping):
            r = merge(d.get(key, {}), value)
            d[key] = r
        else:
            d[key] = u[key]
    return d


if __name__ == '__main__':
    main()
