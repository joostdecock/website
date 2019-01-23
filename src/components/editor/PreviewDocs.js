import React from "react";

const PreviewDocs = props => {
  return (
    <React.Fragment>
      <h1>{props.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: props.html }} />
    </React.Fragment>
  );
};

export default PreviewDocs;
