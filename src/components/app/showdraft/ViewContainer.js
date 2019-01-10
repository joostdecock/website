import React from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { setGist } from "../../../store/actions/gist";
import TwoColumns from "../../TwoColumns";
import Column from "../../Column";
import { locLang } from "../../../utils";
import { navigate } from "gatsby";
import Center from "../../Center";
import Spinner from "../../Spinner";
import Button from "@material-ui/core/Button";
import ShareLink from "../../ShareLink";
import { viewDraftFields } from "../../../config/fields";
import FieldDrawers from "../../fields/FieldDrawers";
import Notes from "../../Notes";
import Gist from "../../Gist";

class GistViewContainer extends React.Component {
  state = {
    display: "draft"
  };

  injectFieldValues = () => {
    let fields = viewDraftFields;
    for (let field of Object.keys(fields.info.items)) {
      fields.info.items[field].value = this.props[field];
    }

    return fields;
  };

  draftThis = () => {
    this.setState({ display: "spinner" });
    this.props.setGist(this.props.gist);
    navigate(locLang.set("/draft/from/gist", this.props.language));
  };

  updateDisplay = key => this.setState({ display: key });

  render() {
    let fields = this.injectFieldValues();
    let back = (
      <div className="txt-right mt1">
        <Button
          onClick={() => this.updateDisplay("draft")}
          color="primary"
          variant="outlined"
        >
          <FormattedMessage id="app.back" />
        </Button>
      </div>
    );
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
            <Notes markdown={this.props.notes} noTray />
          ) : (
            ""
          )}
          {this.state.display === "gist" ? (
            <React-Fragment>
              <Gist gist={this.props.gist} />
              {back}
            </React-Fragment>
          ) : (
            ""
          )}
          {this.state.display === "share" ? (
            <React-Fragment>
              <ShareLink
                link={"/gist/" + this.props.handle}
                language={this.props.language}
              />
            </React-Fragment>
          ) : (
            ""
          )}
        </Column>
        <Column narrow right>
          <div className="stick">
            <FieldDrawers
              config={fields}
              display={this.state.display}
              updateDisplay={this.updateDisplay}
              buttons={{
                draft: this.draftThis,
                share: () => this.updateDisplay("share"),
                gist: () => this.updateDisplay("gist")
              }}
            />
          </div>
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
