import React from "react";
import InfoIcon from "@material-ui/icons/Info";
import MeasurementsIcon from "@material-ui/icons/AccessibilityNew";
import TimeIcon from "@material-ui/icons/AccessTime";
import ChestIcon from "@material-ui/icons/Wc";
import HandleIcon from "@material-ui/icons/Fingerprint";
import NameIcon from "@material-ui/icons/Face";
import UnitsIcon from "@material-ui/icons/FormatLineSpacing";
import ImageIcon from "@material-ui/icons/PhotoCamera";
import { measurementList } from "@freesewing/patterns";

let measurements = {
  title: "app.measurements",
  icon: <MeasurementsIcon />,
  items: {}
};
for (let m of measurementList) {
  measurements.items[m] = {
    type: "distance",
    label: "measurements." + m,
    icon: <MeasurementsIcon />,
    sub: "measurements"
  };
}
export const modelFields = {
  info: {
    expanded: true,
    title: "app.info",
    icon: <InfoIcon />,
    items: {
      name: {
        type: "text",
        required: true,
        label: "app.name",
        icon: <NameIcon />,
        classes: { title: "test" }
      },
      notes: {
        type: "markdown",
        label: "app.notes",
        icon: <MeasurementsIcon />
      },
      picture: {
        type: "image",
        label: "account.avatar",
        icon: <ImageIcon />
      },
      breasts: {
        type: "radio",
        label: "app.chest",
        icon: <ChestIcon />,
        options: [
          { value: false, label: "app.withoutBreasts" },
          { value: true, label: "app.withBreasts" }
        ]
      },
      units: {
        type: "radio",
        label: "account.units",
        icon: <UnitsIcon />,
        options: [
          { value: "metric", label: "app.metricUnits" },
          { value: "imperial", label: "app.imperialUnits" }
        ]
      },
      handle: {
        readOnly: true,
        type: "text",
        label: "app.handle",
        icon: <HandleIcon />
      },
      created: {
        readOnly: true,
        type: "timestamp",
        label: "app.created",
        icon: <TimeIcon />
      }
    }
  },
  measurements
};

export const measurementsForBreasts = ["underbust"];
