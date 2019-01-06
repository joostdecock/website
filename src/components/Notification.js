import React from "react";
import PropTypes from "prop-types";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Snackbar from "@material-ui/core/Snackbar";
import WarningIcon from "@material-ui/icons/Warning";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import NiceError from "./NiceError";

const styleIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

function Notification(props) {
  const { open, style, message, onClose } = props;
  const Icon = styleIcon[style];
  let msg = message;
  if (message instanceof Error) msg = <NiceError err={message} />;
  else if (message instanceof String)
    msg = <span key="message" dangerouslySetInnerHTML={{ __html: msg }} />;
  return (
    <Snackbar
      className={"ntfy-" + style}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      message={[<Icon key="icon" className="notification-icon" />, msg]}
    />
  );
}

Notification.propTypes = {
  open: PropTypes.bool,
  style: PropTypes.oneOf(["success", "warning", "error", "info"]),
  onClose: PropTypes.func
};

Notification.defaultProps = {
  style: "info"
};

export default Notification;
