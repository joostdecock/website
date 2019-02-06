import React from "react";
import { FormattedMessage } from "react-intl";
import Tray from "./Tray";
import HelpIcon from "@material-ui/icons/Help";
import ChatIcon from "@material-ui/icons/ChatBubbleOutline";
import Button from "@material-ui/core/Button";

const DocsFooter = props => {
  return (
    <Tray
      className="mt2"
      icon={<HelpIcon />}
      title={<FormattedMessage id="app.howCanWeHelpYou" />}
    >
      <p>
        <FormattedMessage id="app.docsFooterMsg" />
      </p>
      <p>
        <FormattedMessage id="app.joinTheChatMsg" />
      </p>
      <p className="txt-center">
        <a
          href="https://gitter.com/freesewing/freesewing"
          target="_BLANK"
          rel="noopener noreferrer"
        >
          <Button color="primary" variant="contained">
            <ChatIcon className="mr05" />
            <FormattedMessage id="email.chatWithUs" />
          </Button>
        </a>
      </p>
    </Tray>
  );
};

export default DocsFooter;
