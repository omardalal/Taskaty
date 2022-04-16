import React, { useState } from "react";
import { styles } from "./styles.ts";
import { Pagination } from "carbon-components-react";
import {
  User32,
  Task32,
  Notebook32,
  NotAvailable32
} from "@carbon/icons-react";
import strings from "../../Constants/strings";
import PropTypes from "prop-types";

const DEFAUT_PAGE_SIZE = 20;
export const ResultIconTypes = {
  User: "user",
  Project: "project",
  Class: "class"
};

const ResultsContainer = ({
  resultsTitle,
  results,
  resultIconType,
  rightButtons
}) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(DEFAUT_PAGE_SIZE);

  const getIcon = () => {
    if (resultIconType === ResultIconTypes.User) {
      return <User32 style={styles.resultItemIcon} />;
    }
    if (resultIconType === ResultIconTypes.Project) {
      return <Task32 style={styles.resultItemIcon} />;
    }
    if (resultIconType === ResultIconTypes.Class) {
      return <Notebook32 style={styles.resultItemIcon} />;
    }
    return <NotAvailable32 style={styles.resultItemIcon} />;
  };

  const getResultItem = (key, title, subtitle, extraInfo, buttonText) => (
    <div key={key} style={styles.resultItem}>
      {getIcon()}
      <div style={styles.resultItemText}>
        <h4 style={styles.resultItemTitle}>{title}</h4>
        <h5 style={styles.resultItemSubtitle}>{subtitle}</h5>
        <h5 style={styles.resultItemSubtitle}>{extraInfo}</h5>
      </div>
      <div style={styles.resultItemVisitBtn}>{buttonText}</div>
    </div>
  );

  const getResultsBox = () => (
    <div style={styles.resultsBox}>
      <div style={styles.titleBar}>
        <h2 style={styles.resultsTitle}>{resultsTitle}</h2>
        <div style={styles.rightButtonsContainer}>{rightButtons}</div>
      </div>
      <div style={styles.resultItemsContainer}>
        {results?.length ? (
          results
            .slice(
              (currentPageNumber - 1) * currentPageSize,
              currentPageNumber * currentPageSize
            )
            .map((result, index) => {
              return getResultItem(
                index,
                result.title,
                result.subtitle,
                result.extraInfo,
                result.buttonText
              );
            })
        ) : (
          <h5>{strings.noResults}</h5>
        )}
      </div>
    </div>
  );

  const getPageBar = () => (
    <div style={styles.paginationContainer}>
      <Pagination
        backwardText={strings.prevPage}
        forwardText={strings.nextPage}
        itemsPerPageText={strings.itemsPerPage}
        onChange={(page) => {
          setCurrentPageNumber(page.page);
          setCurrentPageSize(page.pageSize);
        }}
        page={currentPageNumber}
        pageSize={DEFAUT_PAGE_SIZE}
        pageSizes={[
          {
            text: "20",
            value: 20
          },
          {
            text: "30",
            value: 30
          },
          {
            text: "40",
            value: 40
          }
        ]}
        size="md"
        totalItems={results?.length}
      />
    </div>
  );
  return (
    <div style={styles.mainContainer} className={"defaultBoxShadowBlack"}>
      {getResultsBox()}
      {getPageBar()}
    </div>
  );
};

ResultsContainer.propTypes = {
  resultsTitle: PropTypes.string,
  results: PropTypes.array,
  resultIconType: PropTypes.string,
  rightButtons: PropTypes.element
};

export default ResultsContainer;