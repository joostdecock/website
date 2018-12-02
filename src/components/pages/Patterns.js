import React from "react";
import BaseLayout from "../layouts/Base";
import { Link } from "gatsby";
import { locLang, uniqueArray } from "../../utils";
import Chip from "@material-ui/core/Chip";
import { FormattedMessage } from "react-intl";
import Breadcrumbs from "../Breadcrumbs";
import { patternList } from "@freesewing/pattern-bundle";
import PatternPreview from "../PatternPreview";
import Grid from "@material-ui/core/Grid";
import TwoColumns from "../TwoColumns";
import Column from "../Column";
import Tray from "../Tray";
import PatternFilter from "../PatternFilter";
import FilterIcon from "@material-ui/icons/Pageview";

class Patterns extends React.Component {
  state = {
    patterns: []
  };

  patterns = {};
  images = {};

  componentDidMount() {
    this.setState({ patterns: patternList });
  }

  applyFilter = list => {
    this.setState({ patterns: list });
  };

  render() {
    this.images = this.props.pageContext.data.patternCoverImages.allFile.edges;
    this.language = this.props.pageContext.language;

    for (let pattern of patternList) {
      this.patterns[pattern] = { image: false };
      for (let img of this.images) {
        if (img.node.relativePath === "patterns/" + pattern + "/cover.jpg")
          this.patterns[pattern].image = img.node.childImageSharp;
      }
    }
    return (
      <BaseLayout>
        <Breadcrumbs>
          <FormattedMessage id="app.patterns" />
        </Breadcrumbs>
        <h1>
          <FormattedMessage id="app.patterns" />
        </h1>
        <TwoColumns wrapReverse={true}>
          <Column wide>
            <Grid container spacing={24}>
              {this.state.patterns.map((pattern, index) => {
                return (
                  <Grid item xs={6} sm={4} lg={3} key={"grid-" + pattern}>
                    <PatternPreview
                      pattern={pattern}
                      image={this.patterns[pattern].image}
                      language={this.language}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Column>
          <Column right narrow>
            <Tray
              className="stick"
              icon={<FilterIcon />}
              title={<FormattedMessage id="app.filterPatterns" />}
            >
              <PatternFilter applyFilter={this.applyFilter} />
            </Tray>
          </Column>
        </TwoColumns>
      </BaseLayout>
    );
  }
}

export default Patterns;
