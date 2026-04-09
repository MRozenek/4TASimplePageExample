const mysql = require('mysql2');
const http = require('http');

// 1. CONNECTION STRING - Twoje dane do bazy MariaDB
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // zazwyczaj 'root'
  password: '', // WPISZ TUTAJ SWOJE HASŁO DO MARIADB
  database: 'sakila'  // nazwa bazy danych
});

// 2. TWORZENIE SERWERA
const server = http.createServer((req, res) => {
  // Ustawienie polskich znaków w przeglądarce
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  // 3. ZAPYTANIE SQL (Pobieramy 20 filmów)
  connection.query('SELECT title FROM film', (err, results) => {
    if (err) {
      res.end('<h1>Błąd bazy danych!</h1><p>' + err.message + '</p>');
      console.error('Błąd:', err);
      return;
    }

    // 4. GENEROWANIE HTML
    let html = '<html><head><title>Sakila Movies</title></head><body>';
    html += '<h1>Filmy z bazy Sakila (Node.js)</h1>';
    html += '<ol>';
    
    // Pętla przechodząca przez wyniki z bazy
    results.forEach(film => {
      html += `<li>${film.title}</li>`;
    });

    html += '</ol></body></html>';
    
    // Wysyłanie gotowej strony do przeglądarki
    res.end(html);
  });
});

// 5. URUCHOMIENIE SERWERA NA PORCIE 3000
server.listen(3000, () => {
  console.log('--------------------------------------------------');
  console.log('SUKCES! Serwer Node.js działa.');
  console.log('Otwórz w przeglądarce: http://localhost:3000');
  console.log('--------------------------------------------------');
});
