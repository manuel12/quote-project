import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteLeft,
  faShare,
  faVolumeHigh,
  faVolumeOff,
} from "@fortawesome/free-solid-svg-icons";

import newQuotes from "./new-quotes.json";

import "./App.css";

function App() {
  const [audio] = useState(
    new Audio(
      "https://ia600900.us.archive.org/12/items/tvtunes_7001/Pulp%20Fiction.mp3"
    )
  );

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [canPlaySound, setCanPlaySound] = useState(false);
  const [soundVolume, setSoundVolume] = useState(0.3);
  audio.volume = soundVolume;
  audio.loop = true;

  const [currentQuote, setCurrentQuote] = useState({ text: "", author: "" });
  const [currentColor, setCurrentColor] = useState("primary");
  const quotes = newQuotes;

  const getRandomNumber = (upperLimit) =>
    Math.floor(Math.random() * upperLimit);

  const getRandomQuote = () => {
    const randomIndex = getRandomNumber(quotes.length);
    const randomQuote = quotes[randomIndex];
    return randomQuote;
  };

  const getRandomColor = () => {
    const colors = [
      "primary",
      "secondary",
      "success",
      "danger",
      "warning",
      "info",
      "dark",
    ];
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
    <div className={`App bg-${currentColor}`}>
      <div className="container">
        {canPlaySound && (
          <button className="sound-button" onClick={soundButtonClickHandler}>
            {soundEnabled ? (
              <FontAwesomeIcon icon={faVolumeHigh} className="sound-icon" />
            ) : (
              <FontAwesomeIcon icon={faVolumeOff} className="sound-icon" />
            )}
          </button>
        )}

        <div id="quote-box" className="bg-white">
          <FontAwesomeIcon icon={faQuoteLeft} className="left-quote" />
          <div id="text" className="display-6 quote-text">
            {currentQuote.text}
          </div>

          <div id="author" className="quote-author">{`-${currentQuote.author}`}</div>

          <div className="row">
            <div className="col-md-6">
              <button className={`tweet-quote btn btn-${currentColor}`}>
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
                className={`new-quote btn btn-${currentColor} text-light`}
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
