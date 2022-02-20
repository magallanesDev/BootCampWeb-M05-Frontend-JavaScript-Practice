import { signupService } from "../signup/signupService.js";

export default {
  async getAds() {
    const url = "http://localhost:8000/api/ads";

    let response;
    let ads;

    try {
      response = await fetch(url);
    } catch (error) {
      throw new Error("No he podido ir a por los anuncios");
    }

    if (!response.ok) {
      throw new Error("Anuncios no encontrados");
    }

    try {
      ads = await response.json();
    } catch (error) {
      throw new Error("No he podido transformar la respuesta a json");
    }

    const transformedAds = this.transformAds(ads);

    return transformedAds;
  },

  async getAd(adId) {
    const url = `http://localhost:8000/api/ads/${adId}`;

    let response;
    let ad;

    try {
      response = await fetch(url);
    } catch (error) {
      throw new Error("No he podido ir a por el anuncio");
    }

    if (!response.ok) {
      throw new Error("Anuncio no encontrado");
    }

    try {
      ad = await response.json();
    } catch (error) {
      throw new Error("No he podido transformar la respuesta a json");
    }

    const transformedAd = this.transformAds([ad]);

    return transformedAd[0];
  },
  
  async deleteAd(adId) {
    const url = `http://localhost:8000/api/ads/${adId}`;

    let response;

    try {
      response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + signupService.getLoggedUser(),
        },
      });
    } catch (error) {
      throw new Error("No he podido borrar el anuncio");
    }

    if (!response.ok) {
      throw new Error("Anuncio no encontrado");
    }
  },
  transformAds(ads) {
    return ads.map((ad) => {
      const transformedAd = {
        image: ad.image,
        name: ad.name,
        description: ad.description,
        price: ad.price,
        forSale: ad.forSale,
        id: ad.id,
        userId: ad.userId,
        date: ad.updatedAt
      };

      return transformedAd;
    });
  },
};

