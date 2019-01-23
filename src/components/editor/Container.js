import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { showNotification } from "../../store/actions/notification";
import TwoColumns from "../TwoColumns";
import Column from "../Column";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import Button from "@material-ui/core/Button";
import remark from "remark";
import html from "remark-html";
import CommitResult from "./CommitResult";
import PreviewBlog from "./PreviewBlog";
import PreviewDocs from "./PreviewDocs";
import PreviewShowcase from "./PreviewShowcase";
import EditBlog from "./EditBlog";
import EditDocs from "./EditDocs";
import EditShowcase from "./EditShowcase";
import TranslateOrEdit from "./TranslateOrEdit";
import CommitMsg from "./CommitMsg";
import Center from "../Center";
import Spinner from "../Spinner";
import { Link } from "gatsby";
import { asFrontmatterFile, scrollToTop } from "../../utils";
import backend from "../../apis/backend";

class Editor extends React.Component {
  state = {
    title: "",
    body: "",
    caption: "",
    patterns: [],
    html: "",
    attribution: true,
    loading: false,
    display: "editor",
    commit: "",
    pr: {},
    create: false
  };

  componentDidMount() {
    remark()
      .use(html)
      .process(this.props.node.rawMarkdownBody, (err, md) => {
        switch (this.props.type) {
          case "blog":
            this.setState({
              title: this.props.node.frontmatter.title,
              linktitle: this.props.node.frontmatter.linktitle,
              caption: this.props.node.frontmatter.caption,
              category: this.props.node.frontmatter.category,
              author: this.props.node.frontmatter.author,
              blurb: this.props.node.frontmatter.blurb,
              body: this.props.node.rawMarkdownBody,
              date: this.props.node.frontmatter.date,
              img:
                this.props.node.frontmatter.img.name +
                this.props.node.frontmatter.img.ext,
              html: md.contents
            });
            break;
          case "showcase":
            let patterns = {};
            for (let pattern of this.props.node.frontmatter.patterns)
              patterns[pattern] = true;
            this.setState({
              img:
                this.props.node.frontmatter.img.name +
                this.props.node.frontmatter.img.ext,
              date: this.props.node.frontmatter.date,
              author: this.props.node.frontmatter.author,
              title: this.props.node.frontmatter.title,
              caption: this.props.node.frontmatter.caption,
              patterns,
              body: this.props.node.rawMarkdownBody,
              html: md.contents
            });
            break;
          default:
            this.setState({
              title: this.props.node.frontmatter.title,
              body: this.props.node.rawMarkdownBody,
              html: md.contents
            });
            break;
        }
      });
  }

  toggleAttribution = () => {
    let attribution = !this.state.attribution;
    this.setState({ attribution });
  };

  doCreate = () => {
    this.setState({ create: true });
  };

  handleUpdate = evt => {
    let value = evt.target.value;
    let key = evt.target.attributes.name.value;
    if (key === "patterns") {
      let patterns = this.state.patterns;
      if (patterns[value]) delete patterns[value];
      else patterns[value] = true;
      this.setState({ patterns });
    } else {
      let state = {};
      state[key] = value;
      if (key === "body") {
        remark()
          .use(html)
          .process(value, (err, md) => {
            state.html = md.contents;
            this.setState(state);
          });
      } else this.setState(state);
    }
  };

  handlePreSave = evt => {
    scrollToTop();
    this.setState({ display: "preSave" });
  };

  commitData = type => {
    let path = "/" + this.props.language + "/" + type + "/" + this.props.path;
    let frontmatter;
    if (type === "docs")
      frontmatter = {
        path,
        title: this.state.title
      };
    if (type === "showcase")
      frontmatter = {
        path,
        author: this.state.author,
        caption: this.state.caption,
        date: this.state.date,
        img: this.state.img,
        patterns: Object.keys(this.state.patterns),
        title: this.state.title
      };
    if (type === "blog")
      frontmatter = {
        path,
        author: this.state.author,
        blurb: this.state.blurb,
        caption: this.state.caption,
        category: this.state.category,
        date: this.state.date,
        img: this.state.img,
        linktitle: this.state.linktitle,
        title: this.state.title
      };

    return {
      content: btoa(asFrontmatterFile(frontmatter, this.state.body)),
      repo: "website",
      file: this.props.file,
      msg: this.state.msg,
      attribution: this.state.attribution,
      create: this.state.create
    };
  };

