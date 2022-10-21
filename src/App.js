import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeOff } from "@fortawesome/free-solid-svg-icons";

import quotes from "./data/quotes.json";
import colors from "./data/colors.json";
import backgrounds from "./data/backgrounds.json";

import QuoteBox from "./components/QuoteBox";

import "./App.css";

const colorsNames = colors.map((color) => color.name);
const backgroundNames = backgrounds.map((background) => background.name);
const getRandomNumber = (upperLimit) => Math.floor(Math.random() * upperLimit);

const getRandomElementFromArr = (array) => {
  const randomIndex = getRandomNumber(array.length);
  const randomElement = array[randomIndex];
  return randomElement;
};

const App = () => {
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
  const [currentBackground, setCurrentBackground] = useState(null);

  useEffect(() => {
    const currentQuote = getRandomElementFromArr(quotes);
    setCurrentQuote(currentQuote);

    const currentColor = getRandomElementFromArr(colorsNames);
    setCurrentColor(currentColor);
  }, []);

  const newQuoteClickHandler = () => {
    audio.play();
    setCanPlaySound(true);

    const currentRandomQuote = getRandomElementFromArr(quotes);
    const currentRandomColor = getRandomElementFromArr(colorsNames);
    const currentRandomBackground = getRandomElementFromArr(backgroundNames);

    if (
      currentRandomQuote == currentQuote ||
      currentRandomColor == currentColor ||
      currentRandomBackground == currentBackground
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
        <QuoteBox
          currentQuote={currentQuote}
          currentColor={currentColor}
          newQuoteClickHandler={newQuoteClickHandler}
        />
      </div>
    </div>
  );
};

export default App;
