# proiectcloud
                                                     PROIECT CLOUD COMPUTING
                                             APLICAȚIE – MEMORATOR DE VACANȚE


                                                                                                          VĂRĂȘTEANU ANDRADA MARIA
                                                                                                              GRUPA 1134

LINK PREZENTARE

LINK PUBLICARE : http://proiectcloud-olive.vercel.app/
LINK GitHub: 


1.	Introducere
Aplicația dezvoltată în cadrul acestui proiect reprezintă un memorator pentru destinațiile de vacanță vizitate. Tehnologiile folosite în cadrul aplicației sunt:
-	MongoDB pentru baza de date; MongoDB este o bază de date non-relațională, ce stochează datele sub forma unui model creat special pentru cerințele specifice tipurilor de date folosite. În cadrul MongoDB nu există tabele, coloane sau chei secundare, ci datele sunt stocate sub formă de colecții și documente. Documentele sunt compuse din perechi cheie-valoare. Bazele de date de acest gen sunt mult mai indicate în dezvoltarea unei aplicații web sau mobile deoarece sunt capabile să stocheze volume mari de date și oferă flexibilitate în ceea ce privește modificarea structurii, fiind foarte ușor să schimbăm tipurile de date pentru fiecare câmp sau să ștergem documente sau înregistrări, chiar prin intermediul aplicației MongoDB Atlas.


-	Next.js – este un framework React, conceput pentru a construi aplicații web full stack interactive și dinamice. Prin intermediul acestui framework se pot crea interfețele aplicației folosind componente de React. Unul dintre conceptele cheie în Next.js este sistemul rutare bazat pe fișiere, astfel că folderul pages/ definește rutele aplicației, fără a fi nevoie de o configurație suplimentară. În screenshot-ul de mai jos putem vedea componența folderului. Fiecare fișier .js sau .jsx devine automat o rută accesibilă în browser.



-	NodeJS – reprezintă un mediu de execuție a limbajului JavaScript ce permite rularea codului în afara browser-ului, pe server. Am folosit Node.js în cadrul acestui proiect pentru gestionarea dependințelor cu ajutorul npm (Node Package Manager) și pentru a rula serverul Next.js, care gestionează partea de frontend dar si de backend.
-	Vercel – platformă cloud utilizată pentru deployment (direct de pe repository ul de pe GitHub)

2.	Descriere problemă
    Scopul aplicației este de a oferi utilizatorilor o modalitate de a păstra evidența vacanțelor. Putem vizualiza țara, orașele vizitate dar și atracțiile. Aplicația oferă și sugestii de călătorie, prin generarea de destinații de vacanță la apăsarea unui buton. Utilizatorul poate gestiona jurnalul, prin adăugarea / ștergerea destinațiilor de vacanță.

3.	Descriere API
În cadrul fișierului /api din folderul pages am definit câte un endpoint către care se pot trimite cereri HTTP. Un endpoint este de fapt un URL către care clientul (browserul) trimite o cerere, iar serverul oferă un răspuns. Am implementat aici funcționalitățile de adăugare și ștergere din baza de date.
my-app\pages\api\addDestination.js – adăugare destinație în BD
my-app\pages\api\deleteCountry.js – ștergere destinație din BD 

4.	Flux de date
Utilizatorul interacționează prima dată cu pagina principală a aplicației (Home) unde se încarcă sub forma unor postcards obiectele din colecția countries (funcția getServerSideProps() din fișierul index.js este responsabilă de această funcționalitate – preia datele din baza de date , transformă rezultatul sub formă de JSON și îl returnează ca props pentru componenta paginii). În pagina “Add a destination” utilizatorul completează un formular ce trimite un POST request către server, iar pe pagina principală are optiunea de ștergere a unei locații, adica un request de DELETE către server. În pagina de “Vacation Ideas” are posibilitatea de a apăsa butonul ce afișează o locație; este de fapt  un Array hardcodat din care se alege un string random cu ajutorul funcției Math.Random(). 





5.	Capturi ecran aplicație

 
                                                                                             Figură 2 Pagina principală


  
                                                                                                  Figură 3 Formularul de adăugare
 
                                                                                 Figură 4 Pagina Vacation Ideas
6.	Referințe

https://nextjs.org/docs%23what-is-nextjs
https://www.getfishtank.com/insights/what-is-vercel
https://nodejs.org/docs/latest/api/synopsis.html
https://www.mongodb.com/docs/atlas/
