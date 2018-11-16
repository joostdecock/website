import React from "react";
import BaseLayout from "../layouts/Base";
import HomePageText from "../HomePageText";
import MeasurementImages from "../MeasurementImage";

const HomePage = () => (
  <BaseLayout>
    <HomePageText />
    <MeasurementImages measurement="chestcircumference" breasts={false} />
  </BaseLayout>
);

export default HomePage;
