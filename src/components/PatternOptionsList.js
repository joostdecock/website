import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { locLang } from "../utils";
import { Link } from "gatsby";
import { injectIntl } from "react-intl";

const PatternOptionsList = props => {
  // Sort measurements regardless of language
  const options = {};
  for (let o of props.options) {
    let label = props.intl.formatMessage({ id: "options." + o + ".title" });
    options[label] = o;
  }
  return (
    <ul>
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
                <FormattedMessage
                  id={"options." + props.pattern + "." + option + ".title"}
                />
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

PatternOptionsList.propTypes = {
  options: PropTypes.array.isRequired,
  language: PropTypes.string.isRequired,
  pattern: PropTypes.string.isRequired
};

export default injectIntl(PatternOptionsList);
