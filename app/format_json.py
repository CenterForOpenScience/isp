import csv
import json
import collections

data = collections.defaultdict(dict)


def main():
    with open('en-us.csv', 'rb') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            keys = row[0].split('.')
            merge(data, format_dict(keys, row[1]))
    f = open('en-us.json', 'w')
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
