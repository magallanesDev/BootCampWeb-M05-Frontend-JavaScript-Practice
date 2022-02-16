import { AdDetailController } from "../ad-detail/adDetailController.js";
import { NotificationController } from "../shared/notification/notificationController.js";

document.addEventListener("DOMContentLoaded", () => {
  const adDetailElement = document.querySelector(".ad-detail");

  const notificationElement = document.querySelector(".notification");

  const notificationController = new NotificationController(notificationElement);

  const searchParams = new URLSearchParams(window.location.search);

  const adId = searchParams.get("id");

  const adDetailController = new AdDetailController(adDetailElement);
  adDetailController.showAd(adId);
});
