import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { patternList } from "@freesewing/patterns";
import Checkbox from "@material-ui/core/Checkbox";
import { FormattedMessage } from "react-intl";
import { capitalize } from "../../utils";

const EditShowcase = props => {
  return (
    <React.Fragment>
      <h6 className="label">
        <FormattedMessage id="app.patterns" />
      </h6>
      {patternList.map(pattern => (
        <FormControlLabel
          control={
            <Checkbox
              checked={props.patterns[pattern] === true ? true : false}
              onChange={props.handleUpdate}
              name="patterns"
              data-field="patterns"
              value={pattern}
              color="primary"
            />
          }
          label={capitalize(pattern)}
          key={pattern}
        />
      ))}
      <h6 className="label">
        <FormattedMessage id="editor.title" />
      </h6>
      <TextField
        fullWidth={true}
        value={props.title}
        name="title"
        variant="outlined"
        label={props.intl.formatMessage({ id: "editor.title" })}
        classes={{ root: "mb1" }}
        onChange={props.handleUpdate}
      />
      <h6 className="label">
        <FormattedMessage id="editor.caption" />
      </h6>
      <TextField
        fullWidth={true}
        value={props.caption}
        name="caption"
        variant="outlined"
        label={props.intl.formatMessage({ id: "editor.caption" })}
        classes={{ root: "mb1" }}
        onChange={props.handleUpdate}
      />
      <h6 className="label">
        <FormattedMessage id="editor.body" />
      </h6>
      <TextField
        fullWidth={true}
        multiline={true}
        value={props.body}
        name="body"
        variant="outlined"
        label={props.intl.formatMessage({ id: "editor.body" })}
        onChange={props.handleUpdate}
      />
    </React.Fragment>
  );
};

export default EditShowcase;
