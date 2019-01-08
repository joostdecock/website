import React from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { setGist } from "../../../store/actions/gist";
import TwoColumns from "../../TwoColumns";
import Column from "../../Column";
import { locLang } from "../../../utils";
import Gist from "../draft/Gist";
import Sidebar from "./Sidebar";
import { navigate } from "gatsby";
import Center from "../../Center";
import Spinner from "../../Spinner";
import Button from "@material-ui/core/Button";
import config from "../../../config/frontend";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

class GistViewContainer extends React.Component {
  state = {
    display: "draft",
    format: this.props.format || "yaml"
  };

  linkToClipboard = () => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(document.getElementById("share"));
    selection.removeAllRanges();
    selection.addRange(range);
    try {
      document.execCommand("copy");
      selection.removeAllRanges();
      this.props.showNotification(
        "success",
        <FormattedMessage id="app.copiedToClipboard" key="message" />
      );
    } catch (e) {
      this.props.showNotification("error", e);
    }
  };

  toggleFormat = () => {
    let format = "yaml";
    if (this.state.format === "yaml") format = "json";
    this.setState({ format });
  };

  draftThis = () => {
    this.setState({ display: "spinner" });
    this.props.setGist(this.props.gist);
    navigate(locLang.set("/draft/from/gist", this.props.language));
  };

  updateDisplay = key => this.setState({ display: key });

  render() {
    return (
      <TwoColumns>
        <Column wide>
          {this.state.display === "spinner" ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            ""
          )}

          {this.state.display === "draft" ? (
            <React-Fragment>
              {this.props.notes ? (
                <div className="notes">
                  <div className="filename">
                    <FormattedMessage id="app.notes" />
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: this.props.notes }} />
                </div>
              ) : (
                ""
              )}
              <div className="toggle-container txt-center">
                <ToggleButtonGroup exlusive onChange={this.toggleFormat}>
                  <ToggleButton
                    className={
                      this.state.format === "json"
                        ? "toggle selected"
                        : "toggle"
                    }
                    value="json"
                    selected={this.state.format === "json" ? true : false}
                  >
                    JSON
                  </ToggleButton>
                  <ToggleButton
                    className={
                      this.state.format === "yaml"
                        ? "toggle selected"
                        : "toggle"
                    }
                    selected={this.state.format === "yaml" ? true : false}
                  >
                    YAML
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              <Gist gist={this.props.gist} format={this.state.format} />
            </React-Fragment>
          ) : (
            ""
          )}
          {this.state.display === "share" ? (
            <React-Fragment>
              <h2>
                <FormattedMessage id="app.share" />
              </h2>
              <div className="gist">
                <div className="gist-header txt-right">
                  <Button color="secondary" onClick={this.linkToClipboard}>
                    <FormattedMessage id="app.copy" />
                  </Button>
                </div>
                <span className="copy-this" id="share">
                  {config.url.substring(0, config.url.length - 1)}
                  {locLang.set(
                    "/gist/" + this.props.handle,
                    this.props.language
                  )}
                </span>
              </div>
              <div className="txt-right mt1">
                <Button
                  onClick={() => this.updateDisplay("draft")}
                  color="primary"
                  variant="outlined"
                >
                  <FormattedMessage id="app.back" />
                </Button>
              </div>
            </React-Fragment>
          ) : (
            ""
          )}
        </Column>
        <Column narrow right>
          <Sidebar
            gist={this.props.gist}
            updateDisplay={this.updateDisplay}
            display={this.state.display}
            draftThis={this.draftThis}
            readOnly={true}
          />
        </Column>
      </TwoColumns>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setGist: gist => dispatch(setGist(gist))
});

export default connect(
  null,
  mapDispatchToProps
)(injectIntl(GistViewContainer));
