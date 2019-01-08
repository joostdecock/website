import React from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { setDrafts } from "../../../store/actions/drafts";
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
import AddIcon from "@material-ui/icons/NoteAdd";
import Fab from "@material-ui/core/Fab";
import backend from "../../../backend";
import { showNotification } from "../../../store/actions/notification";

class DraftsContainer extends React.Component {
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
      drafts: this.props.drafts
    });
  }

  toggleSelectAll(self) {
    let selected = Object.keys(self.props.drafts);
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
    let drafts = self.state.selected;
    backend
      .removeDrafts({ drafts })
      .then(res => {
        if (res.status === 200) {
          let msg = this.props.intl.formatMessage(
            { id: "app.fieldRemoved" },
            {
              field: this.props.intl.formatMessage({
                id: drafts.length > 1 ? "app.drafts" : "app.draft"
              })
            }
          );
          self.props.showNotification("success", msg);
          self.props.setDrafts(res.data.drafts);
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
    let drafts = self.props.drafts;
    if (drafts) {
      let order = [];
      switch (by) {
        case "pattern":
          for (let d of Object.keys(drafts))
            order.push(Object.keys(drafts[d].gist.pattern) + "|" + d);
          order.sort((a, b) => {
            let countA = Math.floor(a.split("|").shift());
            let countB = Math.floor(b.split("|").shift());
            return countA - countB;
          });
          break;
        default:
          for (let d of Object.keys(drafts))
            order.push(drafts[d][by] + "|" + d);
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

  sortedDrafts() {
    if (this.state.ordered.length < 2) return this.props.drafts;
    let ordered = {};
    for (let rank of this.state.ordered) {
      let handle = rank.split("|").pop();
      ordered[handle] = this.props.drafts[handle];
    }

    return ordered;
  }

  render() {
    let { order, orderBy } = this.state;
    let drafts = this.sortedDrafts();
    return (
      <div className="min70vh">
        <Breadcrumbs>
          <FormattedMessage id="app.drafts" />
        </Breadcrumbs>
        <h1>
          <FormattedMessage id="app.drafts" />
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
                className="not-on-mobile"
              />
              <SortableTableCell
                by="name"
                order={order}
                orderBy={orderBy}
                handleSort={this.sort}
                self={this}
              />
              <SortableTableCell
                by="pattern"
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
                className="not-on-mobile"
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {drafts
              ? Object.keys(drafts).map((handle, index) => {
                  let draft = drafts[handle];
                  let to = locLang.set(
                    "/drafts/" + handle,
                    this.props.language
                  );
                  let isSelected =
                    this.state.selected.indexOf(handle) === -1 ? false : true;
                  return (
                    <TableRow
                      className="poh"
                      hover
                      key={"draft-" + handle}
                      onClick={() => this.toggleSelect(handle)}
                      role="checkbox"
                      aria-checked={isSelected}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} color="primary" />
                      </TableCell>
                      <TableCell padding="dense" className="not-on-mobile">
                        <Link to={to}>{handle}</Link>
                      </TableCell>
                      <TableCell padding="dense">
                        <Link to={to}>{draft.name}</Link>
                      </TableCell>
                      <TableCell padding="dense" className="not-on-mobile">
                        <Link to={to}>{draft.gist.pattern}</Link>
                      </TableCell>
                      <TableCell padding="dense" className="not-on-mobile">
                        <Link to={to}>
                          <Datum date={draft.created} />
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
              <Fab
                color="primary"
                aria-label="Add"
                href={locLang.set("/draft", this.props.language)}
              >
                <AddIcon />
              </Fab>
            </div>
          </Column>
        </TwoColumns>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  drafts: state.drafts
});

const mapDispatchToProps = dispatch => ({
  setDrafts: drafts => dispatch(setDrafts(drafts)),
  showNotification: (style, message) =>
    dispatch(showNotification(style, message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(DraftsContainer));
