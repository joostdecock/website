import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { FormattedMessage } from "react-intl";
import ValidIcon from "@material-ui/icons/CheckCircle";
import InvalidIcon from "@material-ui/icons/Warning";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Location } from "@reach/router";
import { locLang } from "../../../utils";
import remark from "remark";
import html from "remark-html";
import backend from "../../../backend";
import { validateEmail, validateTld } from "../../../utils";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import i18nConfig from "../../../config/i18n";
import { Link } from "gatsby";

class FieldForm extends React.Component {
  state = {
    tab: 0,
    markdownPreview: "",
    markdownHelp: { title: "", html: "" },
    emailValid: true,
    usernameValid: true
  };

  handleTabChange = () => {
    this.setState(state => ({
      ...state,
      tab: this.state.tab === 1 ? 0 : 1
    }));
  };

  loadMarkdownHelp = data => {
    let edges = data.allMarkdownRemark.edges;
    let help = {};
    for (let edge of edges) {
      if (
        locLang.get(edge.node.frontmatter.path) ===
        locLang.get(this.props.location)
      ) {
        help.title = edge.node.frontmatter.title;
        help.html = edge.node.html;
        return help;
      }
    }
  };

  handleValueUpdateLocal = evt => {
    let field = evt.target.id;
    let value = evt.target.value;
    switch (field) {
      case "bio":
        remark()
          .use(html)
          .process(evt.target.value, (err, md) => {
            this.setState(state => ({
              ...state,
              markdownPreview: md.contents
            }));
          });
        break;
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

  componentDidMount() {
    if (this.props.field === "bio") {
      let markdownHelp = this.loadMarkdownHelp(this.props.data);
      remark()
        .use(html)
        .process(this.props.value, (err, md) => {
          this.setState(state => ({
            ...state,
            markdownPreview: md.contents,
            markdownHelp: markdownHelp
          }));
        });
    }
  }

  render() {
    const { field, intl, value } = this.props;
    const {
      emailValid,
      usernameValid,
      tab,
      markdownHelp,
      markdownPreview
    } = this.state;
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
                startAdornment: (
                  <InputAdornment position="start">
                    {field === "email" || field === "username" ? (
                      field === "email" ? (
                        emailValid ? (
                          <ValidIcon classes={{ root: "txt-success" }} />
                        ) : (
                          <InvalidIcon color="error" />
                        )
                      ) : usernameValid ? (
                        <ValidIcon classes={{ root: "txt-success" }} />
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
      case "bio":
        return (
          <div>
            <h5>
              <FormattedMessage id="app.welcomeBioTitle" />
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
            <div className="box low">
              <Tabs
                value={tab}
                onChange={this.handleTabChange}
                fullWidth={true}
                indicatorColor="primary"
              >
                <Tab label={intl.formatMessage({ id: "app.preview" })} />
                <Tab label={markdownHelp.title} />
              </Tabs>
              {tab === 0 ? (
                <div className="pt10">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: markdownPreview
                    }}
                  />
                </div>
              ) : (
                <Location>
                  {({ location }) => {
                    return (
                      <div className="pt10">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: markdownHelp.html
                          }}
                        />
                      </div>
                    );
                  }}
                </Location>
              )}
            </div>
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
                console.log(typeof value, typeof language);
                return (
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    value={language}
                    checked={value === language ? true : false}
                    label={intl.formatMessage({ id: "i18n." + language })}
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
              <blockquote>
                <FormattedMessage id="app.patronPitch" />
                <br />
                <br />
                <Link
                  to={locLang.set(
                    "/patrons/join",
                    locLang.get(this.props.location)
                  )}
                >
                  <FormattedMessage id="app.tellMeMore" />
                </Link>
              </blockquote>
            </div>
          );
        break;
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
