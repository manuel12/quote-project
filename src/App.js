import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteLeft,
  faQuoteRight,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  const quotes = [
    {
      text: "Genius is one percent inspiration and ninety-nine percent perspiration.",
      author: "Thomas Edison",
    },
    {
      text: "You can observe a lot just by watching.",
      author: "Yogi Berra",
    },
    {
      text: "A house divided against itself cannot stand.",
      author: "Abraham Lincoln",
    },
    {
      text: "Difficulties increase the nearer we get to the goal.",
      author: "Johann Wolfgang von Goethe",
    },
    {
      text: "Fate is in your hands and no one elses",
      author: "Byron Pulsifer",
    },
    {
      text: "Be the chief but never the lord.",
      author: "Lao Tzu",
    },
    {
      text: "Nothing happens unless first we dream.",
      author: "Carl Sandburg",
    },
    {
      text: "Well begun is half done.",
      author: "Aristotle",
    },
    {
      text: "Life is a learning experience, only if you learn.",
      author: "Yogi Berra",
    },
    {
      text: "Self-complacency is fatal to progress.",
      author: "Margaret Sangster",
    },
    {
      text: "Peace comes from within. Do not seek it without.",
      author: "Buddha",
    },
    {
      text: "What you give is what you get.",
      author: "Byron Pulsifer",
    },
    {
      text: "We can only learn to love by loving.",
      author: "Iris Murdoch",
    },
    {
      text: "Life is change. Growth is optional. Choose wisely.",
      author: "Karen Clark",
    },
    {
      text: "You'll see it when you believe it.",
      author: "Wayne Dyer",
    },
    {
      text: "Today is the tomorrow we worried about yesterday.",
      author: "Unknown",
    },
    {
      text: "It's easier to see the mistakes on someone else's paper.",
      author: "Unknown",
    },
    {
      text: "Every man dies. Not every man really lives.",
      author: "Unknown",
    },
    {
      text: "To lead people walk behind them.",
      author: "Lao Tzu",
    },
    {
      text: "Having nothing, nothing can he lose.",
      author: "William Shakespeare",
    },
  ];

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    console.log(`randomIndex: ${randomIndex}`)
    const randomQuote = quotes[randomIndex];
    return randomQuote;
  };

  const [currentQuote, setCurrentQuote] = useState("");
  const tweetHref = `http://twitter.com/intent/tweet?text="${currentQuote.text}" -${currentQuote.author}`;

  useEffect(() => {
    const currentQuote = getRandomQuote()
    setCurrentQuote(currentQuote);
  }, []);

  const newQuoteClickHandler = () => {
    const currentQuote = getRandomQuote();
    setCurrentQuote(currentQuote);
  };

  return (
    <div className="App">
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
              <button className="btn btn-primary">
                <FontAwesomeIcon icon={faShare} />
                <a id="tweet-quote" href={tweetHref} target="_top">
                  Tweet quote!
                </a>
              </button>
            </div>
            <div className="col-md-6">
              <button
                className="btn btn-primary"
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
