import React from "react";
import { connect } from "react-redux";
import { FormattedMessage, FormattedRelative, injectIntl } from "react-intl";
import {
  showNotification,
  closeNotification
} from "../../../store/actions/notification";
import { setModels } from "../../../store/actions/models";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import NameIcon from "@material-ui/icons/PermIdentity";
import CreatedIcon from "@material-ui/icons/PowerSettingsNew";
import UpdatedIcon from "@material-ui/icons/Update";
import MeasurementsIcon from "@material-ui/icons/AccessibilityNew";
import UnitsIcon from "@material-ui/icons/Public";
import HandleIcon from "@material-ui/icons/Place";
import NotesIcon from "@material-ui/icons/Note";
import BreastsIcon from "@material-ui/icons/Adjust";
import Breadcrumbs from "../../Breadcrumbs";
import TwoColumns from "../../TwoColumns";
import Column from "../../Column";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import FieldForm from "./FieldForm";
import Button from "@material-ui/core/Button";
import BackIcon from "@material-ui/icons/KeyboardArrowLeft";
import SaveIcon from "@material-ui/icons/Save";
import CodeIcon from "@material-ui/icons/Code";
import backend from "../../../backend";
import { scrollToTop, distance } from "../../../utils";
import MeasurementImages from "../../MeasurementImages";
import LanguageNotAvailable from "../../LanguageNotAvailable";
import Tray from "../../Tray";
import remark from "remark";
import html from "remark-html";

class ModelEditContainer extends React.Component {
  state = {
    editing: false,
    editingMeasurement: false,
    value: false,
    markdownPreview: false
  };

  componentDidMount() {}

  componentDidUpdate() {
    if (this.state.editing) scrollToTop();
  }

  renderMarkdownPreview(markdown) {
    let self = this;
    remark()
      .use(html)
      .process(markdown, (err, md) => {
        self.setState({
          markdownPreview: md.contents
        });
      });
  }

  formatValue(type, value) {
    switch (type) {
      case "breasts":
        return value ? (
          <FormattedMessage id="app.withBreasts" />
        ) : (
          <FormattedMessage id="app.withoutBreasts" />
        );
      case "created":
      case "updatedAt":
        return <FormattedRelative value={value} />;
      case "units":
        if (value === "imperial")
          return <FormattedMessage id="app.imperialUnits" />;
        else return <FormattedMessage id="app.metricUnits" />;
      default:
        return value;
    }
  }

  formatLabel() {
    let key;
    if (this.state.editingMeasurement)
      key = "measurements." + this.state.editing;
    else {
      switch (this.state.editing) {
        case "breasts":
          key = "app.chest";
          break;
        case "units":
          key = "account.units";
          break;
        default:
          key = "app." + this.state.editing;
      }
    }
    return <FormattedMessage id={key} />;
  }

  isUnmutable = key => {
    const unmutable = ["created", "updatedAt", "handle"];
    if (unmutable.indexOf(key) === -1) return false;
    else return true;
  };

  handleStartEditing = (key, isMeasurement = false) => {
    let value;
    if (isMeasurement) {
      value = distance.asText(
        this.props.models[this.props.handle].measurements[key],
        this.props.models[this.props.handle].units
      );
      if (typeof value !== "number") value = value.trim();
    } else value = this.props.models[this.props.handle][key];
    if (key === "notes") {
      if (!value)
        this.renderMarkdownPreview(this.props.models[this.props.handle].notes);
      else this.renderMarkdownPreview(value);
    }
    this.setState({
      editing: key,
      editingMeasurement: isMeasurement,
      value
    });
  };

  handleStopEditing = () => {
    this.setState({
      editing: false
    });
  };

  handleValueUpdate = evt => {
    let value = evt.target.value;
    console.log("should render", value);
    if (this.state.editing === "notes") this.renderMarkdownPreview(value);
    this.setState({
      value
    });
  };

