import React from "react";
import { connect } from "react-redux";
import ModelReadContainer from "./ReadContainer";
import ModelEditContainer from "./EditContainer";

class ModelContainer extends React.Component {
  render() {
    let handle = this.props.location.split("/").pop();
    let ownModel =
      typeof this.props.models === "undefined"
        ? false
        : typeof this.props.models[handle] === "undefined"
          ? false
          : true;
    if (ownModel) {
      return (
        <ModelEditContainer
          language={this.props.language}
          location={this.props.language}
          data={this.props.data}
          handle={handle}
        />
      );
    } else {
      return (
        <ModelReadContainer
          language={this.props.language}
          location={this.props.language}
          handle={handle}
        />
      );
    }
  }
}

const mapStateToProps = state => ({ models: state.models });

export default connect(mapStateToProps)(ModelContainer);
