import csv
import json
import collections


numbers = {
    "number0": "0",
    "number1": "1",
    "number2": "2",
    "number3": "3",
    "number4": "4",
    "number5": "5",
    "number6": "6",
    "number7": "7",
    "number8": "8",
    "number9": "9",
    "number10": "10",
    "number11": "11",
    "number12": "12",
    "number13": "13",
    "number14": "14",
    "number15": "15",
    "number16": "16",
    "number17": "17",
    "number18": "18",
    "number19": "19",
    "number20": "20",
    "number21": "21",
    "number22": "22",
    "number23": "23",
    "number24": "24",
    "number25": "25",
    "number26": "26",
    "number27": "27",
    "number28": "28",
    "number29": "29",
    "number30": "30",
    "number31": "31",
    "number32": "32",
    "number33": "33",
    "number34": "34",
    "number35": "35",
    "number36": "36",
    "number37": "37",
    "number38": "38",
    "number39": "39",
    "number40": "40",
    "number41": "41",
    "number42": "42",
    "number43": "43",
    "number44": "44",
    "number45": "45",
    "number46": "46",
    "number47": "47",
    "number48": "48",
    "number49": "49",
    "number50": "50",
    "number51": "51",
    "number52": "52",
    "number53": "53",
    "number54": "54",
    "number55": "55",
    "number56": "56",
    "number57": "57",
    "number58": "58",
    "number59": "59",
    "number60": "60",
    "number61": "61",
    "number62": "62",
    "number63": "63",
    "number64": "64",
    "number65": "65",
    "number66": "66",
    "number67": "67",
    "number68": "68",
    "number69": "69",
    "number70": "70",
    "number71": "71",
    "number72": "72",
    "number73": "73",
    "number74": "74",
    "number75": "75",
    "number76": "76",
    "number77": "77",
    "number78": "78",
    "number79": "79",
    "number80": "80",
    "number81": "81",
    "number82": "82",
    "number83": "83",
    "number84": "84",
    "number85": "85",
    "number86": "86",
    "number87": "87",
    "number88": "88",
    "number89": "89",
    "number90": "90",
    "number91": "91",
    "number92": "92",
    "number93": "93",
    "number94": "94",
    "number95": "95",
    "number96": "96",
    "number97": "97",
    "number98": "98",
    "number99": "99",
    "number100": "100"
}

data = collections.defaultdict(dict)


def main():
    with open('en-us.csv', 'rb') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            keys = row[0].split('.')
            merge(data, format_dict(keys, row[1].strip(" ")))
    f = open('en-us.json', 'w')
    data.update(numbers)
    data['measures']['questions']['3']['label'] = add_conditions(data['measures']['questions']['3']['label'])
    f.write(json.dumps(data, indent=4, sort_keys=True))


def add_conditions(value):
    times = dict()
    times['10am'] = value.replace('##', '10am')
    times['7pm'] = value.replace('##', '19:00 (7pm)')
    return times


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
