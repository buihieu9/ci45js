const view = {};

view.setActiveScreen = (screnName, formCreateConversation = false) => {
  switch (screnName) {
    case "loginScreen": {
      document.getElementById("app").innerHTML = components.loginScreen;
      const loginForm = document.getElementById("login-form");
      loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = {
          password: {
            value: loginForm.password.value,
            name: "password",
            id: "password-error",
          },
          email: {
            value: loginForm.email.value.trim(),
            name: "email",
            id: "email-error",
          },
        };
        controller.Validate(data);
      });
      const redirectToLogin = document.getElementById("redirect-to-register");
      redirectToLogin.addEventListener("click", () => {
        view.setActiveScreen("registerScreen");
      });
      break;
    }

    case "registerScreen": {
      document.getElementById("app").innerHTML = components.registerScreen;
      const registerForm = document.getElementById("register-form");
      registerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = {
          firstName: {
            value: registerForm.firstName.value.trim(),
            name: "first name",
            id: "first-name-error",
          },
          lastName: {
            value: registerForm.lastName.value.trim(),
            name: "last name",
            id: "last-name-error",
          },
          password: {
            value: registerForm.password.value,
            name: "password",
            id: "password-error",
          },
          email: {
            value: registerForm.email.value.trim(),
            name: "email",
            id: "email-error",
          },
          confirmPassword: {
            value: registerForm.confirmPassword.value,
            name: "confirm Password",
            id: "confirm-password-error",
          },
        };
        controller.Validate(data);
      });
      const redirectToLogin = document.getElementById("redirect-to-login");
      redirectToLogin.addEventListener("click", () => {
        view.setActiveScreen("loginScreen");
      });

      break;
    }
    case "chatScreen": {
      document.getElementById("app").innerHTML = components.chatScreen;

      const sendMessageForm = document.getElementById("send-message-form");
      sendMessageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (sendMessageForm.message.value.trim() !== "") {
          const message = {
            content: sendMessageForm.message.value.trim(),
            owner: model.currentUser.email,
            createdAt: new Date().toISOString(),
          };
          model.addMessage(message);
          sendMessageForm.message.value = "";
        }
      });
      if (!formCreateConversation) {
        model.listenonchanges();
        model.loadconversation();
      } else {
        view.showConversations();
        view.showCurrentconversation();
      }
      let btnSignOut = document.getElementById("btn-signOut");
      btnSignOut.addEventListener("click", (e) => {
        if (confirm("Do you want to signOut?")) {
          firebase.auth().signOut();
          view.setActiveScreen("loginScreen");
        }
      });

      document
        .querySelector(".create-conversation .btn")
        .addEventListener("click", () => {
          view.setActiveScreen("createConversation");
        });

      break;
    }
    case "createConversation":
      {
        document.getElementById("app").innerHTML =
          components.createconversation;
        document
          .getElementById("back-to-chat")
          .addEventListener("click", () => {
            view.setActiveScreen("chatScreen", true);
          });

        const createForm = document.getElementById("create-conversation-form");
        createForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const data = {
            title: {
              value: createForm.conversationTile.value.trim(),
              id: "conversation-name-error",
              name: "title conversation",
            },
            email: {
              value: createForm.friendName.value.trim(),
              id: "conversation-email-error",
              name: "your friend email",
            },
          };

          controller.Validate(data, true);
        });
      }
      break;
  }
};
view.errorMessage = (id, message) => {
  document.getElementById(id).innerText = message;
};

view.addMessage = (message) => {
  const messageWrapper = document.createElement("div");
  messageWrapper.classList.add("message-container");
  if (message.owner === model.currentUser.email) {
    messageWrapper.classList.add("mine");
    messageWrapper.innerHTML = `
    <div class="content">
    ${message.content}
    </div>`;
  } else {
    messageWrapper.classList.add("their");
    messageWrapper.innerHTML = `
    <div class="owner">
    ${message.owner}
    </div>
    <div class="content">
    ${message.content}
    </div>`;
  }
  document.querySelector(".list-messages").appendChild(messageWrapper);
  view.scrollBottom();
};

view.scrollBottom = () => {
  let scroll = document.getElementsByClassName("list-messages");
  if (model.currentConversation) {
    scroll[0].scrollTop = scroll[0].scrollHeight;
  }
};

view.showCurrentconversation = () => {
  document.querySelector(".list-messages").innerHTML = "";
  // change title conversation

  if (model.currentConversation) {
    document.getElementsByClassName("conversation-header")[0].innerText =
      model.currentConversation.title;
    model.currentConversation.messages.forEach((e) => {
      view.addMessage(e);
    });
    view.scrollBottom();
  }
};

view.showConversations = () => {
  document.querySelector(".list-conversation").innerHTML = "";
  model.conversations.forEach((e) => {
    view.addConversation(e);
  });
};

view.addConversation = (conversation) => {
  const conversationWrapper = document.createElement("div");
  conversationWrapper.className = "conversation cursor";
  if (model.currentConversation) {
    if (model.currentConversation.id === conversation.id) {
      conversationWrapper.classList.add("current");
    }
  }
  conversationWrapper.innerHTML = `
    <div class="conversation-title">${conversation.title}</div>
    <div class="conversation-num-user">${conversation.users.length}</div>
    `;
  conversationWrapper.addEventListener("click", () => {
    // change theme, change current
    if (document.querySelector(".current")) {
      document.querySelector(".current").classList.remove("current");
    }
    conversationWrapper.classList.add("current");
    //
    // if(conversation)
    model.currentConversation = conversation;
    view.showCurrentconversation();
  });
  document.querySelector(".list-conversation").appendChild(conversationWrapper);
};
