// Inicialização do mapa
const map = L.map('map').setView([31.9686, -99.9018], 6); // Texas central

// Adiciona camada base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// Lista de pontos turísticos com dados
const pontosTuristicos = [
  {
    nome: "The Alamo",
    cidade: "San Antonio",
    curiosidade: "Foi cenário de uma batalha histórica pela independência do Texas.",
    img: "img/TheAlamo.png",
    coords: [29.425967, -98.486142]
  },
  {
    nome: "Fort Worth Stockyards",
    cidade: "Fort Worth",
    curiosidade: "É possível ver condução de gado duas vezes ao dia.",
    img: "img/Fort-Worth-Stockyards.png",
    coords: [32.7836, -97.3489]
  },
  {
    nome: "Big Bend National Park",
    cidade: "Condado de Brewster",
    curiosidade: "Oferece paisagens montanhosas e desérticas incríveis.",
    img: "img/Big-Bend-National.png",
    coords: [29.2643, -103.2430]
  },
  {
    nome: "Fort Davis National Historic",
    cidade: "Fort Davis",
    curiosidade: "Protegia emigrantes no século XIX.",
    img: "img/Fort-Davis.png",
    coords: [30.5885, -103.8941]
  },
  {
    nome: "National Cowgirl Museum",
    cidade: "Fort Worth",
    curiosidade: "Celebra as conquistas das mulheres no Velho Oeste.",
    img: "img/National-Cowgirl.png",
    coords: [32.7484, -97.3689]
  }
];

// Ícone de chapéu para pontos turísticos
const cowboyIcon = L.icon({
  iconUrl: 'img/cowboy-hat.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

// Adiciona marcadores com ícone de chapéu e pop-up
pontosTuristicos.forEach(ponto => {
  const popupContent = `
    <h5>${ponto.nome}</h5>
    <p><strong>Cidade:</strong> ${ponto.cidade}</p>
    <img src="${ponto.img}" alt="${ponto.nome}" style="width:100%; max-width:200px; border-radius: 8px;">
    <p><em>${ponto.curiosidade}</em></p>
  `;

  L.marker(ponto.coords, { icon: cowboyIcon })
    .addTo(map)
    .bindPopup(popupContent);
});

// Localiza o usuário
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      // Atualiza texto na página
      document.getElementById("geolocation-status").textContent = "Localização encontrada!";
      document.getElementById("user-location").textContent = 
        `Latitude: ${userLat.toFixed(4)}, Longitude: ${userLng.toFixed(4)}`;

      // Ícone personalizado para o usuário
      const userIcon = L.icon({
        iconUrl: 'img/user-location.png', // Troque pelo seu ícone
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
      });

      // Adiciona marcador da localização
      L.marker([userLat, userLng], { icon: userIcon })
        .addTo(map)
        .bindPopup("Você está aqui 👣")
        .openPopup();

      // Centraliza o mapa na localização
      map.setView([userLat, userLng], 10);
    },
    error => {
      document.getElementById("geolocation-status").textContent = "Não foi possível obter sua localização.";
    }
  );
} else {
  document.getElementById("geolocation-status").textContent = "Geolocalização não suportada.";
}