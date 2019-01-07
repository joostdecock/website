const config = require("./src/config/i18n");
const path = require("path");
const patternList = require("@freesewing/patterns").patternList;

exports.languages = config.languages;
exports.defaultLanguage = config.defaultLanguage;

exports.templates = {
  blogPost: path.resolve("src/components/pages/BlogPost.js"),
  blogIndex: path.resolve("src/components/pages/BlogIndex.js"),
  showcasePost: path.resolve("src/components/pages/ShowcasePost.js"),
  showcaseIndex: path.resolve("src/components/pages/ShowcaseIndex.js"),
  documentation: path.resolve("src/components/pages/Documentation.js"),
  documentationIndex: path.resolve("src/components/pages/DocumentationIndex.js")
};

// FIXME: Add naked markdown links (/about /contact and so on)
exports.nakedPaths = ["/", "/blog", "/showcase", "/login"];

// Non-markdown content in all languages
exports.jsPages = [
  {
    nakedPath: "/test",
    template: path.resolve("src/components/pages/Test.js")
  },
  {
    nakedPath: "/",
    template: path.resolve("src/components/pages/HomePage.js"),
    includeMarkdown: ["showcasePreviews", "blogpostPreviews"],
    limit: 10
  },
  {
    nakedPath: "/patterns",
    template: path.resolve("src/components/pages/Patterns.js"),
    includeQuery: "patternCoverImages",
    extraProps: { draft: false }
  },
  {
    nakedPath: "/demo",
    match: "/demo/*",
    template: path.resolve("src/components/pages/Demo.js"),
    includeMarkdown: ["optionsHelp", "demoHelp"]
  },
  {
    nakedPath: "/draft",
    template: path.resolve("src/components/pages/ChoosePattern.js")
  },
  {
    nakedPath: "/draft/:pattern",
    template: path.resolve("src/components/pages/ChooseModel.js")
  },
  {
    nakedPath: "/draft/:pattern/for/:model",
    template: path.resolve("src/components/pages/CreateDraft.js"),
    includeMarkdown: "optionsHelp"
  },
  {
    nakedPath: "/docs",
    template: path.resolve("src/components/pages/DocumentationIndex.js"),
    includeMarkdown: "documentationList"
  },
  {
    nakedPath: "/login",
    template: path.resolve("src/components/pages/Login.js")
  },
  {
    nakedPath: "/signup",
    template: path.resolve("src/components/pages/Signup.js")
  },
  {
    nakedPath: "/confirm",
    match: "/confirm/*",
    template: path.resolve("src/components/pages/Confirm.js")
  },
  {
    nakedPath: "/welcome",
    template: path.resolve("src/components/pages/Welcome.js"),
    includeMarkdown: "markdownHelp"
  },
  {
    nakedPath: "/account",
    template: path.resolve("src/components/pages/Account.js"),
    includeMarkdown: "markdownHelp"
  },
  {
    nakedPath: "/account/export",
    template: path.resolve("src/components/pages/AccountExport.js")
  },
  {
    nakedPath: "/account/restrict",
    template: path.resolve("src/components/pages/AccountRestrict.js")
  },
  {
    nakedPath: "/account/remove",
    template: path.resolve("src/components/pages/AccountRemove.js")
  },
  {
    nakedPath: "/account/consent",
    template: path.resolve("src/components/pages/AccountConsent.js")
  },
  {
    nakedPath: "/users",
    match: "/users/*",
    template: path.resolve("src/components/pages/Profile.js")
  },
  {
    nakedPath: "/models",
    template: path.resolve("src/components/pages/Models.js")
  },
  {
    nakedPath: "/model",
    template: path.resolve("src/components/pages/CreateModel.js")
  },
  {
    nakedPath: "/models/:model",
    template: path.resolve("src/components/pages/Model.js"),
    includeMarkdown: ["measurementsHelp", "markdownHelp"]
  },
  {
    nakedPath: "/drafts",
    template: path.resolve("src/components/pages/Drafts.js")
  },
  {
    nakedPath: "/drafts/:draft",
    template: path.resolve("src/components/pages/Draft.js"),
    includeMarkdown: ["markdownHelp"]
  }
];

for (let pattern of patternList) {
  exports.jsPages.push({
    nakedPath: "/patterns/" + pattern,
    template: path.resolve("src/components/pages/Pattern.js"),
    extraProps: { pattern },
    includeQuery: [pattern + "CoverImage", pattern + "ShowcasePreviews"]
  });
}
