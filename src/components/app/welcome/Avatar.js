import React from "react";
import PropTypes from "prop-types";
import AvatarUpload from "./AvatarUpload";
import AvatarPreview from "./AvatarPreview";

function Avatar({ handleAvatarDrop, image, intl, avatar, avatarPreview }) {
  if (avatarPreview) return <AvatarPreview />;
  else return <AvatarUpload intl={intl} handleAvatarDrop={handleAvatarDrop} />;
}

Avatar.propTypes = {
  image: PropTypes.string,
  handleAvatarDrop: PropTypes.func
};

export default Avatar;
