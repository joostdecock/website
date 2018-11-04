import React from "react";
import { Location } from "@reach/router";
import { locLang } from "../utils";

function withLocation(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <Location>
          {props => {
            let path = props.location.pathname;
            return (
              <WrappedComponent
                {...this.props}
                language={locLang.get(path)}
                location={path}
              />
            );
          }}
        </Location>
      );
    }
  };
}

export default withLocation;
