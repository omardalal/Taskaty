import React, { useEffect, useState } from "react";
import { styles } from "./styles.ts";
import useAuthRedirect from "../../CustomHooks/useAuthRedirect";
import {
  UserFollow24,
  CheckmarkFilled24,
  CloseFilled24,
  Information24,
  WarningFilled24
} from "@carbon/icons-react";
import {
  acceptInvitation,
  enrichInvites,
  getAllInvitations,
  rejectInvitation
} from "../../Utilities/InvitationUtils";
import { limitToLast } from "firebase/firestore";
import { addToGroup } from "../../Utilities/ClassUtils";
import { addMemberToProject } from "../../Utilities/ProjectUtils";

export const NotificationStatus = {
  Pending: "pending",
  Accepted: "accepted",
  Rejected: "rejected"
};

export const InvitationType = {
  Project: "project",
  Group: "group"
};

const NotificationsPage = () => {
  const loggedUser = useAuthRedirect(true);
  const [notifs, setNotifs] = useState([]);
  const [fetchedNotifs, setFetchedNotifs] = useState(false);
  const [fullyFetchedNotifs, setFullyFetchedNotifs] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const getNotifications = async () => {
      return await getAllInvitations(loggedUser?.user?.email);
    };
    getNotifications()
      .then((notifications) => {
        setNotifs(notifications);
        setFetchedNotifs(true);
      })
      .catch((err) =>
        console.error("Failed to get user notifications, Error: " + err)
      );
  }, [loggedUser, fullyFetchedNotifs, refresh]);

  useEffect(() => {
    if (!fullyFetchedNotifs && fetchedNotifs) {
      const enrichNotifications = async () => {
        return await enrichInvites(notifs);
      };
      enrichNotifications()
        .then((enrichedNotifs) => {
          if (!enrichedNotifs?.receivedGroupInvitations) {
            return;
          }
          setNotifs(enrichedNotifs);
          setFullyFetchedNotifs(true);
        })
        .catch((err) =>
          console.error("Failed to get enriched notifications, Error: " + err)
        );
    }
  }, [loggedUser, fullyFetchedNotifs, fetchedNotifs, notifs]);

  const getNotification = (sent, notif) => {
    const getRightIcons = () => {
      if (notif.status === NotificationStatus.Pending && !sent) {
        return (
          <>
            <CheckmarkFilled24
              style={styles.requestIcon(NotificationStatus.Accepted, true)}
              onClick={async () => {
                try {
                  await acceptInvitation(notif.id);
                  setRefresh((prv) => prv + 1);
                  setFetchedNotifs(false);
                  if (notif?.type === InvitationType.Group) {
                    return await addToGroup(
                      notif?.targetId,
                      notif?.joinRequest ? notif?.fromUserId : notif?.toUserId
                    );
                  }
                  if (notif?.type === InvitationType.Project) {
                    return await addMemberToProject(
                      notif?.toUserId,
                      notif?.targetId
                    );
                  }
                } catch (err) {
                  console.error("Failed to accept invite, Error: " + err);
                }
              }}
            />
            <CloseFilled24
              onClick={async () => {
                await rejectInvitation(notif.id);
              }}
              style={styles.requestIcon(NotificationStatus.Rejected, true)}
            />
          </>
        );
      }
      if (notif.status === NotificationStatus.Pending && sent) {
        return (
          <>
            <WarningFilled24
              style={styles.requestIcon(NotificationStatus.Pending, true)}
            />
          </>
        );
      }
      if (notif.status === NotificationStatus.Accepted) {
        return (
          <CheckmarkFilled24
            style={styles.requestIcon(NotificationStatus.Accepted, false)}
          />
        );
      }
      if (notif.status === NotificationStatus.Rejected) {
        return (
          <CloseFilled24
            style={styles.requestIcon(NotificationStatus.Rejected, false)}
          />
        );
      }
    };

    const getText = () => {
      const title =
        notif.type?.substring(0, 1)?.toUpperCase() +
        notif.type?.substring(1) +
        " Invitation";
      const targetName = notif?.name ?? "";
      if (notif.joinRequest) {
        return {
          title: "Group Join Request",
          body: `${notif.fromUserId} has requested to join your group: ${targetName}`
        };
      }
      if (notif.status === NotificationStatus.Pending && !sent) {
        return {
          title: title,
          body: `${notif.fromUserId} invited you to join ${notif.type}: ${targetName}`
        };
      }
      if (notif.status === NotificationStatus.Pending && sent) {
        return {
          title: title,
          body: `You invited ${notif.toUserId} to join ${notif.type}: ${targetName}`
        };
      }
      if (
        (notif.status === NotificationStatus.Accepted ||
          notif.status === NotificationStatus.Rejected) &&
        !sent
      ) {
        return {
          title: title,
          body: `You were invited to join ${notif.type}: ${targetName}`
        };
      }
      if (
        (notif.status === NotificationStatus.Accepted ||
          notif.status === NotificationStatus.Rejected) &&
        sent
      ) {
        return {
          title: title,
          body: `You invited ${notif.toUserId} to join ${notif.type}: ${targetName}`
        };
      }
    };

    return (
      <div style={styles.notification}>
        {!sent ? (
          <UserFollow24 style={styles.leftIcon} />
        ) : (
          <Information24 style={styles.leftIcon} />
        )}
        <div style={styles.notificationBody}>
          <h4 style={{ fontSize: 17, fontWeight: "450" }}>{getText().title}</h4>
          <p style={{ fontSize: 15 }}>{getText().body}</p>
        </div>
        <div style={styles.requestNotiBtns}>{getRightIcons()}</div>
      </div>
    );
  };

  const getNotificationBox = (title, notifications) => {
    return (
      <div style={styles.notifBox} className={"defaultBoxShadowBlack"}>
        <h3 style={styles.notifBoxTitle}>{title}</h3>
        {notifications?.length > 0 ? (
          notifications?.map((notif) =>
            getNotification(notif.fromUserId === loggedUser?.user?.email, notif)
          )
        ) : (
          <h5>{"No invitations yet!"}</h5>
        )}
      </div>
    );
  };

  return (
    <div style={styles.mainContainer}>
      <h1 style={styles.pageTitle}>{"Notifications"}</h1>
      <div style={styles.notificationsContainer}>
        {getNotificationBox(
          "Sent Group Invitations",
          notifs?.sentGroupInvitations
        )}
        {getNotificationBox(
          "Received Group Invitations",
          notifs?.receivedGroupInvitations
        )}
        {getNotificationBox(
          "Sent Project Invitations",
          notifs?.sentProjectInvitations
        )}
        {getNotificationBox(
          "Received Project Invitations",
          notifs?.receivedProjectInvitations
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
