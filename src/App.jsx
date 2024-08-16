import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [wordle, setWordle] = useState(null);
  const [errFlag, setErrFlag] = useState(false);
  const [guessedWord, setGuessedWord] = useState("");
  const [guessedWords, setGuessedWords] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const getWordle = async () => {
      const data = await import("./words.json");
      const randomWord =
        data.default[Math.floor(Math.random() * data.default.length)];
      setWordle(randomWord);
    };
    getWordle();
  }, [gameOver]);

  useEffect(() => {
    setTimeout(() => {
      if (guessedWords.includes(wordle)) {
        alert("Hurray! You won");
        setGuessedWords([]);
        setGameOver(!gameOver);
      } else if (guessedWords.length >= 5) {
        alert("Game Over! Better luck next time. It was " + wordle);
        setGuessedWords([]);
        setGameOver(!gameOver);
      }
    }, 100);
  }, [guessedWords]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (guessedWord.length === 5 && guessedWord !== "") {
      if (errFlag) setErrFlag(false);
      setGuessedWords([...guessedWords, guessedWord.toLocaleUpperCase()]);
      setGuessedWord("");
    } else setErrFlag(true);
  };

  return (
    <div className="app">
      <h2>
        Wordle - A game where you have 5 attempts to guess the 5 letter word
      </h2>
      <ul>
        {guessedWords?.map((word, i) => (
          <WordRow key={i + 1} word={word} wordle={wordle} />
        ))}
      </ul>
      <form type="submit" onSubmit={(e) => submitHandler(e)}>
        <input
          className="formInput"
          value={guessedWord}
          type="text"
          name="word"
          id="word"
          onChange={(e) => setGuessedWord((prev) => (prev = e.target.value))}
        />
        <p
          style={{
            display: errFlag ? "block" : "none",
            color: "red",
          }}
        >
          Word needs to be 5 characters long
        </p>
      </form>
    </div>
  );
}

export default App;

function WordRow({ word, wordle }) {
  const wordleArr = wordle.split("");
  return (
    <div className="wordRow">
      {word.split("").map((char, i) => (
        <div
          className={
            !wordleArr.includes(char)
              ? "charBox"
              : wordleArr[i] === char
              ? "charBox green"
              : "charBox yellow"
          }
          key={i + 1}
        >
          {char}
        </div>
      ))}
    </div>
  );
}
