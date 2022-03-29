import React, { useState, useRef } from "react";
import "./TopBar.css";
import strings from "../../Constants/strings";
import {
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderPanel,
  Switcher,
  SwitcherItem,
  SwitcherDivider
} from "carbon-components-react";
import { Search20, Notification20, AppSwitcher20 } from "@carbon/icons-react";
import CustomButton from "../CustomButton/CustomButton";
import useClickOutside from "../../CustomHooks/useClickOutside";

// To-Do: Replace with actual logged in value
const loggedIn = true;

const TopBar = () => {
  const [rightMenuVisible, setRightMenuVisible] = useState(false);
  const containerRef = useRef(null);
  const openMenuBtnRef = useRef(null);

  useClickOutside(containerRef, openMenuBtnRef, () => {
    setRightMenuVisible(false);
  });

  // Show if the user is Logged in
  const getRightMenu = () => {
    return (
      <HeaderPanel ref={containerRef} aria-label="Header Panel" expanded>
        <Switcher aria-label="Switcher Container">
          <SwitcherItem href="#" aria-label="Link 1">
            Profile
          </SwitcherItem>
          <SwitcherDivider />
          <SwitcherItem href="#" aria-label="Link 2">
            Projects
          </SwitcherItem>
          <SwitcherItem href="#" aria-label="Link 3">
            Classes
          </SwitcherItem>
          <SwitcherDivider />
          <SwitcherItem href="#" aria-label="Link 6">
            Log out
          </SwitcherItem>
        </Switcher>
      </HeaderPanel>
    );
  };

  return (
    <Header aria-label={strings.taskaty}>
      <HeaderName href="#" prefix="">
        {strings.taskaty}
      </HeaderName>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label={strings.search}>
          <Search20 />
        </HeaderGlobalAction>
        {loggedIn ? (
          <>
            <HeaderGlobalAction aria-label={strings.notifications}>
              <Notification20 />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              ref={openMenuBtnRef}
              aria-label={strings.more}
              isActive
              onClick={() => {
                setRightMenuVisible(!rightMenuVisible);
              }}
              tooltipAlignment="end"
            >
              <AppSwitcher20 />
            </HeaderGlobalAction>
            {rightMenuVisible && getRightMenu()}
          </>
        ) : (
          <>
            <CustomButton text={strings.login} href="#" blackButton={true} />
            <CustomButton text={strings.signUp} href="#" blackButton={false} />
          </>
        )}
      </HeaderGlobalBar>
    </Header>
  );
};

export default TopBar;
