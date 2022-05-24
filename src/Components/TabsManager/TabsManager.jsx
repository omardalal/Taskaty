import React from "react";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";

/**
 * tabTitles: string array of tab titles
 */

const TabsManager = ({ tabTitles, selectedIndex, setSelectedIndex }) => {
  const renderTab = (index, tabTitle) => (
    <div
      style={styles.tab(index === selectedIndex)}
      onClick={() => {
        setSelectedIndex(index);
      }}
    >
      <h4 style={styles.tabTitle(index === selectedIndex)}>{tabTitle}</h4>
    </div>
  );
  return (
    <div style={styles.mainContainer}>
      {tabTitles.map((tabTitle, index) => renderTab(index, tabTitle))}
    </div>
  );
};

TabsManager.propTypes = {
  tabTitles: PropTypes.object,
  selectedIndex: PropTypes.number,
  setSelectedIndex: PropTypes.func
};

export default TabsManager;
