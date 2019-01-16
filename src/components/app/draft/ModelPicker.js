import React from "react";
import PropTypes from "prop-types";
import { capitalize, locLang } from "../../../utils";
import { FormattedMessage } from "react-intl";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SelectIcon from "@material-ui/icons/KeyboardArrowRight";
import WarningIcon from "@material-ui/icons/Notifications";
import Tray from "../../Tray";
import { Link } from "gatsby";

const ModelPicker = props => {
  return (
    <div>
      <List component="nav">
        {Object.keys(props.models.valid).map((handle, index) => {
          return (
            <ListItem
              button
              component="a"
              href={locLang.set(
                "/draft/" + props.pattern + "/for/" + handle,
                props.language
              )}
              key={handle}
            >
              <ListItemIcon>
                <SelectIcon />
              </ListItemIcon>
              <ListItemText>
                <div className="keyval">
                  <span className="key">
                    {capitalize(props.models.valid[handle])}
                  </span>
                  <span className="val">
                    {
                      <FormattedMessage
                        id="app.draftPatternForModel"
                        values={{
                          pattern: capitalize(props.pattern),
                          model: props.models.valid[handle]
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
      {Object.keys(props.models.invalid).length > 0 ? (
        <div className="px1">
          <Tray
            className="load-collapsed"
            title={
              <FormattedMessage
                id="app.countModelsLackingForPattern"
                values={{
                  count: Object.keys(props.models.invalid).length,
                  pattern: capitalize(props.pattern)
                }}
              />
            }
            icon={<WarningIcon />}
          >
            <ul>
              {Object.keys(props.models.invalid).map((model, index) => {
                let thisModel = props.models.invalid[model];
                return (
                  <li key={index}>
                    <Link to={locLang.set("/models/" + model, props.language)}>
                      {thisModel}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Tray>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

ModelPicker.propTypes = {
  models: PropTypes.object.isRequired
};

export default ModelPicker;
