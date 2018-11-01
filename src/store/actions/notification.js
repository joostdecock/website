export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";
export const CLOSE_NOTIFICATION = "CLOSE_NOTIFICATION";

export const showNotification = (style, message) => ({
  type: SHOW_NOTIFICATION,
  style: style,
  message: message
});

export const closeNotification = () => ({
  type: CLOSE_NOTIFICATION
});
