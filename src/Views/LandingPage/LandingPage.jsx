import React, { useState } from "react";
import strings from "../../Constants/strings";
import "./LandingPage.css";
import { ChevronDown32 } from "@carbon/icons-react";
import PropTypes from "prop-types";
import CustomButton from "../../Components/CustomButton/CustomButton";
import LoginModal from "../../Components/LoginModal/LoginModal";
import { blue60 } from "@carbon/colors";
import { useAOS } from "../../CustomHooks/useAOS";
import useAuth from "../../CustomHooks/useAuth";

const LandingPage = () => {
  useAOS();
  const [loginVisible, setLoginVisible] = useState(false);
  const loggedUser = useAuth();

  const getFeatures = () => (
    <>
      <FeatureRow
        title={strings.landingPagefeature1Title}
        description={strings.landingPagefeature1Description}
        titleIsLeft={true}
      />
      <FeatureRow
        title={strings.landingPagefeature2Title}
        description={strings.landingPagefeature2Description}
      />
      <FeatureRow
        title={strings.landingPagefeature3Title}
        description={strings.landingPagefeature3Description}
        titleIsLeft={true}
      />
      <FeatureRow
        title={strings.landingPagefeature4Title}
        description={strings.landingPagefeature4Description}
      />
    </>
  );

  const getSignUpBox = () => (
    <div className={"landingPageSignupBox"} data-aos="fade-up">
      <h1>{strings.landingPageSignUpTitle}</h1>
      <h3>{strings.landingPageSignUpDescription}</h3>
      {loggedUser?.user ? (
        <CustomButton
          to="/projects"
          text={"Visit your projects"}
          blackButton={true}
        />
      ) : (
        <>
          <CustomButton to="/signup" text={strings.signUp} blackButton={true} />
          <p>
            {strings.alreadyHaveAccount}
            <span
              style={{ color: blue60, cursor: "pointer" }}
              onClick={() => setLoginVisible(true)}
            >
              {" " + strings.login}
            </span>
          </p>
        </>
      )}
    </div>
  );

  return (
    <>
      <LoginModal
        onOverlayClick={() => setLoginVisible(false)}
        onDismissPress={() => setLoginVisible(false)}
        onLoginSucceed={() => setLoginVisible(false)}
        visible={loginVisible}
      />
      <div className={"landingPageMainContainer"}>
        <div
          className={"landingPageTitleContainer"}
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          <h1 className={"taskatyTitle"}>{strings.taskaty.toUpperCase()}</h1>
          <h3 className={"taskatyDescription"}>
            {strings.landingPageWelcomeSentence}
          </h3>
          <a
            className={"taskatyChevronDown"}
            onClick={() => {
              scrollTo({ top: window.innerHeight - 100, behavior: "smooth" });
            }}
          >
            <ChevronDown32 />
          </a>
        </div>
        {getFeatures()}
        {getSignUpBox()}
      </div>
    </>
  );
};

const FeatureRow = ({ title, description, titleIsLeft }) => {
  const renderTitle = () => (
    <div
      className={`featureTitle ${
        titleIsLeft ? "transformBottomRight" : "transformBottomLeft"
      }`}
    >
      <h1>{title}</h1>
    </div>
  );
  const renderDescription = () => (
    <div className="featureDescription">
      <p className={`${titleIsLeft ? "paddingRight" : "paddingLeft"}`}>
        {description}
      </p>
    </div>
  );
  return (
    <div
      className="landingPageFeatureRow"
      data-aos={`${titleIsLeft ? "fade-right" : "fade-left"}`}
      data-aos-duration="500"
    >
      {titleIsLeft ? renderTitle() : renderDescription()}
      {titleIsLeft ? renderDescription() : renderTitle()}
    </div>
  );
};

FeatureRow.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  titleIsLeft: PropTypes.bool
};

export default LandingPage;
