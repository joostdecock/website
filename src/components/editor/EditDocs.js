import React from "react";
import TextField from "@material-ui/core/TextField";
import { FormattedMessage } from "react-intl";
const EditDocs = props => {
  return (
    <React.Fragment>
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

export default EditDocs;
