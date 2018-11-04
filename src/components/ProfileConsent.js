import React from "react";
import PropTypes from "prop-types";
import ProfileDataIcon from "@material-ui/icons/AccountCircle";
import WhyIcon from "@material-ui/icons/Help";
import TimingIcon from "@material-ui/icons/AccessTime";
import ShareIcon from "@material-ui/icons/Share";
import ConfirmIcon from "@material-ui/icons/CheckCircle";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import { Link } from "gatsby";
import { locLang } from "../utils";
import Button from "@material-ui/core/Button";
import ButtonSpinner from "./ButtonSpinner";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const ProfileConsent = ({
  language,
  intl,
  handleConsentChange,
  handleConsentSubmit,
  loading,
  outro,
  consent
}) => {
  let outroContent = (
    <div>
      <p>
        <FormattedMessage id="gdpr.intro1" />
      </p>
      <p>
        <FormattedMessage id="gdpr.intro2" />
        <br />
        <FormattedMessage id="gdpr.intro3" />
      </p>
      <p>
        <FormattedMessage id="gdpr.intro4" />
      </p>
      <blockquote>
        <Link to={locLang.set("/docs/privacy", language)}>
          <FormattedMessage id="gdpr.intro5" />
        </Link>
      </blockquote>
    </div>
  );
  return (
    <div className="content">
      <h3>
        <FormattedMessage id="gdpr.profileQuestion" />
      </h3>
      <form onSubmit={handleConsentSubmit}>
        <blockquote>
          <RadioGroup
            name="profile-consent"
            onChange={handleConsentChange}
            value={consent}
          >
            <FormControlLabel
              control={<Radio color="primary" />}
              value="no"
              checked={!consent}
              label={intl.formatMessage({ id: "gdpr.noIDoNot" })}
            />
            <FormControlLabel
              control={<Radio color="primary" />}
              checked={consent}
              value="yes"
              label={intl.formatMessage({ id: "gdpr.yesIDo" })}
            />
          </RadioGroup>
          <Button
            type="submit"
            color="primary"
            size="large"
            variant="contained"
            disabled={consent === "yes" ? false : true}
            classes={{ root: "mt10" }}
          >
            <ButtonSpinner
              loading={loading}
              icon={<ConfirmIcon className="btn-icon" />}
            />
            <FormattedMessage id="gdpr.createMyAccount" />
          </Button>
        </blockquote>
      </form>
      <div className="box">
        <h5>
          <FormattedMessage id="gdpr.whatYouNeedToKnow" />
        </h5>
        <h6>
          <ProfileDataIcon className="mr10 not-on-xs" fontSize="inherit" />
          <FormattedMessage id="gdpr.profileWhatQuestion" />
        </h6>
        <ul>
          <li>
            <FormattedHTMLMessage id="gdpr.profileWhatAnswer" />
          </li>
          <li>
            <FormattedHTMLMessage id="gdpr.profileWhatAnswerOptional" />
          </li>
        </ul>
        <h6>
          <WhyIcon className="mr10 not-on-xs" fontSize="inherit" />
          <FormattedMessage id="gdpr.whyQuestion" />
        </h6>
        <ul>
          <li>
            <FormattedHTMLMessage id="gdpr.profileWhyAnswer" />
          </li>
        </ul>
        <h6>
          <TimingIcon className="mr10 not-on-xs" fontSize="inherit" />
          <FormattedMessage id="gdpr.timingQuestion" />
        </h6>
        <ul>
          <li>
            <FormattedHTMLMessage id="gdpr.profileTimingAnswer" />
          </li>
        </ul>
        <h6>
          <ShareIcon className="mr10 not-on-xs" fontSize="inherit" />
          <FormattedMessage id="gdpr.shareQuestion" />
        </h6>
        <ul>
          <li>
            <FormattedHTMLMessage id="gdpr.profileShareAnswer" />
          </li>
        </ul>
      </div>
      {outro ? (
        <div className="box">
          <h4>
            <FormattedMessage id="gdpr.furtherReading" />
          </h4>
          {outroContent}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

ProfileConsent.propTypes = {
  given: PropTypes.bool,
  outro: PropTypes.bool
  //onClose: PropTypes.func
};

ProfileConsent.defaultProps = {
  consent: "no",
  outro: true
};

export default ProfileConsent;
