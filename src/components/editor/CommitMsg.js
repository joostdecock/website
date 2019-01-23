import React from "react";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { FormattedMessage } from "react-intl";
import AnonIcon from "@material-ui/icons/Face";

const CommitMsg = props => {
  return (
    <React.Fragment>
      <TextField
        fullWidth={true}
        multiline={true}
        rows={8}
        rowsMax={18}
        value={props.msg}
        name="msg"
        variant="outlined"
        label={props.intl.formatMessage({ id: "editor.commitMessage" })}
        classes={{ root: "mb1" }}
        onChange={props.handleUpdate}
      />
      <List component="nav">
        <ListItem button name="attribution" onClick={props.toggleAttribution}>
          <ListItemIcon>
            {props.attribution ? (
              <Avatar src={props.avatar} />
            ) : (
              <AnonIcon
                color="primary"
                fontSize="inherit"
                style={{ fontSize: "40px" }}
              />
            )}
          </ListItemIcon>
          <ListItemText>
            <div className="keyval">
              <span className="key">
                <FormattedMessage id="editor.attributeTheseChangesTo" />
                {": "}
                {props.email}
              </span>
              <span className="val">
                <FormattedMessage
                  id={
                    props.attribution
                      ? "editor.commitAttributionMsg"
                      : "editor.commitAnonMsg"
                  }
                />
                <sup>(*)</sup>
              </span>
            </div>
          </ListItemText>
          <ListItemSecondaryAction>
            <Switch
              className="switch-success"
              color="primary"
              onClick={props.toggleAttribution}
              checked={props.attribution}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <p className="txt-center">
        <small>
          (*) <FormattedMessage id="editor.githubCommitMatchingMsg" />
        </small>
      </p>
    </React.Fragment>
  );
};

export default CommitMsg;
