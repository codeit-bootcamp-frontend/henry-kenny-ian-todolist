import React, { useState } from "react";
import Switch from "react-switch";
const LIGHT_ICON = {
  desktop: {
    position: "absolute",
    width: "50px",
    height: "50",
    top: "10px",
    left: "5px",
  },
  mobile: {
    position: "absolute",
    width: "30px",
    height: "30px",
    top: "3px",
    left: "2px",
  },
};

const DARK_ICON = {
  star: {
    desktop: {
      position: "absolute",
      width: "14px",
      height: "14px",
      top: "5px",
      left: "22px",
    },
    mobile: {
      position: "absolute",
      width: "8px",
      height: "8px",
      top: "2px",
      left: "8px",
    },
  },
  moon: {
    desktop: {
      position: "absolute",
      width: "54px",
      height: "54px",
      top: "2px",
      left: "18px",
    },
    mobile: {
      position: "absolute",
      width: "30px",
      height: "30px",
      top: "0px",
      left: "6px",
    },
  },
};
const ToggleSwitch = ({ checked, onChange, isMobile }) => {
  const [device, setDevice] = useState(isMobile ? "mobile" : "desktop");
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      handleDiameter={isMobile ? 20 : 38}
      offColor="#4d4d4d"
      onColor="#15C714"
      offHandleColor="#fff"
      onHandleColor="#fff"
      height={isMobile ? 24 : 50}
      width={isMobile ? 58 : 120}
      borderRadius={50}
      activeBoxShadow="0px 0px 1px 2px #fffc35"
      uncheckedIcon={
        <div
          style={{
            position: "relative",
          }}
        >
          <img src={"assets/dark-theme.svg"} style={DARK_ICON.moon[device]} />
          <img src={"assets/star-6.svg"} style={DARK_ICON.star[device]} />
        </div>
      }
      checkedIcon={
        <div
          style={{
            position: "relative",
          }}
        >
          <img src={"assets/light-theme.svg"} style={LIGHT_ICON[device]} />
        </div>
      }
      className="react-switch"
    />
  );
};

export default ToggleSwitch;
