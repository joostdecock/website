import React from "react";
import BaseLayout from "../layouts/Base";
import Intro from "../homepage/Intro";
import DemoLink from "../homepage/DemoLink";
import HundredPercent from "../homepage/HundredPercent";
import Cards from "../homepage/Cards";
import BecomeAPatron from "../patrons/BecomeAPatron";

const HomePage = props => (
  <BaseLayout>
    <div className="vspacer">&nbsp;</div>
    <Intro />
    <div className="vspacer">&nbsp;</div>
    <DemoLink language={props.pageContext.language} />
    <div className="vspacer">&nbsp;</div>
    <HundredPercent language={props.pageContext.language} />
    <div className="vspacer">&nbsp;</div>
    <Cards language={props.pageContext.language} />
    <div className="vspacer">&nbsp;</div>
    <BecomeAPatron language={props.pageContext.language} />
    <div className="vspacer">&nbsp;</div>
  </BaseLayout>
);

export default HomePage;
