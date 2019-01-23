import React from "react";
import BaseLayout from "../layouts/Base";
import PleaseTranslate from "../PleaseTranslate";
import LanguageNotAvailable from "../LanguageNotAvailable";
import OtherMeasurements from "../OtherMeasurements";
import DefaultDocumentation from "../docs/Default";
import PatternOptions from "../docs/PatternOptions";
import PatternOption from "../docs/PatternOption";
import Measurement from "../docs/Measurement";
import DraftSetting from "../docs/DraftSetting";

const DocumentationPage = props => {
  const { language, page } = props.pageContext;
  const { frontmatter, html, tableOfContents, fileAbsolutePath } = page;
  let main = null;
  let childProps = {
    languageNotAvailable: "",
    pleaseTranslate: "",
    measurementsBox: "",
    isMeasurement: false,
    wrapReverse: true,
    tocBox: "",
    language,
    page,
    frontmatter,
    html,
    tableOfContents,
    fileAbsolutePath
  };

  // Language available?
  if (language !== page.language) {
    childProps.languageNotAvailable = (
      <LanguageNotAvailable language={language} />
    );
    childProps.pleaseTranslate = (
      <PleaseTranslate filePath={fileAbsolutePath} language={language} />
    );
  }

  // Breadcrumbs
  let docsCrumb = { link: "/docs", label: "app.docs" };
  if (
    typeof frontmatter.breadcrumbs !== "undefined" &&
    typeof frontmatter.breadcrumbs[0] !== "undefined" &&
    frontmatter.breadcrumbs[0].link !== "/docs"
  )
    childProps.frontmatter.breadcrumbs.unshift(docsCrumb);
  else childProps.frontmatter.breadcrumbs = [docsCrumb];

  if (typeof frontmatter.measurement === "string") {
    // Measurements
    childProps.isMeasurement = true;
    childProps.measurementsBox = <OtherMeasurements language={language} />;
    main = (
      <Measurement {...childProps} measurement={frontmatter.measurement} />
    );
  } else if (typeof frontmatter.patternOptions === "string")
    main = (
      <PatternOptions {...childProps} pattern={frontmatter.patternOptions} />
    );
  else if (
    typeof frontmatter.pattern === "string" &&
    typeof frontmatter.option === "string"
  )
    main = (
      <PatternOption
        {...childProps}
        pattern={frontmatter.pattern}
        option={frontmatter.option}
      />
    );
  else if (typeof frontmatter.setting === "string")
    main = (
      <DraftSetting
        {...childProps}
        setting={frontmatter.setting}
        language={language}
      />
    );
  else main = <DefaultDocumentation {...childProps} />;

  return <BaseLayout>{main}</BaseLayout>;
};

export default DocumentationPage;
