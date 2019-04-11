import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { showNotification } from "../../store/actions/notification";
import TwoColumns from "../TwoColumns";
import Column from "../Column";
import Breadcrumbs from "../Breadcrumbs";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import Button from "@material-ui/core/Button";
import CommitResult from "./CommitResult";
import CommitMsg from "./CommitMsg";
import Center from "../Center";
import Spinner from "../Spinner";
import Tray from "../Tray";
import NotFound from "../NotFound";
import { Link } from "gatsby";
import { scrollToTop } from "../../utils";
import backend from "../../apis/backend";
import i18nConfig from "../../config/i18n";
import TextField from "@material-ui/core/TextField";
import * as translations from "@freesewing/i18n";
import BackIcon from "@material-ui/icons/Undo";
import EditIcon from "@material-ui/icons/Edit";
import YAML from "yaml";
import { Base64 } from "js-base64";
import { strOptions } from "yaml/schema";
strOptions.fold.lineWidth = 0; // See https://github.com/eemeli/yaml/issues/58#issuecomment-446401097

class TranslationEditor extends React.Component {
  state = {
    attribution: true,
    loading: false,
    display: "editor",
    commit: "",
    pr: {},
    create: false,
    editSharedOption: false
  };

  componentDidMount() {
    let inheritedFrom = false;
    let keys = this.getKeys();
    let l = this.props.language;
    let value = this.getValue(l);
    if (
      keys[0] === "options" &&
      typeof translations.optionInheritance[l][keys[1]][keys[2]] === "string"
    )
      inheritedFrom = translations.optionInheritance[l][keys[1]][keys[2]];
    if (i18nConfig.topics.indexOf(keys[0]) === -1) value = [false];
    this.setState({
      value,
      inheritedFrom
    });
  }

  toggleAttribution = () => {
    let attribution = !this.state.attribution;
    this.setState({ attribution });
  };

  doCreate = () => {
    this.setState({ create: true });
  };

  handleUpdate = evt => {
    this.setState({ value: evt.target.value });
  };

  handleCommitUpdate = evt => {
    this.setState({ msg: evt.target.value });
  };

  handlePreSave = evt => {
    scrollToTop();
    this.setState({ display: "preSave" });
  };

  getKeys = () => this.props.path.split("/");

  getHeading = () => (
    <React.Fragment>
      {this.getBreadcrumbs()}
      {this.getTitle()}
    </React.Fragment>
  );

  getTitle = () => (
    <h1>
      <FormattedMessage id="editor.editOnline" />
      <span className="subtext">{this.getFileName()}</span>
    </h1>
  );

  getBreadcrumbs = () => {
    let keys = this.getKeys();
    let via = [{ label: "app.i18n", link: "/i18n" }];
    switch (keys[0]) {
      case "options":
        via.push({ label: keys[0], link: "/i18n/" + keys[0] });
        via.push({
          label: keys[1],
          link: "/i18n/" + keys[0] + "/" + keys[1]
        });
        via.push({
          label: keys[2],
          link: "/i18n/" + keys[0] + "/" + keys[1] + "/" + keys[2]
        });
        break;
      case "filter":
        via.push({ label: keys[0], link: "/i18n/" + keys[0] });
        via.push({
          label: keys[1],
          link: "/i18n/" + keys[0] + "/" + keys[1]
        });
        break;
      case "patterns":
      case "settings":
        via.push({ label: keys[0], link: "/i18n/" + keys[0] });
        via.push({
          label: keys[1],
          link: "/i18n/" + keys[0] + "/" + keys[1]
        });
        via.push({
          label: keys[2],
          link: "/i18n/" + keys[0] + "/" + keys[1] + "/" + keys[2]
        });
        break;
      default:
        via.push({ label: keys[0], link: "/i18n/" + keys[0] });
        via.push({
          label: keys[1],
          link: "/i18n/" + keys[0] + "/" + keys[1]
        });
    }

    return (
      <Breadcrumbs via={via}>
        <FormattedMessage id="editor.editOnline" />
      </Breadcrumbs>
    );
  };

  getValue = language => {
    let keys = this.getKeys();
    switch (keys[0]) {
      case "options":
        return this.props.i18n[language][keys[0]][keys[1]][keys[2]][keys[3]];
      case "filter":
        let value = this.props.i18n[language][keys[0]][keys[1]];
        if (typeof value === "object")
          value = this.props.i18n[language][keys[0]][keys[1]][keys[2]];
        return value;
      case "patterns":
        return this.props.i18n[language][keys[0]][keys[1]][keys[2]];
      default:
        return this.props.i18n[language][keys[0]][keys[1]];
    }
  };

  getFileName = () => {
    let keys = this.getKeys();
    let base = "src/locales/";
    switch (keys[0]) {
      case "options":
        return base + this.props.language + "/options/" + keys[1] + ".yml";
      case "filter":
        return base + this.props.language + "/filter.yml";
      case "patterns":
      case "settings":
        return base + this.props.language + "/" + keys[1] + ".yml";
      default:
        return (base += this.props.language + "/" + keys[0] + ".yaml");
    }
  };

  getOptionsContent = (data, pattern) => {
    let patternData = data[pattern];
    let inherited =
      translations.optionInheritance[this.props.language][pattern];
    for (let key of Object.keys(inherited)) patternData[key] = inherited[key];

    return patternData;
  };

  getYaml = () => {
    let keys = this.getKeys();
    let content = translations[keys[0]][this.props.language];
    if (keys[0] === "options")
      content = this.getOptionsContent(content, keys[1]);
    switch (keys[0]) {
      case "options":
        content[keys[2]][keys[3]] = this.state.value;
        break;
      case "filter":
        if (typeof content[keys[1]] === "string")
          content[keys[1]] = this.state.value;
        else content[keys[1]][keys[2]] = this.state.value;
        break;
      case "patterns":
      case "settings":
        content[keys[1]][keys[2]] = this.state.value;
        break;
      default:
        content[keys[1]] = this.state.value;
        break;
    }

    return YAML.stringify(content);
  };

