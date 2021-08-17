/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import Rating from '@material-ui/lab/Rating';

import { ImageBaseUri } from '../../utils';
import theme from '../../utils/theme';
import { formatDate, getTimeByMinute } from '../../utils/time';

import styles from './HeadingPart.module.css';
import Loading from '../common/Loading/Loading';

const HeadingPart = ({ item, media }) => {
  if (!item) {
    return <Loading />;
  }

  const {
    adult,
    backdrop_path,
    poster_path,
    genres,
    title,
    name,
    original_language,
    original_title,
    original_name,
    overview,
    vote_average,
    production_countries,
    status,
    tagline,
    spoken_languages,
    release_date,
    homepage,
    runtime
  } = item;

  const onClickHomepage = () => {
    window.open(homepage, '_blank');
  };

  return (
    <div
      className={styles.root}
      style={{ color: theme.palette.primary.contrastText }}
    >
      <div className={styles.headBox}>
        <div className={styles.heading}>
          {backdrop_path !== null ? (
            <img src={`${ImageBaseUri}/original${backdrop_path}`} alt={title} />
          ) : (
            <img src={`${ImageBaseUri}/original/${backdrop_path}`} alt="" />
          )}
        </div>

        <div className={styles.poster}>
          <img src={`${ImageBaseUri}/w300${poster_path}`} alt={title} />
        </div>

        <div className={styles.titleBox}>
          <div className={styles.title}>
            <div className={styles.main}>
              {media === 'movie' ? title : name}
            </div>
            {adult && <div className={styles.sub}>18+</div>}
          </div>
          {original_title && original_title !== title && (
            <div className={styles.subTitle}>
              &lang;&lang; Original name: &nbsp;
              <span className={styles.main} style={{ fontWeight: 500 }}>
                {media === 'movie' ? original_title : original_name}
              </span>
              &nbsp;&rang;&rang;
            </div>
          )}
          {tagline && (
            <div
              className={styles.subTitle}
              style={{
                fontStyle: 'italic',
                color: theme.palette.secondary.dark
              }}
            >
              {`"${tagline}"`}
            </div>
          )}
          {genres && (
            <div className={styles.genres}>
              {genres &&
                genres.map((g, i) => (
                  <Chip
                    key={`genre_${g.name}_${g.id}_${i.toString()}`}
                    label={g.name}
                    color="secondary"
                  />
                ))}
            </div>
          )}
          {homepage ? (
            <div
              className={styles.homepageUrl}
              onClick={() => onClickHomepage()}
              aria-hidden
              style={{ color: theme.palette.primary.light }}
            >
              View movie homepage from here
            </div>
          ) : (
            <Tooltip label={`This ${media} does not have its homepage yet`}>
              <div
                className={styles.homepageUrl}
                style={{ color: theme.palette.primary.light }}
              >
                View movie homepage from here
              </div>
            </Tooltip>
          )}
        </div>

        <div className={styles.statusBox}>
          {status && <Chip label={status} color="secondary" />}
          {vote_average && (
            <div>
              <Rating
                defaultValue={parseFloat((vote_average / 2).toFixed(2))}
                precision={0.25}
                readOnly
              />
              <br />
              <span>{`(Rating: ${vote_average})`}</span>
            </div>
          )}
        </div>
      </div>

      <div
        className={styles.infoBox}
        style={{ color: theme.palette.primary.contrastText }}
      >
        <div className={styles.overview}>
          <span>Overview</span>
          <br />
          <p>{overview}</p>
        </div>
        <div className={styles.info}>
          <span>Movie Info</span>
          <div>
            {release_date && (
              <p>
                Release on &nbsp;
                {formatDate(release_date)}
              </p>
            )}
            {runtime && (
              <p>
                Duration: &nbsp;
                {getTimeByMinute(runtime)}
              </p>
            )}
            {original_language && (
              <p>
                Original in &nbsp;
                {original_language}
              </p>
            )}
            {spoken_languages && (
              <p>
                Available in &nbsp;
                {spoken_languages.map((l, i) => (
                  <Tooltip
                    key={`${l.name}_${i.toString()}`}
                    label={l.english_name}
                    aria-label={l.english_name}
                  >
                    <Chip label={l.name} />
                  </Tooltip>
                ))}
              </p>
            )}
            {production_countries && (
              <p>
                Production in &nbsp;
                {production_countries.map((c, i) => {
                  if (i < production_countries.length - 1) {
                    return (
                      <Fragment key={`productions_countries_${c.name}`}>
                        {`${c.name}, `}
                      </Fragment>
                    );
                  }
                  return (
                    <Fragment key={`productions_countries_${c.name}`}>
                      {c.name}
                    </Fragment>
                  );
                })}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

HeadingPart.defaultProps = {
  media: 'movie'
};

HeadingPart.propTypes = {
  item: PropTypes.object.isRequired,
  media: PropTypes.oneOf(['tv', 'movie'])
};

export default HeadingPart;
