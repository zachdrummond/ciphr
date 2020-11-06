import React from "react";

const Navbar = () => {
  return (
    <header className="MuiPaper-root MuiAppBar-root MuiAppBar-positionStatic MuiAppBar-colorDefault jss1 MuiPaper-elevation0">
      <div className="MuiToolbar-root MuiToolbar-regular jss2 MuiToolbar-gutters">
        <h6 className="MuiTypography-root jss3 MuiTypography-h6 MuiTypography-colorInherit MuiTypography-noWrap">
          Company name
        </h6>
        <nav>
          <a
            className="MuiTypography-root MuiLink-root MuiLink-underlineHover jss4 MuiTypography-button MuiTypography-colorTextPrimary"
            href="#"
          >
            Features
          </a>
          <a
            className="MuiTypography-root MuiLink-root MuiLink-underlineHover jss4 MuiTypography-button MuiTypography-colorTextPrimary"
            href="#"
          >
            Enterprise
          </a>
          <a
            className="MuiTypography-root MuiLink-root MuiLink-underlineHover jss4 MuiTypography-button MuiTypography-colorTextPrimary"
            href="#"
          >
            Support
          </a>
        </nav>
        <a
          className="MuiButtonBase-root MuiButton-root MuiButton-outlined jss4 MuiButton-outlinedPrimary"
          tabindex="0"
          aria-disabled="false"
          href="#"
        >
          <span className="MuiButton-label">Login</span>
        </a>
      </div>
    </header>
  );
};

export default Navbar;
