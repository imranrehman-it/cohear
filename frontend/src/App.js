import { useEffect, useState } from "react";
import { NewsCard } from "./components/NewsCard";
function App() {
  const API_URL = "http://localhost:3001";

  const [data, setData] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [prediction, setPrediction] = useState("");
  const [articles, setArticles] = useState([]);
  const [summary, setSummary] = useState(null);

  // Update prompt variable when handleChange is called
  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  useEffect(() => {
    setData(null);
    fetch(`http://127.0.0.1:5000/politicsnews`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
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
        {articles?.map((article) => {
          return <NewsCard article={String(article)} />;
        })}
      </header>
    </div>
  );
}

export default App;
