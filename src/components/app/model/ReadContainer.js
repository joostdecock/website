import React from "react";
import { connect } from "react-redux";
import { FormattedMessage, FormattedRelative } from "react-intl";
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
import { distance } from "../../../utils";

class ModelReadContainer extends React.Component {
  state = {};

  componentDidMount() {}

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
      key: "handle",
      icon: <HandleIcon />,
      label: <FormattedMessage id="app.handle" />
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
    let model = this.props.model || false;
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
          <Column>
            <div className="overpad1">
              <List>
                <ListItem>
                  <ListItemText>
                    <h5>
                      <FormattedMessage id="app.measurements" />
                    </h5>
                  </ListItemText>
                </ListItem>
                {measurements.map((m, index) => (
                  <ListItem key={"measuremnt-" + index}>
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
                  </ListItem>
                ))}
              </List>
            </div>
          </Column>
          <Column right>
            <div className="overpad1">
              <List>
                <ListItem>
                  <ListItemText>
                    <h5>
                      <FormattedMessage id="app.settings" />
                    </h5>
                  </ListItemText>
                </ListItem>
                {items.map((item, index) => (
                  <ListItem key={"modelitem-" + index}>
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
                  </ListItem>
                ))}
              </List>
            </div>
          </Column>
        </TwoColumns>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  notification: state.notification
});

export default connect(mapStateToProps)(ModelReadContainer);
