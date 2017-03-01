""" Convert translation spreadsheet (downloaded as a csv file) to json.
    Keys that include a "." indicate nesting, so 'flag.chooseLanguage' is converted to {flag:{chooseLanguage: value}}

This assumes a CSV file of the following format:
       Column 1 = JSON key
       Column 2 = Translated text

To run the script, passing in the csv file's name:
 -       e.g. `python format_translations.py --filename en-us.csv` (fill in your translation CSV filename as appropriate)

"""
import argparse
import collections
import csv
import json
import os
import sys

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


# Path to a user-generated file with a reference translation. User must generate and make available.
REFERENCE_LOCALE_PATH = './en.json'

# Attributes to be excluded from translation validation if needed.
EXCLUDED_ATTRIBUTES = set(['consent.secondSection', 'consent.checkboxLabel', 'consent.title', 'consent.button.labelUnaccepted', 'consent.thirdSection', 'consent.firstSection', 'consent.versionHistory', 'flag.chooseLanguage'])


def flatten(nested_dict, base_key=''):
    """Flatten a nested dict into a single level dictionary with dot-separated key names"""
    new_dict = {}
    for k, v in nested_dict.iteritems():
        this_key = '{}.{}'.format(base_key, k) if base_key else k
        if isinstance(v, collections.Mapping):
            new_dict.update(flatten(v, base_key=this_key))
        else:
            new_dict[this_key] = v
    return new_dict


def validate_translations(reference_locale, new_translation):
    """
    Compare the current translation to a reference locale to see if any keys are missing or empty
    :param dict reference_locale: Date for the reference locale
    :param dict new_translation: Data for the new translation
    """
    flat_reference = flatten(reference_locale)
    flat_new = flatten(new_translation)

    # Are any keys outright missing or extra?
    reference_keys = set(flat_reference.iterkeys())
    new_keys = set(flat_new.iterkeys())

    if not (reference_keys ^ new_keys).issubset(EXCLUDED_ATTRIBUTES):
        print "The following keys appear in the reference locale, but not the new translation: ", reference_keys - new_keys - EXCLUDED_ATTRIBUTES
        print "The following keys appear in the new translation, but not the reference locale: ", new_keys - reference_keys - EXCLUDED_ATTRIBUTES

    # Then: are any of the keys in the translation file present, but blank?
    for k, v in flat_new.iteritems():
        if not v:
            print "Found blank value in new translation at key: ", k

    # Common gotcha: did we forget to include the "{{count}}" variable placeholder in certain specific items?
    check_fields = ['qsort.sections.1.itemsLeft.one', 'qsort.sections.1.itemsLeft.other']
    for f in check_fields:
        val = flat_new.get(f, '')
        if '{{count}}' not in val:
            print 'Missing required {{{{count}}}} placeholder in {}'.format(f), '(Found field value:', val, ')'

def parse_args():
     parser = argparse.ArgumentParser()
     parser.add_argument('-f', '--filename', dest='filename', required=True)
     parser.add_argument('-o', '--out', dest='out',
                         help='The output filename; defaults to <filename>.json')
     return parser.parse_args()


def main():
    args = parse_args()
    # If no output filename specified, use same path, but with a JSON extension
    out_fn = args.out or os.path.splitext(args.filename)[0] + os.path.extsep + 'json'

    if os.path.isfile(out_fn):
        while True:
            response = raw_input('Specified output filename already exists; overwrite? (y/n)\n').lower()
            if response == 'y':
                break
            elif response == 'n':
                print 'Output filename already in use; exiting.'
                sys.exit()

    with open(args.filename, 'rb') as csvfile:
            reader = csv.reader(csvfile)
            for row in reader:
                keys = row[0].split('.')
                merge(data, format_dict(keys, row[1].strip(" ")))

    with open(out_fn, 'w') as f:
        data.update(numbers)
        json.dump(data, f, indent=4, sort_keys=True, ensure_ascii=False)

    with open(REFERENCE_LOCALE_PATH, 'r') as f:
            reference_translation = json.load(f)
            validate_translations(reference_translation, data)



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