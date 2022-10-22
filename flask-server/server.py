from flask import Flask
from flask_cors import CORS
from urllib import request
from bs4 import BeautifulSoup
import requests
import json


app = Flask(__name__)
CORS(app)


@app.route('/worldnews')
def worldnews():
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

        return article + "link_to_article:" + url

    # extracts all links to news article from home page to be later accessed for article extraction
    urlList = []
    allArticles = []
    for a in doc.find_all('a', href=True, ):
        if (a['href'].find('/news/world') != -1):
            print("Found the URL:", a['href'])
            urlList.append(a['href'])

            allArticles.append(extract_article(
                "https://www.cbc.ca" + a['href']))

    return json.dumps(allArticles)


@app.route('/canadanews')
def canadanews():
    url = "https://www.cbc.ca/news/canada"

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

        return article + "link_to_article:" + url

    # extracts all links to news article from home page to be later accessed for article extraction
    urlList = []
    allArticles = []
    for a in doc.find_all('a', href=True, ):
        if (a['href'].find('/news/canada') != -1):
            print("Found the URL:", a['href'])
            urlList.append(a['href'])

            allArticles.append(extract_article(
                "https://www.cbc.ca" + a['href']))

    return json.dumps(allArticles)


@app.route('/climatenews')
def climatenews():
    url = "https://www.cbc.ca/news/climate"

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

        return article + "link_to_article:" + url

    # extracts all links to news article from home page to be later accessed for article extraction
    urlList = []
    allArticles = []
    for a in doc.find_all('a', href=True, ):
        if (a['href'].find('1.66') != -1):
            print("Found the URL:", a['href'])
            urlList.append(a['href'])

            allArticles.append(extract_article(
                "https://www.cbc.ca" + a['href']))

    return json.dumps(allArticles)


@app.route('/politicsnews')
def politicsnews():
    url = "https://www.cbc.ca/news/politics"

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

        return article + "link_to_article:" + url

    # extracts all links to news article from home page to be later accessed for article extraction
    urlList = []
    allArticles = []
    for a in doc.find_all('a', href=True, ):
        if (a['href'].find('news/politics') != -1):
            print("Found the URL:", a['href'])
            urlList.append(a['href'])

            allArticles.append(extract_article(
                "https://www.cbc.ca" + a['href']))

    return json.dumps(allArticles)


if __name__ == "__main__":
    app.run(debug=True)