  handleValueSave = evt => {
    evt.preventDefault();
    let field = this.state.editing;
    let isMeasurement = this.state.editingMeasurement;
    this.setState({
      editing: false
    });
    let data = {};
    if (isMeasurement) {
      data.measurements = {};
      data.measurements[field] = distance.asMm(
        this.state.value,
        this.props.models[this.props.handle].units
      );
    } else {
      switch (field) {
        case "breasts":
          data.breasts = this.state.value;
          break;
        default:
          data[field] = this.state.value;
      }
    }
    return this.saveModel(this.props.handle, data, field);
  };

  saveModel = (handle, data, field) => {
    backend
      .saveModel(handle, data)
      .then(res => {
        if (res.status === 200) {
          let models = this.props.models;
          models[handle] = res.data.model;
          this.props.setModels(models);
          let msg = this.props.intl.formatMessage(
            { id: "app.fieldSaved" },
            { field: this.props.intl.formatMessage({ id: "app.model" }) }
          );
          //if (field === "avatar") {
          //  this.setState({
          //    avatarUri:
          //      res.data.account.pictureUris.xs + "?cachebust=" + Date.now()
          //  });
          //}
          this.props.showNotification("success", msg);
        }
      })
      .catch(err => {
        console.log(err);
        this.props.showNotification("error", err);
      });
  };

  items = [
    {
      key: "name",
      icon: <NameIcon />,
      label: <FormattedMessage id="app.name" />
    },
    {
      key: "notes",
      icon: <NotesIcon />,
      label: <FormattedMessage id="app.notes" />
    },
    {
      key: "breasts",
      icon: <BreastsIcon />,
      label: <FormattedMessage id="app.chest" />
    },
    {
      key: "units",
      icon: <UnitsIcon />,
      label: <FormattedMessage id="account.units" />
    },
    {
      key: "handle",
      icon: <HandleIcon />,
      label: <FormattedMessage id="app.handle" />
    },
    {
      key: "created",
      icon: <CreatedIcon />,
      label: <FormattedMessage id="app.created" />
    },
    {
      key: "updatedAt",
      icon: <UpdatedIcon />,
      label: <FormattedMessage id="app.updated" />
    }
  ];

