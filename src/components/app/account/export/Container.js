import React from "react";
import { connect } from "react-redux";
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from "react-intl";
import Button from "@material-ui/core/Button";
import backend from "../../../../backend";
import ExportIcon from "@material-ui/icons/CloudDownload";
import ButtonSpinner from "../../../ButtonSpinner";
import Breadcrumbs from "../../../Breadcrumbs";
import Tray from "../../../Tray";
import TwoColumns from "../../../TwoColumns";
import Column from "../../../Column";
import WhyIcon from "@material-ui/icons/Help";
import { Link } from "gatsby";
import { locLang } from "../../../../utils";

class AccountExportContainer extends React.Component {
  state = { loading: false };

  handleExport = key => {
    this.setState({ loading: true });
    backend
      .export()
      .then(res => {
        if (res.status === 200) {
          window.location.href = res.data.export;
          this.setState({ loading: false });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <div>
        <Breadcrumbs via={[{ link: "/account", label: "app.settings" }]}>
          <FormattedMessage id="account.exportYourData" />
        </Breadcrumbs>
        <h1>
          <FormattedMessage id="account.exportYourData" />
        </h1>
        <TwoColumns>
          <Column>
            <p>
              <FormattedMessage id="account.exportYourDataTitle" />
            </p>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={this.state.loading ? true : false}
              onClick={this.handleExport}
            >
              <ButtonSpinner
                loading={this.state.loading}
                icon={<ExportIcon className="btn-icon" />}
              />
              <FormattedMessage id="app.download" />
            </Button>
          </Column>
          <Column side="right">
            <Tray
              className="my1"
              icon={<WhyIcon />}
              title={<FormattedMessage id="app.whatIsThis" />}
              footer={
                <Link
                  to={locLang.set(
                    "/docs/rights",
                    locLang.get(this.props.location)
                  )}
                >
                  <Button>
                    <FormattedMessage id="app.yourRights" />
                  </Button>
                </Link>
              }
            >
              <p>
                <FormattedHTMLMessage id="account.exportYourDataInfo" />
              </p>
              <p>
                <FormattedMessage id="gdpr.readRights" />
              </p>
            </Tray>
          </Column>
        </TwoColumns>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  notification: state.notification
});

export default connect(mapStateToProps)(injectIntl(AccountExportContainer));
