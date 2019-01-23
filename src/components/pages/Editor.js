import React from "react";
import { FormattedMessage } from "react-intl";
import BaseLayout from "../layouts/Base";
import Editor from "../editor/Container";
import TranslationEditor from "../editor/TranslationEditor";
import Breadcrumbs from "../Breadcrumbs";
import FileList from "../editor/FileList";
import TwoColumns from "../TwoColumns";
import Column from "../Column";
import Tray from "../Tray";
import HelpIcon from "@material-ui/icons/Help";
import AuthContainer from "../app/auth/Container";
import { locLang } from "../../utils";
import NotFound from "../NotFound";
import * as allTranslations from "@freesewing/i18n";
import i18nConfig from "../../config/i18n";

const EditorPage = props => {
  const getDocsTitle = (path, docs, language) => {
    // Some special cases
    if (path === "/docs/patterns") return "app.patterns";
    if (path === "/docs/draft") return "app.draft";
    if (path === "/docs/draft/settings") return "app.draftSettings";
    let match = path.match(/\/docs\/patterns\/([a-z]+)\/options/);
    if (match && match[0] === path) return "app.patternOptions";

    if (typeof docs[language][path] === "undefined") return path;
    return docs[language][path].frontmatter.title;
  };

  const getDocsBreadcrumbs = (path, docs, language) => {
    let via = [
      {
        link: "/" + language + "/docs/",
        label: "app.docs"
      }
    ];
    let chunks = path.split("/");
    let base = "/docs";
    if (chunks.length > 0) {
      for (let chunk of chunks) {
        base += "/" + chunk;
        via.push({
          link: base,
          label: getDocsTitle(base, docs, language)
        });
      }
    }
    return (
      <Breadcrumbs via={via}>
        <FormattedMessage id="editor.editOnline" />
      </Breadcrumbs>
    );
  };

  let path = props["*"].substring(props.pageContext.language.length + 6);
  let type = path.split("/").shift();
  if (["blog", "showcase", "docs", "i18n"].indexOf(type) === -1)
    return (
      <BaseLayout>
        <NotFound language={props.pageContext.language} />
      </BaseLayout>
    );

  let i18n = {};
  for (let lang of i18nConfig.languages) i18n[lang] = {};
  for (let topic of i18nConfig.topics) {
    for (let lang of i18nConfig.languages)
      i18n[lang][topic] = allTranslations[topic][lang];
  }
  path = path.substring(type.length + 1);
  let content = {
    docs: props.pageContext.data.editor_allDocumentation,
    blog: props.pageContext.data.editor_allBlogPosts,
    showcase: props.pageContext.data.editor_allShowcasePosts
  };
  let language = props.pageContext.language;
  let languageMissing = false;
  let node = false;
  if (type !== "i18n") node = content[type][language]["/" + type + "/" + path];
  if (!node && type !== "i18n") {
    languageMissing = true;
    node = content[type].en["/" + type + "/" + path];
  }
  let file;
  let h1 = (
    <FormattedMessage
      id={"editor." + (languageMissing ? "create" : "edit") + "Online"}
    />
  );
  switch (type) {
    case "docs":
      file = "src/markdown/" + type + "/" + path + "/" + language + ".md";
      return (
        <BaseLayout>
          <AuthContainer>
            {getDocsBreadcrumbs(path, content.docs, language)}
            <h1>
              {h1}
              <span className="subtext">{file}</span>
            </h1>
            <Editor
              path={path}
              node={node}
              type={type}
              file={file}
              languageMissing={languageMissing}
            />
          </AuthContainer>
        </BaseLayout>
      );
    case "blog":
    case "showcase":
      file =
        "src/markdown/" +
        type +
        "/" +
        node.fileAbsolutePath.split("/src/markdown/" + type + "/").pop();
      if (languageMissing)
        file = file.replace("/en.md", "/" + language + ".md");
      return (
        <BaseLayout>
          <AuthContainer>
            <Breadcrumbs
              via={[
                {
                  label: <FormattedMessage id={"app." + type} />,
                  link: locLang.get("/" + type, props.pageContext.language)
                },
                {
                  label: node.frontmatter.linktitle,
                  link: node.frontmatter.path
                }
              ]}
            >
              <FormattedMessage id="editor.editOnline" />
            </Breadcrumbs>
            <h1>
              {h1}
              <span className="subtext">{file}</span>
            </h1>
            <Editor
              path={path}
              node={node}
              type={type}
              file={file}
              languageMissing={languageMissing}
            />
          </AuthContainer>
        </BaseLayout>
      );
    case "i18n":
      return (
        <BaseLayout>
          <TranslationEditor i18n={i18n} language={language} path={path} />
        </BaseLayout>
      );
    default:
      return (
        <BaseLayout>
          <Breadcrumbs>
            <FormattedMessage id="editor.editor" />
          </Breadcrumbs>
          <h1>
            <FormattedMessage id="editor.editor" />
          </h1>
          <TwoColumns>
            <Column wide>
              <h2>
                <FormattedMessage id="editor.allMarkdownContent" />
              </h2>
            </Column>
            <Column right narrow>
              <Tray
                title={<FormattedMessage id="editor.missingSomething" />}
                icon={<HelpIcon />}
              >
                FIXME
              </Tray>
            </Column>
          </TwoColumns>
          <FileList content={content} language={language} />
        </BaseLayout>
      );
  }
};

export default EditorPage;