  render() {
    let model = this.props.models[this.props.handle] || false;
    let items = this.items;
    let measurements =
      typeof model.measurements === "undefined"
        ? []
        : Object.keys(model.measurements);
    return (
      <div>
        <Breadcrumbs via={[{ link: "/models", label: "app.models" }]}>
          {model.name}
        </Breadcrumbs>
        <h1>
          {model.name}
          <span className="handle">
            [#
            {model.handle}]
          </span>
        </h1>
        <TwoColumns>
          <Column narrow={this.state.editing ? true : false}>
            {this.state.editing === false ? (
              <div className="overpad1">
                <List component="nav">
                  <ListItem>
                    <ListItemText>
                      <h5>
                        <FormattedMessage id="app.measurements" />
                      </h5>
                    </ListItemText>
                  </ListItem>
                  {measurements.map((m, index) => (
                    <ListItem
                      key={"measuremnt-" + index}
                      button
                      onClick={() => this.handleStartEditing(m, true)}
                    >
                      <ListItemIcon>
                        <MeasurementsIcon />
                      </ListItemIcon>
                      <ListItemText>
                        <div className="keyval">
                          <span className="key" key={"mkey-" + index}>
                            <FormattedMessage id={"measurements." + m} />
                          </span>
                          <span
                            className="val"
                            key={"mval-" + index}
                            dangerouslySetInnerHTML={{
                              __html: distance.asHtml(
                                model.measurements[m],
                                model.units
                              )
                            }}
                          />
                        </div>
                      </ListItemText>
                      <ListItemSecondaryAction>
                        <IconButton
                          aria-label="Comments"
                          onClick={() => this.handleStartEditing(m, true)}
                        >
                          <EditIcon color="primary" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </div>
            ) : (
              <form
                onSubmit={this.handleValueSave}
                data-field={this.state.editing}
                className="stick"
              >
                <h5>{this.formatLabel()}</h5>
                <FieldForm
                  intl={this.props.intl}
                  field={this.state.editing}
                  value={this.state.value}
                  label={() => this.formatLabel()}
                  units={this.props.models[this.props.handle].units}
                  handleValueUpdate={this.handleValueUpdate}
                  handleAvatarLoad={this.handleAvatarLoad}
                  data={this.props.data}
                  location={this.props.location}
                />
                <div className="txt-right mt1">
                  <Button
                    onClick={this.handleStopEditing}
                    className="mr1"
                    variant="outlined"
                  >
                    <BackIcon />
                    <FormattedMessage id="app.back" />
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    <SaveIcon className="mr1" />
                    <FormattedMessage id="app.save" />
                  </Button>
                </div>
                {this.state.editing === "notes" ? (
                  <Tray
                    className="mt1 force-expanded"
                    title={<FormattedMessage id="app.preview" />}
                    icon={<CodeIcon />}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: this.state.markdownPreview
                      }}
                    />
                  </Tray>
                ) : (
                  ""
                )}
              </form>
            )}
          </Column>
          <Column right wide={this.state.editing ? true : false}>
            {this.state.editing === false ? (
              <div className="overpad1">
                <List>
                  <ListItem>
                    <ListItemText>
                      <h5>
                        <FormattedMessage id="app.settings" />
                      </h5>
                    </ListItemText>
                  </ListItem>
                  {items.map((item, index) => {
                    let unmutable = this.isUnmutable(item.key);
                    return (
                      <ListItem
                        key={"modelitem-" + index}
                        button={unmutable ? false : true}
                        onClick={
                          unmutable
                            ? ""
                            : () => this.handleStartEditing(item.key, false)
                        }
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText>
                          <div className="keyval">
                            <span className="key" key={"key-" + index}>
                              {item.label}
                            </span>
                            <span className="val" key={"val-" + index}>
                              {this.formatValue(item.key, model[item.key])}
                            </span>
                          </div>
                        </ListItemText>
                        {unmutable ? (
                          ""
                        ) : (
                          <ListItemSecondaryAction>
                            <IconButton
                              aria-label="Comments"
                              onClick={() =>
                                this.handleStartEditing(item.key, false)
                              }
                            >
                              <EditIcon color="primary" />
                            </IconButton>
                          </ListItemSecondaryAction>
                        )}
                      </ListItem>
                    );
                  })}
                </List>
              </div>
            ) : (
              <div>
                {this.state.editingMeasurement ? (
                  <div>
                    <h5>
                      <small>
                        <FormattedMessage id={"app.howToTakeMeasurements"} />
                        {" : "}
                      </small>
                      <FormattedMessage
                        id={"measurements." + this.state.editing}
                      />
                    </h5>
                    <MeasurementImages
                      measurement={this.state.editing.toLowerCase()}
                    />
                    {this.props.data[this.props.language][
                      "/docs/measurements/" + this.state.editing.toLowerCase()
                    ].language === this.props.language ? (
                      ""
                    ) : (
                      <LanguageNotAvailable className="force-collapse" />
                    )}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: this.props.data[this.props.language][
                          "/docs/measurements/" +
                            this.state.editing.toLowerCase()
                        ].html
                      }}
                    />
                  </div>
                ) : (
                  <div>
                    <Tray
                      title={[
                        this.formatLabel(),
                        ": ",
                        <FormattedMessage id="app.whatIsThis" />
                      ]}
                    >
                      <p>
                        <FormattedMessage
                          id={
                            "app." +
                            (this.state.editing === "breasts"
                              ? "chest"
                              : this.state.editing) +
                            "Info"
                          }
                        />
                      </p>
                      {this.state.editing === "notes" ? (
                        <p>
                          <FormattedMessage id="app.thisFieldSupportsMarkdown" />
                        </p>
                      ) : (
                        ""
                      )}
                    </Tray>
                  </div>
                )}
              </div>
            )}
          </Column>
        </TwoColumns>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  models: state.models,
  notification: state.notification
});

const mapDispatchToProps = dispatch => ({
  setModels: models => dispatch(setModels(models)),
  showNotification: (style, message) =>
    dispatch(showNotification(style, message)),
  closeNotification: () => dispatch(closeNotification())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(ModelEditContainer));
