import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { FormattedMessage } from "react-intl";
import ValidIcon from "@material-ui/icons/CheckCircle";
import InvalidIcon from "@material-ui/icons/Warning";
//import remark from "remark";
//import html from "remark-html";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Dropzone from "react-dropzone";
import Button from "@material-ui/core/Button";
import SelectImageIcon from "@material-ui/icons/AddAPhoto";
import { distance } from "../../../utils";
import IconButton from "@material-ui/core/IconButton";

class FieldForm extends React.Component {
  state = {
    avatarPreview: false
  };

  render() {
    const { field, intl, value, label, handleValueUpdate, units } = this.props;
    switch (field) {
      case "name":
      case "notes":
        return (
          <div>
            <TextField
              id={field}
              fullWidth={true}
              multiline={field === "notes" ? true : false}
              rows="4"
              rowsMax="12"
              label={label()}
              margin="normal"
              variant="outlined"
              value={value}
              type={field === "email" ? "email" : "text"}
              onChange={handleValueUpdate}
              InputProps={
                field === "name"
                  ? {
                      endAdornment: (
                        <InputAdornment position="start">
                          {value.length > 0 ? (
                            <ValidIcon classes={{ root: "color-success" }} />
                          ) : (
                            <InvalidIcon color="error" />
                          )}
                        </InputAdornment>
                      )
                    }
                  : false
              }
            />
          </div>
        );
      case "units":
        return (
          <div>
            <RadioGroup
              name="units"
              onChange={this.handleValueUpdateLocal}
              value={value}
            >
              <FormControlLabel
                control={<Radio color="primary" />}
                value="metric"
                checked={value === "metric" ? true : false}
                label={intl.formatMessage({ id: "app.metricUnits" })}
              />
              <FormControlLabel
                control={<Radio color="primary" />}
                checked={value === "imperial" ? true : false}
                value="imperial"
                label={intl.formatMessage({ id: "app.imperialUnits" })}
              />
            </RadioGroup>
          </div>
        );
      case "breasts":
        return (
          <div>
            <RadioGroup
              name="breasts"
              onChange={this.handleValueUpdateLocal}
              value={value === true || value === "true" ? "true" : "false"}
            >
              <FormControlLabel
                control={<Radio color="primary" />}
                value="false"
                checked={value === false ? true : false}
                label={intl.formatMessage({ id: "app.withoutBreasts" })}
              />
              <FormControlLabel
                control={<Radio color="primary" />}
                checked={value === true ? true : false}
                value="true"
                label={intl.formatMessage({ id: "app.withBreasts" })}
              />
            </RadioGroup>
          </div>
        );
      case "avatar":
        if (this.state.avatarPreview !== false) {
          let style = {
            height: "300px",
            width: "300px",
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
            border: "1px solid #666",
            margin: "1rem 0"
          };
          var reader = new FileReader();
          reader.readAsDataURL(this.state.avatarPreview);
          reader.addEventListener(
            "load",
            function() {
              imgRef.current.style.backgroundImage =
                "url(" + reader.result + ")";
            },
            false
          );
          const imgRef = React.createRef();
          const handleAvatarReset = () => {
            this.setState(state => ({
              ...state,
              avatarPreview: false
            }));
          };
          return (
            <div>
              <input type="hidden" id="avatar" name="avatar" value={imgRef} />
              <div ref={imgRef} className="w100" style={style} />
              <Button
                onClick={handleAvatarReset}
                variant="outlined"
                size="small"
              >
                <FormattedMessage id="app.remove" />
              </Button>
            </div>
          );
        } else {
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
          const handleAvatarDrop = (accepted, rejected) => {
            if (typeof accepted[0] !== "undefined") {
              this.props.handleAvatarLoad(accepted[0]);
              this.setState(state => ({
                ...state,
                avatarPreview: accepted[0]
              }));
            }
          };

          return (
            <div>
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
                  <SelectImageIcon className="mr1" />
                  <FormattedMessage id="app.selectImage" />
                </Button>
              </Dropzone>
            </div>
          );
        }
      default:
        return (
          <div>
            <TextField
              id={field}
              fullWidth={true}
              label={intl.formatMessage({ id: "measurements." + field })}
              margin="normal"
              variant="outlined"
              value={value}
              type="text"
              onChange={handleValueUpdate}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {distance.asMm(value, units) === false ? (
                      <InvalidIcon color="error" />
                    ) : (
                      <IconButton classes={{ label: "color-success" }} small>
                        {this.props.units === "imperial" ? '"' : "cm"}
                      </IconButton>
                    )}
                  </InputAdornment>
                )
              }}
            />
          </div>
        );
    }
  }
}

FieldForm.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleValueUpdate: PropTypes.func,
  preview: PropTypes.string
};

export default FieldForm;
