/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './DetailPart.module.css';

const DetailPart = ({
  GivenList,
  maxDisplay,
  title,
  Item,
  extraPropsOnItem,
  showTextIfListIsNone,
  onViewAllonNewPage,
  containerStyle
}) => {
  const initShowAll = maxDisplay === 0 ? true : GivenList.length === maxDisplay;
  const initList = initShowAll ? GivenList : GivenList.slice(0, maxDisplay);
  const max = maxDisplay === 0 ? GivenList.length : maxDisplay;

  const [showAll, setShowAll] = useState(initShowAll);
  const [list, setList] = useState(initList);

  useEffect(() => {
    if (showAll) {
      setList(GivenList);
    } else {
      setList(GivenList.slice(0, max));
    }
  }, [showAll]);

  const toggleShow = () => setShowAll(!showAll);

  return (
    <div className={styles.root}>
      <span className={styles.main}>{title}</span>
      <div className={containerStyle}>
        {list.length !== 0 ? (
          list.map((item, i) => (
            <div
              key={`${title.replaceAll(' ', '_')}_${item.id}_${i.toString()}`}
              id={`${title.replaceAll(' ', '_')}_${item.id}`}
            >
              <Item {...extraPropsOnItem} item={item} />
            </div>
          ))
        ) : (
          <>{showTextIfListIsNone || 'The list is empty'}</>
        )}
      </div>
      {!initShowAll && (
        <div
          className={styles.viewAll}
          aria-hidden
          onClick={() => toggleShow()}
        >
          {showAll ? <>Show less</> : <> Show all </>}
        </div>
      )}
      {onViewAllonNewPage && (
        <div
          className={styles.viewAll}
          onClick={onViewAllonNewPage}
          aria-hidden
        >
          Show All On New Page
        </div>
      )}
    </div>
  );
};

DetailPart.defaultProps = {
  maxDisplay: 5,
  showTextIfListIsNone: undefined,
  onViewAllonNewPage: undefined,
  containerStyle: '',
  extraPropsOnItem: undefined
};

DetailPart.propTypes = {
  GivenList: PropTypes.array.isRequired,
  maxDisplay: PropTypes.number,
  title: PropTypes.string.isRequired,
  Item: PropTypes.element.isRequired,
  showTextIfListIsNone: PropTypes.string,
  onViewAllonNewPage: PropTypes.func,
  containerStyle: PropTypes.string,
  extraPropsOnItem: PropTypes.any
};

export default DetailPart;
