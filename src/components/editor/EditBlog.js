import React from "react";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import categories from "../../config/blogcategories";
import { FormattedMessage } from "react-intl";

const EditBlogpost = props => {
  return (
    <React.Fragment>
      <h6 className="label">
        <FormattedMessage id="editor.category" />
      </h6>
      {categories.map(category => (
        <FormControlLabel
          control={
            <Radio
              checked={props.category === category ? true : false}
              onChange={props.handleUpdate}
              name="category"
              value={category}
              color="primary"
            />
          }
          label={"#" + category}
          key={category}
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
        <FormattedMessage id="editor.linkTitle" />
      </h6>
      <TextField
        fullWidth={true}
        value={props.linktitle}
        name="linktitle"
        variant="outlined"
        label={props.intl.formatMessage({ id: "editor.linkTitle" })}
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
        <FormattedMessage id="editor.blurb" />
      </h6>
      <TextField
        fullWidth={true}
        multiline={true}
        rows={5}
        value={props.blurb}
        name="blurb"
        variant="outlined"
        classes={{ root: "mb1" }}
        label={props.intl.formatMessage({ id: "editor.blurb" })}
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

export default EditBlogpost;
