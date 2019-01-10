import React from "react";
import Drawer from "../Drawer";
import FieldList from "./FieldList";
import { FormattedMessage, injectIntl } from "react-intl";

class FieldDrawers extends React.Component {
  state = {
    expanded: ""
  };

  componentDidMount() {
    for (let key of Object.keys(this.props.config)) {
      if (this.props.config[key].expanded) this.setState({ expanded: key });
    }
  }

  toggleDrawer = drawer => {
    if (this.state.expanded === drawer) drawer = "";
    this.setState({ expanded: drawer });
  };

  render() {
    return (
      <React-Fragment>
        {Object.keys(this.props.config).map(key => {
          let conf = this.props.config[key];
          return (
            <Drawer
              key={key}
              icon={conf.icon}
              title={<FormattedMessage id={conf.title} />}
              toggleOpen={() => this.toggleDrawer(key)}
              open={this.state.expanded === key ? true : false}
            >
              <div className="overpad2-always">
                <FieldList
                  drawer={key}
                  items={conf.items}
                  intl={this.props.intl}
                  units={this.props.units}
                  display={this.props.display}
                  updateDisplay={this.props.updateDisplay}
                  buttons={this.props.buttons}
                />
              </div>
            </Drawer>
          );
        })}
      </React-Fragment>
    );
  }
}

FieldDrawers.propTypes = {};

export default injectIntl(FieldDrawers);
