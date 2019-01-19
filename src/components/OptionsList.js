import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { locLang } from "../utils";
import { Link } from "gatsby";
import { injectIntl } from "react-intl";
import { patternInfo } from "@freesewing/patterns";

const OptionsList = props => {
  // Sort options regardless of language
  const options = {};
  if (typeof patternInfo[props.pattern] === "undefined") return null;
  for (let o of patternInfo[props.pattern].options) {
    let label = props.intl.formatMessage({
      id: "options." + props.pattern + "." + o + ".title"
    });
    options[label] = o;
  }
  return (
    <ol>
      {Object.keys(options)
        .sort()
        .map((label, index) => {
          let option = options[label];
          return (
            <li key={option}>
              <Link
                to={locLang.set(
                  "/docs/patterns/" +
                    props.pattern +
                    "/options/" +
                    option.toLowerCase(),
                  props.language
                )}
              >
                {label}
              </Link>
              <br />
              <small>
                <FormattedMessage
                  id={
                    "options." + props.pattern + "." + option + ".description"
                  }
                />
              </small>
            </li>
          );
        })}
    </ol>
  );
};

OptionsList.propTypes = {
  pattern: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired
};

export default injectIntl(OptionsList);
