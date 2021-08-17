/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
// import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';
import styles from './ReviewBubble.module.css';

import { addDefaultSrc, ImageBaseUri } from '../../utils';
import { formatDate } from '../../utils/time';

import Loading from '../common/Loading/Loading';

const ReviewBubble = ({ item, whiteText, textLength }) => {
  // const history = useHistory();
  if (!item) {
    return <Loading />;
  }
  const { author, author_details, content, created_at, updated_at, url } = item;
  const rootStyle = whiteText ? styles.root : styles.darkroot;

  const seeFull = () => {
    window.open(url, '_blank');
    // history.push(`/reviews/${id}`);
  };

  const getFormattedContent = (c, length) => {
    const newContent = c.slice(0, length);
    const newC = newContent
      .replace(
        /\*\*[A-z0-9]+\*\*/gi,
        `<span style={{fontWeight:'bold'}}>"${newContent}" </span>`
      )
      .replace(/\*\*/gi, '');
    return newC;
  };

  return (
    <div className={rootStyle}>
      <div className={styles.avatar}>
        <img
          src={`${ImageBaseUri}/original${author_details.avatar_path}`}
          onError={addDefaultSrc}
          alt={author}
          className="avatar"
        />
      </div>
      <div className={[styles.bubble, styles.arrow].join(' ')}>
        <div className={styles.title}>
          <div className={styles.info}>
            <span>{`Reviewed on ${formatDate(created_at)}`}</span>
            {created_at !== updated_at && (
              <span>{` and updated on ${formatDate(updated_at)}`}</span>
            )}
          </div>

          <div className={styles.author}>
            <span>
              <span>By &nbsp; </span>
              <span>
                {author_details &&
                (author_details.username || author_details.name) &&
                author_details.username
                  ? author_details.username
                  : author_details.name}
              </span>
            </span>
            {author_details && author_details.rating && (
              <span className={styles.rate}>
                <FontAwesomeIcon icon="star" />
                &nbsp;
                {author_details.rating}
              </span>
            )}
          </div>
        </div>
        <div className={styles.content}>
          {/* <span>{`${getContentFormat(content, 300)}`}</span> */}
          <span>{getFormattedContent(content, textLength)}</span>
          {content.length > 349 && (
            <span onClick={seeFull} aria-hidden>
              ...
            </span>
          )}
        </div>
        <div className={styles.seeAll} onClick={seeFull} aria-hidden>
          View Full Review
        </div>
      </div>
    </div>
  );
};

ReviewBubble.defaultProps = {
  whiteText: true,
  textLength: 250
};

ReviewBubble.propTypes = {
  item: PropTypes.object.isRequired,
  textLength: PropTypes.number,
  whiteText: PropTypes.bool
};

export default ReviewBubble;
