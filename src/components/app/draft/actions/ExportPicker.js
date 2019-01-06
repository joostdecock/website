import React from "react";
import { FormattedMessage } from "react-intl";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SelectIcon from "@material-ui/icons/KeyboardArrowRight";
import CollapseIcon from "@material-ui/icons/KeyboardArrowDown";
import Collapse from "@material-ui/core/Collapse";
import CodeIcon from "@material-ui/icons/Code";
import FileIcon from "@material-ui/icons/Note";
import TileIcon from "@material-ui/icons/ViewModule";

class ExportPicker extends React.Component {
  state = {
    expanded: "",
    error: false
  };

  toggleGroup(key) {
    this.setState({ expanded: key });
  }

  render() {
    const level1 = ["exportGist", "exportDraft", "exportTiledPDF"];
    const level2 = {
      exportGist: ["json", "yaml"],
      exportDraft: ["SVG", "PDF"],
      exportTiledPDF: ["A4", "Letter", "A3", "Tabloid", "A2", "A1", "A0"]
    };
    return (
      <React.Fragment>
        {level1.map(key => {
          let sub = level2[key].map(subkey => {
            if (key === "exportGist")
              return (
                <ListItem
                  key={subkey}
                  button
                  onClick={() => this.props.exportGist(subkey)}
                >
                  <ListItemIcon>
                    <CodeIcon className="color-link" />
                  </ListItemIcon>
                  <ListItemText className="info">
                    {subkey.toUpperCase()}
                  </ListItemText>
                </ListItem>
              );
            else
              return (
                <ListItem
                  key={subkey}
                  button
                  onClick={() => this.props.exportDraft(subkey)}
                >
                  <ListItemIcon>
                    {key === "exportDraft" ? (
                      <FileIcon className="color-link" />
                    ) : (
                      <TileIcon
                        className={
                          subkey.substring(0, 1) === "A"
                            ? "color-link"
                            : "color-warning"
                        }
                      />
                    )}
                  </ListItemIcon>
                  <ListItemText>{subkey}</ListItemText>
                </ListItem>
              );
          });
          return (
            <React.Fragment>
              <ListItem key={key} button onClick={() => this.toggleGroup(key)}>
                <ListItemIcon>
                  {this.state.expanded === key ? (
                    <CollapseIcon />
                  ) : (
                    <SelectIcon />
                  )}
                </ListItemIcon>
                <ListItemText>
                  <FormattedMessage id={"app." + key} />
                </ListItemText>
              </ListItem>
              <Collapse
                in={this.state.expanded === key ? true : false}
                timeout="auto"
                unmountOnExit
                key={"col-" + key}
              >
                {sub}
              </Collapse>
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  }
}

ExportPicker.propTypes = {};

export default ExportPicker;
