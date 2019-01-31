import React from "react";
import { FormattedMessage } from "react-intl";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TopicIcon from "@material-ui/icons/Book";
import ExpandIcon from "@material-ui/icons/KeyboardArrowRight";
import ExpandedIcon from "@material-ui/icons/KeyboardArrowDown";
import { capitalize } from "../utils";
import { navigate } from "gatsby";

const ApiToc = props => {
  const topics = [
    "attributes",
    "part",
    "path",
    "pattern",
    "point",
    "snippet",
    "store",
    "utils"
  ];

  const renderTopic = topic => {
    let nav = (
      <ListItem
        button
        onClick={
          topic === props.topic
            ? null
            : () =>
                navigate("/" + props.language + "/docs/developer/api/" + topic)
        }
        key={topic}
        className={
          topic === props.topic ? "option-header selected" : "option-header"
        }
      >
        <ListItemIcon className="picker-option-icon">
          <TopicIcon color="primary" />
        </ListItemIcon>
        <ListItemText className="picker-option-title">
          {capitalize(topic)}
        </ListItemText>
        <ListItemSecondaryAction>
          {topic === props.topic ? (
            <ExpandedIcon color="primary" />
          ) : (
            <ExpandIcon color="primary" />
          )}
        </ListItemSecondaryAction>
      </ListItem>
    );
    let toc = null;
    if (topic === props.topic) {
      toc = (
        <div className="toc" dangerouslySetInnerHTML={{ __html: props.toc }} />
      );
      return (
        <React.Fragment>
          {nav}
          {toc}
        </React.Fragment>
      );
    }
    return nav;
  };

  return <List component="nav">{topics.map(key => renderTopic(key))}</List>;
};

export default ApiToc;
