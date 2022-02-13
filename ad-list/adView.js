export function buildAdView(ad) {
  const currentTime = new Date(ad.date).toLocaleString();
  const adDetailView = buildAdDetailView(ad);
  let adTemplate = `
    <a href="/adDetail.html?id=${ad.id}">
      ${adDetailView}
    </a>
  `;

  return adTemplate;
}


export function buildAdDetailView(ad) {
  const currentTime = new Date(ad.date).toLocaleString();

  let adTemplate = `
    
    <h1>${ad.name}</h1>
    <p>${ad.description}</p>
    <p>${ad.price}</p>
    <p>¿Es una venta? ${ad.forSale}</p>
    <p>Fecha y hora de creación del anuncio: ${currentTime}</p>
    <p>Soy el usuario ${ad.userId}</p>
    <p>Soy el anuncio ${ad.id}</p>
    <img src="${ad.image}"></img>
  `;

  return adTemplate;
}

export function buildAdListSpinnerView() {
  return `<div class="loader">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>`;
}

export function buildNotFoundAdsView() {
  return `
    <h1>Ooops!!! no hay ningún anuncio!!! =(</h1>
  `;
}
