import React from "react";
import Examples from "@freesewing/examples";
import svgattrPlugin from "@freesewing/plugin-svgattr";
import pluginBundle from "@freesewing/plugin-bundle";
import i18nPlugin from "@freesewing/plugin-i18n";
import designerPlugin from "@freesewing/plugin-designer";
import IconButton from "@material-ui/core/IconButton";
import CodeIcon from "@material-ui/icons/Code";
import SvgIcon from "@material-ui/icons/Gesture";
import I18nIcon from "@material-ui/icons/Translate";
import DesignerIcon from "@material-ui/icons/Info";
import Toolbar from "@material-ui/core/Toolbar";
import GithubIcon from "../GithubIcon";
import { capitalize } from "../../utils";
import prism from "prismjs";

import path_ops from "raw-loader!../../../node_modules/@freesewing/examples/src/path_ops.js";
import path_attr from "raw-loader!../../../node_modules/@freesewing/examples/src/path_attr.js";
import path_clone from "raw-loader!../../../node_modules/@freesewing/examples/src/path_clone.js";
import path_divide from "raw-loader!../../../node_modules/@freesewing/examples/src/path_divide.js";
import path_edge from "raw-loader!../../../node_modules/@freesewing/examples/src/path_edge.js";
import path_end from "raw-loader!../../../node_modules/@freesewing/examples/src/path_end.js";
import path_intersects from "raw-loader!../../../node_modules/@freesewing/examples/src/path_intersects.js";
import path_intersectsx from "raw-loader!../../../node_modules/@freesewing/examples/src/path_intersectsx.js";
import path_intersectsy from "raw-loader!../../../node_modules/@freesewing/examples/src/path_intersectsy.js";
import path_join from "raw-loader!../../../node_modules/@freesewing/examples/src/path_join.js";
import path_length from "raw-loader!../../../node_modules/@freesewing/examples/src/path_length.js";
import path_offset from "raw-loader!../../../node_modules/@freesewing/examples/src/path_offset.js";
import path_reverse from "raw-loader!../../../node_modules/@freesewing/examples/src/path_reverse.js";
import path_shiftalong from "raw-loader!../../../node_modules/@freesewing/examples/src/path_shiftalong.js";
import path_shiftfractionalong from "raw-loader!../../../node_modules/@freesewing/examples/src/path_shiftfractionalong.js";
import path_split from "raw-loader!../../../node_modules/@freesewing/examples/src/path_split.js";
import path_start from "raw-loader!../../../node_modules/@freesewing/examples/src/path_start.js";
import path_translate from "raw-loader!../../../node_modules/@freesewing/examples/src/path_translate.js";
import path_trim from "raw-loader!../../../node_modules/@freesewing/examples/src/path_trim.js";

import point_attr from "raw-loader!../../../node_modules/@freesewing/examples/src/point_attr.js";
import point_dx from "raw-loader!../../../node_modules/@freesewing/examples/src/point_dx.js";
import point_dy from "raw-loader!../../../node_modules/@freesewing/examples/src/point_dy.js";
import point_dist from "raw-loader!../../../node_modules/@freesewing/examples/src/point_dist.js";
import point_angle from "raw-loader!../../../node_modules/@freesewing/examples/src/point_angle.js";
import point_rotate from "raw-loader!../../../node_modules/@freesewing/examples/src/point_rotate.js";
import point_flipx from "raw-loader!../../../node_modules/@freesewing/examples/src/point_flipx.js";
import point_flipy from "raw-loader!../../../node_modules/@freesewing/examples/src/point_flipy.js";
import point_shift from "raw-loader!../../../node_modules/@freesewing/examples/src/point_shift.js";
import point_shifttowards from "raw-loader!../../../node_modules/@freesewing/examples/src/point_shifttowards.js";
import point_shiftfractiontowards from "raw-loader!../../../node_modules/@freesewing/examples/src/point_shiftfractiontowards.js";
import point_shiftoutwards from "raw-loader!../../../node_modules/@freesewing/examples/src/point_shiftoutwards.js";
import point_translate from "raw-loader!../../../node_modules/@freesewing/examples/src/point_translate.js";
import point_sitson from "raw-loader!../../../node_modules/@freesewing/examples/src/point_sitson.js";
import point_sitsroughlyon from "raw-loader!../../../node_modules/@freesewing/examples/src/point_sitsroughlyon.js";
import point_copy from "raw-loader!../../../node_modules/@freesewing/examples/src/point_copy.js";
import point_clone from "raw-loader!../../../node_modules/@freesewing/examples/src/point_clone.js";

