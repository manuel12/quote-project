import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faShare } from "@fortawesome/free-solid-svg-icons";

import newQuotes from "./new-quotes.json";

import "./App.css";

function App() {
  const [currentQuote, setCurrentQuote] = useState("");
  const [currentColor, setCurrentColor] = useState("primary");

  const quotes = newQuotes;
  const tweetHref = `http://twitter.com/intent/tweet?text="${currentQuote.text}" -${currentQuote.author}`;

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
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
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    return randomColor;
  };

  useEffect(() => {
    const currentQuote = getRandomQuote();
    setCurrentQuote(currentQuote);

    const currentColor = getRandomColor();
    setCurrentColor(currentColor);
  }, []);

  const newQuoteClickHandler = () => {

    document.body.classList.remove(`bg-${document.body.classList[0]}`);

    const currentQuote = getRandomQuote();
    setCurrentQuote(currentQuote);

    const currentColor = getRandomColor();
    setCurrentColor(currentColor);

  };

  return (
    <div className={`App bg-${currentColor}`}>
      <div className="container">
        <div id="quote-box" className="bg-white">
          <FontAwesomeIcon icon={faQuoteLeft} className="left-quote" />
          <div id="text" className="display-6 text">
            {currentQuote.text}
          </div>
          {/* <FontAwesomeIcon icon={faQuoteRight} className="right-quote"/> */}

          <div id="author" className="author">{`-${currentQuote.author}`}</div>

          <div className="row">
            <div className="col-md-6">
              <button className={`tweet-quote btn btn-${currentColor}`}>
                <FontAwesomeIcon icon={faShare} />
                <a id="tweet-quote" href={tweetHref} target="_top" className="text-light">
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
