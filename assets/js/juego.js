

/**
 * anonymous function which is called inmediately after being created
 * (function() {
 *  code
 * })();
 * Anonymous function auto invocate
 * It creates a new scope without name, which means there's no way to reference it from the object window (or call it
 * from the console).
 * This is named a "Module Pattern"
 */

const moduloBlackjack = (() => {
    'use strict'


    /**
     * 2C = Two of Clubs (Treboles)
     * 2D = Two of Diamonds (Diamantes)
     * 2H = Two of Hearts (Corazones)
     * 2S = Two of Spades (Espadas)
     */

    let deck         = [];
    const tipos      = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    // Referencias del HTML
    let btnPedir,
        btnStop,
        btnNewGame,
        displayPuntos,
        divCartas;
    document.addEventListener('DOMContentLoaded', main);



    const crearDeck = () => {
        deck = [];
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

        return _.shuffle( deck );
    }


    // Initialize game
    const initGame = ( players = 2 ) => {
        deck = crearDeck();
        for ( let i = 0; i < players; i++ ){
            puntosJugadores.push(0);
        }
        firstTurnPC();
    };




    const pedirCarta = () => {
        try {
            if ( deck.length === 0 ){
                throw 'No hay cartas en la baraja';
            } else {
                return deck.pop();
            }
        } catch (error) {
            console.log( error );
        }
    };



    const valorCarta = ( carta ) => {
        const valor = carta.substring( 0, carta.length - 1 );
        return ( valor === 'J' || valor === 'Q' || valor === 'K' ) ? 10 : 
            ( valor === 'A' ) ? ( puntosJugadores[0] > 10 ) ? 1 : 11 : Number.parseInt(valor);
    };

    const accumulatePoints = ( card, turn ) => {
        puntosJugadores[turn] += valorCarta(card);
        displayPuntos[turn].innerText = puntosJugadores[turn];
    };

    const createCard = ( card, turn ) => {
        const newCard = document.createElement('img');
        newCard.alt = card;
        newCard.src = `assets/cartas/${card}.png`;
        newCard.className = 'carta';
        divCartas[turn].append( newCard );
    };

    const drawAddCard = ( turn ) => {
        const card = pedirCarta();
        accumulatePoints( card, turn );
        createCard( card, turn );
    };

    const win = () => {
        setTimeout(() => {
            if ( puntosJugadores[0] <= 21 && puntosJugadores[1] <= 21 ){
                ( puntosJugadores[0] > puntosJugadores[1] ) ? alert('Jugador gana!') :
                ( puntosJugadores[0] === puntosJugadores[1] ) ? alert('Empate') : alert('La casa siempre gana :)');
            } else if ( puntosJugadores[0] <= 21 ){
                alert('Jugador gana!');
            } else if ( puntosJugadores[1] <= 21 ) {
                alert('La casa gana');
            } else {
                alert('Nadie gana :(');
            }
        }, 1000);
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
        do{
            drawAddCard( puntosJugadores.length - 1 );
            if ( puntosMinimos > 21 ) break;
        }while ( (puntosJugadores[ puntosJugadores.length - 1 ] < puntosMinimos) && (puntosJugadores[ puntosJugadores.length - 1 ] <= 21) );
        win();
    };

    const firstTurnPC = () => {
        drawAddCard( puntosJugadores.length - 1 );
        const hiddenCard = document.createElement('img');
        hiddenCard.alt = 'Red back';
        hiddenCard.src = 'assets/cartas/red_back.png';
        hiddenCard.className = 'carta back';
        divCartas[ puntosJugadores.length - 1 ].append( hiddenCard );
    };

    // New game
    const newGame = () => {
        puntosJugadores[0] = 0;
        puntosJugadores[1] = 0;
        displayPuntos.forEach(element => {
            element.innerText = '0';
        });
        // result.innerText = 'Jugando...';
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
        displayPuntos = document.querySelectorAll('small');
        divCartas = document.querySelectorAll('.divCartas');

        initGame();

        // Draw card
        btnPedir.addEventListener('click', () => {
        
            drawAddCard( 0 );
            if ( puntosJugadores[0] > 21) {
                blockBtn( btnPedir );
                blockBtn( btnStop );
                turnPC( puntosJugadores[0] );
            } else if ( puntosJugadores[0] === 21 ){
                blockBtn( btnPedir );
                blockBtn( btnStop  );
                turnPC();
            }
        });

        btnStop.addEventListener('click', () => {
            blockBtn( btnPedir );
            blockBtn( btnStop  );
            turnPC( puntosJugadores[0] );
        });

        btnNewGame.addEventListener('click', newGame);
    };







    return {
        nuevoJuego: initGame
    };
})();





