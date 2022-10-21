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

const quotes = characterQuotes;

const pulpFictionWallpapers = [
  {
    name: "jules",
    url: "https://w0.peakpx.com/wallpaper/986/879/HD-wallpaper-droid-jules-fiction-pulp-pulp-fiction-quentin-tarantino.jpg",
  },
  {
    name: "mia-nose",
    url: "https://images5.alphacoders.com/489/489934.png",
  },
  {
    name: "classic-shot",
    url: "https://images7.alphacoders.com/693/693715.jpg",
  },
  {
    name: "dancing",
    url: "https://wallpaperaccess.com/full/3831481.png",
  }
];
const pulpFictionColors = [
  {
    name: "red",
    code: "#e52826",
  },
  {
    name: "yellow",
    code: "#e2c000",
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
    code: "#509cff",
  },
  {
    name: "green",
    code: "#468e27",
  },
];

const getRandomNumber = (upperLimit) => Math.floor(Math.random() * upperLimit);

const getRandomQuote = () => {
  const randomIndex = getRandomNumber(quotes.length);
  const randomQuote = quotes[randomIndex];
  return randomQuote;
};

const getRandomColor = () => {
  const colors = pulpFictionColors.map((colorObj) => colorObj.name);
  const randomIndex = getRandomNumber(colors.length);
  const randomColor = colors[randomIndex];
  return randomColor;
};

const getRandomBackground = () => {
  const backgroundNames = pulpFictionWallpapers.map(
    (wallpaperObj) => wallpaperObj.name
  );
  const randomIndex = getRandomNumber(pulpFictionWallpapers.length);
  const randomBackground = backgroundNames[randomIndex];
  return randomBackground;
};

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

  const [currentBackground, setCurrentBackground] = useState(
    "https://w0.peakpx.com/wallpaper/986/879/HD-wallpaper-droid-jules-fiction-pulp-pulp-fiction-quentin-tarantino.jpg"
  );

  useEffect(() => {
    const currentQuote = getRandomQuote();
    setCurrentQuote(currentQuote);

    const currentColor = getRandomColor();
    setCurrentColor(currentColor);
  }, []);

  const tweetHref = `http://twitter.com/intent/tweet?hashtags=quotes&hashtags=quentinTarantino&hashtags=pulpFiction&text="${currentQuote.text}" -${currentQuote.author}`;

  const newQuoteClickHandler = () => {
    audio.play();
    setCanPlaySound(true);

    const currentRandomQuote = getRandomQuote();
    const currentRandomColor = getRandomColor();
    const currentRandomBackground = getRandomBackground();
    setCurrentBackground(currentRandomBackground);

    console.log(currentBackground);

    if (
      currentRandomQuote == currentQuote ||
      currentRandomColor == currentColor
    ) {
      return newQuoteClickHandler();
    } else {
      setCurrentQuote(currentRandomQuote);
      setCurrentColor(currentRandomColor);
    }
  };

  const soundButtonClickHandler = () => {
    soundVolume > 0 ? setSoundVolume(0) : setSoundVolume(0.3);
    setSoundEnabled(!soundEnabled);
  };

  return (
    <div className={`App ${currentColor} background-${currentBackground}`}>
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

        <div id="quote-box">
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
                  target="_blank"
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
