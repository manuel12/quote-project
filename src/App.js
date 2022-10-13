import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteLeft,
  faShare,
  faVolumeHigh,
  faVolumeOff,
} from "@fortawesome/free-solid-svg-icons";

import characterQuotes from "./quotes.json";

import "./App.css";

function App() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [canPlaySound, setCanPlaySound] = useState(false);
  const [soundVolume, setSoundVolume] = useState(0.3);
  const [audioLoop] = useState(true);

  const [audio] = useState(
    new Audio(
      "https://ia600900.us.archive.org/12/items/tvtunes_7001/Pulp%20Fiction.mp3"
    )
  );
  audio.volume = soundVolume;
  audio.loop = audioLoop;

  const [currentQuote, setCurrentQuote] = useState({ text: "", author: "" });
  const [currentColor, setCurrentColor] = useState("primary");
  const quotes = characterQuotes;

  const getRandomNumber = (upperLimit) =>
    Math.floor(Math.random() * upperLimit);

  const getRandomQuote = () => {
    const randomIndex = getRandomNumber(quotes.length);
    const randomQuote = quotes[randomIndex];
    return randomQuote;
  };

  const pulpFictionColors = [
    {
      name: "red",
      code: "#e52826",
    },
    {
      name: "yellow",
      code: "#ffe701",
    },
    {
      name: "black",
      code: "#121416",
    },
    {
      name: "orange",
      code: "#ef8e01",
    },
    {
      name: "blue",
      code: "#5098b2",
    },
    {
      name: "green",
      code: "#468e27",
    },
  ];

  const getRandomColor = () => {
    const colors = pulpFictionColors.map((colorObj) => colorObj.name);
    const randomIndex = getRandomNumber(colors.length);
    const randomColor = colors[randomIndex];
    return randomColor;
  };

  useEffect(() => {
    const currentQuote = getRandomQuote();
    setCurrentQuote(currentQuote);

    const currentColor = getRandomColor();
    setCurrentColor(currentColor);
  }, []);

  const tweetHref = `http://twitter.com/intent/tweet?text="${currentQuote.text}" -${currentQuote.author}`;

  const newQuoteClickHandler = () => {
    audio.play();
    setCanPlaySound(true);

    const currentQuote = getRandomQuote();
    setCurrentQuote(currentQuote);

    const currentRandomColor = getRandomColor();
    if (currentRandomColor == currentColor) {
      return newQuoteClickHandler();
    } else {
      setCurrentColor(currentRandomColor);
    }
  };

  const soundButtonClickHandler = () => {
    soundVolume > 0 ? setSoundVolume(0) : setSoundVolume(0.3);
    setSoundEnabled(!soundEnabled);
  };

  return (
    <div className={`App ${currentColor}`}>
      <div className="container">
        <button
          className={`sound-button ${canPlaySound ? "visible" : "hidden"}`}
          onClick={soundButtonClickHandler}
        >
          {soundEnabled ? (
            <FontAwesomeIcon icon={faVolumeHigh} className="sound-icon" />
          ) : (
            <FontAwesomeIcon icon={faVolumeOff} className="sound-icon" />
          )}
        </button>

        <div id="quote-box" className="bg-white">
          <FontAwesomeIcon icon={faQuoteLeft} className="left-quote" />
          <div id="text" className="display-6 quote-text">
            {currentQuote.text}
          </div>

          <div
            id="author"
            className="quote-author"
          >{`-${currentQuote.author}`}</div>

          <div className="row">
            <div className="col-md-6">
              <button className={`tweet-quote btn ${currentColor}`}>
                <FontAwesomeIcon icon={faShare} />
                <a
                  id="tweet-quote"
                  href={tweetHref}
                  target="_top"
                  className="text-light"
                >
                  Tweet quote!
                </a>
              </button>
            </div>
            <div className="col-md-6">
              <button
                className={`new-quote btn ${currentColor} text-light`}
                id="new-quote"
                onClick={newQuoteClickHandler}
              >
                Get a new quote!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
