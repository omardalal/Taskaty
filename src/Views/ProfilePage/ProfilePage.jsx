import React, { useEffect, useState } from "react";
import { styles } from "./styles.ts";
import { InlineNotification, Tag } from "carbon-components-react";
import { User16 } from "@carbon/icons-react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { getUser } from "../../Utilities/ClassUtils";
import CustomButton from "../../Components/CustomButton/CustomButton";
import useAuth from "../../CustomHooks/useAuth";
import { getProjectByID, getUserProjects } from "../../Utilities/ProjectUtils";
import { createInvitation } from "../../Utilities/InvitationUtils";
import { InvitationType } from "../NotificationsPage/NotificationsPage";

const TagType = { Interests: "Interests", Skills: "Skills" };

const ProfilePage = () => {
  const { userId } = useParams();

  const loggedUser = useAuth(false);

  const [userData, setUserData] = useState();
  const [prjs, setPrjs] = useState([]);
  const [notif, setNotif] = useState({
    type: "success",
    visible: false,
    title: "Invitation Sent",
    subtitle: "You invited userId to join your project"
  });

  useEffect(() => {
    const getUserData = async () => await getUser(userId);

    getUserData()
      .then((userInfo) => {
        setUserData(userInfo);
      })
      .catch((err) => console.error("Failed to get user data, Error: " + err));
  }, []);

  useEffect(() => {
    const getProjects = async () => {
      const projectIds = await getUserProjects(loggedUser.user?.email);
      const projects = await Promise.all(
        projectIds.map(async (prjId) => {
          const prj = await getProjectByID(prjId);
          return { ...prj, ...{ id: prjId } };
        })
      );
      return projects;
    };

    getProjects()
      .then((projects) => {
        setPrjs(projects);
      })
      .catch((err) =>
        console.error(`Failed to get user projects, Error: ${err}`)
      );
  }, [loggedUser]);

  const getDescBox = () => {
    const name = `${userData?.firstName} ${userData?.lastName}`;
    return (
      <div style={styles.boxContainer} className={"defaultBoxShadowBlack"}>
        <h1 style={styles.projectDescTitle}>{name ?? "User Name"}</h1>
        {getInfoRow("Email", userData?.email)}
        {getInfoRow("Country", userData?.country)}
        {getInfoRow("University", userData?.university)}
        {getInfoRow("Major", userData?.major)}
        {getInfoRow("City", userData?.city)}
        {getInfoRow("Graduated", userData?.graduate ? "Yes" : "No")}
        {getInfoRow("Works At", userData?.work)}
      </div>
    );
  };

  const getInfoRow = (name, val) => (
    <>
      {val && (
        <div style={styles.infoRow}>
          <h2
            style={{
              ...styles.homeHeader2,
              ...styles.projectDescriptionTitle
            }}
          >
            {name}
          </h2>
          <p style={styles.projectDescriptionBody}>{val}</p>
        </div>
      )}
    </>
  );

  const getTagsBox = (title, type) => {
    const Interests = userData?.interests;
    const skills = userData?.skills;
    const tags = type === TagType.Skills ? skills : Interests;
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

  const getPrjsBox = () => (
    <div
      style={{ ...styles.boxContainer, ...{ height: "fit-content", flex: 0 } }}
      className={"defaultBoxShadowBlack"}
    >
      <h2
        style={{
          ...styles.homeHeader2,
          ...styles.tagsTitle,
          ...{ fontSize: 20 }
        }}
      >{`Invite ${userData?.firstName} ${userData?.lastName} into one of your projects`}</h2>
      <div style={styles.tagContainer}>
        {prjs?.length > 0 ? (
          prjs?.map((prj, index) => (
            <div style={styles.prjBox} key={index}>
              <h5 style={{ fontWeight: 400, marginRight: 15 }}>{prj.name}</h5>
              <CustomButton
                blackButton
                text={"Invite"}
                onClick={async () => {
                  try {
                    await createInvitation(
                      loggedUser?.user?.email,
                      userData?.email,
                      InvitationType.Project,
                      prj.id
                    );
                    setNotif({
                      type: "success",
                      visible: true,
                      title: "Invitation Sent",
                      subtitle: `You invited ${userId} to join your project`
                    });
                  } catch (err) {
                    setNotif({
                      type: "error",
                      visible: true,
                      title: "Invitation Failed",
                      subtitle: "There was a problem sending your invitation"
                    });
                    console.error("Failed to send invite, Error: " + err);
                  }
                }}
              />
            </div>
          ))
        ) : (
          <h5 style={{ fontWeight: 400 }}>{"You don't have any projects!"}</h5>
        )}
      </div>
    </div>
  );

  return (
    <div style={styles.homeMainContainer}>
      <div style={{ display: "flex" }}>
        {getDescBox()}
        <div style={styles.homeRightContainer}>
          {getTagsBox("User Skills", TagType.Skills)}
          {getTagsBox("User Interests", TagType.Interests)}
        </div>
      </div>
      {notif.visible && (
        <InlineNotification
          title={notif.title}
          kind={notif.type}
          subtitle={notif.subtitle}
          onCloseButtonClick={() => setNotif({ ...notif, visible: false })}
        />
      )}
      {loggedUser?.user?.email !== userId ? getPrjsBox() : null}
    </div>
  );
};

ProfilePage.propTypes = {
  projectData: PropTypes.object
};

export default ProfilePage;
