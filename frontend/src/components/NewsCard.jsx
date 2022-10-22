import React from "react";
import { useState, useEffect } from "react";
const API_URL = "http://localhost:3001";
export const NewsCard = ({ article }) => {
  const [title, setTitle] = useState(null);
  const [summary, setSummary] = useState(null);
  const [classification, setClassification] = useState(null);

  const handleSummarize = async (e) => {
    await fetch(`${API_URL}/summarize?prompt=${article}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(`${data.generations[0].text.slice(0, -2)}`);
        fetch(
          `${API_URL}/classify?prompt=${data.generations[0].text.slice(0, -2)}`
        )
          .then((res) => res.json())
          .then((data) =>
            setClassification(
              JSON.stringify(data.classifications[0].prediction)
            )
          );
      });
  };

  const extractUrlFromArticle = (article) => {
    const i = article.lastIndexOf("link_to_article:");
    const len = "link_to_article:".length;
    const url = article.substr(i + len);
    return url;
  };

  const longSummary = async (e) => {
    await fetch(`${API_URL}/summarize-long?prompt=${article}`)
      .then((res) => res.json())
      .then((data) => {
        setSummary(`${data.generations[0].text.slice(0, -2)}`);
      });
  };

  useEffect(() => {
    handleSummarize();
    extractUrlFromArticle(article);
    longSummary();
  }, []);

  return (
    <div>
      {!summary ? (
        <div></div>
      ) : (
        <>
          <h1>{!title ? "Title will appear here" : title}</h1>
          <h3>{!classification ? "Category" : classification}</h3>
          <h5>{!summary ? "Category" : summary}</h5>
          <form action={extractUrlFromArticle(article)}>
            <input type="submit" value="Learn More" />
          </form>
        </>
      )}
    </div>
  );
};
