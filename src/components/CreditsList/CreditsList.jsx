/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import ScrollingPanel from '../common/ScrollingPanel/ScrollingPanel';
import styles from './CreditsList.module.css';

const CreditsList = ({ title, loading, itemsList, clickItem, clickExtra }) => (
  <div className={styles.root}>
    <span className={styles.main}>{title}</span>

    <ScrollingPanel
      items={itemsList}
      showItems={5}
      loading={loading}
      onClickItem={clickItem}
      autoScroll={false}
      type="people"
      withViewMore
      onClickExtra={clickExtra}
    />
  </div>
);

CreditsList.defaultProps = {
  loading: true,
  title: 'Credits'
};

CreditsList.propTypes = {
  itemsList: PropTypes.array.isRequired,
  clickItem: PropTypes.func.isRequired,
  clickExtra: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  title: PropTypes.string
};

export default CreditsList;
