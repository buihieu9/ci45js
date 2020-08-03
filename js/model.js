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
    if (response.user.emailVerified) {
      view.setActiveScreen("chatScreen");
    } else {
      alert("please verify your email");
    }
  } catch (err) {
    view.errorMessage("password-error", err.message);
  }
};

model.loadconversation = async () => {
  const response = await firebase
    .firestore()
    .collection("conversations")
    .where("users", "array-contains", model.currentUser.email)
    .get();
  response.docs[0].data().messages.forEach((element) => {
    view.addMessage(element);
  });

  view.scrollBottom();
};
model.listenonchanges = () => {
  firebase
    .firestore()
    .collection("conversations")
    .where("users", "array-contains", model.currentUser.email)
    .onSnapshot((res) => {
      let currentMessage = res.docChanges()[0].doc.data().messages;
      let index = currentMessage.length - 1;
      if (res.docChanges()[0].type === "modified") {
        view.addMessage(currentMessage[index]);
      }
      view.scrollBottom();
    });
};

model.addMessage = (data) => {
  const dataToUpdate = {
    messages: firebase.firestore.FieldValue.arrayUnion(data),
  };
  firebase
    .firestore()
    .collection("conversations")
    .doc("yCR843YDRzLm7GvXqlRD")
    .update(dataToUpdate);
};
