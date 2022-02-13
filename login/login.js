import { LoginController } from "./loginController.js";
import { NotificationController } from "../shared/notification/notificationController.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginFormElement = document.querySelector("form");
  const notificationElement = document.querySelector(".notification");

  const notificationController = new NotificationController(
    notificationElement
  );

  const loginController = new LoginController(loginFormElement);
});
