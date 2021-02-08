const USER = {
  init: function (cb) {
    // sets default settings in storage if none present
    if (!localStorage.length) {
      const preferences = {
        lightMode: true,
        preferredLang: "",
      };
      localStorage.setItem("preferences", JSON.stringify(preferences));
    } else {
      const { lightMode } = JSON.parse(localStorage.getItem("preferences"));
      // callback for setTheme hook in App.js if preferred theme in storage
      cb(lightMode);
    }
  },
  theme: function (lightMode) {
    // updates theme preference in storage
    const ls = JSON.parse(localStorage.getItem("preferences"));
    const updatedPreferences = JSON.stringify({...ls, lightMode});
    localStorage.clear();
    localStorage.setItem("preferences", updatedPreferences);
  },
  getLang: function () {
    const {preferredLang} = JSON.parse(localStorage.getItem("preferences"));
    return preferredLang;
  },
  setLang: function (preferredLang) {
    const ls = JSON.parse(localStorage.getItem("preferences"));
    const updatedPreferences = JSON.stringify({...ls, preferredLang});
    localStorage.clear();
    localStorage.setItem("preferences", updatedPreferences);
  }
};

export default USER;
