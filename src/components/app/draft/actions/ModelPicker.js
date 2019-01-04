import React from "react";
import PropTypes from "prop-types";
import { capitalize, locLang } from "../../../../utils";
import { FormattedMessage } from "react-intl";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ModelIcon from "@material-ui/icons/Person";
import StarIcon from "@material-ui/icons/Star";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Notifications";
import Tray from "../../../Tray";
import { Link } from "gatsby";

const ModelPicker = props => {
  return (
    <div>
      {Object.keys(props.models.valid).map((handle, index) => {
        if (props.model === handle)
          return (
            <ListItem key={handle} className="option-header selected">
              <ListItemIcon>
                <StarIcon className="indent2 color-success" />
              </ListItemIcon>
              <ListItemText>
                {capitalize(props.models.valid[handle])}
              </ListItemText>
            </ListItem>
          );
        else
          return (
            <ListItem
              button
              component="a"
              href={locLang.set(
                "/draft/" + props.pattern + "/for/" + handle,
                props.language
              )}
              key={handle}
              className="list-info"
            >
              <ListItemIcon>
                <ModelIcon className="indent2" />
              </ListItemIcon>
              <ListItemText className="info">
                {capitalize(props.models.valid[handle])}
              </ListItemText>
            </ListItem>
          );
      })}
      {Object.keys(props.models.invalid).length > 0 ? (
        <ListItem
          button
          component="a"
          href={locLang.set("/draft/" + props.pattern, props.language)}
          className="list-info"
        >
          <ListItemIcon>
            <InfoIcon className="indent2 color-warning" />
          </ListItemIcon>
          <ListItemText className="info">
            <FormattedMessage
              id="app.countModelsLackingForPattern"
              values={{
                count: Object.keys(props.models.invalid).length,
                pattern: capitalize(props.pattern)
              }}
            />
          </ListItemText>
        </ListItem>
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
