import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { FormattedMessage } from "react-intl";
import ValidIcon from "@material-ui/icons/CheckCircle";
import InvalidIcon from "@material-ui/icons/Warning";
import { locLang } from "../../../utils";
import backend from "../../../apis/backend";
import { validateEmail, validateTld } from "../../../utils";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import i18nConfig from "../../../config/i18n";
import { Link } from "gatsby";
import Dropzone from "react-dropzone";
import Button from "@material-ui/core/Button";
import SelectImageIcon from "@material-ui/icons/AddAPhoto";
import Tray from "../../Tray";
import HeartIcon from "@material-ui/icons/Favorite";

class FieldForm extends React.Component {
  state = {
    tab: 0,
    markdownPreview: "",
    markdownHelp: { title: "", html: "" },
    emailValid: true,
    usernameValid: true,
    avatarPreview: false
  };

  handleTabChange = () => {
    this.setState(state => ({
      ...state,
      tab: this.state.tab === 1 ? 0 : 1
    }));
  };

  handleValueUpdateLocal = evt => {
    let field = evt.target.id;
    let value = evt.target.value;
    switch (field) {
      case "username":
        backend
          .availableUsername({ username: value })
          .then(res => {
            if (res.status === 200) {
              this.setState(state => ({
                ...state,
                usernameValid: true
              }));
            }
          })
          .catch(err => {
            this.setState(state => ({
              ...state,
              usernameValid: false
            }));
          });
        break;
      case "email":
        this.setState(state => ({
          ...state,
          emailValid: (validateEmail(value) && validateTld(value)) || false
        }));
        break;
      default:
        break;
    }
    this.props.handleValueUpdate(evt);
  };

  render() {
    const { field, intl, value } = this.props;
    const { emailValid, usernameValid } = this.state;
    const heading = (
      <h5>
        <FormattedMessage id={"account." + field + "Title"} />
      </h5>
    );
    switch (field) {
      case "email":
      case "username":
      case "github":
      case "twitter":
      case "instagram":
        return (
          <div>
            {heading}
            <TextField
              id={field}
              fullWidth={true}
              label={intl.formatMessage({ id: "account." + field })}
              margin="normal"
              variant="outlined"
              value={value}
              type={field === "email" ? "email" : "text"}
              onChange={this.handleValueUpdateLocal}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    {field === "email" || field === "username" ? (
                      field === "email" ? (
                        emailValid ? (
                          <ValidIcon classes={{ root: "color-success" }} />
                        ) : (
                          <InvalidIcon color="error" />
                        )
                      ) : usernameValid ? (
                        <ValidIcon classes={{ root: "color-success" }} />
                      ) : (
                        <InvalidIcon color="error" />
                      )
                    ) : (
                      "@"
                    )}
                  </InputAdornment>
                )
              }}
            />
          </div>
        );
      case "password":
        return (
          <div>
            {heading}
            <TextField
              id="currentPassword"
              fullWidth={true}
              label={intl.formatMessage({ id: "account.currentPassword" })}
              margin="normal"
              variant="outlined"
              type="password"
            />
            <TextField
              id="newPassword"
              fullWidth={true}
              label={intl.formatMessage({ id: "account.newPassword" })}
              margin="normal"
              variant="outlined"
              type="password"
            />
          </div>
        );
      case "resetpassword":
        return (
          <div>
            <TextField
              id="newPassword"
              name="password"
              fullWidth={true}
              label={intl.formatMessage({ id: "account.newPassword" })}
              margin="normal"
              variant="outlined"
              type="password"
            />
          </div>
        );
      case "bio":
        return (
          <div>
            <h5>
              <FormattedMessage id="account.bioTitle" />
              &nbsp;
              <small>
                (<FormattedMessage id="app.thisFieldSupportsMarkdown" />)
              </small>
            </h5>
            <TextField
              id="bio"
              multiline={true}
              rows="4"
              rowsMax="12"
              fullWidth={true}
              label={intl.formatMessage({ id: "account.bio" })}
              margin="normal"
              variant="outlined"
              value={value}
              onChange={this.handleValueUpdateLocal}
            />
          </div>
        );
      case "units":
        return (
          <div>
            {heading}
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
      case "language":
        return (
          <div>
            {heading}
            <RadioGroup
              name="language"
              onChange={this.handleValueUpdateLocal}
              value={value}
            >
              {i18nConfig.languages.map((language, index) => {
                return (
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    value={language}
                    checked={value === language ? true : false}
                    label={intl.formatMessage({ id: "i18n." + language })}
                    key={language}
                  />
                );
              })}
            </RadioGroup>
          </div>
        );
      case "patron":
        if (value > 1)
          return (
            <div>
              <h5>
                <FormattedMessage id="app.youAreAPatron" />
                {"; "}
                <FormattedMessage id="app.andThatIsAwesome" />
              </h5>
              <blockquote>
                <FormattedMessage id="app.patronHelp" />
                <br />
                <br />
                <a href="mailto:joost@decock.org?subject=Freesewing%20patron%20status">
                  <FormattedMessage id="app.sendAnEmail" />
                </a>
              </blockquote>
            </div>
          );
        else
          return (
            <div>
              <h5>
                <FormattedMessage id="app.youAreNotAPatron" />
                {"; "}
                <FormattedMessage id="app.butThatCouldChange" />
              </h5>
              <p>
                <FormattedMessage id="app.patronsKeepUsAfloat" />
              </p>
              <Tray
                className="my1 always-expanded accent"
                icon={<HeartIcon />}
                title={<FormattedMessage id="app.becomeAPatron" />}
                footer={
                  <Link
                    to={locLang.set(
                      "/patrons/join",
                      locLang.get(this.props.location)
                    )}
                  >
                    <Button>
                      <FormattedMessage id="app.becomeAPatron" />
                    </Button>
                  </Link>
                }
              >
                <p>
                  <FormattedMessage id="app.patronPitch" />
                </p>
              </Tray>
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
              {heading}
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
              {heading}
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
        return "";
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
