/**
 * 2C = Two of Clubs (Treboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */


let deck         = [];
const tipos      = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosPC      = 0;

// Referencias del HTML
let btnPedir,
    btnStop,
    btnNewGame,
    result,
    displayPuntos,
    cartasJugador,
    cartasPC;
document.addEventListener('DOMContentLoaded', main);



const crearDeck = () => {
    for (let face of tipos) {
        for (let i = 2; i < 11; i++){
            const card = i + face;
            deck.push(card);
        }
        for (let especial of especiales){
            const card = especial + face;
            deck.push(card);
        }
    }

    deck = _.shuffle( deck );

    return deck;
}



const pedirCarta = () => {
    try {
        if ( deck.length === 0 ){
            throw 'No hay cartas en la baraja';
        } else {
            const card = deck.pop();
            return card;
        }
    } catch (error) {
        console.log( error );
    }
};



const valorCarta = ( carta ) => {
    const valor = carta.substring( 0, carta.length - 1 );
    return ( valor === 'J' || valor === 'Q' || valor === 'K' ) ? 10 : 
           ( valor === 'A' ) ? 11 : Number.parseInt(valor);
};

const drawAddCard = ( player ) => {
    // Draw card
    const card = pedirCarta();
    ( player === 'jugador' ) ? puntosJugador += valorCarta( card ) : puntosPC += valorCarta( card );
    // Display points
    ( player === 'jugador' ) ? displayPuntos[0].innerText = puntosJugador : displayPuntos[1].innerText = puntosPC;
    // Add card image
    const newCard = document.createElement('img');
    newCard.alt = card;
    newCard.src = `assets/cartas/${card}.png`;
    newCard.className = 'carta';
    ( player === 'jugador' ) ? cartasJugador.append( newCard ) : cartasPC.append( newCard );
}

const win = () => {
    setTimeout(() => {
        if ( puntosJugador <= 21 && puntosPC <= 21 ){
            ( puntosJugador > puntosPC ) ? result.innerText = 'Jugador gana!' :
            ( puntosJugador === puntosPC ) ? result.innerText = 'Empate' : result.innerText = 'La casa siempre gana :)';
        } else if ( puntosJugador <= 21 ){
            result.innerText = 'Jugador gana!';
        } else {
            result.innerText = 'La casa gana';
        }
    }, 1500);
};

const blockBtn = ( btn ) => {
    btn.className = 'btn btn-secondary';
    btn.disabled = true;
};

const unlockBtn = ( btn ) => {
    btn.className = 'btn btn-primary';
    btn.disabled = false;
}


// PC's turn
const turnPC = ( puntosMinimos ) => {
    try {
        const carta = document.querySelector('.back');
        carta.remove();
    } catch ( e ) {
        console.log( e );
    }
    while ( (puntosPC < puntosMinimos) && (puntosPC <= 21) ){
        drawAddCard('PC');
        if ( puntosMinimos > 21 ) break;
    }
    win();
};

const firstTurnPC = () => {
    drawAddCard('PC');
    const hiddenCard = document.createElement('img');
    hiddenCard.alt = 'Red back';
    hiddenCard.src = 'assets/cartas/red_back.png';
    hiddenCard.className = 'carta back';
    cartasPC.append( hiddenCard );
};

// New game
const newGame = () => {
    puntosJugador = 0;
    puntosPC = 0;
    displayPuntos[0].innerText = puntosJugador;
    result.innerText = 'Jugando...';
    unlockBtn( btnPedir );
    unlockBtn( btnStop  );
    const cartas = document.querySelectorAll('.carta');
    for ( let carta of cartas ){
        carta.remove();
    }
    deck = crearDeck();
    firstTurnPC();
};




// Eventos
function main() {
    // Initializations
    btnPedir = document.querySelector('#btnPedir');
    btnStop = document.querySelector('#btnStop');
    btnNewGame = document.querySelector('#btnNew');
    result = document.querySelector('#result');
    displayPuntos = document.querySelectorAll('small');
    cartasJugador = document.querySelector('#jugador-cartas');
    cartasPC = document.querySelector('#computadora-cartas');

    // Create Deck
    crearDeck();


    // PC Turn
    firstTurnPC();

    // Draw card
    btnPedir.addEventListener('click', () => {
    
        drawAddCard('jugador');
        if ( puntosJugador > 21) {
            blockBtn( btnPedir );
            blockBtn( btnStop );
            turnPC( puntosJugador );
        } else if ( puntosJugador === 21 ){
            blockBtn( btnPedir );
            blockBtn( btnStop  );
            btnPedir.className = 'btn btn-success';
            alert('Ganaste!');
        }
    });

    btnStop.addEventListener('click', () => {
        blockBtn( btnPedir );
        blockBtn( btnStop  );
        turnPC( puntosJugador );
    });

    btnNewGame.addEventListener('click', newGame);
};




