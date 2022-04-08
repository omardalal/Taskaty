import React, { useState, useRef } from "react";
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
import { useSelector } from "react-redux";
import { Search20, Notification20, AppSwitcher20 } from "@carbon/icons-react";
import CustomButton from "../CustomButton/CustomButton";
import useClickOutside from "../../CustomHooks/useClickOutside";
import { Link } from "react-router-dom";
import LoginModal from "../LoginModal/LoginModal";
import { signOutUser } from "../../Utilities/AuthenticationUtils";

const TopBar = () => {
  const [rightMenuVisible, setRightMenuVisible] = useState(false);
  const containerRef = useRef(null);
  const openMenuBtnRef = useRef(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const loggedUser = useSelector((state) => state.auth);

  useClickOutside(containerRef, openMenuBtnRef, () => {
    setRightMenuVisible(false);
  });

  // Show if the user is Logged in
  const getRightMenu = () => {
    return (
      <HeaderPanel
        ref={containerRef}
        aria-label="Header Panel"
        expanded={rightMenuVisible}
      >
        <Switcher aria-label="Switcher Container">
          <SwitcherItem href="#" aria-label="Link 1">
            {strings.profile}
          </SwitcherItem>
          <SwitcherDivider />
          <SwitcherItem href="#" aria-label="Link 2">
            {strings.projects}
          </SwitcherItem>
          <SwitcherItem href="#" aria-label="Link 3">
            {strings.classes}
          </SwitcherItem>
          <SwitcherDivider />
          <SwitcherItem
            href="#"
            aria-label="Link 6"
            onClick={async () => {
              try {
                await signOutUser();
                setRightMenuVisible(false);
              } catch (error) {}
            }}
          >
            {strings.logOut}
          </SwitcherItem>
        </Switcher>
      </HeaderPanel>
    );
  };

  return (
    <>
      <LoginModal
        onOverlayClick={() => setLoginVisible(false)}
        onDismissPress={() => setLoginVisible(false)}
        onLoginSucceed={() => setLoginVisible(false)}
        visible={loginVisible}
      />
      <Header aria-label={strings.taskaty}>
        <HeaderName prefix="">
          <Link to={"/"} style={{ color: "white" }}>
            {strings.taskaty}
          </Link>
        </HeaderName>
        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label={strings.search}>
            <Search20 />
          </HeaderGlobalAction>
          {loggedUser ? (
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
              {getRightMenu()}
            </>
          ) : (
            <>
              <CustomButton
                text={strings.login}
                onClick={() => setLoginVisible(true)}
                blackButton={true}
                inTopBar
              />
              <CustomButton
                text={strings.signUp}
                to="/signup"
                blackButton={false}
                inTopBar
              />
            </>
          )}
        </HeaderGlobalBar>
      </Header>
    </>
  );
};

export default TopBar;
