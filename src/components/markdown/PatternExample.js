import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CodeIcon from "@material-ui/icons/Code";
import SvgIcon from "@material-ui/icons/Gesture";
import Toolbar from "@material-ui/core/Toolbar";
import { capitalize } from "../../utils";
import models from "@freesewing/models";
import DraftPreview from "../app/draft/DraftPreview";

class PatternExample extends React.Component {
  state = {
    code: false
  };

  toggleCode = () => {
    this.setState(state => {
      return {
        code: !state.code
      };
    });
  };

  getContainerStyle = () => {
    return {
      margin: "0.5rem 0 1rem 0",
      padding: 0,
      borderRadius: "4px"
    };
  };

  getCodeWrapperStyle = () => {
    return {
      marginTop: "-0.5rem",
      backgroundColor: "#1d1f21"
    };
  };

  getGist = () => {
    let gist = {
      pattern: this.props.pattern,
      settings: {
        embed: true,
        measurements: models.manSize38
      }
    };
    if (this.props.layout === "false") gist.settings.layout = "false";
    if (typeof this.props.settings !== undefined) {
      let propsSettings = {};
      try {
        propsSettings = JSON.parse(this.props.settings);
      } catch (err) {}
      gist.settings = {
        ...gist.settings,
        ...propsSettings
      };
    }
    return gist;
  };

  render() {
    return (
      <div style={this.getContainerStyle()} className="border">
        <div className="bg-header">
          <Toolbar disableGutters={true} variant="dense">
            <span className="ml1">{capitalize(this.props.pattern)}</span>
            <div style={{ flexGrow: 1 }} />
            <IconButton
              color="primary"
              className="mr05 outline-none"
              onClick={this.toggleCode}
            >
              {this.state.code ? <SvgIcon /> : <CodeIcon />}
            </IconButton>
          </Toolbar>
        </div>
        {this.state.code ? (
          <div style={this.getCodeWrapperStyle()}>{this.props.children}</div>
        ) : (
          <DraftPreview
            gist={this.getGist()}
            action={this.props.action ? this.props.action : "draft"}
            option={this.props.option ? this.props.option : false}
            measurement={
              this.props.measurement ? this.props.measurement : false
            }
            models={models}
            focus={this.props.focus}
          />
        )}
      </div>
    );
  }
}

export default PatternExample;
