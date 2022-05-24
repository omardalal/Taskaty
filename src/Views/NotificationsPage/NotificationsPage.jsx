import React from "react";
import { styles } from "./styles.ts";
import useAuthRedirect from "../../CustomHooks/useAuthRedirect";
import {
  UserFollow24,
  CheckmarkFilled24,
  CloseFilled24,
  Information24
} from "@carbon/icons-react";

const NotificationType = { Response: "Response", Request: "Request" };

const NotificationsPage = () => {
  useAuthRedirect(true);

  const getNotification = (type) => (
    <div className={"defaultBoxShadowBlack"} style={styles.notification}>
      {type === NotificationType.Request ? (
        <UserFollow24 style={styles.leftIcon} />
      ) : (
        <Information24 style={styles.leftIcon} />
      )}
      <div style={styles.notificationBody}>
        <h4 style={{ fontSize: 17, fontWeight: "450" }}>Title</h4>
        <p style={{ fontSize: 15 }}>Body text text text text text text text!</p>
      </div>
      {type === NotificationType.Request && (
        <div style={styles.requestNotiBtns}>
          <CheckmarkFilled24 style={styles.requestIcon(true)} />
          <CloseFilled24 style={styles.requestIcon(false)} />
        </div>
      )}
    </div>
  );

  return (
    <div style={styles.mainContainer}>
      <h1 style={styles.pageTitle}>{"Notifications"}</h1>
      <div style={styles.notificationsContainer}>
        {getNotification(NotificationType.Request)}
        {getNotification(NotificationType.Response)}
        {getNotification(NotificationType.Request)}
        {getNotification(NotificationType.Response)}
        {getNotification(NotificationType.Request)}
        {getNotification(NotificationType.Response)}
        {getNotification(NotificationType.Request)}
      </div>
    </div>
  );
};

export default NotificationsPage;
