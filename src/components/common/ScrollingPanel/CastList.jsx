/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import { addDefaultSrc, ImageBaseUri } from '../../../utils';

import styles from './styles.module.css';

const CastList = ({ item, onClickPeople }) => {
  const {
    original_name,
    name,
    profile_path,
    overview,
    id,
    character,
    known_for_department
  } = item;

  const onClickItem = (i) => {
    if (!onClickPeople) return;
    onClickPeople(i);
  };

  return (
    <div
      className={[styles.item, styles.cast].join(' ')}
      id={`people_${original_name}_${id}`}
      onClick={() => onClickItem(id)}
      aria-hidden="true"
    >
      <img
        src={`${ImageBaseUri}/w185/${profile_path.slice(1)}`}
        alt={original_name}
        onError={addDefaultSrc}
        className="avatar"
      />
      <div className={styles.description}>
        <div className={styles.title}>{name}</div>
        <div className={styles.shortview}>
          {`${known_for_department} as ${character}`}
        </div>
      </div>
    </div>
  );
};

CastList.defaultProps = {
  onClickPeople: () => {}
};

CastList.propTypes = {
  item: PropTypes.object.isRequired,
  onClickPeople: PropTypes.func
};

export default CastList;
