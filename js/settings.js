// JavaScript pour la page des paramètres
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation de la page
    initSettingsPage();
    
    // Gestionnaires d'événements pour les onglets de paramètres
    document.querySelectorAll('.settings-nav li').forEach(tab => {
        tab.addEventListener('click', function() {
            switchSettingsTab(this.getAttribute('data-tab'));
        });
    });
    
    // Gestionnaires d'événements pour les formulaires
    document.getElementById('general-settings-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveGeneralSettings();
    });
    
    document.getElementById('notification-settings-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveNotificationSettings();
    });
    
    document.getElementById('security-settings-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveSecuritySettings();
    });
    
    document.getElementById('data-settings-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveDataSettings();
    });
    
    // Gestionnaire pour ajouter un utilisateur
    document.getElementById('add-user').addEventListener('click', showUserModal);
    
    // Gestionnaire pour fermer la modal d'utilisateur
    document.querySelector('#user-modal .close-modal').addEventListener('click', function() {
        document.getElementById('user-modal').style.display = 'none';
    });
    
    // Gestionnaire pour le formulaire d'ajout d'utilisateur
    document.getElementById('user-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addNewUser();
    });
    
    // Gestionnaires pour les actions dangereuses
    document.getElementById('clear-data').addEventListener('click', function() {
        if (confirm('Êtes-vous sûr de vouloir effacer toutes les données ? Cette action est irréversible.')) {
            alert('Toutes les données ont été effacées (simulation).');
        }
    });
    
    document.getElementById('reset-app').addEventListener('click', function() {
        if (confirm('Êtes-vous sûr de vouloir réinitialiser l\'application ? Toutes les données et paramètres seront perdus.')) {
            alert('L\'application a été réinitialisée (simulation).');
        }
    });
    
    // Gestionnaire pour le mode sombre
    document.getElementById('dark-mode').addEventListener('change', function() {
        toggleDarkMode(this.checked);
    });
});

