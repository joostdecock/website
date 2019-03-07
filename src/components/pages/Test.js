import React from "react";
import BaseLayout from "../layouts/Base";
import Center from "../Center";
import Spinner from "../Spinner";
import backend from "../../apis/backend";

class Test extends React.Component {
  handleClick = () => {
    backend
      .getStars()
      .then(res => {
        if (res.status === 200) {
          console.log("res", res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <BaseLayout>
        <Center>
          <button onClick={this.handleClick}>test</button>
          <Spinner size={250} />
        </Center>
      </BaseLayout>
    );
  }
}

export default Test;
