import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";

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

export default TwitterButton;