// Initialisation de la page des paramètres
function initSettingsPage() {
    // Appliquer le mode sombre si nécessaire
    if (appData.settings.general.darkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // Charger les paramètres actuels
    loadCurrentSettings();
    
    // Charger la liste des utilisateurs
    loadUsers();
}

// Changer d'onglet de paramètres
function switchSettingsTab(tabId) {
    // Retirer la classe active de tous les onglets
    document.querySelectorAll('.settings-nav li').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Ajouter la classe active à l'onglet sélectionné
    document.querySelector(`.settings-nav li[data-tab="${tabId}"]`).classList.add('active');
    
    // Masquer tous les contenus d'onglets
    document.querySelectorAll('.settings-tab').forEach(content => {
        content.classList.remove('active');
    });
    
    // Afficher le contenu de l'onglet sélectionné
    document.getElementById(`${tabId}-tab`).classList.add('active');
}

// Charger les paramètres actuels
function loadCurrentSettings() {
    // Paramètres généraux
    document.getElementById('company-name').value = appData.settings.general.companyName;
    document.getElementById('language').value = appData.settings.general.language;
    document.getElementById('timezone').value = appData.settings.general.timezone;
    document.getElementById('date-format').value = appData.settings.general.dateFormat;
    document.getElementById('dark-mode').checked = appData.settings.general.darkMode;
    
    // Paramètres de notification
    document.getElementById('email-notifications').checked = appData.settings.notifications.emailEnabled;
    document.getElementById('notification-email').value = appData.settings.notifications.email;
    document.getElementById('offline-alerts').checked = appData.settings.notifications.alertOffline;
    document.getElementById('sensor-alerts').checked = appData.settings.notifications.alertSensor;
    document.getElementById('security-alerts').checked = appData.settings.notifications.alertSecurity;
    
    // Paramètres de données
    document.getElementById('data-retention').value = appData.settings.data.retention;
    document.getElementById('backup-frequency').value = appData.settings.data.backupFrequency;
    document.getElementById('data-compression').checked = appData.settings.data.compression;
}

// Sauvegarder les paramètres généraux
function saveGeneralSettings() {
    // Récupérer les valeurs du formulaire
    const companyName = document.getElementById('company-name').value;
    const language = document.getElementById('language').value;
    const timezone = document.getElementById('timezone').value;
    const dateFormat = document.getElementById('date-format').value;
    const darkMode = document.getElementById('dark-mode').checked;
    
    // Mettre à jour les données
    appData.settings.general.companyName = companyName;
    appData.settings.general.language = language;
    appData.settings.general.timezone = timezone;
    appData.settings.general.dateFormat = dateFormat;
    appData.settings.general.darkMode = darkMode;
    
    // Afficher une confirmation
    showSaveConfirmation();
}

// Sauvegarder les paramètres de notification
function saveNotificationSettings() {
    // Récupérer les valeurs du formulaire
    const emailEnabled = document.getElementById('email-notifications').checked;
    const email = document.getElementById('notification-email').value;
    const alertOffline = document.getElementById('offline-alerts').checked;
    const alertSensor = document.getElementById('sensor-alerts').checked;
    const alertSecurity = document.getElementById('security-alerts').checked;
    
    // Mettre à jour les données
    appData.settings.notifications.emailEnabled = emailEnabled;
    appData.settings.notifications.email = email;
    appData.settings.notifications.alertOffline = alertOffline;
    appData.settings.notifications.alertSensor = alertSensor;
    appData.settings.notifications.alertSecurity = alertSecurity;
    
    // Afficher une confirmation
    showSaveConfirmation();
}

// Sauvegarder les paramètres de sécurité
function saveSecuritySettings() {
    // Dans une application réelle, nous vérifierions le mot de passe actuel et mettrions à jour le mot de passe
    // Pour cette démo, nous simulons simplement une mise à jour réussie
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // Vérifications simples
    if (currentPassword === '') {
        alert('Veuillez entrer votre mot de passe actuel.');
        return;
    }
    
    if (newPassword !== '' && newPassword !== confirmPassword) {
        alert('Les nouveaux mots de passe ne correspondent pas.');
        return;
    }
    
    // Mise à jour 2FA
    const enable2FA = document.getElementById('enable-2fa').checked;
    
    // En cas de modification de mot de passe
    if (newPassword !== '') {
        // Simulation de mise à jour de mot de passe
        alert('Mot de passe mis à jour avec succès.');
    }
    
    // Réinitialiser le formulaire
    document.getElementById('security-settings-form').reset();
    
    // Afficher une confirmation
    showSaveConfirmation();
}

// Sauvegarder les paramètres de données
function saveDataSettings() {
    // Récupérer les valeurs du formulaire
    const retention = document.getElementById('data-retention').value;
    const backupFrequency = document.getElementById('backup-frequency').value;
    const compression = document.getElementById('data-compression').checked;
    
    // Mettre à jour les données
    appData.settings.data.retention = retention;
    appData.settings.data.backupFrequency = backupFrequency;
    appData.settings.data.compression = compression;
    
    // Afficher une confirmation
    showSaveConfirmation();
}

// Charger la liste des utilisateurs
function loadUsers() {
    const tableBody = document.getElementById('user-table-body');
    tableBody.innerHTML = '';
    
    appData.users.forEach(user => {
        const row = document.createElement('tr');
        
        // Formater la date de dernière connexion
        const lastLogin = appData.formatDate(user.lastLogin);
        
        // Formater le rôle en français
        let roleFr = user.role;
        switch(user.role) {
            case 'admin':
                roleFr = 'Administrateur';
                break;
            case 'manager':
                roleFr = 'Gestionnaire';
                break;
            case 'user':
                roleFr = 'Utilisateur';
                break;
            case 'viewer':
                roleFr = 'Observateur';
                break;
        }
        
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${roleFr}</td>
            <td>${lastLogin}</td>
            <td>
                <button class="btn btn-secondary edit-user" data-id="${user.id}">Modifier</button>
                <button class="btn btn-danger delete-user" data-id="${user.id}">Supprimer</button>
            </td>
        `;
        
        // Ajouter des gestionnaires d'événements pour les boutons
        setTimeout(() => {
            row.querySelector('.edit-user').addEventListener('click', function() {
                editUser(user.id);
            });
            
            row.querySelector('.delete-user').addEventListener('click', function() {
                deleteUser(user.id);
            });
        }, 0);
        
        tableBody.appendChild(row);
    });
}

// Afficher la fenêtre modale d'ajout d'utilisateur
function showUserModal() {
    document.getElementById('user-modal').style.display = 'block';
}

// Ajouter un nouvel utilisateur
function addNewUser() {
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const role = document.getElementById('user-role').value;
    
    // Créer un nouvel ID
    const newId = appData.users.length > 0 ? Math.max(...appData.users.map(u => u.id)) + 1 : 1;
    
    // Créer un nouvel utilisateur
    const newUser = {
        id: newId,
        name: name,
        email: email,
        role: role,
        lastLogin: new Date()
    };
    
    // Ajouter l'utilisateur aux données
    appData.users.push(newUser);
    
    // Mettre à jour l'affichage
    loadUsers();
    
    // Fermer la fenêtre modale
    document.getElementById('user-modal').style.display = 'none';
    
    // Réinitialiser le formulaire
    document.getElementById('user-form').reset();
}

// Modifier un utilisateur
function editUser(userId) {
    // Dans une application réelle, nous afficherions une fenêtre modale avec les données de l'utilisateur
    // Pour cette démo, nous affichons simplement une alerte
    alert(`Modification de l'utilisateur avec l'ID ${userId} - Cette fonctionnalité serait développée dans une version complète de l'application.`);
}

// Supprimer un utilisateur
function deleteUser(userId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
        // Trouver l'index de l'utilisateur à supprimer
        const index = appData.users.findIndex(u => u.id === userId);
        
        if (index !== -1) {
            // Supprimer l'utilisateur du tableau
            appData.users.splice(index, 1);
            
            // Mettre à jour l'affichage
            loadUsers();
        }
    }
}

// Basculer le mode sombre
function toggleDarkMode(enabled) {
    if (enabled) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    
    // Mettre à jour le paramètre
    appData.settings.general.darkMode = enabled;
}

// Afficher une confirmation de sauvegarde
function showSaveConfirmation() {
    // Dans une application réelle, nous afficherions une notification plus élégante
    // Pour cette démo, nous utilisons une alerte simple
    alert('Paramètres sauvegardés avec succès.');
} 