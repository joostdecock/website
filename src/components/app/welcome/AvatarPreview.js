import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";

function AvatarPreview({ avatar, handleAvatarReset }) {
  let style = {
    height: "300px",
    width: "300px",
    backgroundSize: "cover",
    backgroundPosition: "50% 50%",
    border: "1px solid #666",
    margin: "1rem 0"
  };
  var reader = new FileReader();
  reader.readAsDataURL(avatar);
  reader.addEventListener(
    "load",
    function() {
      imgRef.current.style.backgroundImage = "url(" + reader.result + ")";
    },
    false
  );
  const imgRef = React.createRef();
  return (
    <div>
      <h5>
        <FormattedMessage id="account.avatarTitle" />
      </h5>
      <div ref={imgRef} className="w100" style={style} />
      <Button onClick={handleAvatarReset} variant="outlined" size="small">
        <FormattedMessage id="app.remove" />
      </Button>
    </div>
  );
}

AvatarPreview.propTypes = {
  avatar: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
};

export default AvatarPreview;
