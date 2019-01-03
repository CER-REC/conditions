import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const DownloadsTextBox = () => (
  <div className="downloads-text-box">
    <img
      src=""
      alt="download data icon"
    />
    <h1>Download Data</h1>
    <p>Click
      <button>here</button>
      to download the dataset in Microsoft Excel format (.xlsx)
    </p>
    <img
      src=""
      alt="download screenshot icon"
    />
    <h1>Download Image</h1>
    <p>Click
      <button>here</button>
      to download a screenshot of your current view.
    </p>
  </div>
);

export default DownloadsTextBox;
