import React from "react";
import BaseLayout from "../layouts/Base";
import HomePageText from "../HomePageText";
import MeasurementImages from "../MeasurementImage";
import Tray from "../Tray";

const HomePage = () => (
  <BaseLayout>
    <HomePageText />
    <Tray className="my1 success" title="Test title" footer="ho ho">
      <p>Tray contents here</p>
    </Tray>
    <Tray className="my1 warning" title="Test title" footer="ho ho">
      <p>Tray contents here</p>
    </Tray>
    <Tray className="my1 danger" title="Test title" footer="ho ho">
      <p>Tray contents here</p>
    </Tray>
    <Tray className="my1 accent" title="Test title" footer="ho ho">
      <p>Tray contents here</p>
    </Tray>
    <Tray className="my1 link" title="Test title" footer="ho ho">
      <p>Tray contents here</p>
    </Tray>
    <Tray title="Test title" footer="ho ho">
      <p>Tray contents here</p>
    </Tray>
  </BaseLayout>
);

export default HomePage;
