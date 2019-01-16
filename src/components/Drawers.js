import React from "react";
import Drawer from "./Drawer";
import { FormattedMessage } from "react-intl";

class Drawers extends React.Component {
  state = {
    expanded: ""
  };

  componentDidMount() {
    for (let key of Object.keys(this.props.drawers)) {
      if (this.props.drawers[key].expanded) this.setState({ expanded: key });
    }
  }

  toggleDrawer = drawer => {
    if (this.state.expanded === drawer) drawer = "";
    this.setState({ expanded: drawer });
  };

  render() {
    return (
      <React.Fragment>
        {Object.keys(this.props.drawers).map(key => {
          let conf = this.props.drawers[key].config;
          return (
            <Drawer
              key={key}
              icon={conf.icon}
              title={<FormattedMessage id={conf.title} />}
              toggleOpen={() => this.toggleDrawer(key)}
              open={this.state.expanded === key ? true : false}
            >
              {this.props.drawers[key].content}
            </Drawer>
          );
        })}
      </React.Fragment>
    );
  }
}

export default Drawers;
