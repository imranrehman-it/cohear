import { useEffect, useState } from "react";

function App() {
  const API_URL = "http://localhost:3001";

  const [data, setData] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [prediction, setPrediction] = useState("");
  const [article, setArticle] = useState("");

  // Update prompt variable when handleChange is called
  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  useEffect(() => {
    setData(null);
    setArticle(null);
    fetch(`http://127.0.0.1:5000/members`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        console.log(data);
      });
  }, []);

  // When handleSubmit is called, passes prompt to /api and then gets assigns response to data

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData(null);
    setPrediction(null);
    fetch(`${API_URL}/summarize?prompt=${prompt}`)
      .then((res) => res.json())
      .then((data) => {
        setData(`${data.generations[0].text.slice(0, -2)}`);

        fetch(
          `${API_URL}/classify?prompt=${data.generations[0].text.slice(0, -2)}`
        )
          .then((res) => res.json())
          .then((data) =>
            setPrediction(JSON.stringify(data.classifications[0].prediction))
          );
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
      </header>
    </div>
  );
}

export default App;
