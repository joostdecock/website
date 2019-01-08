import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setGist } from "../../../store/actions/gist";
import { FormattedMessage, injectIntl } from "react-intl";
import Column from "../../Column";
import TwoColumns from "../../TwoColumns";
import Tray from "../../Tray";
import { locLang } from "../../../utils";
import TextField from "@material-ui/core/TextField";
import DraftIcon from "@material-ui/icons/Gesture";
import Button from "@material-ui/core/Button";

const LoadGist = props => {
  const setGist = evt => {
    evt.preventDefault();
    props.setGist(JSON.parse(evt.target.gist.value));
  };

  return (
    <TwoColumns>
      <Column wide>
        <form onSubmit={setGist}>
          <TextField
            inputProps={{ className: "fixed-width" }}
            id="gist"
            name="gist"
            multiline={true}
            rows="16"
            rowsMax="52"
            fullWidth={true}
            label={props.intl.formatMessage({ id: "app.gist" })}
            margin="normal"
            variant="outlined"
          />
          <div className="txt-right">
            <Button variant="contained" color="primary" type="submit">
              <DraftIcon className="mr05" />
              <FormattedMessage id="app.newDraft" />
            </Button>
          </div>
        </form>
      </Column>
      <Column narrow right>
        <Tray
          className="my1 always-expanded"
          title={<FormattedMessage id="app.whatIsThis" />}
          footer={
            <Button href={locLang.set("/docs/gist", props.language)}>
              <FormattedMessage id="app.docs" />
            </Button>
          }
        >
          <p>
            <FormattedMessage id="app.aboutGist1" />
          </p>
          <p>
            <FormattedMessage id="app.aboutGist2" />
          </p>
        </Tray>
      </Column>
    </TwoColumns>
  );
};

LoadGist.propTypes = {
  user: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  setGist: gist => dispatch(setGist(gist))
});

export default connect(
  null,
  mapDispatchToProps
)(injectIntl(LoadGist));
