import { NotificationController } from "../shared/notification/notificationController.js";
import { AdListController } from "./adListController.js";

document.addEventListener("DOMContentLoaded", async () => {
  const adListElement = document.querySelector(".ad-list");

  const notificationElement = document.querySelector(".notification");

  const notificationController = new NotificationController(notificationElement);

  const adListController = new AdListController(adListElement);
  await adListController.showAds();
});
