from flask import Flask
from flask_cors import CORS
from urllib import request
from bs4 import BeautifulSoup
import requests
import json

app = Flask(__name__)
CORS(app)


@app.route('/members')
def members():
    url = "https://www.cbc.ca/news/world"

    result = requests.get(url)
    doc = BeautifulSoup(result.text, "html.parser")

    def extract_article(url):
        subResult = requests.get(url)
        subDoc = BeautifulSoup(subResult.text, "html.parser")
        article = ""

        for a in subDoc.find_all('p', {"class": None}):
            # gets all <p> up until end of article denoted by Audience Relations
            if (a.text.find("Audience Relations, CBC") != -1):
                break
            else:
                article = article + a.text

        return article

    # extracts all links to news article from home page to be later accessed for article extraction
    urlList = []
    for a in doc.find_all('a', href=True, ):
        if (a['href'].find('/news/world') != -1):
            print("Found the URL:", a['href'])
            urlList.append(a['href'])

    return json.dumps(extract_article("https://www.cbc.ca" + urlList[4]))


if __name__ == "__main__":
    app.run(debug=True)
