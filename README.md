# ShipDashboard

## Stack Tecnologico
- **Backend:** Laravel 13, PHP 8.3
- **Frontend:** React 19, TypeScript, Inertia.js, Tailwind CSS, shadcn/ui
- **Database:** PostgreSQL 16
- **Infrastruttura:** Docker e Docker Compose

## Descrizione Funzionale
ShipDashboard è un'applicazione web per la gestione e il tracciamento delle spedizioni. Il sistema offre un pannello di controllo centralizzato dove è possibile:
- Visualizzare la lista completa delle spedizioni.
- Filtrare i risultati tramite una ricerca testuale (tracking number, destinatario, indirizzo).
- Filtrare per "Stato" della spedizione tramite combobox (es. In Attesa, In Transito, Consegnato).
- Filtrare puntualmente per "Data di Partenza" e "Data di Consegna"
- Consultare una pagina di dettaglio per ogni singola spedizione, contenente l'anagrafica completa e lo storico cronologico degli Eventi di Tracking associati.

## Scelte Tecniche e Architettura

- Il forntend è stato generato tramite il comando di inizializazione "laravel new" ho utilizzato lo starter kit di React con già configurati inertia, vite, Tailwind CSS ed i componenti di shadcn.


- Il routing del forntend l'ho gestito tramite inertia, questo mi ha semplificato lo sviluppo senza la complessita fi gestirmi le chiamate su react dedicate per la GUI. I controller restituiscono direttamente i componenti React con i relativi dati. Ho creato comunque degli endpoint classici in modo da sparare i servizi di inertia,in modo da slegare le logiche di rendering della UI, mantenendo il sistema aperto

- ho creato un middleware per l'autologin di un utente(Admin), senza passare per la login.

## Avvio dell'ambiente in locale

### Setup Docker
L'ambiente Docker avvia automaticamente il database PostgreSQL e il backend Laravel. All'avvio, il container eseguirà autonomamente l'installazione delle dipendenze Composer, le migrazioni e il seeder, ci metterà un pò di tempo.

1. Copia il file `.env.example` in `.env` (se non è già presente):
   ```bash
   cp .env.example .env
   ```

2. Avvia i container:
   ```bash
   docker compose up -d --build
   ```

3. Compila il frontend localmente:
   ```bash
   npm install
   npm run dev
   ```

L'applicazione sarà accessibile all'indirizzo: `http://localhost:8000`

### Setup Manuale

1. Installa le dipendenze backend:
   ```bash
   composer install
   ```

2. Copia il file di configurazione ed imposta i parametri del tuo database PostgreSQL:
   ```bash
   cp .env.example .env
   ```

3. Genera la chiave dell'applicazione:
   ```bash
   php artisan key:generate
   ```

4. Esegui le migrazioni e il popolamento del database (creerà automaticamente l'utente `AdminUser` per l'accesso diretto alla dashboard):
   ```bash
   php artisan migrate:fresh --seed
   ```

5. Avvia il server di sviluppo Laravel:
   ```bash
   php artisan serve
   ```

6. In un terminale separato, installa le dipendenze ed avvia Vite per il frontend:
   ```bash
   npm install
   npm run dev
   ```