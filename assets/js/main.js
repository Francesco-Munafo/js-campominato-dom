/* 

L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.

*/

//L'utente clicca su un bottone che genererà una griglia di gioco quadrata.

// Seleziono il pulsante dal documento

const gridGen = document.getElementById('generate');

// Al click del pulsante invoca la funzione per generare la lista

gridGen.addEventListener('click', function () {
    generateGrid(100);
    // Al click del bottone verranno generati degli elementi sul documento, ma al click dell'elemento dovranno "togglare" la classe che cambia il colore dello sfondo
    const cellList = document.querySelectorAll('.cell');
    for (let i = 0; i < cellList.length; i++) {
        cellList[i].addEventListener('click', function () {
            this.classList.toggle('active');
            console.log("Hai selezionato la cella n." + (i + 1));
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
        domGridElement.append(domCellElement); //Append "cell" element to container
        domCellElement.innerHTML = `${[i + 1]}` //Adds cell numbering


    }

    gridGen.classList.add('d-none'); //Make the button disappear after the function execution

}
