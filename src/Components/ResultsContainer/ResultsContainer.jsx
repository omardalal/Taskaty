import React, { useState } from "react";
import { styles } from "./styles.ts";
import { Pagination } from "carbon-components-react";
import strings from "../../Constants/strings";
import PropTypes from "prop-types";
import ResultItem from "../ResultItem/ResultItem";

const DEFAULT_PAGE_SIZE = 20;

const ResultsContainer = ({
  resultsTitle,
  results,
  resultIconType,
  rightButtons
}) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(DEFAULT_PAGE_SIZE);
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
            .map((result, index) => (
              <ResultItem
                key={index}
                title={result.title}
                subtitle={result.subtitle}
                extraInfo={result.extraInfo}
                buttonText={result.buttonText}
                onPressGoToUrl={result.visitURL ?? undefined}
                resultIconType={resultIconType}
              />
            ))
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
        pageSize={DEFAULT_PAGE_SIZE}
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
