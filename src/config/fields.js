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
import RemoveIcon from "@material-ui/icons/DeleteForever";
import ShareIcon from "@material-ui/icons/Share";
import GistIcon from "@material-ui/icons/Note";
import DraftIcon from "@material-ui/icons/Gesture";
import UsernameIcon from "@material-ui/icons/PermIdentity";
import EmailIcon from "@material-ui/icons/Email";
import PasswordIcon from "@material-ui/icons/VpnKey";
import NotesIcon from "@material-ui/icons/ChatBubbleOutline";
import PatronIcon from "@material-ui/icons/Favorite";
import LanguageIcon from "@material-ui/icons/Translate";
import { measurementList } from "@freesewing/patterns";
import i18nConfig from "./i18n";
import GithubIcon from "../components/GithubIcon";
import InstagramIcon from "../components/InstagramIcon";
import TwitterIcon from "../components/TwitterIcon";
import ExportIcon from "@material-ui/icons/CloudDownload";
import ConsentIcon from "@material-ui/icons/DoneAll";
import PauseIcon from "@material-ui/icons/PauseCircleFilled";

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

export const viewDraftFields = {
  actions: {
    title: "app.actions",
    icon: <ActionsIcon />,
    expanded: true,
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
      }
    }
  },
  info: {
    title: "app.info",
    icon: <InfoIcon />,
    items: {
      name: {
        type: "text",
        readOnly: true,
        label: "app.name",
        icon: <NameIcon />
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
  }
};

export const accountFields = {
  account: {
    title: "app.account",
    icon: <HandleIcon />,
    expanded: true,
    items: {
      username: {
        type: "username",
        label: "account.username",
        icon: <UsernameIcon />
      },
      email: {
        type: "email",
        label: "account.email",
        icon: <EmailIcon />
      },
      password: {
        type: "password",
        label: "account.password",
        icon: <PasswordIcon />
      },
      bio: {
        type: "markdown",
        label: "account.bio",
        icon: <NotesIcon />
      },
      avatar: {
        type: "image",
        label: "account.avatar",
        icon: <ImageIcon />
      },
      units: {
        type: "radio",
        label: "account.units",
        sub: "settings",
        icon: <UnitsIcon />,
        options: [
          { value: "metric", label: "app.metricUnits" },
          { value: "imperial", label: "app.imperialUnits" }
        ]
      },
      language: {
        type: "radio",
        label: "account.language",
        sub: "settings",
        icon: <LanguageIcon />,
        options: i18nConfig.languages.map(lang => {
          return { value: lang, label: "i18n." + lang };
        })
      },
      github: {
        type: "text",
        sub: "social",
        label: "account.github",
        icon: <GithubIcon />
      },
      twitter: {
        type: "text",
        sub: "social",
        label: "account.twitter",
        icon: <TwitterIcon />
      },
      instagram: {
        type: "text",
        sub: "social",
        label: "account.instagram",
        icon: <InstagramIcon />
      },
      patron: {
        type: "patron",
        label: "account.patron",
        icon: <PatronIcon />
      }
    }
  },
  actions: {
    title: "app.actions",
    icon: <ActionsIcon />,
    items: {
      exportData: {
        type: "link",
        to: "/account/export",
        label: "account.exportYourData",
        icon: <ExportIcon />
      },
      reviewConsent: {
        type: "link",
        to: "/account/consent",
        label: "account.reviewYourConsent",
        icon: <ConsentIcon />
      },
      restrictProcessing: {
        type: "link",
        to: "/account/restrict",
        label: "account.restrictProcessingOfYourData",
        icon: <PauseIcon />
      },
      removeAccount: {
        type: "link",
        to: "/account/remove",
        label: "account.removeYourAccount",
        icon: <RemoveIcon />
      }
    }
  }
};
