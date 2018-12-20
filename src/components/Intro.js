import React from "react";
import Logo from "./Logo";
import { FormattedMessage } from "react-intl";
import { Link } from "gatsby";
import { locLang } from "../utils";

const Intro = props => {
  let terms = [
    "free",
    "openSource",
    "madeToMeasure",
    "customizable",
    "digital",
    "shareable",
    "indie",
    "hackable",
    "badass",
    "ethical"
  ];
  let reverse = false;
  if (props.language === "es" || props.language === "fr") reverse = true;
  return (
    <div className="intro-wrapper">
      <div className="logo">
        <Logo embed={true} />
      </div>
      <div className="headline">
        {reverse ? (
          <div className="tail">
            <FormattedMessage id="intro.sewingPatterns" />
          </div>
        ) : (
          ""
        )}
        <div className="swap">
          <div className="list">
            {terms.map((term, index) => (
              <span key={term}>
                <FormattedMessage id={"intro." + term} />
              </span>
            ))}
          </div>
        </div>
        {reverse ? (
          ""
        ) : (
          <div className="tail">
            <FormattedMessage id="intro.sewingPatterns" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Intro;
