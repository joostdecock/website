import React from "react";
import InfoIcon from "@material-ui/icons/Info";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SelectedIcon from "@material-ui/icons/Star";
import StarIcon from "@material-ui/icons/StarBorder";
import { patternList } from "@freesewing/patterns";
import { capitalize } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { navigate } from "gatsby";

class PatternPicker extends React.Component {
  state = {
    extraClasses: "unforced"
  };

  handleCollapse = event => {
    this.setState({ extraClasses: "force-collapsed" });
  };

  handleExpand = event => {
    this.setState({ extraClasses: "force-expanded" });
  };

  setPattern = pattern => {
    this.props.updatePattern(pattern);
    this.setState({ extraClasses: "force-collapsed" });
  };

  render() {
    return (
      <div className="overpad2-always">
        <List component="nav">
          {patternList.map((pattern, index) => {
            return (
              <ListItem
                key={pattern}
                button
                onClick={() =>
                  navigate("/" + this.props.language + "/demo/" + pattern)
                }
                className={
                  this.props.selected === pattern
                    ? "option-header selected"
                    : "option-header"
                }
              >
                <ListItemIcon>
                  {this.props.selected === pattern ? (
                    <SelectedIcon className="color-success" />
                  ) : (
                    <StarIcon />
                  )}
                </ListItemIcon>
                <ListItemText>
                  <div className="keyval">
                    <span className="key">{capitalize(pattern)}</span>
                    <span className="val">
                      {
                        <FormattedMessage
                          id={"patterns." + pattern + ".description"}
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
  }
}

PatternPicker.defaultProps = {
  icon: <InfoIcon />,
  footer: "",
  title: ""
};

export default PatternPicker;
