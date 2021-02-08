const USER = {
  initPreferences: function (cb) {
    // sets default settings in storage if none present
    if (!localStorage.length) {
      const preferences = {
        lightMode: true,
        preferredLang: "javascript",
      };
      localStorage.setItem("preferences", JSON.stringify(preferences));
    } else {
      const { lightMode } = JSON.parse(localStorage.getItem("preferences"));
      // callback for setTheme hook in App.js if preferred theme in storage
      cb(lightMode);
    }
  },
};

export default USER;
