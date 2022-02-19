import { pubSub } from "../shared/pubSub.js";
import { adCreateService } from "./adCreateService.js";


export class AdCreateController {
  
  constructor(formElement) {
    this.formElement = formElement;
    this.subscribeToEvents();
  }

  subscribeToEvents() {
    this.onAnyInputChanged();
    this.onSubmitForm();
  }

  onAnyInputChanged() {
    const inputElements = Array.from(
      this.formElement.querySelectorAll("input")
    );

    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.checkIfAllInputsAreFilled(inputElements);
      });
    });
  }

  checkIfAllInputsAreFilled(inputElements) {
    const areAllInputsFilled = inputElements.slice(1).every(
      (inputElement) => inputElement.value
    );

    if (areAllInputsFilled) {
      this.formElement.querySelector("button").removeAttribute("disabled");
    } else {
      this.formElement.querySelector("button").setAttribute("disabled", "");
    }
  }

  onSubmitForm() {
    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(this.formElement);

      const urlImageInput = formData.get("urlImageInput");
      const nameInput = formData.get("nameInput");
      const descriptionInput = formData.get("descriptionInput");
      const priceInput = formData.get("priceInput");
      const forSaleInput = formData.get("forSaleInput");


      // console.log(urlImageInput, nameInput, descriptionInput, priceInput, forSaleInput);
      
      this.createAd(urlImageInput, nameInput, descriptionInput, priceInput, forSaleInput);
      
    });
  }


  async createAd(urlImageInput, nameInput, descriptionInput, priceInput, forSaleInput) {
    try {
      await adCreateService.createAd(urlImageInput, nameInput, descriptionInput, priceInput, forSaleInput);
      window.location.href = "/";
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    }
    
  }

}

