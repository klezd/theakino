/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import DetailPart from '../DetailPart/DetailPart';
import YouTubeVideo from '../common/YouTubeVideo/YouTubeVideo';
import styles from './VideosList.module.css';

const VideosList = ({ title, videos, maxDisplay }) => (
  <div className={styles.root} id="Trailers-and-Videos">
    <DetailPart
      GivenList={videos}
      maxDisplay={maxDisplay}
      title={title}
      Item={YouTubeVideo}
      containerStyle={styles.videoContainer}
    />
  </div>
);

VideosList.defaultProps = {
  title: 'Videos',
  maxDisplay: 4
};

VideosList.propTypes = {
  title: PropTypes.string,
  videos: PropTypes.array.isRequired,
  maxDisplay: PropTypes.number
};

export default VideosList;
