import React from "react";
import PropTypes from "prop-types";
import { capitalize, locLang } from "../../../utils";
import { FormattedMessage } from "react-intl";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SelectIcon from "@material-ui/icons/KeyboardArrowRight";

const ModelPicker = props => {
  return (
    <div>
      <List component="nav">
        {Object.keys(props.models).map((handle, index) => {
          return (
            <ListItem
              button
              component="a"
              href={locLang.set(
                "/draft/" + props.pattern + "/for/" + handle,
                props.language
              )}
            >
              <ListItemIcon>
                <SelectIcon />
              </ListItemIcon>
              <ListItemText>
                <div className="keyval">
                  <span className="key">
                    {capitalize(props.models[handle])}
                  </span>
                  <span className="val">
                    {
                      <FormattedMessage
                        id="app.draftPatternForModel"
                        values={{
                          pattern: capitalize(props.pattern),
                          model: props.models[handle]
                        }}
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

ModelPicker.propTypes = {
  models: PropTypes.array.isRequired
};

export default ModelPicker;