import utils_pointonbeam from "raw-loader!../../../node_modules/@freesewing/examples/src/utils_pointonbeam.js";
import utils_pointonline from "raw-loader!../../../node_modules/@freesewing/examples/src/utils_pointonline.js";
import utils_pointoncurve from "raw-loader!../../../node_modules/@freesewing/examples/src/utils_pointoncurve.js";
import utils_beamintersectsx from "raw-loader!../../../node_modules/@freesewing/examples/src/utils_beamintersectsx.js";
import utils_beamintersectsy from "raw-loader!../../../node_modules/@freesewing/examples/src/utils_beamintersectsy.js";
import utils_beamintersectscircle from "raw-loader!../../../node_modules/@freesewing/examples/src/utils_beamintersectscircle.js";
import utils_lineintersectscircle from "raw-loader!../../../node_modules/@freesewing/examples/src/utils_lineintersectscircle.js";
import utils_lineintersectscurve from "raw-loader!../../../node_modules/@freesewing/examples/src/utils_lineintersectscurve.js";
import utils_beamsintersect from "raw-loader!../../../node_modules/@freesewing/examples/src/utils_beamsintersect.js";
import utils_linesintersect from "raw-loader!../../../node_modules/@freesewing/examples/src/utils_linesintersect.js";
import utils_curvesintersect from "raw-loader!../../../node_modules/@freesewing/examples/src/utils_curvesintersect.js";
import utils_circlesintersect from "raw-loader!../../../node_modules/@freesewing/examples/src/utils_circlesintersect.js";
import utils_curveintersectsx from "raw-loader!../../../node_modules/@freesewing/examples/src/utils_curveintersectsx.js";
import utils_curveintersectsy from "raw-loader!../../../node_modules/@freesewing/examples/src/utils_curveintersectsy.js";

