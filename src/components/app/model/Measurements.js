import React from "react";
import PropTypes from "prop-types";
import { capitalize, distance } from "../../../utils";
import { FormattedMessage, injectIntl } from "react-intl";
import {
  patternInfo,
  patternList,
  measurementList,
  measurementsForBreasts
} from "@freesewing/patterns";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";

class Measurements extends React.Component {
  state = {
    pattern: ""
  };

  handleFilterUpdate = evt => {
    let pattern = evt.target.value;
    this.setState({ pattern });
  };

  sort = measurements => {
    // Sort measurements regardless of language
    let sortme = {};
    for (let m of measurements) {
      let label = this.props.intl.formatMessage({ id: "measurements." + m });
      sortme[label] = m;
    }
    let sorted = [];
    for (let key of Object.keys(sortme).sort()) sorted.push(sortme[key]);

    return sorted;
  };

  filteredList = pattern => {
    if (pattern === "") {
      if (this.props.model.breasts) return this.sort(measurementList);
      else
        return this.sort(
          measurementList.filter(m => measurementsForBreasts.indexOf(m))
        );
    }

    return this.sort(patternInfo[this.state.pattern].measurements);
  };

  render() {
    const model = this.props.model;
    const measurements = measurementList;
    if (!this.props.model.breasts) {
      for (let m of measurementsForBreasts) delete measurements[m];
    }

    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th className="txt-right">
                <FormattedMessage id="app.filterByPattern" />
              </th>
              <th>
                <FormControl variant="outlined" fullWidth>
                  <Select
                    native
                    value={this.state.pattern}
                    onChange={this.handleFilterUpdate}
                    input={
                      <OutlinedInput
                        name="pattern"
                        labelWidth={this.state.labelWidth}
                        id="filter"
                        className="dense"
                      />
                    }
                  >
                    <option value="">
                      {this.props.intl.formatMessage({
                        id: "filter.resetFilter"
                      })}
                    </option>
                    {patternList.map(pattern => (
                      <option value={pattern}>{capitalize(pattern)}</option>
                    ))}
                  </Select>
                </FormControl>
              </th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {this.filteredList(this.state.pattern).map(index => {
              return (
                <tr>
                  <td className="key">
                    <FormattedMessage id={"measurements." + index} />
                  </td>
                  <td
                    className="val"
                    dangerouslySetInnerHTML={{
                      __html: distance.asHtml(
                        model.measurements[index],
                        model.units
                      )
                    }}
                  />
                  <td>
                    <IconButton
                      onClick={() =>
                        this.props.updateDisplay("updateMeasurement", index)
                      }
                    >
                      {measurementsForBreasts.indexOf(index) ? (
                        <EditIcon className="color-link" />
                      ) : (
                        <AddIcon className="color-success" />
                      )}
                    </IconButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

Measurements.propTypes = {
  model: PropTypes.object
};

export default injectIntl(Measurements);
