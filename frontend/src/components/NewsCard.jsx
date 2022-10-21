import React from "react";
import { useState, useEffect } from "react";
const API_URL = "http://localhost:3001";
export const NewsCard = ({ article }) => {
  const [summary, setSummary] = useState(null);
  console.log(article);
  const handleSummarize = async (e) => {
    fetch(`${API_URL}/summarize?prompt=${article}`)
      .then((res) => res.json())
      .then((data) => {
        setSummary(`${data.generations[0].text.slice(0, -2)}`);
      });
  };

  useEffect(() => {
    handleSummarize(article);
  }, []);

  return (
    <div>
      <h1>--------------------ARTICLE--------------------</h1>
      <h1>{!summary ? "Title will appear here" : summary}</h1>
      <h5>{article}</h5>
    </div>
  );
};
