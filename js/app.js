// JavaScript principal pour SmartConnect
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation de l'application
    initApp();
    
    // Gestionnaires d'événements
    document.querySelector('.add-gateway').addEventListener('click', showGatewayModal);
    document.querySelector('.create-group').addEventListener('click', showGroupModal);
    document.querySelector('#search-input').addEventListener('input', searchGateways);
    
    // Fermeture des modales
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });
    
    // Soumission du formulaire d'ajout de gateway
    document.getElementById('gateway-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addNewGateway();
    });
    
    // Soumission du formulaire de création de groupe
    document.getElementById('group-form').addEventListener('submit', function(e) {
        e.preventDefault();
        createGatewayGroup();
    });
});

// Initialisation de l'application
function initApp() {
    // Vérifier le mode sombre
    if (appData.settings.general.darkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // Charger les gateways
    renderGateways();
}

// Rendu des gateways sur le dashboard
function renderGateways() {
    const container = document.getElementById('gateway-container');
    container.innerHTML = '';
    
    appData.gateways.forEach(gateway => {
        const gatewayCard = createGatewayCard(gateway);
        container.appendChild(gatewayCard);
    });
}

// Créer une carte gateway
function createGatewayCard(gateway) {
    const card = document.createElement('div');
    card.className = 'gateway-card';
    card.setAttribute('data-id', gateway.id);
    
    // Déterminer la classe de statut
    let statusClass = 'status-offline';
    if (gateway.status === 'online') {
        statusClass = 'status-online';
    } else if (gateway.status === 'warning') {
        statusClass = 'status-warning';
    }
    
    // Déterminer le texte de statut
    let statusText = 'Hors ligne';
    if (gateway.status === 'online') {
        statusText = 'En ligne';
    } else if (gateway.status === 'warning') {
        statusText = 'Avertissement';
    }
    
    // Formater le temps depuis la dernière vue
    const lastSeenText = appData.formatDate(gateway.lastSeen);
    
    card.innerHTML = `
        <div class="gateway-header">
            <div class="gateway-title">${gateway.name}</div>
            <div class="gateway-status ${statusClass}">${statusText}</div>
        </div>
        <div class="gateway-info">
            <p><strong>Location:</strong> ${gateway.location}</p>
            <p><strong>IP:</strong> ${gateway.ip}</p>
            <p><strong>Dernière activité:</strong> ${lastSeenText}</p>
            <p><strong>Uptime:</strong> ${gateway.uptime}%</p>
        </div>
        <div class="sensor-list">
            <h4>Capteurs</h4>
            ${renderSensors(gateway.sensors)}
        </div>
        <div class="gateway-actions">
            <button class="btn btn-secondary view-gateway" data-id="${gateway.id}">Voir Détails</button>
            <button class="btn btn-danger remove-gateway" data-id="${gateway.id}">Supprimer</button>
        </div>
    `;
    
    // Ajouter des gestionnaires d'événements aux boutons
    setTimeout(() => {
        const viewButton = card.querySelector('.view-gateway');
        if (viewButton) {
            viewButton.addEventListener('click', function() {
                viewGatewayDetails(gateway.id);
            });
        }
        
        const removeButton = card.querySelector('.remove-gateway');
        if (removeButton) {
            removeButton.addEventListener('click', function() {
                removeGateway(gateway.id);
            });
        }
    }, 0);
    
    return card;
}

// Rendu des capteurs pour une gateway
function renderSensors(sensors) {
    let sensorHtml = '';
    
    sensors.forEach(sensor => {
        const sensorValue = sensor.value !== null ? `${sensor.value} ${sensor.unit}` : 'N/A';
        sensorHtml += `
            <div class="sensor-item">
                <span class="sensor-name">${sensor.name}</span>
                <span class="sensor-value">${sensorValue}</span>
            </div>
        `;
    });
    
    return sensorHtml;
}

// Afficher la fenêtre modale d'ajout de gateway
function showGatewayModal() {
    document.getElementById('gateway-modal').style.display = 'block';
}

// Afficher la fenêtre modale de création de groupe
function showGroupModal() {
    // Remplir les checkboxes des gateways
    const checkboxesContainer = document.getElementById('gateway-checkboxes');
    checkboxesContainer.innerHTML = '';
    
    appData.gateways.forEach(gateway => {
        const checkbox = document.createElement('div');
        checkbox.className = 'checkbox-item';
        checkbox.innerHTML = `
            <label class="checkbox-label">
                <input type="checkbox" value="${gateway.id}" name="gateway-checkbox">
                ${gateway.name} (${gateway.location})
            </label>
        `;
        checkboxesContainer.appendChild(checkbox);
    });
    
    document.getElementById('group-modal').style.display = 'block';
}

// Ajouter une nouvelle gateway
function addNewGateway() {
    const name = document.getElementById('gateway-name').value;
    const location = document.getElementById('gateway-location').value;
    const ip = document.getElementById('gateway-ip').value;
    
    // Créer un nouvel ID (dans une vraie application, ce serait géré par le serveur)
    const newId = appData.gateways.length > 0 ? Math.max(...appData.gateways.map(g => g.id)) + 1 : 1;
    
    // Créer une nouvelle gateway
    const newGateway = {
        id: newId,
        name: name,
        location: location,
        ip: ip,
        status: 'online',
        lastSeen: new Date(),
        uptime: 100,
        sensors: [
            { id: newId * 100 + 1, name: "Température", type: "temperature", value: 20.0, unit: "°C" },
            { id: newId * 100 + 2, name: "Humidité", type: "humidity", value: 50, unit: "%" }
        ],
        dataVolume: 0.1
    };
    
    // Ajouter la nouvelle gateway aux données
    appData.gateways.push(newGateway);
    
    // Mettre à jour l'affichage
    renderGateways();
    
    // Fermer la fenêtre modale
    document.getElementById('gateway-modal').style.display = 'none';
    
    // Réinitialiser le formulaire
    document.getElementById('gateway-form').reset();
}

// Créer un groupe de gateways
function createGatewayGroup() {
    const groupName = document.getElementById('group-name').value;
    
    // Récupérer les IDs des gateways sélectionnées
    const selectedGateways = Array.from(document.querySelectorAll('input[name="gateway-checkbox"]:checked'))
        .map(checkbox => parseInt(checkbox.value));
    
    if (selectedGateways.length === 0) {
        alert('Veuillez sélectionner au moins une gateway');
        return;
    }
    
    // Créer un nouvel ID de groupe
    const newId = appData.groups.length > 0 ? Math.max(...appData.groups.map(g => g.id)) + 1 : 1;
    
    // Créer un nouveau groupe
    const newGroup = {
        id: newId,
        name: groupName,
        gateways: selectedGateways
    };
    
    // Ajouter le nouveau groupe aux données
    appData.groups.push(newGroup);
    
    // Fermer la fenêtre modale
    document.getElementById('group-modal').style.display = 'none';
    
    // Réinitialiser le formulaire
    document.getElementById('group-form').reset();
    
    alert(`Groupe "${groupName}" créé avec succès avec ${selectedGateways.length} gateway(s)`);
}

// Voir les détails d'une gateway
function viewGatewayDetails(gatewayId) {
    const gateway = appData.getGatewayById(gatewayId);
    if (!gateway) return;
    
    alert(`Détails de la gateway ${gateway.name} - Cette fonctionnalité serait développée dans une version complète de l'application.`);
}

// Supprimer une gateway
function removeGateway(gatewayId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette gateway ?')) {
        // Trouver l'index de la gateway à supprimer
        const index = appData.gateways.findIndex(g => g.id === gatewayId);
        
        if (index !== -1) {
            // Supprimer la gateway du tableau
            appData.gateways.splice(index, 1);
            
            // Mettre à jour l'affichage
            renderGateways();
        }
    }
}

// Rechercher des gateways
function searchGateways() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    // Si la recherche est vide, afficher toutes les gateways
    if (!searchTerm) {
        renderGateways();
        return;
    }
    
    // Filtrer les gateways en fonction du terme de recherche
    const filteredGateways = appData.gateways.filter(gateway => {
        return gateway.name.toLowerCase().includes(searchTerm) || 
               gateway.location.toLowerCase().includes(searchTerm) ||
               gateway.ip.includes(searchTerm);
    });
    
    // Afficher les gateways filtrées
    const container = document.getElementById('gateway-container');
    container.innerHTML = '';
    
    if (filteredGateways.length === 0) {
        container.innerHTML = '<div class="no-results">Aucune gateway trouvée</div>';
    } else {
        filteredGateways.forEach(gateway => {
            const gatewayCard = createGatewayCard(gateway);
            container.appendChild(gatewayCard);
        });
    }
} 