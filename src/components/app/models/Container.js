import React from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { setModels } from "../../../store/actions/models";
import Breadcrumbs from "../../Breadcrumbs";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import Datum from "../../Datum";
import SortableTableCell from "../../SortableTableCell";
import { Link } from "gatsby";
import { locLang, uniqueArray } from "../../../utils";
import TwoColumns from "../../TwoColumns";
import Column from "../../Column";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import AddIcon from "@material-ui/icons/PersonAdd";
import Button from "@material-ui/core/Button";
import backend from "../../../backend";
import {
  showNotification,
  closeNotification
} from "../../../store/actions/notification";

class ModelsContainer extends React.Component {
  state = {
    initial: true,
    order: "asc",
    orderBy: "",
    ordered: [],
    selected: []
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      models: this.props.models
    });
  }

  toggleSelectAll(self) {
    let selected = Object.keys(self.props.models);
    if (self.state.selected.length === selected.length) selected = [];
    self.setState({
      ...self.state,
      selected
    });
  }

  toggleSelect(handle) {
    let selected = this.state.selected;
    let index = selected.indexOf(handle);
    if (index === -1) selected.push(handle);
    else selected.splice(index, 1);
    this.setState({
      ...this.state,
      selected: uniqueArray(selected)
    });
  }

  deleteSelected(self) {
    let models = self.state.selected;
    backend
      .removeModels({ models })
      .then(res => {
        if (res.status === 200) {
          let msg = this.props.intl.formatMessage(
            { id: "app.fieldRemoved" },
            {
              field: this.props.intl.formatMessage({
                id: models.length > 1 ? "app.models" : "app.model"
              })
            }
          );
          self.props.showNotification("success", msg);
          self.props.setModels(res.data.models);
          this.setState({
            ...this.state,
            selected: []
          });
        }
      })
      .catch(err => {
        console.log(err);
        self.props.showNotification("error", err);
      });
  }

  sort(self, by, direction = "asc") {
    let models = self.props.models;
    if (models) {
      let order = [];
      switch (by) {
        case "measurements":
          for (let m of Object.keys(models))
            order.push(Object.keys(models[m].measurements).length + "|" + m);
          order.sort((a, b) => {
            let countA = Math.floor(a.split("|").shift());
            let countB = Math.floor(b.split("|").shift());
            return countA - countB;
          });
          break;
        default:
          for (let m of Object.keys(models))
            order.push(models[m][by] + "|" + m);
          order.sort();
          break;
      }
      if (direction === "desc") order.reverse();
      self.setState({
        ...self.state,
        order: direction,
        orderBy: by,
        ordered: order
      });
    }
  }

  sortedModels() {
    if (this.state.ordered.length < 2) return this.props.models;
    let ordered = {};
    for (let rank of this.state.ordered) {
      let handle = rank.split("|").pop();
      ordered[handle] = this.props.models[handle];
    }

    return ordered;
  }

  render() {
    let { order, orderBy } = this.state;
    let models = this.sortedModels();
    return (
      <div className="min70vh">
        <Breadcrumbs>
          <FormattedMessage id="app.models" />
        </Breadcrumbs>
        <h1>
          <FormattedMessage id="app.models" />
        </h1>
        <Table className={""}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  onChange={() => this.toggleSelectAll(this)}
                  color="primary"
                />
              </TableCell>
              <SortableTableCell
                by="handle"
                order={order}
                orderBy={orderBy}
                handleSort={this.sort}
                self={this}
              />
              <SortableTableCell
                by="name"
                order={order}
                orderBy={orderBy}
                handleSort={this.sort}
                self={this}
              />
              <SortableTableCell
                by="measurements"
                order={order}
                orderBy={orderBy}
                handleSort={this.sort}
                self={this}
              />
              <SortableTableCell
                by="created"
                order={order}
                orderBy={orderBy}
                handleSort={this.sort}
                self={this}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {models
              ? Object.keys(models).map((handle, index) => {
                  let model = models[handle];
                  let to = locLang.set(
                    "/models/" + handle,
                    this.props.language
                  );
                  let isSelected =
                    this.state.selected.indexOf(handle) === -1 ? false : true;
                  return (
                    <TableRow
                      className="poh"
                      hover
                      key={"model-" + handle}
                      onClick={() => this.toggleSelect(handle)}
                      role="checkbox"
                      aria-checked={isSelected}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} color="primary" />
                      </TableCell>
                      <TableCell padding="dense">
                        <Link to={to}>{handle}</Link>
                      </TableCell>
                      <TableCell padding="dense">
                        <Link to={to}>{model.name}</Link>
                      </TableCell>
                      <TableCell padding="dense">
                        {typeof model.measurements === "undefined"
                          ? 0
                          : Object.keys(model.measurements).length}
                      </TableCell>
                      <TableCell padding="dense">
                        <Link to={to}>
                          <Datum date={model.created} />
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              : ""}
          </TableBody>
        </Table>
        <TwoColumns>
          <Column>
            {this.state.selected.length > 0 ? (
              <IconButton
                aria-label="Delete"
                classes={{ root: "danger" }}
                onClick={() => this.deleteSelected(this)}
              >
                <Badge
                  badgeContent={this.state.selected.length}
                  color="primary"
                  classes={{ badge: "mr-05" }}
                >
                  <DeleteIcon />
                </Badge>
              </IconButton>
            ) : (
              ""
            )}
          </Column>
          <Column right className="txt-right">
            <div className="txt-right">
              <Button
                variant="fab"
                color="primary"
                aria-label="Add"
                href={locLang.set("/model", this.props.language)}
              >
                <AddIcon />
              </Button>
            </div>
          </Column>
        </TwoColumns>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  models: state.models
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
)(injectIntl(ModelsContainer));
