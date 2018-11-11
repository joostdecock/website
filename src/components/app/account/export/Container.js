import React from "react";
import { connect } from "react-redux";
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from "react-intl";
import Button from "@material-ui/core/Button";
import backend from "../../../../backend";
import ExportIcon from "@material-ui/icons/CloudDownload";
import ButtonSpinner from "../../../ButtonSpinner";

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
      <div className="content">
        <h1>
          <FormattedMessage id="account.exportYourData" />
        </h1>
        <p>
          <FormattedMessage id="account.exportYourDataTitle" />
        </p>
        <Button
          className="mr10"
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
        <div className="box">
          <h5>
            <FormattedMessage id="account.exportYourData" />
          </h5>
          <p>
            <FormattedHTMLMessage id="account.exportYourDataInfo" />
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  notification: state.notification
});

export default connect(mapStateToProps)(injectIntl(AccountExportContainer));
