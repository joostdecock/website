import app from "./app.yaml";
import errors from "./errors.yaml";
import i18n from "./i18n.yaml";
import measurements from "./measurements.yaml";
import optiongroups from "./optiongroups.yaml";
import options from "./options.yaml";
import patterns from "./patterns.yaml";
import gdpr from "./gdpr.yaml";
import account from "./account.yaml";

let topics = {
  app,
  errors,
  i18n,
  measurements,
  optiongroups,
  options,
  patterns,
  gdpr,
  account
};

let strings = {};

for (let topic of Object.keys(topics)) {
  for (let id of Object.keys(topics[topic])) {
    strings[topic + "." + id] = topics[topic][id];
  }
}

export default strings;
