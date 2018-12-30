import React from "react";
//import BaseLayout from "../layouts/Base";
//import patterns from "@freesewing/patterns";
//import svgattrPlugin from "@freesewing/plugin-svgattr";
//import i18nPlugin from "@freesewing/plugin-i18n";
//import validatePlugin from "@freesewing/plugin-validate";
//import debugPlugin from "@freesewing/plugin-debug";

class Test extends React.Component {
  state = {
    svg: false,
    pattern: false
  };
  //  componentDidMount() {
  //    let pattern = new patterns.Simon({
  //      foo: "aaron",
  //      sa: 10,
  //      embed: true,
  //      rubo: 2,
  //      measurements: {
  //          "bicepsCircumference": 335,
  //          "centerBackNeckToWaist": 520,
  //          "chestCircumference": 1080,
  //          "hipsCircumference": 990,
  //          "naturalWaist": 925,
  //          "naturalWaistToHip": 145,
  //          "neckCircumference": 420,
  //          "shoulderSlope": 55,
  //          "shoulderToElbow": 410,
  //          "shoulderToShoulder": 465,
  //          "shoulderToWrist": 680,
  //          "wristCircumference": 190,
  //          "seatCircumference": 1080,
  //          "inseam": 910,
  //          "seatDepth": 200,
  //          "hipsToUpperLeg": 220,
  //          "upperLegCircumference": 630,
  //          "headCircumference": 590,
  //          "naturalWaistToFloor": 1310,
  //          "naturalWaistToSeat": 280
  //      },
  //      options: {
  //        cuffStyle: "roundedBarrelCuff",
  //        hemStyle: "baseball",
  //      },
  //      only: "front"
  //    });
  //    console.log(pattern);
  //    pattern
  //      .use(svgattrPlugin, { class: "fs-draft preview" })
  //      //.use(i18nPlugin)
  //      //.use(validatePlugin)
  //      //.use(debugPlugin);
  //
  //    pattern.draft();
  //    this.setState({
  //      pattern: pattern,
  //      svg: pattern.render()
  //    });
  //  }
  render() {
    return "";
    //return (
    //  <BaseLayout>
    //    <h1>test</h1>
    //    <div
    //      className="freesewing draft svg w100"
    //      dangerouslySetInnerHTML={{ __html: this.state.svg }}
    //    />
    //  </BaseLayout>
    //);
  }
}

export default Test;
