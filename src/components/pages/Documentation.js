import React from "react";
import BaseLayout from "../layouts/Base";
//import PleaseTranslate from "../PleaseTranslate";
import LanguageNotAvailable from "../LanguageNotAvailable";
import OtherMeasurements from "../OtherMeasurements";
import DefaultDocumentation from "../docs/Default";
import PatternOptions from "../docs/PatternOptions";
import PatternOption from "../docs/PatternOption";
import Measurement from "../docs/Measurement";
import DraftSetting from "../docs/DraftSetting";
import DocumentationWithComponents from "../docs/WithComponents";
import Breadcrumbs from "../Breadcrumbs";
import GithubIcon from "../GithubIcon";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "gatsby";
import { fileOnGithub, editLink } from "../../utils";

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
    // Seems a bit much to also include this
    //childProps.pleaseTranslate = (
    //  <PleaseTranslate filePath={fileAbsolutePath} language={language} className="mt1"/>
    //);
  }

  // Breadcrumbs
  let docsCrumb = { link: "/docs", label: "app.docs" };
  if (
    typeof frontmatter.breadcrumbs !== "undefined" &&
    typeof frontmatter.breadcrumbs[0] !== "undefined" &&
    frontmatter.breadcrumbs[0].link !== "/docs"
  )
    frontmatter.breadcrumbs.unshift(docsCrumb);
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
  else if (frontmatter.components) {
    let path = props.pageContext.location;
    if (path.slice(-1) !== "/") path += "/";
    main = (
      <DocumentationWithComponents
        {...childProps}
        htmlAst={page.htmlAst}
        path={path}
        pages={props.pageContext.pages}
      />
    );
  } else
    main = (
      <DefaultDocumentation {...childProps} pages={props.pageContext.pages} />
    );
  return (
    <BaseLayout>
      <Breadcrumbs via={frontmatter.breadcrumbs}>
        {frontmatter.title}
      </Breadcrumbs>
      <h1>
        {frontmatter.title}
        &nbsp;&nbsp;
        <Link to={editLink(props.pageContext.location)}>
          <EditIcon />
        </Link>
        &nbsp;&nbsp;
        <a href={fileOnGithub(fileAbsolutePath)}>
          <GithubIcon color={"#2979ff"} />
        </a>
      </h1>
      {main}
    </BaseLayout>
  );
};

export default DocumentationPage;
