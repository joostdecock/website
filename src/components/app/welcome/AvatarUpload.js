import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import Dropzone from "react-dropzone";
import Button from "@material-ui/core/Button";
import SelectImageIcon from "@material-ui/icons/AddAPhoto";

function AvatarUpload({ username, handleAvatarDrop, image, intl }) {
  const dropzoneRef = React.createRef();
  const style = {
    widht: "100%",
    border: "4px dashed #666",
    margin: "1rem 0",
    textAlign: "center",
    padding: "2rem 1rem"
  };
  const activeStyle = { borderColor: "#1faa00" };
  const rejectStyle = { borderColor: "#d50000" };
  return (
    <div>
      <h5>
        <FormattedMessage id="account.avatarTitle" />
      </h5>
      <Dropzone
        ref={dropzoneRef}
        onDrop={handleAvatarDrop}
        style={style}
        activeStyle={activeStyle}
        rejectStyle={rejectStyle}
        multiple={false}
        accept="image/*"
      >
        <FormattedMessage id="app.dragAndDropImageHere" />
        <br />
        <Button
          variant="outlined"
          color="primary"
          size="small"
          classes={{ root: "mt10" }}
          onClick={() => {
            dropzoneRef.current.open();
          }}
        >
          <SelectImageIcon className="mr10" />
          <FormattedMessage id="app.selectImage" />
        </Button>
      </Dropzone>
    </div>
  );
}

AvatarUpload.propTypes = {
  image: PropTypes.string,
  handleAvatarDrop: PropTypes.func
};

export default AvatarUpload;
