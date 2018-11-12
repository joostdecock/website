import React from "react";
import PropTypes from "prop-types";
import UserAvatar from "./UserAvatar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Tray from "./Tray";
import TrayFooter from "./TrayFooter";
import GithubIcon from "./GithubIcon";
import TwitterIcon from "./TwitterIcon";
import InstagramIcon from "./InstagramIcon";
import { socialLink, renderMarkdown } from "../utils";
import { FormattedRelative, FormattedMessage } from "react-intl";
import i18nConfig from "../config/i18n";

class UserProfile extends React.Component {
  state = {
    bio: false
  };

  componentDidMount() {
    renderMarkdown(this.props.user.bio).then(bio => {
      this.setState({ bio });
    });
  }

  render() {
    const user = this.props.user;
    const github = socialLink(this.props.user, "github");
    const twitter = socialLink(this.props.user, "twitter");
    const instagram = socialLink(this.props.user, "instagram");
    return (
      <Tray>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          className=""
        >
          <Grid item xs={4} className={"wmax"}>
            <UserAvatar
              username={user.username}
              uris={user.pictureUris}
              shape="square"
            />
            <p className="mini txt-center">
              <FormattedMessage
                id="app.userHasBeenWithUsSince"
                values={{
                  user: "@" + user.username,
                  since: <FormattedRelative value={user.time.created} />
                }}
              />
            </p>
          </Grid>
          <Grid item xs={8} style={{ padding: "0 1rem" }}>
            <h2 className="mt0">@{user.username}</h2>
            <div
              className="bio"
              dangerouslySetInnerHTML={{ __html: this.state.bio }}
            />
          </Grid>
        </Grid>
        <TrayFooter className="txt-right">
          <div
            style={{
              display: "inline-block",
              paddingRight: "10px",
              color: "inherit"
            }}
            dangerouslySetInnerHTML={{
              __html: i18nConfig.icons[user.settings.language]
            }}
          />
          {twitter ? (
            <IconButton href={twitter} color="primary" className="mr10">
              <TwitterIcon />
            </IconButton>
          ) : (
            ""
          )}
          {instagram ? (
            <IconButton href={instagram} color="primary" className="mr10">
              <InstagramIcon />
            </IconButton>
          ) : (
            ""
          )}
          {github ? (
            <IconButton href={github} color="primary" className="mr10">
              <GithubIcon />
            </IconButton>
          ) : (
            ""
          )}
        </TrayFooter>
      </Tray>
    );
  }
}

UserProfile.propTypes = {
  username: PropTypes.string,
  uris: PropTypes.object,
  shape: PropTypes.oneOf(["round", "square"])
};

UserProfile.defaultProps = {
  shape: "round"
};

export default UserProfile;
