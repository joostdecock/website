import React from "react";
import BaseLayout from "../layouts/Base";
import { patterns } from "@freesewing/patterns";
import svgattrPlugin from "@freesewing/plugin-svgattr";
//import i18nPlugin from "@freesewing/plugin-i18n";
//import validatePlugin from "@freesewing/plugin-validate";
//import debugPlugin from "@freesewing/plugin-debug";

class Test extends React.Component {
  state = {
    svg: false,
    pattern: false
  };

  //  componentDidMount() {
  //    let patternA = new patterns[this.state.pattern]({
  //      foo: "aaron",
  //      sa: 10,
  //      embed: true,
  //      rubo: 2,
  //      measurements: {
  //        bicepsCircumference: 335,
  //        centerBackNeckToWaist: 520,
  //        chestCircumference: 1080,
  //        naturalWaistToHip: 145,
  //        neckCircumference: 420,
  //        shoulderSlope: 55,
  //        shoulderToShoulder: 465,
  //        shoulderToWrist: 680,
  //        wristCircumference: 190,
  //        hipsCircumference: 990
  //      }
  //    }).with(svgattrPlugin, { class: "fs-draft preview" });
  //    //.with(i18nPlugin)
  //    //.with(validatePlugin)
  //    //.with(debugPlugin);
  //
  //    patternA.draft();
  //    this.setState({
  //      pattern: patternA,
  //      svg: patternA.render()
  //    });
  //  }
  //
  //          dangerouslySetInnerHTML={{ __html: this.state.svg }}
  render() {
    return (
      <BaseLayout>
        <h1>test</h1>
        <div className="freesewing draft svg w100" />
      </BaseLayout>
    );
  }
}

export default Test;