  commitData = () => {
    return {
      content: Base64.encode(this.getYaml()),
      repo: "i18n",
      file: this.getFileName(),
      msg: this.state.msg,
      attribution: this.state.attribution,
      create: this.state.create
    };
  };

  handleSave = () => {
    this.setState({ loading: true });
    backend.editor
      .save(this.commitData())
      .then(res => {
        if (res.status === 200) {
          this.setState({
            loading: false,
            display: "result",
            commit: res.data.commit,
            pr: res.data.pr
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.props.showNotification("error", err);
      });
  };

  backLink = () => "/" + this.props.language + "/i18n/" + this.props.path;

  buttons = method => {
    return (
      <p className={method === "preSave" ? "mt1 txt-right" : "mt1 txt-center"}>
        {this.state.display === "preSave" ? (
          <Button
            variant="outlined"
            size="large"
            color="primary"
            className="mr1"
            onClick={() => {
              this.setState({ display: "editor" });
            }}
          >
            <CancelIcon className="mr05" />
            <FormattedMessage id="app.cancel" />
          </Button>
        ) : (
          <Link to={this.backLink()}>
            <Button
              variant="outlined"
              size="large"
              color="primary"
              className="mr1"
            >
              <CancelIcon className="mr05" />
              <FormattedMessage id="app.cancel" />
            </Button>
          </Link>
        )}
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={method === "preSave" ? this.handlePreSave : this.handleSave}
          disabled={this.state.loading ? true : false}
        >
          <SaveIcon className="mr05" />
          <FormattedMessage id="app.save" />
        </Button>
      </p>
    );
  };

  render() {
    if (typeof this.state.value !== "string")
      return (
        <Center>
          <NotFound />
        </Center>
      );
    if (this.state.display === "result")
      return (
        <CommitResult
          commit={this.state.commit}
          pr={this.state.pr}
          backLink={this.backLink()}
        />
      );
    if (this.state.display === "preSave")
      return (
        <React.Fragment>
          {this.getHeading()}
          <Center>
            {this.state.loading ? (
              <Spinner size={200} />
            ) : (
              <React.Fragment>
                <h2>
                  <FormattedMessage id="editor.provideAnOptionalCommitMessage" />
                </h2>
                <CommitMsg
                  msg={this.state.msg}
                  attribution={this.state.attribution}
                  toggleAttribution={this.toggleAttribution}
                  avatar={this.props.user.pictureUris.xs}
                  email={
                    this.state.attribution
                      ? this.props.user.email
                      : "user+" + this.props.user.handle + "@freesewing.org"
                  }
                  handleUpdate={this.handleCommitUpdate}
                  intl={this.props.intl}
                />
                {this.buttons("save")}
              </React.Fragment>
            )}
          </Center>
        </React.Fragment>
      );
    if (this.state.display === "result") return <p>Result</p>;
    if (typeof this.state.value === "undefined")
      return (
        <Center>
          {this.getHeading()}
          <Spinner />
        </Center>
      );
    return (
      <React.Fragment>
        {this.getHeading()}
        {this.state.inheritedFrom ? (
          <Center>
            <div className="maxw-700">
              <Tray
                title={<FormattedMessage id="editor.thisIsASharedOption" />}
              >
                <p className="txt-center">
                  <FormattedMessage id="editor.thisOptionIsSharedByMoreThanOnePattern" />
                </p>
                <p className="txt-center">
                  <FormattedMessage id="app.areYouSureYouWantToContinue" />
                </p>
                <p className="txt-center">
                  <Link
                    to={
                      "/" +
                      this.props.language +
                      "/i18n/" +
                      this.getKeys().join("/")
                    }
                  >
                    <Button color="primary" variant="outlined" className="mr05">
                      <BackIcon className="mr05" />
                      <FormattedMessage id="app.back" />
                    </Button>
                  </Link>
                  <Link
                    to={
                      "/" +
                      this.props.language +
                      "/edit/i18n/options/" +
                      this.state.inheritedFrom +
                      "/" +
                      this.getKeys()
                        .slice(2)
                        .join("/")
                    }
                  >
                    <Button color="primary" variant="contained">
                      <EditIcon className="mr05" />
                      <FormattedMessage id="editor.editOnline" />
                    </Button>
                  </Link>
                </p>
              </Tray>
            </div>
          </Center>
        ) : (
          <TwoColumns>
            <Column>
              <h6
                className="label"
                dangerouslySetInnerHTML={{
                  __html:
                    this.getFileName() +
                    " &nbsp;&raquo;&nbsp; " +
                    this.getKeys()
                      .slice(1)
                      .join(" &nbsp;&raquo;&nbsp; ")
                }}
              />
              <TextField
                fullWidth={true}
                value={this.state.value}
                variant="outlined"
                multiline={true}
                rows="6"
                onChange={this.handleUpdate}
              />
              {this.buttons("preSave")}
            </Column>
            <Column right>
              {i18nConfig.languages.map(lang => {
                if (lang !== this.props.language)
                  return (
                    <div className="keyval hover-box" key={lang}>
                      <span className="key">
                        <FormattedMessage id={"i18n." + lang} />
                      </span>
                      <span
                        className="val"
                        dangerouslySetInnerHTML={{
                          __html: this.getValue(lang)
                        }}
                      />
                    </div>
                  );
                return null;
              })}
            </Column>
          </TwoColumns>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  showNotification: (style, message) =>
    dispatch(showNotification(style, message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(TranslationEditor));
