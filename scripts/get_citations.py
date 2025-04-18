import sys, json
from scholarly import scholarly


def main(author_id, out_path):
    author = scholarly.search_author_id(author_id)
    profile = scholarly.fill(author, sections=['indices', 'counts'])

    with open(out_path, "w") as f:
        json.dump(profile, f, indent=2)

if __name__ == "__main__":
    _, author_id, out_path = sys.argv
    main(author_id, out_path)
