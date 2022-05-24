import React from "react";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";
import { Tag } from "carbon-components-react";
import { User16 } from "@carbon/icons-react";

const TagType = { Members: "Members", Skills: "Skills" };

const ProjectHomePage = () => {
  const getDescBox = () => {
    return (
      <div style={styles.boxContainer} className={"defaultBoxShadowBlack"}>
        <h1 style={styles.projectDescTitle}>{"Project Name"}</h1>
        <h2 style={styles.homeHeader2Light}>{"Project Subject"}</h2>
        <h2 style={styles.homeHeader2Light}>{"Project Type"}</h2>
        <h2
          style={{ ...styles.homeHeader2, ...styles.projectDescriptionTitle }}
        >
          Description
        </h2>
        <p style={styles.projectDescriptionBody}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel
          lacinia sem. Vivamus sodales leo fermentum lectus condimentum, id
          vestibulum ex maximus. Nam lobortis id mi eget interdum. Etiam quis
          ultrices eros. Sed nec dui ultrices, euismod lectus sit amet, auctor
          sapien. Nunc venenatis leo sed lorem venenatis, a blandit odio mollis.
        </p>
      </div>
    );
  };

  const getTagsBox = (title, type) => {
    const members = ["Omar Dalal", "Omar Dalal", "Omar Dalal", "Omar Dalal"];
    const skills = ["Data Structure", "A.I", "Coding", "Design"];
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

export default ProjectHomePage;
