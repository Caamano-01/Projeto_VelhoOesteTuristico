// Dados dos pontos turísticos do Texas
const touristSpots = [
    {
        name: "Alamo",
        city: "San Antonio",
        description: "Local histórico de uma batalha crucial pela independência do Texas.",
        image: "img/alamo.jpg",
        lat: 29.4260,
        lon: -98.4862
    },
    {
        name: "Big Bend National Park",
        city: "Condado de Brewster",
        description: "Um vasto parque nacional com paisagens desérticas e montanhosas.",
        image: "img/bigbend.jpg",
        lat: 29.2847,
        lon: -103.2298
    },
    {
        name: "Stockyards National Historic District",
        city: "Fort Worth",
        description: "Onde o gado ainda é conduzido pelas ruas, um verdadeiro mergulho no Velho Oeste.",
        image: "img/stockyards.jpg",
        lat: 32.7885,
        lon: -97.3516
    },
    {
        name: "Gruene Hall",
        city: "New Braunfels",
        description: "O salão de dança mais antigo e continuamente em operação do Texas.",
        image: "img/gruene.jpg",
        lat: 29.7214,
        lon: -98.1189
    }
];

// Função para calcular a distância entre duas coordenadas (Fórmula de Haversine)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em quilômetros
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(2); // Retorna a distância com 2 casas decimais
}

function toRad(deg) {
    return deg * (Math.PI / 180);
}

// Inserção do mapa Leaflet
document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('mapa');
    if (mapContainer) {
        // Inicializa o mapa e define a visualização central e o zoom
        const map = L.map(mapContainer).setView([29.8, -99.9], 6);

        // Adiciona a camada de tiles do CartoDB Dark Matter
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);

        // Adiciona marcadores para cada ponto turístico
        touristSpots.forEach(spot => {
            const marker = L.marker([spot.lat, spot.lon]).addTo(map);

            // Cria o conteúdo do pop-up
            const popupContent = `
                <div>
                    <h4>${spot.name}</h4>
                    <p><strong>Cidade:</strong> ${spot.city}</p>
                    <img src="${spot.image}" alt="${spot.name}" style="width:100%; height:auto;"/>
                    <p>${spot.description}</p>
                </div>
            `;

            marker.bindPopup(popupContent);
        });
    }
});
