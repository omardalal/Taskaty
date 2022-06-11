import {
  collection,
  query,
  getDocs,
  addDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { NotificationStatus } from "../Views/NotificationsPage/NotificationsPage";
import { getGroup } from "./ClassUtils";
import { getFirebaseDb } from "./FirebaseUtils";
import { getProjectByID } from "./ProjectUtils";

export const getAllInvitations = async (userId) => {
  if (!userId) {
    return;
  }
  const q = query(collection(getFirebaseDb(), "Invitations"));
  const querySnapshot = await getDocs(q);

  const sentProjectInvitations = [];
  const receivedProjectInvitations = [];

  const sentGroupInvitations = [];
  const receivedGroupInvitations = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.fromUserId === userId && data.type === "project") {
      sentProjectInvitations.push({ ...data, id: doc.id });
      return;
    }
    if (data.fromUserId === userId && data.type === "group") {
      sentGroupInvitations.push({ ...data, id: doc.id });
      return;
    }
    if (data.toUserId === userId && data.type === "project") {
      receivedProjectInvitations.push({ ...data, id: doc.id });
      return;
    }
    if (data.toUserId === userId && data.type === "group") {
      receivedGroupInvitations.push({ ...data, id: doc.id });
    }
  });

  return {
    sentProjectInvitations,
    receivedProjectInvitations,
    sentGroupInvitations,
    receivedGroupInvitations
  };
};

export const enrichInvites = async ({
  sentProjectInvitations,
  receivedProjectInvitations,
  sentGroupInvitations,
  receivedGroupInvitations
}) => {
  const enrichedSentProjectInvitations =
    sentProjectInvitations &&
    (await Promise.all(
      sentProjectInvitations?.map(async (inv) => {
        const prj = await getProjectByID(inv?.targetId);
        return { ...inv, name: prj.name };
      })
    ));

  const enrichedReceivedProjectInvitations =
    receivedProjectInvitations &&
    (await Promise.all(
      receivedProjectInvitations?.map(async (inv) => {
        const prj = await getProjectByID(inv?.targetId);
        return { ...inv, name: prj.name };
      })
    ));

  const enrichedSentGroupInvitations =
    sentGroupInvitations &&
    (await Promise.all(
      sentGroupInvitations?.map(async (inv) => {
        const group = await getGroup(inv?.targetId);
        return { ...inv, name: group?.groupName };
      })
    ));

  const enrichedReceivedGroupInvitations =
    receivedGroupInvitations &&
    (await Promise.all(
      receivedGroupInvitations?.map(async (inv) => {
        const group = await getGroup(inv?.targetId);
        let joinRequest = false;
        if (
          group?.students?.some(
            (member) => member.userRef?.id === inv?.toUserId
          )
        ) {
          joinRequest = true;
        }
        return { ...inv, name: group?.groupName, joinRequest };
      })
    ));

  return {
    sentProjectInvitations: enrichedSentProjectInvitations,
    receivedProjectInvitations: enrichedReceivedProjectInvitations,
    sentGroupInvitations: enrichedSentGroupInvitations,
    receivedGroupInvitations: enrichedReceivedGroupInvitations
  };
};

export const createInvitation = async (
  fromUserId,
  toUserId,
  type,
  targetId
) => {
  return await addDoc(collection(getFirebaseDb(), "Invitations"), {
    fromUserId,
    status: NotificationStatus.Pending,
    targetId,
    toUserId,
    type
  });
};

export const acceptInvitation = async (invitationId) => {
  const invitationRef = doc(getFirebaseDb(), "Invitations", invitationId);

  return await updateDoc(invitationRef, {
    status: NotificationStatus.Accepted
  });
};

export const rejectInvitation = async (invitationId) => {
  const invitationRef = doc(getFirebaseDb(), "Invitations", invitationId);

  return await updateDoc(invitationRef, {
    status: NotificationStatus.Rejected
  });
};
