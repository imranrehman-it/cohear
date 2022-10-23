import { useEffect, useState } from "react";
import { NewsCard } from "./components/NewsCard";
function App() {
  const API_URL = "http://localhost:3001";

  const [data, setData] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [prediction, setPrediction] = useState("");
  const [worldNews, setWorldNews] = useState([]);
  const [canadaNews, setCanadaNews] = useState([]);
  const [politicsNews, setPoliticsNews] = useState([]);
  const [climateNews, setClimateNews] = useState([]);
  const [summary, setSummary] = useState(null);

  // Update prompt variable when handleChange is called
  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/worldnews`)
      .then((res) => res.json())
      .then((data) => {
        setWorldNews(data);
      });

    fetch(`http://127.0.0.1:5000/canadanews`)
      .then((res) => res.json())
      .then((data) => {
        setCanadaNews(data);
      });

    fetch(`http://127.0.0.1:5000/politicsnews`)
      .then((res) => res.json())
      .then((data) => {
        setPoliticsNews(data);
      });

    fetch(`http://127.0.0.1:5000/climatenews`)
      .then((res) => res.json())
      .then((data) => {
        setClimateNews(data);
      });
  }, []);

  // When handleSubmit is called, passes prompt to /api and then gets assigns response to data

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData(null);
    setPrediction(null);
    fetch(`${API_URL}/summarize-long?prompt=${prompt}`)
      .then((res) => res.json())
      .then((data) => {
        setData(`${data.generations[0].text.slice(0, -2)}`);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Summarizer</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Enter a passage of text to summarize: <br />
            <textarea
              name="input-box"
              rows="5"
              cols="100"
              value={prompt}
              onChange={handleChange}
            />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
        <h1>Result:</h1>
        <h3>{!data ? "Question will appear here." : data}</h3>
        <h3>{!prediction ? "Category" : prediction}</h3>
        <h1>Worlds News</h1>
        {worldNews?.map((article) => {
          return <NewsCard article={String(article)} />;
        })}
        <h1>Canada News</h1>
        {canadaNews?.map((article) => {
          return <NewsCard article={String(article)} />;
        })}
        <h1>Politics News</h1>
        {politicsNews?.map((article) => {
          return <NewsCard article={String(article)} />;
        })}
      </header>
    </div>
  );
}

export default App;
