const view = {};
view.setActiveScreen = (screnName) => {
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
          };
          const bot = {
            content: sendMessageForm.message.value,
            owner: "bot",
          };
          sendMessageForm.message.value = "";
          view.addMessage(message);
          view.addMessage(bot);
          let scroll = document.getElementsByClassName("list-messages");
          scroll[0].scrollTop = scroll[0].scrollHeight;
        }
      });
      let btnSignOut = document.getElementById("btn-signOut");
      btnSignOut.addEventListener("click", (e) => {
        if (confirm("Do you want to signOut?")) {
          firebase.auth().signOut();
          view.setActiveScreen("loginScreen");
        }
      });
      break;
    }
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
};
