const components = {};

components.registerScreen = `<div class="register-container">
<div class="aside-right">
  <div class="header">
    <h3>MindX Chat</h3>
  </div>
  <form id="register-form">
    <div class="input-name-wrapper">
      <div class="input-wrapper">
        <input type="text" name="firstName" placeholder="First Name" />
        <div class="error" id="first-name-error"></div>
      </div>
      <div class="input-wrapper">
        <input type="text" name="lastName" placeholder="last Name" />
        <div class="error" id="last-name-error"></div>
      </div>
    </div>
    <div class="input-wrapper">
      <input type="text" name="email" placeholder="Email" />
      <div class="error" id="email-error"></div>
    </div>
    <div class="input-wrapper">
      <input type="password" name="password" placeholder="Password" />
      <div class="error" id="password-error"></div>
    </div>
    <div class="input-wrapper">
      <input
        type="password"
        name="confirmPassword"
        placeholder="confirmPassword"
      />
      <div class="error" id="confirm-password-error"></div>
    </div>
    <div class="form-action">
      <span id="redirect-to-login">
        Alredy have an account? Login
      </span>
      <button class="btn" type="submit">
        Register
      </button>
    </div>
  </form>
</div>
</div>`;
components.loginScreen = `  <div class="login-container">
<div class="aside-right">
  <div class="header">
    <h3>MindX Chat</h3>
  </div>
  <form id="login-form">
    <div class="input-name-wrapper">
      <div class="input-wrapper">
        <input type="email" name="email" placeholder="Email" />
        <div class="error" id="email-error"></div>
      </div>
      <div class="input-wrapper">
        <input type="password" name="password" placeholder="password" />
        <div class="error" id="password-error"></div>
      </div>
    </div>
    <div class="form-action">
      <span id="redirect-to-register">
        Don't have an account? Register
      </span>
      <button class="btn" type="submit">
        login
      </button>
    </div>
  </form>
</div>`;

components.chatScreen = `<div class="chat-container">
<div class="header">
  MindX Chat
</div>
<div id="btn-signOut">
<i class="fas fa-sign-out-alt"></i>  signOut
</div>
<div class="main">
  <div class="conversation-detail">
    <div class="conversation-header">
      First Conversation
    </div>
    <div class="list-messages">

    </div>
    <form id="send-message-form">
      <div class="input-wrapper">
        <input
          type="text"
          name="message"
          placeholder="Type a message..."
        />
      </div>
      <button type="submit"><i class="fas fa-paper-plane"></i></button>
    </form>`;
