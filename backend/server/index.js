const path = require("path");
const cohere = require("cohere-ai");
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

cohere.init("mU3AKsgBDh2pLIuWPTMJW2bcvpS8INX8UsB2NDX9");

app.get("/api", async (req, res) => {
  const response = await cohere.generate({
    model: "large",
    prompt: `This is a trivia question generation tool. It generates questions related to a given topic.\n-\nTopic: History\nQ: Who invented penicillin?\n-\nTopic: Entertainment\nQ: What was the first toy to be advertised on television?\n-\nTopic: Sports\nQ: Which two countries have not missed one of the modern-day Olympics?\n-\nTopic: Geography\nQ: What is the smallest country in the world?\n-\nTopic: Food \nQ: What is the rarest M&M color?\n-\nTopic: Switzerland\nQ: What country consumes the most chocolate per capita? \n- \nTopic: India\nQ: What is the name given to Indian food cooked over charcoal in a clay oven?\n-\nTopic: Space\nQ: What was the first soft drink in space?\n-\nTopic: Cheese\nQ: From which country does Gouda cheese originate?\n-\nTopic: Disney\nQ: What was the first feature-length animated movie ever released?\n-\nTopic: Books\nQ: Who authored Sherlock Holmes? \n-\nTopic: Entertainment\nQ: What awards has an EGOT winner won?\n-\nTopic: Music\nQ: Which member of the Beatles married Yoko Ono?\n-\nTopic: Soccer\nQ: Which country won the first-ever soccer World Cup in 1930?\n-\nTopic: Basketball\nQ: Which Former NBA Player Was Nicknamed Agent Zero?\n-\nTopic: Gymnastics \nQ: Who was the first gymnast to score a perfect 10 score?\n-\nTopic: Volleyball\nQ: Dump, floater, and wipe are terms used in which team sport?\n-\nTopic: Formula 1\nQ: Who was the first female driver to score points in a Grand Prix?\n-\nTopic: United States\nQ: In which state is Area 51 located? \n-\nTopic: Animals\nQ: How long do elephant pregnancies last?\n-\nTopic: Science\nQ: In what type of matter are atoms most tightly packed?\n-\nTopic: Anatomy\nQ: How many teeth does an adult human have?\n-\nTopic: Etymology\nQ: Who invented the word vomit?\n-\nTopic: ${req.query.prompt}`,
    max_tokens: 50,
    temperature: 0.6,
    stop_sequences: ["-"],
  });
  res.json(response.body);
});

app.get("/summarize", async (req, res) => {
  const response = await cohere.generate({
    model: "large",
    prompt: `Passage: Is Wordle getting tougher to solve? Players seem to be convinced that the game has gotten harder in recent weeks ever since The New York Times bought it from developer Josh Wardle in late January. The Times has come forward and shared that this likely isn’t the case. That said, the NYT did mess with the back end code a bit, removing some offensive and sexual language, as well as some obscure words There is a viral thread claiming that a confirmation bias was at play. One Twitter user went so far as to claim the game has gone to “the dusty section of the dictionary” to find its latest words.\n\nTLDR: Wordle has not gotten more difficult to solve.\n--\nPassage: ArtificialIvan, a seven-year-old, London-based payment and expense management software company, has raised $190 million in Series C funding led by ARG Global, with participation from D9 Capital Group and Boulder Capital. Earlier backers also joined the round, including Hilton Group, Roxanne Capital, Paved Roads Ventures, Brook Partners, and Plato Capital.\n\nTLDR: ArtificialIvan has raised $190 million in Series C funding.\n--\nPassage: ${req.query.prompt}\n\nTLDR:`,
    max_tokens: 50,
    temperature: 0.8,
    k: 0,
    p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: ["--"],
    return_likelihoods: "NONE",
  });
  res.json(response.body);
});

app.get("/classify", async (req, res) => {
  const response = await cohere.classify({
    model: "large",
    inputs: [req.query.prompt],
    examples: [
      {
        text: "New Era Begins at Warner Bros. Tinged with Nostalgia",
        label: "Technology",
      },
      {
        text: "As Gas Prices Went Up, So Did the Hunt for Electric Vehicles",
        label: "Technology",
      },
      { text: "Facial Recognition Goes to War", label: "Technology" },
      {
        text: "US Says It Secretly Removed Malware Worldwide",
        label: "Technology",
      },
      { text: "The Old-Timers Are Chasing Netflix", label: "Technology" },
      {
        text: "Few Cars, Lots of Customers: Why Autos Are an Inflation Risk",
        label: "Economy",
      },
      {
        text: "Supply Chains Widely Tainted by Forced Labour in China",
        label: "Economy",
      },
      {
        text: "The US Economy is Booming. Why are Economists Worrying About a Recession?",
        label: "Economy",
      },
      {
        text: "Industries hit hard by the pandemic continued their rebound",
        label: "Economy",
      },
      {
        text: "Energy prices in Europe soar 45 percent as inflation hits another record",
        label: "Economy",
      },
      {
        text: "New Drug Slashed Deaths Among Patients With Severe Covid, Maker Claims",
        label: "Health",
      },
      { text: "Is 30 minutes of Exercise a Day Enough?", label: "Health" },
      {
        text: "With a $2.1 Million Cure Their Only Hope, Parents Plead for Help Online",
        label: "Health",
      },
      {
        text: "The FDA suspends use of a Glaxo antibody drug in the US as an Omnicron subvariant spreads",
        label: "Health",
      },
      { text: "What to know about the Bird Flu Outbreak", label: "Health" },
    ],
  });
  res.json(response.body);
});
