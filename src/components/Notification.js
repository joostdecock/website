import React from "react";
import PropTypes from "prop-types";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import WarningIcon from "@material-ui/icons/Warning";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import NiceError from "./NiceError";

const typeIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

function Notification(props) {
  const { open, type, message, onClose, handleClose } = props;
  const Icon = typeIcon[type];
  let msg = message;
  if (message instanceof Error) msg = <NiceError err={message} />;
  return (
    <Snackbar
      className={"ntfy-" + type}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={open}
      autoHideDuration={5000000}
      onClose={onClose}
      message={[
        <Icon key="icon" className="notification-icon" />,
        <span key="message">{msg}</span>
      ]}
      action={
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      }
    />
  );
}

Notification.propTypes = {
  open: PropTypes.bool,
  type: PropTypes.oneOf(["success", "warning", "error", "info"]),
  onClose: PropTypes.func,
  handleClose: PropTypes.func
};

Notification.defaultProps = {
  type: "info"
};

export default Notification;
