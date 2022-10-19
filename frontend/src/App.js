import { useState } from "react";

function App() {
  const API_URL = "http://localhost:3001";

  const [data, setData] = useState(null);
  const [prompt, setPrompt] = useState("");

  // Update prompt variable when handleChange is called
  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  // When handleSubmit is called, passes prompt to /api and then gets assigns response to data

  const handleSubmit = (e) => {
    e.preventDefault();
    setData(null);
    fetch(`${API_URL}/api?prompt=${prompt}`)
      .then((res) => res.json())
      .then((data) => setData(`${data.generations[0].text.slice(0, -1)}`));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Trivia Generator</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Give me a topic: <br />
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
      </header>
    </div>
  );
}

export default App;
