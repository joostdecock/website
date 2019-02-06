import React from "react";
import BaseLayout from "../layouts/Base";
import NotFound from "../NotFound";
import Center from "../Center";
import Spinner from "../Spinner";
import Breadcrumbs from "../Breadcrumbs";
import { FormattedMessage } from "react-intl";
import GistContainer from "../app/showdraft/ViewContainer";
import backend from "../../apis/backend";

class Gist extends React.Component {
  state = {
    loading: true,
    error: false,
    gist: false,
    name: "",
    handle: ""
  };

  componentDidMount() {
    let handle = this.props.location.pathname.split("/").pop();
    backend
      .loadGist(handle)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            ...res.data,
            loading: false
          });
        } else this.setState({ loading: false, error: true });
      })
      .catch(error => {
        console.log(error);
        this.props.showNotification("error", error);
        this.setState({ loading: false, error });
      });
  }

  render() {
    if (this.state.loading)
      return (
        <BaseLayout>
          <Center>
            <Spinner />
          </Center>
        </BaseLayout>
      );
    else if (this.state.error)
      return (
        <BaseLayout>
          <NotFound />
        </BaseLayout>
      );
    else
      return (
        <BaseLayout>
          <Breadcrumbs via={[{ link: "/drafts", label: "app.gist" }]}>
            {this.state.name}
          </Breadcrumbs>
          <h1>
            <FormattedMessage id="app.gist" /> {this.state.name}
          </h1>
          <GistContainer {...this.state} />
        </BaseLayout>
      );
  }
}

export default Gist;
