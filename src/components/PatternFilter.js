import React from "react";
import PropTypes from "prop-types";
import Image from "gatsby-image";
import TimeAgo from "./TimeAgo";
import { Link } from "gatsby";
import { locLang, uniqueArray } from "../utils";
import Grid from "@material-ui/core/Grid";
import { FormattedMessage, injectIntl } from "react-intl";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { patternList, patternInfo } from "@freesewing/pattern-bundle";
import Button from "@material-ui/core/Button";

class PatternFilter extends React.Component {
  state = {
    search: "",
    department: [],
    type: [],
    tags: []
  };

  resetFilter = () => {
    let newState = {
      search: "",
      department: [],
      type: [],
      tags: []
    };
    this.setState(newState);
    this.props.applyFilter(this.filteredPatternList(newState));
  };

  searchUpdate = evt => {
    let value = evt.target.value;
    let newState = this.state;
    newState.search = value;
    this.setState(newState);
    this.props.applyFilter(this.filteredPatternList(newState));
  };

  toggleCheckbox = (type, evt) => {
    let item = evt.target.value;
    let list = [];
    if (typeof this.state[type] === "undefined") list.push(item);
    else {
      list = this.state[type];
      let pos = this.state[type].indexOf(item);
      if (pos === -1) list.push(item);
      else {
        if (list.length === 1) list = [];
        else list = list.splice(pos - 1, 1);
      }
    }
    let newState = this.state;
    newState[type] = uniqueArray(list);
    this.setState(newState);
    this.props.applyFilter(this.filteredPatternList(newState));
  };

  toggleDepartment = evt => this.toggleCheckbox("department", evt);
  toggleType = evt => this.toggleCheckbox("type", evt);
  toggleTags = evt => this.toggleCheckbox("tags", evt);

  checkboxIsSelected(type, value) {
    if (typeof this.state[type] === "undefined") return false;
    if (this.state[type].indexOf(value) === -1) return false;
    return true;
  }

  filteredPatternList(state) {
    let patterns = Object.assign({}, patternInfo);
    //console.log(patternInfo);
    if (state.search !== "") {
      for (let pattern of Object.keys(patterns)) {
        if (pattern.indexOf(state.search.toLowerCase()) === -1)
          delete patterns[pattern];
      }
    }
    if (state.department.length > 0) {
      for (let pattern of Object.keys(patterns)) {
        let seen = false;
        for (let department of state.department) {
          if (patterns[pattern].department === department) seen = true;
        }
        if (!seen) delete patterns[pattern];
      }
    }
    if (state.type.length > 0) {
      for (let pattern of Object.keys(patterns)) {
        let seen = false;
        for (let type of state.type) {
          if (patterns[pattern].type === type) seen = true;
        }
        if (!seen) delete patterns[pattern];
      }
    }
    if (state.tags.length > 0) {
      for (let pattern of Object.keys(patterns)) {
        let seen = false;
        for (let tag of state.tags) {
          if (patterns[pattern].tags.indexOf(tag) === -1) {
            delete patterns[pattern];
            break;
          }
        }
      }
    }
    return Object.keys(patterns);
  }

  render() {
    let { language, intl } = this.props;

    let filterTypes = {
      department: [],
      type: [],
      tags: []
    };
    for (let p of Object.keys(patternInfo)) {
      for (let filter of Object.keys(filterTypes)) {
        if (filter === "tags") {
          for (let tag of patternInfo[p][filter]) filterTypes[filter].push(tag);
        } else filterTypes[filter].push(patternInfo[p][filter]);
      }
    }
    for (let filter of Object.keys(filterTypes)) {
      filterTypes[filter] = uniqueArray(filterTypes[filter]);
    }
    return (
      <div>
        <form>
          <TextField
            id="search-filter"
            fullWidth={true}
            label={intl.formatMessage({ id: "app.name" })}
            margin="normal"
            variant="outlined"
            value={this.state.search}
            type="text"
            onChange={this.searchUpdate}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />

          <h5>
            <FormattedMessage id="filter.department.title" />
          </h5>
          <FormControl component="fieldset">
            <FormGroup>
              {filterTypes.department.map((department, index) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          this.checkboxIsSelected("department", department)
                            ? true
                            : false
                        }
                        onChange={this.toggleDepartment}
                        value={department}
                        color="primary"
                      />
                    }
                    label={intl.formatMessage({
                      id: "filter.department." + department
                    })}
                    key={"department-" + department}
                  />
                );
              })}
            </FormGroup>
          </FormControl>

          <h5>
            <FormattedMessage id="filter.type.title" />
          </h5>
          <FormControl component="fieldset">
            <FormGroup>
              {filterTypes.type.map((type, index) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          this.checkboxIsSelected("type", type) ? true : false
                        }
                        onChange={this.toggleType}
                        value={type}
                        color="primary"
                      />
                    }
                    label={intl.formatMessage({ id: "filter.type." + type })}
                    key={"type-" + type}
                  />
                );
              })}
            </FormGroup>
          </FormControl>

          <h5>
            <FormattedMessage id="filter.tags.title" />
          </h5>
          <FormControl component="fieldset">
            <FormGroup>
              {filterTypes.tags.map((tag, index) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          this.checkboxIsSelected("tags", tag) ? true : false
                        }
                        onChange={this.toggleTags}
                        value={tag}
                        color="primary"
                      />
                    }
                    label={intl.formatMessage({ id: "filter.tags." + tag })}
                    key={"tags-" + tag}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        </form>
        <p className="txt-right">
          <Button
            color="primary"
            variant="contained"
            onClick={this.resetFilter}
          >
            <FormattedMessage id="filter.resetFilter" />
          </Button>
        </p>
      </div>
    );
  }
}
PatternFilter.propTypes = {
  langauge: PropTypes.string
};

export default injectIntl(PatternFilter);
