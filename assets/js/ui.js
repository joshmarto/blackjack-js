const bodyContent = `
    <header class="titulo">Blackjack</header>

    <div class="row mt-2">
        <div class="col text-center">
            <button class="btn btn-danger"  id="btnNew">Nuevo Juego</button>
            <button class="btn btn-primary" id="btnPedir">Pedir carta</button>
            <button class="btn btn-primary" id="btnStop">Detener</button>
        </div>
    </div>

    <hr />

    <div class="row container">
        <div class="col">
            <h1>
                Jugador 1 - <small id="puntosJugador">0</small>
            </h1>
            <div id="jugador-cartas">
                <!--
                <img src="assets/cartas/2C.png" alt="2 Corazones" class="carta">
                <img src="assets/cartas/2D.png" alt="2 Diamantes" class="carta">
                <img src="assets/cartas/2H.png" alt="2 Aces" class="carta">
                <img src="assets/cartas/5C.png" alt="5 Corazones" class="carta">
                -->
            </div>
        </div>
    </div>

    <div class="row container mt-2">
        <div class="col">
            <h1>
                Casa - <small id="puntosPC">0</small>
            </h1>
            <div id="computadora-cartas">
                <!--
                <img src="assets/cartas/JD.png" alt="2 Corazones" class="carta">
                <img src="assets/cartas/red_back.png" alt="red back" class="carta">
                <img src="assets/cartas/10H.png" alt="2 Aces" class="carta">
                <img src="assets/cartas/9C.png" alt="5 Corazones" class="carta">
                -->
            </div>
        </div>
    </div>

    <div class="row container mt-2">
        <div class="col-9"></div>
        <div class="col">
            <div class="alert alert-info" id="result"></div>
        </div>
    </div>
`;


const body = document.querySelector('body');
const loadBody = () => body.innerHTML = bodyContent;

document.addEventListener( "DOMContentLoaded", loadBody );