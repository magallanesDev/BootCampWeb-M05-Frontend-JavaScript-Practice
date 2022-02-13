import { pubSub } from "../shared/pubSub.js";
import AdService from "./adService.js";
import {
  buildAdView,
  buildAdListSpinnerView,
  buildNotFoundAdsView,
} from "./adView.js";

export class AdListController {
  tweetListElement = null;

  constructor(adListElement, notificationController) {
    this.adListElement = adListElement;
    this.notificationController = notificationController;
  }

  async showAds() {
    let ads;
    const spinnerTemplate = buildAdListSpinnerView();

    this.adListElement.innerHTML = spinnerTemplate;

    try {
      ads = await AdService.getAds();

      if (ads.length === 0) {
        this.adListElement.innerHTML = buildNotFoundAdsView();
      }

      for (const ad of ads) {
        const adArticleElement = document.createElement("article");
        const adTemplate = buildAdView(ad);

        adArticleElement.innerHTML = adTemplate;

        this.adListElement.appendChild(adArticleElement);
      }
    } catch (error) {
      // informar de error
      pubSub.publish(
        pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
        "Error obteniendo anuncios"
      );
    } finally {
      const loader = this.adListElement.querySelector(".loader");
      loader.remove();
      // loader.classList.add("hidden");
    }
  }
}

async function oldAdListController(adListElement) {
  let ads;
  const spinnerTemplate = buildAdListSpinnerView();

  adListElement.innerHTML = spinnerTemplate;

  try {
    ads = await AdService.getAds();

    for (const ad of ads) {
      const adArticleElement = document.createElement("article");
      const adTemplate = buildAdView(ad);

      adArticleElement.innerHTML = adTemplate;

      adListElement.appendChild(adArticleElement);
    }
  } catch (error) {
    alert("Error obteniendo anuncios");
  } finally {
    const loader = adListElement.querySelector(".loader");
    loader.remove();
    // loader.classList.add("hidden");
  }
}

