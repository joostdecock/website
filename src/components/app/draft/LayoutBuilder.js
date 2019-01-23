import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import MoreIcon from "@material-ui/icons/MoreVert";
import RotateIcon from "@material-ui/icons/Sync";
import FlipIcon from "@material-ui/icons/Flip";
import WidthIcon from "../../WidthIcon";
import { capitalize, distance, round } from "../../../utils";
import { patterns } from "@freesewing/patterns";
import svgattrPlugin from "@freesewing/plugin-svgattr";
import i18nPlugin from "@freesewing/plugin-i18n";
import { plugin as patternTranslations } from "@freesewing/i18n";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import Menu from "@material-ui/core/Menu";
import Draggable from "react-draggable";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";

class LayoutBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  state = {
    pattern: false,
    hasError: false,
    width: 841,
    widthPresetOpen: false,
    anchorEl: null,
    layout: {},
    part: "",
    rotate: false
  };

  componentDidMount() {
    let pattern = new patterns[(capitalize(this.props.gist.pattern))](
      this.props.gist.settings
    )
      .use(svgattrPlugin, { class: "freesewing draft" })
      .use(i18nPlugin, { strings: patternTranslations });
    pattern.draft();
    pattern.render();

    this.setState(
      { pattern, width: pattern.width, height: pattern.height },
      function() {
        this.buildBaseLayout();
      }
    );
  }

  renderPattern = () => {
    let pattern = this.state.pattern;
    if (!pattern) return "";
    let idPrefix = pattern.settings.idPrefix;
    let scale = this.ref.current.offsetWidth / this.state.width;

    let parts = [];
    for (let partId of Object.keys(pattern.svg.layout)) {
      let transforms = this.renderTransforms(partId);
      let part = pattern.parts[partId];
      parts.push(
        <Draggable
          onStop={this.handleDragStop}
          onStart={this.handleDragStart}
          //bounds={this.partBounds(part, partId)}
          position={{ x: 0, y: 0 }}
          scale={scale}
          disabled={this.state.part === partId ? false : true}
        >
          <g>
            <g
              id={idPrefix + partId}
              className={
                "layout part" + (this.state.part === partId ? " active" : "")
              }
              data-part={partId}
              transform={transforms}
              data-test={this.state.part === partId ? false : true}
              data-tast={this.state.part}
            >
              <g
                dangerouslySetInnerHTML={{
                  __html: this.state.pattern.svg.layout[partId].svg
                }}
              />
              <rect
                x={part.topLeft.x}
                y={part.topLeft.y}
                width={part.width}
                height={part.height}
                data-part={partId}
                className="part-boundary"
                onClick={() => this.togglePart(partId)}
              />
            </g>
          </g>
        </Draggable>
      );
    }

    let svg = (
      <svg
        className="freesewing draft"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsSvg="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox={"0 0 " + this.state.width + " " + this.state.height}
      >
        <style
          type="text/css"
          dangerouslySetInnerHTML={{ __html: pattern.svg.style }}
        />
        <defs dangerouslySetInnerHTML={{ __html: pattern.svg.defs }} />
        <g id="fs-container">{parts}</g>
      </svg>
    );

    return svg;
  };

  partBounds = (part, partId) => {
    return {
      left: part.topLeft.x,
      top: part.topLeft.y + this.state.layout[partId].move.y,
      right: this.state.width - part.bottomRight.x,
      bottom:
        part.bottomRight.y +
        this.state.height -
        this.state.layout[partId].move.y
    };
  };

  renderTransforms = part => {
    if (typeof this.state.layout[part] === "undefined") return "";
    let center = this.getPartCenterPoint(part);
    let anchor = this.getPartAnchorPoint(part);
    let transform = "";
    // Move
    let x = this.state.layout[part].move.x + this.state.baseLayout[part].move.x;
    let y = this.state.layout[part].move.y + this.state.baseLayout[part].move.y;
    transform += " translate(" + x + ", " + y + ")";
    // Mirror
    if (this.state.layout[part].flipX) {
      let dx = anchor.x - center.x;
      transform += ` translate(${center.x * -1}, ${center.y * -1})`;
      transform += " scale(-1, 1)";
      transform += ` translate(${center.x * -1 + 2 * dx}, ${center.y})`;
    }
    if (this.state.layout[part].flipY) {
      let dy = anchor.y - center.y;
      transform += ` translate(${center.x * -1}, ${center.y * -1})`;
      transform += " scale(1, -1)";
      transform += ` translate(${center.x}, ${center.y * -1 + 2 * dy})`;
    }
    // Rotate
    if (this.state.layout[part].rotate)
      transform += ` rotate(${this.state.layout[part].rotate}, ${center.x -
        anchor.x}, ${center.y - anchor.y})`;

    return transform;
  };

  getPartCenterPoint = part => {
    let layout = this.state.layout;
    if (typeof layout[part] === "undefined") return { x: 0, y: 0 };
    let baseLayout = this.state.baseLayout;
    let topLeft = this.state.pattern.parts[part].topLeft;
    let bottomRight = this.state.pattern.parts[part].bottomRight;
    let x =
      topLeft.x +
      (bottomRight.x - topLeft.x) / 2 +
      layout[part].move.x +
      baseLayout[part].move.x;
    let y =
      topLeft.y +
      (bottomRight.y - topLeft.y) / 2 +
      layout[part].move.y +
      baseLayout[part].move.y;

    return { x, y };
  };

  getPartAnchorPoint = part => {
    let layout = this.state.layout;
    if (typeof layout[part] === "undefined") return { x: 0, y: 0 };
    let baseLayout = this.state.baseLayout;
    let topLeft = this.state.pattern.parts[part].topLeft;
    let x =
      topLeft.x +
      topLeft.x * -1 +
      layout[part].move.x +
      baseLayout[part].move.x;
    let y =
      topLeft.y +
      topLeft.y * -1 +
      layout[part].move.y +
      baseLayout[part].move.y;

    return { x, y };
  };

  togglePart = part => {
    if (this.state.part === part) part = false;
    this.setState({ part });
  };

  buildBaseLayout = base => {
    let pattern = this.state.pattern;
    let baseLayout = {};
    let layout = {};
    for (let part of Object.keys(pattern.svg.layout)) {
      baseLayout[part] = {
        move: {
          x: 0,
          y: 0
        }
      };
      layout[part] = {
        move: {
          x: 0,
          y: 0
        },
        rotation: 0,
        flipX: false,
        flipY: false
      };
      for (let move of pattern.svg.layout[part].transform) {
        let coords = this.unpackTranslate(move);
        baseLayout[part].move.x += coords.x;
        baseLayout[part].move.y += coords.y;
      }
    }

    this.setState({ baseLayout, layout });
  };

  unpackTranslate = translate => {
    let result = translate
      .split("(")
      .pop()
      .split(",");
    return {
      x: parseFloat(result[0]),
      y: parseFloat(result[1].split(")").shift())
    };
  };

  openWidthPresets = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  closeWidthPresets = () => {
    this.setState({ anchorEl: null });
  };

  handleWidthUpdate = evt => {
    let width =
      evt.target.value * (this.props.units === "imperial" ? 25.4 : 10);
    this.setState({ width, anchorEl: null });
  };

  handleWidthChange = width => {
    this.setState({ width, anchorEl: null });
  };

  handleDragStart = (evt, data) => {
    this.setState({
      x: data.lastX,
      y: data.lastY,
      part: evt.target.attributes["data-part"].value
    });
  };

  handleDragStop = (evt, data) => {
    let partId = evt.target.attributes["data-part"].value;
    let x = 1 * (data.lastX - this.state.x) + this.state.layout[partId].move.x;
    let y = 1 * (data.lastY - this.state.y) + this.state.layout[partId].move.y;
    // Check whether we need to increase the height
    let height = this.state.height;
    let part = this.state.pattern.parts[partId];
    let maxHeight =
      part.bottomRight.y + this.state.baseLayout[partId].move.y + y;
    if (maxHeight > this.state.height) height = maxHeight;
    let layout = this.state.layout;
    layout[partId].move.x = x;
    layout[partId].move.y = y;
    this.setState({ layout, height });
  };

  distillLayout = () => {
    let distilled = {
      width: this.state.width,
      height: this.state.height,
      parts: {}
    };
    for (let part of Object.keys(this.state.layout)) {
      let x = round(
        this.state.layout[part].move.x + this.state.baseLayout[part].move.x
      );
      let y = round(
        this.state.layout[part].move.y + this.state.baseLayout[part].move.y
      );
      distilled.parts[part] = { move: { x, y } };
      if (this.state.layout[part].flipX) distilled.parts[part].flipX = true;
      if (this.state.layout[part].flipY) distilled.parts[part].flipY = true;
      if (this.state.layout[part].rotate)
        distilled.parts[part].rotate = Number(this.state.layout[part].rotate);
    }

    return distilled;
  };

  flipPartHorizontal = () => {
    let layout = this.state.layout;
    if (layout[this.state.part].flipX) delete layout[this.state.part].flipX;
    else layout[this.state.part].flipX = true;
    this.setState({ layout });
  };

  flipPartVertical = () => {
    let layout = this.state.layout;
    if (layout[this.state.part].flipY) delete layout[this.state.part].flipY;
    else layout[this.state.part].flipY = true;
    this.setState({ layout });
  };

  toggleRotation = () => {
    let rotate = !this.state.rotate;
    this.setState({ rotate });
  };

  handleRotationUpdate = evt => {
    let layout = this.state.layout;
    layout[this.state.part].rotate = evt.target.value;
    this.setState({ layout });
  };

  render() {
    // eslint-disable-next-line
    let rotation = 0;
    if (typeof this.state.layout[this.state.part] !== "undefined")
      rotation = this.state.layout[this.state.part].rotation;
    return (
      <React.Fragment>
        <AppBar
          position="relative"
          color="secondary"
          elevation={0}
          className="layout-toolbar"
        >
          <Toolbar>
            {this.state.part ? (
              <span className="part-name">
                <FormattedMessage id={"parts." + this.state.part} />
              </span>
            ) : (
              <FormattedMessage id="app.selectAPartToMoveMirrorOrRotate" />
            )}
            <div style={{ flexGrow: 1 }} />
            {this.state.rotate === true ? (
              <InputBase
                className="layout-width-input"
                endAdornment=<InputAdornment position="start">
                  deg
                </InputAdornment>
                startAdornment=<InputAdornment position="start">
                  <RotateIcon />
                </InputAdornment>
                type="number"
                id="rotation"
                margin="normal"
                variant="outlined"
                value={this.state.layout[this.state.part].rotation}
                onChange={this.handleRotationUpdate}
              />
            ) : (
              <InputBase
                className="layout-width-input"
                endAdornment=<InputAdornment position="start">
                  cm
                </InputAdornment>
                startAdornment=<InputAdornment position="start">
                  <WidthIcon />
                </InputAdornment>
                type="number"
                id="width"
                margin="normal"
                variant="outlined"
                value={distance.asText(this.state.width, this.props.units)}
                onChange={this.handleWidthUpdate}
              />
            )}
            <IconButton
              aria-owns="layoutWidthPreset"
              href="#"
              onClick={this.openWidthPresets}
            >
              <MoreIcon color="primary" />
            </IconButton>
            <span className="divider">&nbsp;</span>
            <IconButton
              onClick={this.toggleRotation}
              disabled={!this.state.part}
            >
              <RotateIcon color={this.state.part ? "primary" : ""} />
            </IconButton>
            <IconButton
              onClick={this.flipPartHorizontal}
              disabled={!this.state.part}
            >
              <FlipIcon color={this.state.part ? "primary" : ""} />
            </IconButton>
            <IconButton
              onClick={this.flipPartVertical}
              disabled={!this.state.part}
            >
              <FlipIcon
                className="rotate90"
                color={this.state.part ? "primary" : ""}
              />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="mb1 txt-center">
          <Menu
            id="layoutWidthPresets"
            open={Boolean(this.state.anchorEl)}
            anchorEl={this.state.anchorEl}
            onClose={this.closeWidthPresets}
          >
            <MenuItem value={210} onClick={() => this.handleWidthChange(210)}>
              A4 width (21cm)
            </MenuItem>
            <MenuItem value={216} onClick={() => this.handleWidthChange(216)}>
              Letter width (8.5")
            </MenuItem>
            <MenuItem value={279} onClick={() => this.handleWidthChange(279)}>
              Tabloid width (11")
            </MenuItem>
            <MenuItem value={297} onClick={() => this.handleWidthChange(297)}>
              A3 width 29.7cm)
            </MenuItem>
            <MenuItem value={420} onClick={() => this.handleWidthChange(420)}>
              A2 width (42cm)
            </MenuItem>
            <MenuItem value={594} onClick={() => this.handleWidthChange(594)}>
              A1 width (59.4cm)
            </MenuItem>
            <MenuItem value={841} onClick={() => this.handleWidthChange(841)}>
              A0 width (84.1cm)
            </MenuItem>
          </Menu>
        </div>
        <div className="freesewing draft svg w100 layout" ref={this.ref}>
          {this.renderPattern()}
        </div>
        <p className="txt-right">
          <Button
            variant="contained"
            color="primary"
            className="mt1"
            onClick={() =>
              this.props.updateSetting("layout", this.distillLayout())
            }
          >
            <FormattedMessage id="app.applyThisLayout" />
          </Button>
        </p>
      </React.Fragment>
    );
  }
}

LayoutBuilder.propTypes = {
  pattern: PropTypes.object.isRequired
};

export default LayoutBuilder;
