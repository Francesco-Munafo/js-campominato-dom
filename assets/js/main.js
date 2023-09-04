/* 
CONSEGNA 1

L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.


CONSEGNA 2

Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html,
 e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).

Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: **nella stessa cella può essere posizionata al massimo una bomba, 
perciò nell’array delle bombe non potranno esserci due numeri uguali.

In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba
 - la cella si colora di rosso e la partita termina.
 Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti 
(ovvero quando ha rivelato tutte le celle che non sono bombe).

Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
*/

//L'utente clicca su un bottone che genererà una griglia di gioco quadrata.

// Seleziono il pulsante dal documento

const gridGen = document.getElementById('generate');
let cellsLimit = document.getElementById('max_cells');

// Al click del pulsante invoca la funzione per generare la lista

gridGen.addEventListener('click', function () {
    const bombs = generateGrid(Number(cellsLimit.value));
     
    // Al click del bottone verranno generati degli elementi sul documento, ma al click dell'elemento dovranno "togglare" la classe che cambia il colore dello sfondo
    const cellList = document.querySelectorAll('.cell');
    const gameOver = document.querySelector('.end_game');
    const pointsDomEl = document.getElementById('points');
    let points = 0
    for (let i = 0; i < cellList.length; i++) {
        cellList[i].addEventListener('click', function selected() {
            console.log("Hai selezionato la cella n." + (i + 1));
            if (bombs.includes(i + 1) ) {
                this.classList.add('bg_red');
                gameOver.classList.add('game_over');
                gameOver.innerHTML = 'HAI PERSO!';
                pointsDomEl.innerHTML = 'Il tuo punteggio: ' + points;



            } else {
                this.classList.add('active');
                points++;
                this.removeEventListener('click', selected) //This prevents user from getting more points if he clicks multiple times on the same cell
            }
            
            if (points === (cellsLimit.value - bombs.length)){
                gameOver.classList.add('game_over');
                gameOver.innerHTML = 'HAI VINTO!'
                pointsDomEl.innerHTML = 'Il tuo punteggio: ' + points;
            }
        
        });
        
        
    }
    
});


// Creo la funzione che genera la griglia
/** ## generateGrid 
 * Generate a grid using the given parameter
 * @param {number} cellCounter Number of cells
*/
function generateGrid(cellCounter) {
    const domGridElement = document.querySelector('.grid'); //Select dom container
    
    for (let i = 0; i < cellCounter; i++) {
        const domCellElement = document.createElement('div'); //Create a div element
        domCellElement.classList.add('cell'); //Adds "cell" class to div
        domCellElement.style.width = `calc(100% / ${Math.sqrt(cellsLimit.value)})`
        domGridElement.append(domCellElement); //Append "cell" element to container
        domCellElement.innerHTML = `${[i + 1]}` //Adds cell numbering
        
        
    }
    
    // Genero 16 numeri random che dipendono dalla difficoltà selezionata
    let bombs = []
    for (let i = 0; i < 16; i++) {
        const bomb = Math.floor(Math.random() * (cellsLimit).value) + 1;
        
        if (bombs.includes(bomb)) {
            console.log('ho trovato un doppione '+ bomb);
            i--;
        } else {
            bombs.push(bomb);
        }
        
    }
    
    
    
    
    gridGen.classList.add('d-none'); //Make the button disappear after the function execution
    cellsLimit.classList.add('d-none');
    console.log(bombs);
    return bombs; 
}
