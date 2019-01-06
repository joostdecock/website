import React from "react";
import PropTypes from "prop-types";
import { capitalize, locLang } from "../../../../utils";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PatternIcon from "@material-ui/icons/InsertDriveFile";
import StarIcon from "@material-ui/icons/Star";
import { patternList } from "@freesewing/patterns";

const PatternPicker = props => {
  return (
    <div>
      {patternList.map(handle => {
        if (props.pattern === handle)
          return (
            <ListItem key={handle} className="option-header selected">
              <ListItemIcon>
                <StarIcon className="indent2 color-success" />
              </ListItemIcon>
              <ListItemText>{capitalize(handle)}</ListItemText>
            </ListItem>
          );
        else
          return (
            <ListItem
              button
              component="a"
              href={locLang.set("/draft/" + handle, props.language)}
              key={handle}
              className="list-info"
            >
              <ListItemIcon>
                <PatternIcon className="indent2" />
              </ListItemIcon>
              <ListItemText className="info">{capitalize(handle)}</ListItemText>
            </ListItem>
          );
      })}
    </div>
  );
};

PatternPicker.propTypes = {
  pattern: PropTypes.string.isRequired
};

export default PatternPicker;
