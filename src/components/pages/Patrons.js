import React from "react";
import BaseLayout from "../layouts/Base";
import Center from "../Center";
import Spinner from "../Spinner";
import Ship from "../ship/Ship";
import Breadcrumbs from "../Breadcrumbs";
import backend from "../../apis/backend";
import { FormattedMessage } from "react-intl";
import Avatar from "@material-ui/core/Avatar";
import TwitterIcon from "../TwitterIcon";
import InstagramIcon from "../InstagramIcon";
import GithubIcon from "../GithubIcon";
import { capitalize, locLang } from "../../utils";
import { Link } from "gatsby";

class Patrons extends React.Component {
  state = {
    patrons: {},
    loading: true
  };

  componentDidMount() {
    backend
      .loadPatrons()
      .then(res => {
        if (res.status === 200) {
          this.setState({
            patrons: res.data,
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

  patronSocial = patron => {
    if (!patron.social) return null;
    let social = {
      twitter: <TwitterIcon />,
      instagram: <InstagramIcon />,
      github: <GithubIcon />
    };
    let icons = [];
    for (let network of Object.keys(social)) {
      if (patron.social[network]) {
        let icon = React.cloneElement(social[network], {
          className: "color-link"
        });
        icons.push(
          <li>
            <a
              href={"https://" + network + ".com/" + patron.social[network]}
              title={patron.social[network] + " on " + capitalize(network)}
              target="_BLANK"
              rel="noopener noreferrer"
            >
              {icon}
            </a>
          </li>
        );
      } else icons.push(<li>{social[network]}</li>);
    }

    return <ul className="social">{icons}</ul>;
  };

  patronEntry = (patron, tier) => {
    return (
      <div className="patron-wrapper">
        <Link
          className="avatar"
          to={locLang.set(
            "/users/" + patron.handle,
            this.props.pageContext.language
          )}
        >
          <Avatar
            alt={patron.username}
            src={patron.pic}
            className={"patron-avatar tier-" + tier}
          />
        </Link>
        <h3 className="username">{patron.username}</h3>
        {this.patronSocial(patron)}
      </div>
    );
  };

  patronList = tier => {
    let list = [];
    for (let patron of this.state.patrons[tier]) {
      list.push(this.patronEntry(patron, tier));
    }
    return (
      <React.Fragment>
        {tier < 8 ? <div className="vspacer">&nbsp;</div> : null}
        <h2 className="txt-center">
          <FormattedMessage id={"app.patron-" + tier} />
        </h2>
        <div className="txt-center">{list}</div>
      </React.Fragment>
    );
  };

  render() {
    if (this.state.loading)
      return (
        <BaseLayout>
          <Center>
            <Spinner />
          </Center>
        </BaseLayout>
      );

    return (
      <BaseLayout>
        <Breadcrumbs>
          <FormattedMessage id="app.ourPatrons" />
        </Breadcrumbs>
        <div className="overpad2-always">
          <Ship />
        </div>
        {[8, 4, 2].map(tier => this.patronList(tier))}
      </BaseLayout>
    );
  }
}

export default Patrons;