  handleSave = () => {
    this.setState({ loading: true });
    backend.editor
      .save(this.commitData(this.props.type))
      .then(res => {
        if (res.status === 200) {
          this.setState({
            loading: false,
            display: "result",
            commit: res.data.commit,
            pr: res.data.pr
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.props.showNotification("error", err);
      });
  };

  backLink = () =>
    "/" + this.props.language + "/" + this.props.type + "/" + this.props.path;

  englishEditLink = () => "/en/edit/" + this.props.type + "/" + this.props.path;

  buttons = method => {
    return (
      <p className={method === "preSave" ? "mt1 txt-right" : "mt1 txt-center"}>
        {this.state.display === "preSave" ? (
          <Button
            variant="outlined"
            size="large"
            color="primary"
            className="mr1"
            onClick={() => {
              this.setState({ display: "editor" });
            }}
          >
            <CancelIcon className="mr05" />
            <FormattedMessage id="app.cancel" />
          </Button>
        ) : (
          <Link to={this.backLink()}>
            <Button
              variant="outlined"
              size="large"
              color="primary"
              className="mr1"
            >
              <CancelIcon className="mr05" />
              <FormattedMessage id="app.cancel" />
            </Button>
          </Link>
        )}
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={method === "preSave" ? this.handlePreSave : this.handleSave}
          disabled={this.state.loading ? true : false}
        >
          <SaveIcon className="mr05" />
          <FormattedMessage id="app.save" />
        </Button>
      </p>
    );
  };

  render() {
    let { language } = this.props;
    if (this.props.languageMissing && !this.state.create)
      return (
        <TranslateOrEdit
          language={language}
          englishEditLink={this.englishEditLink()}
          doCreate={this.doCreate}
        />
      );
    if (this.state.display === "preSave")
      return (
        <Center>
          {this.state.loading ? (
            <Spinner size={200} />
          ) : (
            <React.Fragment>
              <h2>
                <FormattedMessage id="editor.provideAnOptionalCommitMessage" />
              </h2>
              <CommitMsg
                msg={this.state.msg}
                attribution={this.state.attribution}
                toggleAttribution={this.toggleAttribution}
                avatar={this.props.user.pictureUris.xs}
                email={
                  this.state.attribution
                    ? this.props.user.email
                    : "user+" + this.props.user.handle + "@freesewing.org"
                }
                handleUpdate={this.handleUpdate}
                intl={this.props.intl}
              />
              {this.buttons("save")}
            </React.Fragment>
          )}
        </Center>
      );
    if (this.state.display === "result")
      return (
        <CommitResult
          commit={this.state.commit}
          pr={this.state.pr}
          backLink={this.backLink()}
        />
      );
    switch (this.props.type) {
      case "blog":
        return (
          <TwoColumns>
            <Column>
              <EditBlog
                title={this.state.title}
                linktitle={this.state.linktitle}
                caption={this.state.caption}
                patterns={this.state.patterns}
                body={this.state.body}
                author={this.state.author}
                category={this.state.category}
                blurb={this.state.blurb}
                handleUpdate={this.handleUpdate}
                intl={this.props.intl}
              />
              {this.buttons("preSave")}
            </Column>
            <Column right>
              <PreviewBlog
                fluid={this.props.node.frontmatter.img.childImageSharp.fluid}
                caption={this.state.caption}
                title={this.state.title}
                patterns={this.state.patterns}
                author={this.state.author}
                category={this.state.category}
                blurb={this.state.blurb}
                html={this.state.html}
                date={this.props.node.frontmatter.date}
                language={this.props.language}
              />
            </Column>
          </TwoColumns>
        );
      case "showcase":
        return (
          <TwoColumns>
            <Column>
              <EditShowcase
                title={this.state.title}
                caption={this.state.caption}
                patterns={this.state.patterns}
                body={this.state.body}
                handleUpdate={this.handleUpdate}
                intl={this.props.intl}
              />
              {this.buttons("preSave")}
            </Column>
            <Column right>
              <PreviewShowcase
                fluid={this.props.node.frontmatter.img.childImageSharp.fluid}
                caption={this.state.caption}
                title={this.state.title}
                patterns={this.state.patterns}
                html={this.state.html}
                date={this.props.node.frontmatter.date}
                language={this.props.language}
              />
            </Column>
          </TwoColumns>
        );
      default:
        return (
          <TwoColumns>
            <Column>
              <EditDocs
                title={this.state.title}
                body={this.state.body}
                handleUpdate={this.handleUpdate}
                intl={this.props.intl}
              />
              {this.buttons("preSave")}
            </Column>
            <Column right>
              <PreviewDocs title={this.state.title} html={this.state.html} />
            </Column>
          </TwoColumns>
        );
    }
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  showNotification: (style, message) =>
    dispatch(showNotification(style, message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Editor));
