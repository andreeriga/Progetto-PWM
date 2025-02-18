# Marvel-afse

## Descrizione

Questo progetto è stato sviluppato per il corso di Tecnologie e Linguaggi per il Web e consente agli utenti di collezionare, acquistare e scambiare figurine di supereroi Marvel. Il sistema si basa su un'architettura full-stack utilizzando Node.js con Express per il backend e MongoDB per la gestione dei dati. Il frontend è realizzato con HTML, CSS, JavaScript e Bootstrap.

## Tecnologie Utilizzate

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap
- **Autenticazione**: Email e password
- **API Documentation**: Swagger (accessibile a `localhost:3000/api-docs`)

## Funzionalità Principali

- **Registrazione e Login**
- **Acquisto Crediti**
  - Tagli disponibili: 100, 200, 300, 400, 500, 600 crediti
- **Acquisto Pacchetti di Figurine**
  - Pacchetti standard
  - Pacchetti speciali (gestiti dagli amministratori)
- **Visualizzazione Figurine e Supereroi**
  - Home Page: Info del supereroe scelto in fase di registrazione
  - Sezione Figurine: Mostra tutte le figurine disponibili
  - Raccoglitore: Figurine collezionate dall'utente
- **Scambio Figurine**
  - Inserimento scambi
  - Proposta di scambio
  - Visualizzazione scambi in sospeso
- **Gestione Amministratore**
  - Creazione ed eliminazione di offerte su pacchetti speciali

## Installazione e Avvio

### 1. Clonare il repository

```bash
git clone <repo-url>
cd Marvel-afse
```

### 2. Installare le dipendenze

```bash
cd Backend
npm install
```

### 3. Configurare le variabili d'ambiente

Creare un file `.env` nella cartella `Backend` con i seguenti parametri:

```
PORT=3000
MONGO_URI=<URL_MONGO_DB>
PUBLIC_API_KEY=<CHIAVE_API_PUBBLICA>
PRIVATE_API_KEY=<CHIAVE_API_PRIVATA>
```

### 4. Avviare il server

```bash
node server.js
```

Aprire il browser e accedere a `localhost:3000/` per utilizzare l'applicazione.

## Utenti di Test

Nel database sono già presenti utenti di prova:

- **Utente 1**: [user1.spiderman@afse.com](mailto\:user1.spiderman@afse.com) | password: password
- **Utente 2**: [user2.hulk@afse.com](mailto\:user2.hulk@afse.com) | password: password
- **Amministratore**: [admin\_afse@admin.com](mailto\:admin_afse@admin.com) | password: 1234

## Contributi

I contributi sono benvenuti! Sentiti libero di aprire una Pull Request o segnalare problemi con una Issue.

## Licenza

Questo progetto è distribuito sotto la licenza MIT.