function withFrontmatter(frontmatter) {
  return class ApiExample extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        frontmatter,
        code: false,
        designer: false,
        i18n: true
      };
    }

    toggleCode = () => {
      this.setState(state => {
        return {
          code: !state.code
        };
      });
    };

    toggleI18n = () => {
      this.setState(state => {
        return {
          i18n: !state.i18n
        };
      });
    };

    toggleDesigner = () => {
      this.setState(state => {
        return {
          designer: !state.designer
        };
      });
    };

    methodName = () => capitalize(this.props.o) + "." + this.props.m;

    partName = () => {
      if (this.props.i) return this.props.o + "_" + this.props.i;
      else return this.props.o + "_" + this.props.m;
    };

    githubLink = () =>
      "https://github.com/freesewing/examples/blob/master/src/" +
      this.partName() +
      ".js";

    getCode = () => {
      let code = {
        path_ops,
        path_attr,
        path_clone,
        path_divide,
        path_edge,
        path_end,
        path_intersects,
        path_intersectsx,
        path_intersectsy,
        path_join,
        path_length,
        path_offset,
        path_reverse,
        path_shiftalong,
        path_shiftfractionalong,
        path_split,
        path_start,
        path_translate,
        path_trim,

        point_attr,
        point_dx,
        point_dy,
        point_dist,
        point_angle,
        point_rotate,
        point_flipx,
        point_flipy,
        point_shift,
        point_shifttowards,
        point_shiftfractiontowards,
        point_shiftoutwards,
        point_translate,
        point_sitson,
        point_sitsroughlyon,
        point_copy,
        point_clone,

        utils_pointonbeam,
        utils_pointonline,
        utils_pointoncurve,
        utils_beamintersectsx,
        utils_beamintersectsy,
        utils_beamintersectscircle,
        utils_lineintersectscircle,
        utils_lineintersectscurve,
        utils_beamsintersect,
        utils_linesintersect,
        utils_curvesintersect,
        utils_circlesintersect,
        utils_curveintersectsx,
        utils_curveintersectsy
      };
      if (typeof code[this.partName()] === "string")
        return prism.highlight(code[this.partName()], prism.languages.js, "js");
      else return "Code not found. Please report this";
    };

    getStrings = () => {
      let strings = {};
      let lang = "en"; //this.props.locale;
      strings[lang] = JSON.parse(this.props.strings);

      return strings;
    };

    getSvg = () => {
      //let margin = 5;
      //if (this.props.margin) margin = Number(this.props.margin);
      let pattern = new Examples({
        only: this.partName(),
        embed: true,
        margin: 5,
        idPrefix: this.partName()
      });
      for (let hook of Object.keys(pattern.hooks)) pattern.hooks[hook] = [];
      pattern.use(pluginBundle);
      pattern.use(svgattrPlugin, { class: "freesewing draft api-example" });
      if (this.props.strings && this.state.i18n)
        pattern.use(i18nPlugin, { strings: this.getStrings() });
      if (this.state.designer) pattern.use(designerPlugin);
      pattern.on("preRender", function(svg) {
        svg.defs += `
<g id="x">
  <path d="M -1.1 -1.1 L 1.1 1.1 M 1.1 -1.1 L -1.1 1.1" class="example-x"></path>
  <circle cy="0" cx="0" r="1.8" class="example-x"></circle>
</g>
<g id="notch">
  <circle cy="0" cx="0" r="1.2" class="example-notch-in" />
  <circle cy="0" cx="0" r="2" class="example-notch-out" />
</g>
`;
      });

      return pattern.draft().render();
    };

    getContainerStyle = () => {
      return {
        margin: "0.5rem 0 1rem 0",
        padding: 0,
        borderRadius: "4px"
      };
    };

    getPreStyle = () => {
      return {
        margin: 0,
        borderRadius: 0
      };
    };

    boxNote = () => {
      return (
        <div className="px1 mb1">
          <h6 className="label">{this.state.frontmatter.i18n.boxTitle}</h6>
          <p className="smaller">{this.state.frontmatter.i18n.boxInfo}</p>
          <p className="smaller">{this.state.frontmatter.i18n.boxWhy}</p>
        </div>
      );
    };

    i18nNote = () => {
      return (
        <div className="px1 mb1">
          <h6 className="label">{this.state.frontmatter.i18n.i18nTitle}</h6>
          <p className="smaller">{this.state.frontmatter.i18n.i18nInfo}</p>
          <p className="smaller">{this.state.frontmatter.i18n.i18nData}:</p>
          <pre>{JSON.stringify(this.getStrings(), null, 2)}</pre>
        </div>
      );
    };

    getPluginButtons = () => {
      if (this.state.code) return null;
      let buttons = [
        <IconButton onClick={this.toggleDesigner} key="designer">
          <DesignerIcon
            className={this.state.designer ? "color-success" : ""}
          />
        </IconButton>
      ];
      if (this.props.strings)
        buttons.push(
          <IconButton onClick={this.toggleI18n} key="i18n">
            <I18nIcon className={this.state.i18n ? "color-success" : ""} />
          </IconButton>
        );
      buttons.push(
        <span className="mr1" key="divider">
          &nbsp;
        </span>
      );

      return buttons;
    };

    render() {
      return (
        <div style={this.getContainerStyle()} className="border">
          <div className="bg-header">
            <Toolbar disableGutters={true} variant="dense">
              <span className="ml1">{this.methodName() + "()"}</span>
              <div style={{ flexGrow: 1 }} />
              {this.getPluginButtons()}
              <a
                href={this.githubLink()}
                target="_BLANK"
                rel="noopener noreferrer"
              >
                <IconButton color="primary">
                  <GithubIcon />
                </IconButton>
              </a>
              <IconButton
                color="primary"
                className="mr05 outline-none"
                onClick={this.toggleCode}
              >
                {this.state.code ? <SvgIcon /> : <CodeIcon />}
              </IconButton>
            </Toolbar>
          </div>
          {this.state.code ? (
            <div className="gatsby-highlight">
              <pre className="language-js" style={this.getPreStyle()}>
                <code
                  className="language-js"
                  dangerouslySetInnerHTML={{ __html: this.getCode() }}
                />
              </pre>
              {this.props.strings ? this.i18nNote() : null}
              {this.props.box ? this.boxNote() : null}
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: this.getSvg() }} />
          )}
        </div>
      );
    }
  };
}

export default withFrontmatter;
