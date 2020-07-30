const model = {};
model.currentUser = null;
model.register = (firstName, lastName, email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      firebase.auth().currentUser.updateProfile({
        displayName: firstName + " " + lastName,
      });
      firebase.auth().currentUser.sendEmailVerification();
      alert("The email has been registered,please check your email");
      view.setActiveScreen("loginScreen");
    })
    .catch((err) => {
      alert(err.message);
    });
};

model.login = async (email, password) => {
  try {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    view.errorMessage("password-error", "");
    if (response.user.emailVerified) {
      // model.currentUser = {
      //   displayName: response.user.displayName,
      //   email: response.user.email,
      // };
      view.setActiveScreen("chatScreen");
    } else {
      alert("please verify your email");
    }
  } catch (err) {
    view.errorMessage("password-error", err.message);
  }
};
