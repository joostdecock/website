import React from "react";
import PropTypes from "prop-types";
import UserAvatar from "./UserAvatar";
import Grid from "@material-ui/core/Grid";
import Tray from "./Tray";
import TrayTitle from "./TrayTitle";
import UserIcon from "@material-ui/icons/PermIdentity";
import Markdown from "react-markdown";

class ModelProfile extends React.Component {
  state = {};

  render() {
    const model = this.props.model;
    return (
      <Tray className="always-expanded" title={false}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          className=""
        >
          <Grid item xs={12} sm={4} className={"w100 mb1"}>
            <UserAvatar
              username={model.name}
              uris={model.pictureUris}
              shape="untray"
            />
          </Grid>
          <Grid item xs={12} sm={8} className="pl1nxs">
            <TrayTitle icon={<UserIcon />}>{model.name}</TrayTitle>
            <Markdown source={model.notes} />
          </Grid>
        </Grid>
      </Tray>
    );
  }
}

ModelProfile.propTypes = {
  model: PropTypes.object
};

export default ModelProfile;
