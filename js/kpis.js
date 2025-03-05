// JavaScript pour la page des KPIs
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation de la page
    initKpiPage();
    
    // Gestionnaire d'événement pour le changement de période
    document.getElementById('date-range').addEventListener('change', function() {
        updateKpiData(this.value);
    });
});

// Initialisation de la page KPI
function initKpiPage() {
    // Appliquer le mode sombre si nécessaire
    if (appData.settings.general.darkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // Charger les données KPI initiales pour la période par défaut (semaine)
    updateKpiData('week');
}

// Mettre à jour les données KPI en fonction de la période sélectionnée
function updateKpiData(period) {
    // Dans une application réelle, nous récupérerions les données du serveur en fonction de la période
    // Pour cette démo, nous utilisons simplement les données statiques avec quelques variations
    
    // Facteur de variation pour simuler différentes périodes
    let factor = 1.0;
    switch(period) {
        case 'day':
            factor = 0.8;
            break;
        case 'week':
            factor = 1.0;
            break;
        case 'month':
            factor = 1.2;
            break;
        case 'year':
            factor = 1.5;
            break;
    }
    
    // Mettre à jour les cartes KPI
    updateKpiCards(factor);
    
    // Mettre à jour le tableau des principales gateways
    updateTopGatewaysTable(factor);
    
    // Dans une application réelle, nous mettrions à jour les graphiques ici
    // Pour cette démo, nous utilisons des graphiques statiques
}

// Mettre à jour les cartes KPI
function updateKpiCards(factor) {
    // Calculer les valeurs ajustées
    const totalGateways = Math.round(appData.kpiStats.totalGateways * factor);
    const activeGateways = Math.round(appData.kpiStats.activeGateways * factor);
    const dataVolume = (appData.kpiStats.totalDataVolume * factor).toFixed(1);
    const uptime = (appData.kpiStats.averageUptime * (1 + (factor - 1) * 0.1)).toFixed(1);
    
    // Mettre à jour les affichages
    document.getElementById('total-gateways').textContent = totalGateways;
    document.getElementById('active-gateways').textContent = activeGateways;
    document.getElementById('data-volume').textContent = `${dataVolume} GB`;
    document.getElementById('uptime').textContent = `${uptime}%`;
    
    // Mettre à jour les tendances (simulées pour cette démo)
    document.querySelector('#total-gateways').nextElementSibling.textContent = 
        `${appData.kpiStats.periodComparison.gateways}% from previous period`;
    
    document.querySelector('#active-gateways').nextElementSibling.textContent = 
        `${appData.kpiStats.periodComparison.active}% from previous period`;
    
    document.querySelector('#data-volume').nextElementSibling.textContent = 
        `${appData.kpiStats.periodComparison.dataVolume}% from previous period`;
    
    document.querySelector('#uptime').nextElementSibling.textContent = 
        `${appData.kpiStats.periodComparison.uptime}% from previous period`;
}

// Mettre à jour le tableau des principales gateways
function updateTopGatewaysTable(factor) {
    const tableBody = document.getElementById('top-gateways-table');
    tableBody.innerHTML = '';
    
    // Trier les gateways par volume de données (simulé avec le facteur)
    const sortedGateways = [...appData.gateways]
        .sort((a, b) => (b.dataVolume * factor) - (a.dataVolume * factor))
        .slice(0, 5); // Top 5
    
    sortedGateways.forEach(gateway => {
        const row = document.createElement('tr');
        
        // Déterminer la classe de statut
        let statusClass = 'status-offline';
        let statusText = 'Hors ligne';
        
        if (gateway.status === 'online') {
            statusClass = 'status-online';
            statusText = 'En ligne';
        } else if (gateway.status === 'warning') {
            statusClass = 'status-warning';
            statusText = 'Avertissement';
        }
        
        // Ajuster le volume de données pour cette période
        const adjustedVolume = (gateway.dataVolume * factor).toFixed(1);
        
        row.innerHTML = `
            <td>${gateway.name}</td>
            <td>${gateway.location}</td>
            <td>${adjustedVolume} GB</td>
            <td>${gateway.uptime}%</td>
            <td><span class="gateway-status ${statusClass}">${statusText}</span></td>
        `;
        
        tableBody.appendChild(row);
    });
} 