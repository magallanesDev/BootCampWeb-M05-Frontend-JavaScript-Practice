import { AdCreateController } from "./adCreateController.js";
import { NotificationController } from "../shared/notification/notificationController.js";

document.addEventListener("DOMContentLoaded", () => {
  const adCreateFormElement = document.querySelector("form");
  const notificationElement = document.querySelector(".notification");

  const notificationController = new NotificationController(notificationElement);

  const adCreateController = new AdCreateController(adCreateFormElement);
});
