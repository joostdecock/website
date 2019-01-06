import React from "react";
import BaseLayout from "../layouts/Base";
import Image from "gatsby-image";
import { locLang } from "../../utils";
import { FormattedMessage } from "react-intl";
import StarIcon from "@material-ui/icons/Star";
import OptionsIcon from "@material-ui/icons/Tune";
import MeasurementsIcon from "@material-ui/icons/AccessibilityNew";
import Breadcrumbs from "../Breadcrumbs";
import TwoColumns from "../TwoColumns";
import Column from "../Column";
import Tray from "../Tray";
import MeasurementsList from "../MeasurementsList";
import PatternOptionsList from "../PatternOptionsList";
import Button from "@material-ui/core/Button";
import ShowcasePostPreview from "../ShowcasePostPreview";
import Grid from "@material-ui/core/Grid";
import { patternInfo } from "@freesewing/patterns";

const Pattern = props => {
  const { pattern, language } = props.pageContext;
  const info = patternInfo[pattern];
  const image =
    props.pageContext.data[pattern + "CoverImage"].allFile.edges[0].node
      .childImageSharp;
  let exampleList = false;
  if (
    typeof props.pageContext.data[pattern + "ShowcasePreviews"][language] !==
    "undefined"
  )
    exampleList =
      props.pageContext.data[pattern + "ShowcasePreviews"][language];
  const examples = [];
  if (exampleList) {
    for (let example of Object.keys(exampleList)) {
      let post = exampleList[example];
      examples.push(
        <Grid item xs={12} sm={6} lg={4} key={post.frontmatter.path}>
          <ShowcasePostPreview
            post={post}
            correctLanguage={true}
            noTitle
            className="mt1"
          />
        </Grid>
      );
    }
  }
  const difficulty = [];
  for (let i = 1; i <= info.difficulty; i++)
    difficulty.push(<StarIcon className="color-warning" />);

  const nameList = list => {
    let result = [];
    if (typeof list !== "string") {
      for (let name of list) {
        result.push(<b>{name}</b>);
        result.push(<span>, </span>);
      }
      result.pop();
    } else result.push(<b>{info.design}</b>);
    return result;
  };
  const draftButton = (
    <Button
      color="primary"
      variant="contained"
      size="large"
      fullWidth={true}
      href={locLang.set("/draft/" + pattern, language)}
    >
      <FormattedMessage id="app.draftPattern" values={{ pattern }} />
    </Button>
  );
  const docsButton = (
    <Button
      color="primary"
      variant="outlined"
      size="large"
      fullWidth={true}
      href={locLang.set("/docs/patterns/" + pattern, language)}
    >
      <FormattedMessage id="app.docs" />
    </Button>
  );
  return (
    <BaseLayout>
      <Breadcrumbs via={[{ label: "app.patterns", link: "/patterns" }]}>
        <FormattedMessage id={"patterns." + pattern + ".title"} />
      </Breadcrumbs>
      <h1>
        <FormattedMessage id={"patterns." + pattern + ".title"} />
      </h1>
      <TwoColumns>
        <Column wide>
          <TwoColumns>
            <Column>
              {draftButton}
              <figure className="mt1">
                <Image
                  fluid={image.fluid}
                  title={pattern}
                  alt={pattern}
                  backgroundColor={"#212121"}
                  className="shadow1 br4"
                />
              </figure>
            </Column>
            <Column right>
              {docsButton}
              <h5 className="mt1">
                <FormattedMessage id={"app.whatIsThis"} />
              </h5>
              <p>
                <FormattedMessage id={"patterns." + pattern + ".description"} />
              </p>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <FormattedMessage id={"filter.difficulty"} />
                    </td>
                    <td>{difficulty}</td>
                  </tr>
                  <tr>
                    <td>
                      <FormattedMessage id={"app.measurements"} />
                    </td>
                    <td>
                      <b>{info.measurements.length}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <FormattedMessage id={"app.patternOptions"} />
                    </td>
                    <td>
                      <b>{info.options.length}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <FormattedMessage id={"filter.department.title"} />
                    </td>
                    <td>
                      <b>
                        {" "}
                        <FormattedMessage
                          id={"filter.department." + info.department}
                        />
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <FormattedMessage id={"filter.type.title"} />
                    </td>
                    <td>
                      <b>
                        {" "}
                        <FormattedMessage id={"filter.type." + info.type} />
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <FormattedMessage id={"filter.design"} />
                    </td>
                    <td>{nameList(info.design)}</td>
                  </tr>
                  <tr>
                    <td>
                      <FormattedMessage id={"filter.code"} />
                    </td>
                    <td>{nameList(info.code)}</td>
                  </tr>
                </tbody>
              </table>
            </Column>
          </TwoColumns>
          {exampleList
            ? [
                <h2>
                  <FormattedMessage id="app.showcase" />
                </h2>,
                <div className="masonry w100">{examples}</div>
              ]
            : ""}
        </Column>
        <Column narrow right>
          <Tray
            icon={<MeasurementsIcon />}
            title={<FormattedMessage id="app.requiredMeasurements" />}
          >
            <MeasurementsList
              measurements={info.measurements}
              language={language}
            />
          </Tray>
          <Tray
            icon={<OptionsIcon />}
            title={<FormattedMessage id="app.patternOptions" />}
            className="mt1 mb1"
          >
            <PatternOptionsList
              options={info.options}
              language={language}
              pattern={pattern}
            />
          </Tray>
          {draftButton}
        </Column>
      </TwoColumns>
    </BaseLayout>
  );
};

export default Pattern;
