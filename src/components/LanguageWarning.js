import React from 'react';
import PropTypes from "prop-types";
import Translate from "@material-ui/icons/Translate";

const LanguageWarning = ( props ) => {

  if(props.pathLanguage === props.contentLangauge) return '';
  else return (
      <div className="warning">
        <Translate style={{ fontSize: 80 }}/>
        <h4>This content is not available in your chosen langauge</h4>
        <p>FIXME: Some meaningful text here</p>
      </div>
  );
}

LanguageWarning.propTypes = {
  pathLanguage: PropTypes.string.isRequired,
  contentLanguage: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired
};

export default LanguageWarning;
