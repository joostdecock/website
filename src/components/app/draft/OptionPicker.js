import React from "react";
import PropTypes from "prop-types";
import { capitalize, locLang } from "../../../utils";
import { FormattedMessage, injectIntl } from "react-intl";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SelectIcon from "@material-ui/icons/KeyboardArrowRight";

const PatternPicker = props => {
  return (
    <div>
      <List component="nav">
        {props.patterns.map((pattern, index) => {
          return (
            <ListItem
              button
              component="a"
              href={locLang.set("/draft/" + pattern, props.language)}
            >
              <ListItemIcon>
                <SelectIcon />
              </ListItemIcon>
              <ListItemText>
                <div className="keyval">
                  <span className="key">{capitalize(pattern)}</span>
                  <span className="val">
                    {
                      <FormattedMessage
                        id="app.draftPattern"
                        values={{ pattern: capitalize(pattern) }}
                      />
                    }
                  </span>
                </div>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

PatternPicker.propTypes = {
  patterns: PropTypes.array.isRequired
};

export default injectIntl(PatternPicker);
