import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

const TwitterButton = (props) => {
  return (
    <button className={props.className}>
      <FontAwesomeIcon icon={faTwitter} className="fa-twitter" />
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

export default TwitterButton;
