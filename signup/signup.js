import { SignupController } from "./signupController.js";
import { NotificationController } from "../shared/notification/notificationController.js";

document.addEventListener("DOMContentLoaded", () => {
  const formElement = document.querySelector("form");
  const notificationElement = document.querySelector(".notification");

  const notificationController = new NotificationController(notificationElement);

  const signupController = new SignupController(formElement);
});
