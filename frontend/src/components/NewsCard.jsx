import React from "react";
import { useState, useEffect } from "react";
const API_URL = "http://localhost:3001";
export const NewsCard = ({ article }) => {
  const [summary, setSummary] = useState(null);
  const [url, setUrl] = useState(null);

  const handleSummarize = async (e) => {
    fetch(`${API_URL}/summarize?prompt=${article}`)
      .then((res) => res.json())
      .then((data) => {
        setSummary(`${data.generations[0].text.slice(0, -2)}`);
      });
  };

  const extractUrlFromArticle = (article) => {
    const i = article.lastIndexOf("link_to_article:");
    const len = "link_to_article:".length;
    const url = article.substr(i + len);
    return url;
  };

  useEffect(() => {
    handleSummarize(article);
    extractUrlFromArticle(article);
  }, []);

  return (
    <div>
      <h1>--------------------ARTICLE--------------------</h1>
      <h1>{!summary ? "Title will appear here" : summary}</h1>
      <h5>{article}</h5>
      <form action={extractUrlFromArticle(article)}>
        <input type="submit" value="Learn More" />
      </form>
    </div>
  );
};
