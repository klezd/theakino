/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const YoutubeEmbed = ({ item }) => {
  if (!item) {
    return <></>;
  }
  const { key, name } = item;
  return (
    <>
      <div className={styles.videoframe}>
        <iframe
          width="853"
          height="480"
          src={`https://www.youtube.com/embed/${key}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={name}
        />
      </div>
      <p>{name}</p>
    </>
  );
};

YoutubeEmbed.propTypes = {
  item: PropTypes.object.isRequired
};

export default YoutubeEmbed;
