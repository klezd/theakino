/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import ReviewBubble from '../ReviewBubble';
import DetailPart from '../DetailPart/DetailPart';

const Reviews = ({
  title,
  reviewsList,
  display,
  viewAll,
  displayViewAll,
  whiteText,
  viewLongText
}) => {
  const noReviews = reviewsList.length === 0;
  const textLength = viewLongText ? 800 : 250;

  return (
    <div id="reviews-part">
      <DetailPart
        GivenList={reviewsList}
        title={`What other said about "${title}" ?`}
        maxDisplay={display}
        Item={ReviewBubble}
        extraPropsOnItem={{ whiteText, textLength }}
        onViewAllonNewPage={
          !noReviews && displayViewAll ? () => viewAll() : undefined
        }
        showTextIfListIsNone="There is no reviews for this movie yet"
      />
    </div>
  );
};

Reviews.defaultProps = {
  display: 0,
  viewAll: () => {},
  displayViewAll: true,
  whiteText: true,
  viewLongText: false
};

Reviews.propTypes = {
  title: PropTypes.string.isRequired,
  reviewsList: PropTypes.array.isRequired,
  display: PropTypes.number,
  viewAll: PropTypes.func,
  displayViewAll: PropTypes.bool,
  whiteText: PropTypes.bool,
  viewLongText: PropTypes.bool
};

export default Reviews;
