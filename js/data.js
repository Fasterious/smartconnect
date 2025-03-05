// Données de démo pour l'application SmartConnect
const appData = {
    // Gateways
    gateways: [
        {
            id: 1,
            name: "Gateway Alpha",
            location: "Bureau Principal",
            ip: "192.168.1.10",
            status: "online",
            lastSeen: new Date(Date.now() - 5 * 60000), // 5 minutes ago
            uptime: 99.8,
            sensors: [
                { id: 101, name: "Température", type: "temperature", value: 22.5, unit: "°C" },
                { id: 102, name: "Humidité", type: "humidity", value: 45, unit: "%" },
                { id: 103, name: "CO2", type: "co2", value: 650, unit: "ppm" },
                { id: 104, name: "Luminosité", type: "light", value: 420, unit: "lux" }
            ],
            dataVolume: 1.2 // GB
        },
        {
            id: 2,
            name: "Gateway Beta",
            location: "Entrepôt Nord",
            ip: "192.168.1.11",
            status: "warning",
            lastSeen: new Date(Date.now() - 15 * 60000), // 15 minutes ago
            uptime: 97.2,
            sensors: [
                { id: 201, name: "Température", type: "temperature", value: 18.3, unit: "°C" },
                { id: 202, name: "Humidité", type: "humidity", value: 60, unit: "%" },
                { id: 203, name: "Mouvement", type: "motion", value: "Actif", unit: "" },
                { id: 204, name: "Porte", type: "door", value: "Fermée", unit: "" }
            ],
            dataVolume: 2.8 // GB
        },
        {
            id: 3,
            name: "Gateway Gamma",
            location: "Salle Serveur",
            ip: "192.168.1.12",
            status: "online",
            lastSeen: new Date(Date.now() - 2 * 60000), // 2 minutes ago
            uptime: 99.9,
            sensors: [
                { id: 301, name: "Température", type: "temperature", value: 21.0, unit: "°C" },
                { id: 302, name: "Humidité", type: "humidity", value: 40, unit: "%" },
                { id: 303, name: "Alimentation", type: "power", value: "Stable", unit: "" },
                { id: 304, name: "Accès", type: "access", value: "Sécurisé", unit: "" }
            ],
            dataVolume: 4.5 // GB
        },
        {
            id: 4,
            name: "Gateway Delta",
            location: "Atelier",
            ip: "192.168.1.13",
            status: "offline",
            lastSeen: new Date(Date.now() - 2 * 3600000), // 2 hours ago
            uptime: 85.3,
            sensors: [
                { id: 401, name: "Température", type: "temperature", value: null, unit: "°C" },
                { id: 402, name: "Vibration", type: "vibration", value: null, unit: "Hz" },
                { id: 403, name: "Pression", type: "pressure", value: null, unit: "bar" },
                { id: 404, name: "Bruit", type: "noise", value: null, unit: "dB" }
            ],
            dataVolume: 0.9 // GB
        },
        {
            id: 5,
            name: "Gateway Epsilon",
            location: "Parking",
            ip: "192.168.1.14",
            status: "online",
            lastSeen: new Date(Date.now() - 8 * 60000), // 8 minutes ago
            uptime: 98.6,
            sensors: [
                { id: 501, name: "Température", type: "temperature", value: 14.2, unit: "°C" },
                { id: 502, name: "Présence", type: "presence", value: "4 véhicules", unit: "" },
                { id: 503, name: "Luminosité", type: "light", value: 890, unit: "lux" },
                { id: 504, name: "Barrière", type: "barrier", value: "Ouverte", unit: "" }
            ],
            dataVolume: 1.7 // GB
        },
        {
            id: 6,
            name: "Gateway Zeta",
            location: "Cafétéria",
            ip: "192.168.1.15",
            status: "online",
            lastSeen: new Date(Date.now() - 1 * 60000), // 1 minute ago
            uptime: 99.5,
            sensors: [
                { id: 601, name: "Température", type: "temperature", value: 23.8, unit: "°C" },
                { id: 602, name: "Humidité", type: "humidity", value: 50, unit: "%" },
                { id: 603, name: "Occupation", type: "occupancy", value: "12 personnes", unit: "" },
                { id: 604, name: "Qualité Air", type: "air", value: "Bonne", unit: "" }
            ],
            dataVolume: 1.1 // GB
        }
    ],
    
    // Groupes de gateways
    groups: [
        {
            id: 1,
            name: "Site Principal",
            gateways: [1, 3, 6] // IDs des gateways incluses
        },
        {
            id: 2,
            name: "Zone Logistique",
            gateways: [2, 5] // IDs des gateways incluses
        }
    ],
    
    // Utilisateurs
    users: [
        {
            id: 1,
            name: "Admin Système",
            email: "admin@example.com",
            role: "admin",
            lastLogin: new Date(Date.now() - 2 * 3600000) // 2 hours ago
        },
        {
            id: 2,
            name: "Jean Dupont",
            email: "jean@example.com",
            role: "manager",
            lastLogin: new Date(Date.now() - 1 * 86400000) // 1 day ago
        },
        {
            id: 3,
            name: "Marie Martin",
            email: "marie@example.com",
            role: "user",
            lastLogin: new Date(Date.now() - 3 * 3600000) // 3 hours ago
        }
    ],
    
    // Paramètres
    settings: {
        general: {
            companyName: "SmartConnect Inc.",
            language: "fr",
            timezone: "CET",
            dateFormat: "DD/MM/YYYY",
            darkMode: true
        },
        notifications: {
            emailEnabled: true,
            email: "admin@example.com",
            alertOffline: true,
            alertSensor: true,
            alertSecurity: true
        },
        data: {
            retention: 90,
            backupFrequency: "weekly",
            compression: true
        }
    },
    
    // Statistiques KPI
    kpiStats: {
        totalGateways: 6,
        activeGateways: 5,
        totalDataVolume: 12.2, // GB
        averageUptime: 96.7, // %
        periodComparison: {
            gateways: 5, // % d'augmentation
            active: 2, // % d'augmentation
            dataVolume: 12, // % d'augmentation
            uptime: -1 // % de diminution
        }
    },

    // Fonction utilitaire pour formater les dates
    formatDate: function(date) {
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) { // moins d'une minute
            return "À l'instant";
        } else if (diff < 3600000) { // moins d'une heure
            const minutes = Math.floor(diff / 60000);
            return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
        } else if (diff < 86400000) { // moins d'un jour
            const hours = Math.floor(diff / 3600000);
            return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
        } else {
            const days = Math.floor(diff / 86400000);
            return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
        }
    },
    
    // Fonction pour obtenir une gateway par ID
    getGatewayById: function(id) {
        return this.gateways.find(gateway => gateway.id === id);
    },
    
    // Fonction pour obtenir toutes les gateways d'un groupe
    getGatewaysInGroup: function(groupId) {
        const group = this.groups.find(g => g.id === groupId);
        if (!group) return [];
        
        return group.gateways.map(id => this.getGatewayById(id));
    }
}; 