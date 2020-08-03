firestoreFuntion = async () => {
  //  get one document
  const documentId = "yCR843YDRzLm7GvXqlRD";
  const response = await firebase
    .firestore()
    .collection("conversations")
    .doc(documentId)
    .get();
  const user = getDataFormDoc(response);
  // console.log(user);
  // get many document
  const response2 = await firebase
    .firestore()
    .collection("users")
    .where("phoneNumber", "array-contains", "091")
    .get();
  console.log(response2.docs);
  const listUser = getDataFormDocs(response2.docs);
  console.log(listUser);

  // add document
  const userToAdd = {
    name: "bùi văn c",
    age: 23,
    email: " accc@gmail.com",
  };
  // firebase.firestore().collection("users").add(userToAdd);

  // update docment
  const documentIdUpdate = "ojteLV3rXsBPASr532A0";
  const dataToUpdate = {
    name: "bùi hiếu",
    phoneNumber: firebase.firestore.FieldValue.arrayUnion("094"),
  };
  firebase
    .firestore()
    .collection("users")
    .doc(documentIdUpdate)
    .update(dataToUpdate);
  // delete document
  const docTodelete = "S8h2fnrQslvWpvvE4hrX";
  // firebase.firestore().collection("users").doc(docTodelete).delete();
};

getDataFormDoc = (doc) => {
  const data = doc.data();
  data.id = doc.id;
  return data;
};

getDataFormDocs = (docs) => {
  return docs.map((element) => getDataFormDoc(element));
};
