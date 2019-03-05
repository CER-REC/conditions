import React from 'react';
import PropTypes from 'prop-types';

const MethodologyTextBox = props => (
  <div className="MethodologyTextBox">
    <h1>Methodology</h1>
    <p className="first">
      Click <a href={props.pdfUrl} target="_blank" rel="noopener noreferrer">here</a> to download a PDF file explaining
      our data collection methodology.
    </p>
    <h1>Keywords</h1>
    <p className="first">[Placeholder for an explanation of...]</p>
  </div>
);

MethodologyTextBox.propTypes = {
  pdfUrl: PropTypes.string.isRequired,
};

export default MethodologyTextBox;
