import React from "react";
import { styles } from "./styles.ts";
import ClassGroup from "../../Components/ClassGroup/ClassGroup";

const SuggestedUserPage = () => {
  return (
    <div style={styles.gradesMainContainer}>
      <ClassGroup
        usersArray={[
          { firstName: "User", lastName: "Name" },
          { firstName: "User", lastName: "Name" },
          { firstName: "User", lastName: "Name" },
          { firstName: "User", lastName: "Name" },
          { firstName: "User", lastName: "Name" },
          { firstName: "User", lastName: "Name" }
        ]}
        groupName={"Suggested Users"}
        long
      />
    </div>
  );
};

export default SuggestedUserPage;
