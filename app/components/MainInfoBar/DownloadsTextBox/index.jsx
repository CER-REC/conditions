import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import ShareIcon from '../../ShareIcon';

import './styles.scss';

library.add(
  faFileDownload,
);

const DownloadsTextBox = () => (
  <div className="DownloadsTextBox">
    <ShareIcon
      className="ShareIcon"
      key="download-data"
      icon="file-download"
      prefix="fas"
    />
    <h1>Download Data</h1>
    <p>Click
      <button
        type="button"
      >
        here
      </button>
      to download the dataset in Microsoft Excel format (.xlsx)
    </p>
    <ShareIcon
      className="ShareIcon"
      key="download-image"
      icon="file-download"
      prefix="fas"
    />
    <h1>Download Image</h1>
    <p>Click
      <button
        type="button"
      >
        here
      </button>
      to download a screenshot of your current view.
    </p>
  </div>
);

export default DownloadsTextBox;
