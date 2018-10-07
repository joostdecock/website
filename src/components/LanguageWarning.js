import React from 'react';
import PropTypes from "prop-types";
import Translate from "@material-ui/icons/Translate";

const LanguageWarning = ( props ) => {

  if(props.show === false) return '';
  else return (
      <div className="warning">
        <Translate style={{ fontSize: 80 }}/>
        <h4>{props.title}</h4>
        <p>{props.message}</p>
      </div>
  );
}

LanguageWarning.propTypes = {
  pathLanguage: PropTypes.string.isRequired,
  contentLanguage: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired
};

export default LanguageWarning;
