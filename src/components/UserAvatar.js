import React from "react";
import PropTypes from "prop-types";

function UserAvatar({ username, uris, shape }) {
  return (
    <img
      alt={"@" + username}
      srcSet={`
        ${uris.xs} 100w,
        ${uris.s}  250w,
        ${uris.m}  500w,
        ${uris.l} 1000w
      `}
      src={uris.l}
      className={"avatar avatar-" + shape}
    />
  );
}

Notification.propTypes = {
  username: PropTypes.string,
  uris: PropTypes.object,
  shape: PropTypes.oneOf(["round", "square"])
};

Notification.defaultProps = {
  shape: "round"
};

export default UserAvatar;
