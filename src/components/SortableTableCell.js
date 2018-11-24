import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage, injectIntl } from "react-intl";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const SortableTableCell = props => {
  let { orderBy, order, by, handleSort, self } = props;
  return (
    <TableCell sortDirection={orderBy === by ? order : false}>
      <Tooltip
        title={props.intl.formatMessage(
          { id: "app.sortByField" },
          { field: props.intl.formatMessage({ id: "app." + by }) }
        )}
        placement="bottom-start"
        enterDelay={300}
      >
        <TableSortLabel
          active={orderBy === by}
          direction={order}
          onClick={() =>
            handleSort(
              self,
              by,
              orderBy !== by ? "asc" : order === "asc" ? "desc" : "asc"
            )
          }
        >
          <FormattedMessage id={"app." + by} />
        </TableSortLabel>
      </Tooltip>
    </TableCell>
  );
};

SortableTableCell.propTypes = {
  orderBy: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  by: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired
};

export default injectIntl(SortableTableCell);
