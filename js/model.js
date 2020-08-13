const model = {};
model.currentUser = null;
model.conversations = null;
model.currentConversation = null;
model.collectionName = "conversations";
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
    // if (response.user.emailVerified) {
    // } else {
    //   alert("please verify your email");
    // }
  } catch (err) {
    view.errorMessage("password-error", err.message);
  }
};

model.loadconversation = async () => {
  const response = await firebase
    .firestore()
    .collection(model.collectionName)
    .where("users", "array-contains", model.currentUser.email)
    .get();
  model.conversations = getDataFormDocs(response.docs);
  if (model.conversations.length > 0) {
    model.currentConversation = model.conversations[0];
    view.showCurrentconversation();
  }
  view.showConversations();
  // view.scrollBottom();
};
model.listenonchanges = () => {
  let isFirstRun = true;
  firebase
    .firestore()
    .collection(model.collectionName)
    .where("users", "array-contains", model.currentUser.email)
    .onSnapshot((res) => {
      if (isFirstRun) {
        isFirstRun = false;
        return;
      }
      const docChanges = res.docChanges();
      for (oneChange of docChanges) {
        const type = oneChange.type;
        console.log(type);
        if (type === "modified") {
          const docData = getDataFormDoc(oneChange.doc);

          // update lai model.conversations
          model.conversations.forEach((e, ind) => {
            if (model.conversations[ind].id === docData.id) {
              model.conversations[ind] = docData;
            }
          });
          // update model.currentconversation

          console.log(model.currentConversation);
          if (model.currentConversation === null) {
            model.currentConversation = docData;
            if (docData.id === model.currentConversation.id) {
              model.currentConversation = docData;
              console.log(docData);
              console.log(model.currentConversation);
              const lastMassage = docData.messages[docData.messages.length - 1];
              view.addMessage(lastMassage);
            }
          } else {
            // model.currentConversation = docData;
            if (docData.id === model.currentConversation.id) {
              model.currentConversation = docData;
              console.log(docData);
              const lastMassage = docData.messages[docData.messages.length - 1];
              view.addMessage(lastMassage);
            }
          }
        }
        if (type === "added") {
          model.conversations.unshift(getDataFormDoc(docChanges[0].doc));

          view.showConversations();
        }
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
    .collection(model.collectionName)
    .doc(model.currentConversation.id)
    .update(dataToUpdate);
};

model.addNewConversation = (data) => {
  const newConversation = {
    createAt: new Date().toISOString(),
    messages: [],
    title: data.title.value,
    users: [model.currentUser.email, data.email.value],
  };
  firebase.firestore().collection(model.collectionName).add(newConversation);
  view.setActiveScreen("chatScreen", true);
};

getDataFormDoc = (doc) => {
  const data = doc.data();
  data.id = doc.id;
  return data;
};

getDataFormDocs = (docs) => {
  return docs.map((element) => getDataFormDoc(element));
};
