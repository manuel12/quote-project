import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

import Button from "./Button";
import TwitterButton from "./TwitterButton";

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

export default QuoteBox;
