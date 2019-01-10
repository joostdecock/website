import React from "react";
import InfoIcon from "@material-ui/icons/Info";
import MeasurementsIcon from "@material-ui/icons/AccessibilityNew";
import TimeIcon from "@material-ui/icons/AccessTime";
import ChestIcon from "@material-ui/icons/Wc";
import HandleIcon from "@material-ui/icons/Fingerprint";
import NameIcon from "@material-ui/icons/Face";
import UnitsIcon from "@material-ui/icons/FormatLineSpacing";
import ImageIcon from "@material-ui/icons/PhotoCamera";
import ActionsIcon from "@material-ui/icons/Directions";
import RemoveIcon from "@material-ui/icons/Delete";
import ShareIcon from "@material-ui/icons/Share";
import GistIcon from "@material-ui/icons/Note";
import DraftIcon from "@material-ui/icons/Gesture";
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
        icon: <NameIcon />
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

export const editDraftFields = {
  info: {
    title: "app.info",
    icon: <InfoIcon />,
    expanded: true,
    items: {
      name: {
        type: "text",
        required: true,
        label: "app.name",
        icon: <NameIcon />
      },
      notes: {
        type: "markdown",
        label: "app.notes",
        icon: <MeasurementsIcon />
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
      },
      gist: {
        type: "button",
        label: "app.gist",
        icon: <GistIcon />
      }
    }
  },
  actions: {
    title: "app.actions",
    icon: <ActionsIcon />,
    items: {
      draft: {
        type: "button",
        label: "app.draft",
        icon: <DraftIcon />
      },
      share: {
        type: "button",
        label: "app.share",
        icon: <ShareIcon />
      },
      remove: {
        type: "button",
        label: "app.remove",
        icon: <RemoveIcon />
      }
    }
  }
};

export const showDraftFields = {
  info: {
    title: "app.info",
    icon: <InfoIcon />,
    items: {
      name: {
        type: "text",
        required: true,
        label: "app.name",
        icon: <NameIcon />
      },
      notes: {
        type: "markdown",
        label: "app.notes",
        icon: <MeasurementsIcon />
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
  }
};
