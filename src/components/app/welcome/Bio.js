import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { FormattedMessage } from "react-intl";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Location } from "@reach/router";
import { languageFromSlug } from "../../../utils";
import i18nConfig from "../../../config/i18n";

class Bio extends React.Component {
  state = {
    tab: 0
  };

  handleTabChange = () => {
    this.setState(state => ({
      tab: this.state.tab === 1 ? 0 : 1
    }));
  };

  loadMarkdownHelp = data => {
    let help = {};
    let edges = data.allMarkdownRemark.edges;
    let dflt = i18nConfig.defaultLanguage;
    for (let edge of edges) {
      let lang = languageFromSlug(edge.node.frontmatter.path);
      help[lang] = edge.node.html;
      if (dflt === lang) help.dflt = edge.node.html;
    }
    return help;
  };

  render() {
    const { data, bio, preview, handleBioChange, intl } = this.props;
    const tab = this.state.tab;
    const handleTabChange = this.handleTabChange;
    const markdownHelp = this.loadMarkdownHelp(data);

    return (
      <div>
        <h5>
          <FormattedMessage id="account.bioTitle" />
          &nbsp;
          <small>
            (<FormattedMessage id="app.thisFieldSupportsMarkdown" />)
          </small>
        </h5>
        <TextField
          id="username"
          multiline={true}
          rows="4"
          rowsMax="12"
          fullWidth={true}
          label={intl.formatMessage({ id: "account.bio" })}
          margin="normal"
          variant="outlined"
          value={bio}
          onChange={handleBioChange}
        />
        <div className="ox ow">
          <Tabs
            value={tab}
            onChange={handleTabChange}
            fullWidth={true}
            indicatorColor="primary"
          >
            <Tab label={intl.formatMessage({ id: "app.preview" })} />
            <Tab label={intl.formatMessage({ id: "app.markdownHelp" })} />
          </Tabs>
          {tab === 0 ? (
            <div className="pt10">
              <div dangerouslySetInnerHTML={{ __html: preview }} />
            </div>
          ) : (
            <Location>
              {({ location }) => {
                let lang = languageFromSlug(location.pathname);
                return (
                  <div className="pt10">
                    <div
                      dangerouslySetInnerHTML={{ __html: markdownHelp[lang] }}
                    />
                  </div>
                );
              }}
            </Location>
          )}
        </div>
      </div>
    );
  }
}

Bio.propTypes = {
  bio: PropTypes.string,
  handleBioChange: PropTypes.func
};

export default Bio;
