import { pubSub } from "../shared/pubSub.js";
import { signupService } from "../signup/signupService.js";
import AdService from "./adService.js";
import { buildAdView, buildAdListSpinnerView, buildNotFoundAdsView } from "./adView.js";

export class AdListController {
  adListElement = null;

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

      this.handleCreateButton();

    } catch (error) {
      // informar de error
      pubSub.publish(
        pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
        "Error obteniendo anuncios"
      );
    } finally {
      const loader = this.adListElement.querySelector(".loader");
      loader.remove();
    }
  }

  
  handleCreateButton() {
    const loggedUserToken = signupService.getLoggedUser();

    if (loggedUserToken) {
      // comprobamos si el usuario está logado y pintamos el botón de crear anuncio
      this.drawCreateButton();
    }
  }

  drawCreateButton() {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Crear anuncio";

    this.adListElement.appendChild(buttonElement);

    this.adListElement.addEventListener("click", () => {
      // ir a la página de creación de anuncio al pulsar el botón
      window.location.href = "/adCreate.html";
    });
  }

}



