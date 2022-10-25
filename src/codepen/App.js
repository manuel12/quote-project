import React from 'react';
import "./App.css";

const backgrounds = [
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
  },
];
const colors = [
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
const quotes = [
  {
    text: "That’s when you know you’ve found somebody special. When you can just shut the fuck up for a minute and comfortably enjoy the silence.",
    author: "Mia",
  },
  {
    text: "They don’t call it a Quarter Pounder with cheese?",
    author: "Jules",
  },
  {
    text: "Zed’s dead, baby. Zed’s dead.",
    author: "Butch",
  },
  {
    text: "The way your dad looked at it, this watch was your birthright.",
    author: "Captain Koons",
  },
  {
    text: "Don’t you just love it when you come back from the bathroom and find your food waiting for you?",
    author: "Mia",
  },
  {
    text: "You don’t have to tell me how good my coffee is, OK? I’m the one who buys it; I know how good it is.",
    author: "Jimmie",
  },
  {
    text: "I-I gotta stab her three times?",
    author: "Vincent",
  },
  {
    text: "You ever read the Bible, Brett?",
    author: "Jules",
  },

  {
    text: "Oh man, I shot Marvin in the face.",
    author: "Vincent",
  },
  {
    text: "I want you to go in that bag, and find my wallet. … It’s the one that says Bad Motherfucker.",
    author: "Jules",
  },
  {
    text: "Any of you fucking pricks move, and I'll execute every motherfucking last one of ya!",
    author: "Honey Bunny",
  },

  {
    text: "The night of the fight, you may feel a slight sting. That's pride fucking with you. Fuck pride. Pride only hurts, it never helps.",
    author: "Marsellus",
  },
  {
    text: "Bring out the Gimp.",
    author: "Zed",
  },
  {
    text: "You hear me talkin', hillbilly boy? I ain't through with you by a damn sight. I'ma get medieval on your ass.",
    author: "Marsellus",
  },
];

const colorsNames = colors.map((color) => color.name);
const backgroundNames = backgrounds.map((background) => background.name);
const getRandomNumber = (upperLimit) => Math.floor(Math.random() * upperLimit);

const getRandomElementFromArr = (array) => {
  const randomIndex = getRandomNumber(array.length);
  const randomElement = array[randomIndex];
  return randomElement;
};

const faQuoteLeft = "fas fa-quote-left";
const faShare = "fab fa-twitter";

const faVolumeHigh = "fas fa-volume-up";
const faVolumeOff = "fas fa-volume-off";

const FontAwesomeIcon = (props) => {
  return <i className={`${props.icon} ${props.className}`}></i>;
};

const Button = (props) => {
  return (
    <button id={props.id} className={props.className} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

const TwitterButton = (props) => {
  return (
    <button className={props.className}>
      <FontAwesomeIcon icon={faShare} />
      <a
        id="tweet-quote"
        href={props.tweetHref}
        target="_blank"
        className="text-light"
      >
        {props.text}
      </a>
    </button>
  );
};

const QuoteBox = (props) => {
  const tweetHref = `
  http://twitter.com/intent/tweet?
  hashtags=quotes&
  hashtags=quentinTarantino
  &hashtags=pulpFiction&
  text="${props.currentQuote.text}" -${props.currentQuote.author}`;

  return (
    <div id="quote-box">
      <FontAwesomeIcon icon={faQuoteLeft} className="left-quote" />
      <div id="text" className="display-6 quote-text">
        {props.currentQuote.text}
      </div>
      <div
        id="author"
        className="quote-author"
      >{`-${props.currentQuote.author}`}</div>
      <div className="row">
        <div className="col-md-6">
          <TwitterButton
            className={`tweet-quote btn ${props.currentColor}`}
            tweetHref={tweetHref}
            text="Tweet quote!"
          />
        </div>
        <div className="col-md-6">
          <Button
            className={`new-quote btn ${props.currentColor} text-light`}
            id="new-quote"
            onClick={props.newQuoteClickHandler}
            text="Get a new quote!"
          />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [canPlaySound, setCanPlaySound] = React.useState(false);
  const [soundVolume, setSoundVolume] = React.useState(0.3);
  const [audioLoop] = React.useState(true);

  const [audio] = React.useState(
    new Audio(
      "https://ia600900.us.archive.org/12/items/tvtunes_7001/Pulp%20Fiction.mp3"
    )
  );
  audio.volume = soundVolume;
  audio.loop = audioLoop;

  const [currentQuote, setCurrentQuote] = React.useState({
    text: "",
    author: "",
  });
  const [currentColor, setCurrentColor] = React.useState("primary");
  const [currentBackground, setCurrentBackground] = React.useState(null);

  React.useEffect(() => {
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

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
