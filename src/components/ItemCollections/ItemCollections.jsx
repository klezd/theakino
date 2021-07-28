/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import TabContext from '@material-ui/lab/TabContext';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '@material-ui/lab/TabPanel';
import Paper from '@material-ui/core/Paper';
import ScrollingPanel from '../common/ScrollingPanel/ScrollingPanel';

import styles from './ItemCollections.module.css';
import Loading from '../common/Loading/Loading';

const ItemCollections = ({
  collections,
  onClickItem,
  onClickOpenAll,
  type
}) => {
  const [tab, setTab] = React.useState(0);

  const tablabel = (t) => (
    <span className={styles.tablabel}>{t.replaceAll('_', ' ')}</span>
  );

  if (collections.length === 0) {
    return (
      <div className={styles.root}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <TabContext value={tab}>
        <Paper elevation={3}>
          <Tabs
            value={tab}
            onChange={(e, index) => setTab(index)}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {/* <Tab label="Now Playing" />
            <Tab label="Upcoming" /> */}
            {collections.map((collection) => (
              <Tab label={tablabel(collection.set)} />
            ))}
          </Tabs>
          {collections.length !== 0 &&
            collections.map((collection, i) => {
              const { data, loading, set } = collection;
              return (
                <TabPanel value={i}>
                  {data && (
                    <ScrollingPanel
                      items={data}
                      loading={loading}
                      onClickItem={onClickItem}
                      showItems={10}
                      withViewMore
                      onClickExtra={() => onClickOpenAll(set)}
                      viewAllAsBtn
                      type={type}
                    />
                  )}
                </TabPanel>
              );
            })}
        </Paper>
      </TabContext>
    </div>
  );
};

ItemCollections.defaultProps = {
  onClickItem: () => {},
  onClickOpenAll: () => {},
  type: 'movie'
};

ItemCollections.propTypes = {
  collections: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.object,
      loading: PropTypes.bool,
      set: PropTypes.string
    })
  ).isRequired,
  onClickItem: PropTypes.func,
  onClickOpenAll: PropTypes.func,
  type: PropTypes.oneOf(['tv', 'movie'])
};

export default ItemCollections;
