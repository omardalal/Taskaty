import React from "react";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";
import { Tag } from "carbon-components-react";
import { User16 } from "@carbon/icons-react";

const SectionHomePage = ({ classId, sectionId }) => {
  const getDescBox = () => (
    <div style={styles.boxContainer} className={"defaultBoxShadowBlack"}>
      <div style={styles.sectionHomePageTitleRow}>
        <h1 style={styles.courseDescTitle}>Database Design Class</h1>
        <h4>COMP334</h4>
      </div>
      <h2 style={styles.homeHeader2Light}>Section #3</h2>
      <h2 style={styles.homeHeader2Light}>Instructor Name</h2>
      <h2 style={{ ...styles.homeHeader2, ...styles.courseDescriptionTitle }}>
        Description
      </h2>
      <p style={styles.courseDescriptionBody}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel lacinia
        sem. Vivamus sodales leo fermentum lectus condimentum, id vestibulum ex
        maximus. Nam lobortis id mi eget interdum. Etiam quis ultrices eros. Sed
        nec dui ultrices, euismod lectus sit amet, auctor sapien. Nunc venenatis
        leo sed lorem venenatis, a blandit odio mollis. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Nam vel lacinia sem. Vivamus sodales
        leo fermentum lectus condimentum, id vestibulum ex maximus. Nam lobortis
        id mi eget interdum. Etiam quis ultrices eros. Sed nec dui ultrices,
        euismod lectus sit amet, auctor sapien. Nunc venenatis leo sed lorem
        venenatis, a blandit odio mollis.
      </p>
    </div>
  );

  const getMembers = () => {
    return (
      <div>
        <h2 style={{ ...styles.homeHeader2, ...styles.membersTitle }}>
          Section Members
        </h2>
        <div style={styles.membersContainer}>
          {Array.apply(null, Array(27)).map((_, index) => (
            <Tag key={index} type="cool-gray" renderIcon={User16}>
              Member Name {index + 1}
            </Tag>
          ))}
        </div>
      </div>
    );
  };

  const getInfoBox = () => (
    <div style={styles.boxContainer} className={"defaultBoxShadowBlack"}>
      <div style={styles.homeInfoTopRow}>
        <div style={styles.homeInfoCol}>
          <h2 style={styles.homeHeader2}>Class Information</h2>
          <p>4 Sections</p>
          <p>124 Students</p>
          <p>26 Groups</p>
        </div>
        <div style={styles.homeInfoCol}>
          <h2 style={styles.homeHeader2}>Section Information</h2>
          <p>30 Students</p>
          <p>8 Groups</p>
        </div>
      </div>
      {getMembers()}
    </div>
  );

  return (
    <div style={styles.homeMainContainer}>
      {getDescBox()}
      <div>{getInfoBox()}</div>
    </div>
  );
};

SectionHomePage.propTypes = {
  classId: PropTypes.string,
  sectionId: PropTypes.string
};

export default SectionHomePage;
