import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import TwoColumns from "./TwoColumns";
import Column from "./Column";
import { Link } from "gatsby";
import Tray from "./Tray";
import TextField from "@material-ui/core/TextField";
import i18nConfig from "../config/i18n";

class TranslationList extends React.Component {
  state = {
    search: ""
  };

  handleSearchUpdate = evt => {
    this.setState({ search: evt.target.value });
  };

  structured = ["options", "filter", "patterns", "settings"];

  searchResults = () => {
    let q = this.state.search.toLowerCase();
    let results = [];
    let topics = i18nConfig.topics;
    if (this.props.keys && this.props.keys[0]) topics = [this.props.keys[0]];
    for (let topic of topics) {
      let to = "/" + this.props.language + "/i18n/" + topic;
      let data = this.props.content[this.props.language][topic];
      if (i18nConfig.structuredTopics.indexOf(topic) === -1) {
        // Plain topic
        let keys = Object.keys(data);
        if (this.props.keys && this.props.keys[1]) keys = [this.props.keys[1]];
        for (let key of keys) {
          let val = data[key];
          if (
            key.toLowerCase().indexOf(q) !== -1 ||
            val.toLowerCase().indexOf(q) !== -1
          )
            results.push(this.oneLevelHit(data, to, topic, key));
        }
      } else {
        // Structured topic
        if (topic === "options") {
          let keys = Object.keys(data);
          if (this.props.keys && this.props.keys[1])
            keys = [this.props.keys[1]];
          for (let pattern of keys) {
            let patternData = data[pattern];
            let subkeys = Object.keys(patternData);
            if (this.props.keys && this.props.keys[2])
              subkeys = [this.props.keys[2]];
            for (let option of subkeys) {
              let optionData = patternData[option];
              if (
                pattern.toLowerCase().indexOf(q) !== -1 ||
                option.toLowerCase().indexOf(q) !== -1 ||
                optionData.title.toLowerCase().indexOf(q) !== -1
              )
                results.push(
                  this.optionHit(
                    optionData,
                    to,
                    topic,
                    pattern,
                    option,
                    "title"
                  )
                );
              if (
                pattern.toLowerCase().indexOf(q) !== -1 ||
                option.toLowerCase().indexOf(q) !== -1 ||
                optionData.description.toLowerCase().indexOf(q) !== -1
              )
                results.push(
                  this.optionHit(
                    optionData,
                    to,
                    topic,
                    pattern,
                    option,
                    "description"
                  )
                );
            }
          }
        } else if (topic === "patterns" || topic === "settings") {
          let keys = Object.keys(data);
          if (this.props.keys && this.props.keys[1])
            keys = [this.props.keys[1]];
          for (let pattern of keys) {
            let patternData = data[pattern];
            if (
              pattern.toLowerCase().indexOf(q) !== -1 ||
              patternData.title.toLowerCase().indexOf(q) !== -1
            )
              results.push(
                this.twoLevelHit(patternData, to, topic, pattern, "title")
              );
            if (
              pattern.toLowerCase().indexOf(q) !== -1 ||
              patternData.description.toLowerCase().indexOf(q) !== -1
            )
              results.push(
                this.twoLevelHit(patternData, to, topic, pattern, "description")
              );
          }
        } else if (topic === "filter") {
          for (let key of Object.keys(data)) {
            if (typeof data[key] === "string")
              results.push(this.oneLevelHit(data, to, topic, key));
            else {
              let filterData = data[key];
              for (let subKey of Object.keys(filterData)) {
                if (
                  key.toLowerCase().indexOf(q) !== -1 ||
                  subKey.toLowerCase().indexOf(q) !== -1 ||
                  filterData[subKey].toLowerCase().indexOf(q) !== -1
                )
                  results.push(
                    this.twoLevelHit(filterData, to, topic, key, subKey)
                  );
              }
            }
          }
        }
      }
    }

    return results;
  };

  optionHit = (data, to, topic, pattern, option, field = "description") => {
    return (
      <div className="keyval hover-box">
        <span className="key">
          <Link to={to}>{topic}</Link>
          &nbsp;&raquo;&nbsp;
          <Link to={to + "/" + pattern}>{pattern}</Link>
          &nbsp;&raquo;&nbsp;
          <Link to={to + "/" + pattern + "/" + option}>{option}</Link>
          &nbsp;&raquo;&nbsp;
          <Link to={to + "/" + pattern + "/" + option + "/" + field}>
            {field}
          </Link>
        </span>
        <div className="posrel">
          <span className="val">{data[field]}</span>
          <Link
            title={this.props.intl.formatMessage({ id: "editor.editOnline" })}
            className="fs-block-link"
            to={
              "/" +
              this.props.language +
              "/edit/i18n/" +
              topic +
              "/" +
              pattern +
              "/" +
              option +
              "/" +
              field
            }
          >
            <span className="fs-block-link" />
          </Link>
        </div>
      </div>
    );
  };

  twoLevelHit = (data, to, topic, level, field = "description") => {
    return (
      <div className="keyval hover-box">
        <span className="key">
          <Link to={to} title={topic}>
            {topic}
          </Link>
          &nbsp;&raquo;&nbsp;
          <Link to={to + "/" + level} title={level}>
            {level}
          </Link>
          &nbsp;&raquo;&nbsp;
          <Link to={to + "/" + level + "/" + field} title={field}>
            {field}
          </Link>
        </span>
        <div className="posrel">
          <span className="val">{data[field]}</span>
          <Link
            title={this.props.intl.formatMessage({ id: "editor.editOnline" })}
            className="fs-block-link"
            to={
              "/" +
              this.props.language +
              "/edit/i18n/" +
              topic +
              "/" +
              level +
              "/" +
              field
            }
          >
            <span className="fs-block-link" />
          </Link>
        </div>
      </div>
    );
  };

  oneLevelHit = (data, to, topic, field) => {
    return (
      <div className="keyval hover-box posrel">
        <span className="key">
          <Link to={to} title={topic}>
            {topic}
          </Link>
          &nbsp;&raquo;&nbsp;
          <Link to={to + "/" + field} title={field}>
            {field}
          </Link>
        </span>
        <div className="posrel">
          <span className="val">{data[field]}</span>
          <Link
            title={this.props.intl.formatMessage({ id: "editor.editOnline" })}
            className="fs-block-link"
            to={"/" + this.props.language + "/edit/i18n/" + topic + "/" + field}
          >
            <span className="fs-block-link" />
          </Link>
        </div>
      </div>
    );
  };

  render() {
    let list = [];
    for (let topic of i18nConfig.topics) {
      list.push(
        <li key={topic}>
          <Link to={"/" + this.props.language + "/i18n/" + topic}>{topic}</Link>
        </li>
      );
    }
    return (
      <TwoColumns>
        <Column wide>
          <h2>
            <FormattedMessage id="app.search" />
          </h2>
          <TextField
            fullWidth={true}
            value={this.state.search}
            name="title"
            variant="outlined"
            label={this.props.intl.formatMessage({ id: "app.search" })}
            classes={{ root: "mb1" }}
            onChange={this.handleSearchUpdate}
          />
          {this.searchResults()}
        </Column>
        <Column right narrow>
          <Tray title={<FormattedMessage id="editor.topics" />}>
            <ul>{list}</ul>
          </Tray>
        </Column>
      </TwoColumns>
    );
  }
}

export default injectIntl(TranslationList);
