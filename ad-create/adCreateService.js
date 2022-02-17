import { signupService } from "../signup/signupService.js";

class AdCreateService {
  constructor() {}

  async createAd(image, name, description, price, forSale) {
    const body = { image, name, description, price, forSale };


    const response = await fetch("http://localhost:8000/api/ads", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + signupService.getLoggedUser()
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    } 
    else { 
        console.log("Anuncio creado correctamente") 
      }
    
  }

}


export const adCreateService = new AdCreateService();
