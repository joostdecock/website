import React from "react";
import { FormattedMessage } from "react-intl";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Collapse from "@material-ui/core/Collapse";
import ItemButtons from "./ItemButtons";
import FieldDisplayValue from "./FieldDisplayValue";

class FieldList extends React.Component {
  state = {
    expanded: ""
  };

  componentDidMount() {
    for (let key of Object.keys(this.props.items)) {
      if (this.props.items[key].expanded) this.setState({ expanded: key });
    }
  }

  toggleItem = item => {
    if (this.state.expanded === item) item = "";
    this.setState({ expanded: item });
    this.props.updateDisplay(null);
  };

  translatedKeys = () => {
    const items = {};
    for (let item of Object.keys(this.props.items)) {
      let label = this.props.intl.formatMessage({
        id: this.props.items[item].label
      });
      items[label] = item;
    }
    const order = Object.keys(items);
    order.sort();
    let sortedItems = [];
    for (let key of order) sortedItems.push(items[key]);

    return sortedItems;
  };

  render() {
    let items = [];
    for (let key of this.translatedKeys()) {
      let conf = this.props.items[key];
      let passBack = {
        drawer: this.props.drawer,
        config: conf,
        item: key,
        intl: this.props.intl
      };
      items.push(
        <ListItem
          key={key}
          button={conf.readOnly ? false : true}
          onClick={
            conf.readOnly
              ? () => {}
              : conf.type === "button"
                ? this.props.buttons[key]
                : () => this.toggleItem(key)
          }
        >
          <ListItemIcon
            className={"field-item-icon" + (conf.readOnly ? " read-only" : "")}
          >
            {conf.icon}
          </ListItemIcon>
          <ListItemText inset>
            <p
              className={
                "field-item-title" + (conf.readOnly ? "read-only" : "")
              }
            >
              <FormattedMessage id={conf.label} />
            </p>
          </ListItemText>
          <ListItemSecondaryAction>
            <FieldDisplayValue
              value={conf.value}
              type={conf.type}
              units={this.props.units}
              config={conf}
            />
          </ListItemSecondaryAction>
        </ListItem>
      );
      items.push(
        <Collapse
          in={this.state.expanded === key ? true : false}
          timeout="auto"
          unmountOnExit
          key={"sub-" + key}
        >
          <ItemButtons
            display={this.props.display}
            key={key}
            passBack={passBack}
            updateDisplay={this.props.updateDisplay}
          />
        </Collapse>
      );
    }

    return <List component="nav">{items}</List>;
  }
}

FieldList.propTypes = {};

export default FieldList;
