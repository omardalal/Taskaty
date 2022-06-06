import React from "react";
import { styles } from "./styles.ts";
import { Tag } from "carbon-components-react";
import { User16 } from "@carbon/icons-react";
import PropTypes from "prop-types";

const TagType = { Members: "Members", Skills: "Skills" };

const ProjectHomePage = ({ projectData }) => {
  const getDescBox = () => {
    return (
      <div style={styles.boxContainer} className={"defaultBoxShadowBlack"}>
        <h1 style={styles.projectDescTitle}>
          {projectData?.name ?? "Project Name"}
        </h1>
        <h2 style={styles.homeHeader2Light}>
          {projectData?.subject ?? "Project Subject"}
        </h2>
        <h2 style={styles.homeHeader2Light}>
          {projectData?.type ?? "Project Type"}
        </h2>
        <h2
          style={{ ...styles.homeHeader2, ...styles.projectDescriptionTitle }}
        >
          Description
        </h2>
        <p style={styles.projectDescriptionBody}>
          {projectData?.description ?? "Project Description"}
        </p>
      </div>
    );
  };

  const getTagsBox = (title, type) => {
    const members = projectData?.members;
    const skills = projectData?.skills;
    const tags = type === TagType.skills ? skills : members;
    return (
      <div style={styles.boxContainer} className={"defaultBoxShadowBlack"}>
        <h2 style={{ ...styles.homeHeader2, ...styles.tagsTitle }}>{title}</h2>
        <div style={styles.tagContainer}>
          {tags?.map((tag, index) => (
            <Tag key={index} type="cool-gray" renderIcon={User16}>
              {tag}
            </Tag>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={styles.homeMainContainer}>
      {getDescBox()}
      <div style={styles.homeRightContainer}>
        {getTagsBox("Project Skills", TagType.skills)}
        {getTagsBox("Project Members", TagType.Members)}
      </div>
    </div>
  );
};

ProjectHomePage.propTypes = {
  projectData: PropTypes.object
};

export default ProjectHomePage;
