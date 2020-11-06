var world = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,1,2,2,2,1,2,2,2,1,0,1,1,2,2,1,2,1,2,1,1,2],
    [2,1,2,1,1,1,2,0,2,1,1,1,2,1,1,1,2,1,2,1,1,2],
    [2,1,2,2,1,1,2,2,1,1,2,1,2,1,1,1,2,2,1,1,1,2],
    [2,1,2,1,1,1,2,1,2,1,2,1,2,1,1,1,2,1,2,1,1,2],
    [2,1,2,2,2,1,2,1,2,1,2,1,0,2,2,1,2,1,2,1,1,2],
    [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,1,1,1,1,1,5,1,1,1,1,1,1,1,1,1,1,5,1,1,1,2],
    [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];
// Variables
var pacman = {
    x:10,
    y:2
}
var pacmanhomer = {
    x:12,
    y:2
}
var ghost_pink = {
    x:3,
    y:14
}
var ghost_lightblue = {
    x:8,
    y:14
}
var ghost_orange = {
    x:13,
    y:14
}
var ghost_green = {
    x:18,
    y:14
}
var score = 0;
var myMusic;
var lifes = 3;
var mov_rosado;
var mov_celeste;
var mov_naranjo;
var mov_verde;
var choque = setInterval(choquefantasmas, 1);
        
function displayworld(){
    var output = '';
    for (var i=0; i<world.length; i++){
        output += "\n<div class='row'>\n";
        for (var j=0; j<world[i].length; j++){
            if (world[i][j] == 2){
                output += "<div class='brick'></div>";
            }
            else if (world[i][j] == 1){
                output += "<div class='coin'></div>";
            }
            else if (world[i][j] == 0){
                output += "<div class='empty'></div>";
            }
            else if (world[i][j] == 5){
                output += "<div class='cereza'></div>";
            }
            else if (world[i][j] == 6){
                output += "<div class='ghost_pink'></div>";
            }
            else if (world[i][j] == 7){
                output += "<div class='ghost_lightblue'></div>";
            }
            else if (world[i][j] == 8){
                output += "<div class='ghost_orange'></div>";
            }
            else if (world[i][j] == 9){
                output += "<div class='ghost_green'></div>";
            }
        }
        output += "\n</div>";
    }
    document.getElementById('world').innerHTML = output;
}

function displaypacman(){
    document.getElementById('pacman').style.top = pacman.y*20+"px";
    document.getElementById('pacman').style.left = pacman.x*20+"px";
}
function displaypacmanhomer(){
    document.getElementById('pacmanhomer').style.top = pacmanhomer.y*20+"px";
    document.getElementById('pacmanhomer').style.left = pacmanhomer.x*20+"px";
}
function displaynewpacmanhomer(){
    document.getElementById('pacmanhomer').style.display='block';
    document.getElementById('player2').style.display='none';
}
function displayghost_pink(){
    document.getElementById('ghost_pink').style.top = ghost_pink.y*20+"px";
    document.getElementById('ghost_pink').style.left = ghost_pink.x*20+"px";
}
function displayghost_lightblue(){
    document.getElementById('ghost_lightblue').style.top = ghost_lightblue.y*20+"px";
    document.getElementById('ghost_lightblue').style.left = ghost_lightblue.x*20+"px";
}
function displayghost_orange(){
    document.getElementById('ghost_orange').style.top = ghost_orange.y*20+"px";
    document.getElementById('ghost_orange').style.left = ghost_orange.x*20+"px";
}
function displayghost_green(){
    document.getElementById('ghost_green').style.top = ghost_green.y*20+"px";
    document.getElementById('ghost_green').style.left = ghost_green.x*20+"px";
}
function displayscore(){
    document.getElementById('score').innerHTML = score;
}
function displaylife(){
    document.getElementById('vida1').innerHTML;
    document.getElementById('vida2').innerHTML;
    document.getElementById('vida3').innerHTML;
}

// Funciones para el AUDIO
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}
function audiointro(){
    myMusic = new sound("sounds/pacman_intro.mp3");
    myMusic.play();
    start.style.display = 'none';
    document.getElementById('player2').style.display='none';
    setTimeout(movertodosfantasmas, 5000);
}
function audiopacman(){
    myMusic = new sound("sounds/pacman_moviendose.mp3");
    myMusic.play();
}
function audioghostdie(){
    myMusic = new sound("sounds/ghost_die.mp3");
    myMusic.play();
    if (lifes != 0){
        play.style.display = 'block';
    }
}
function gameover(){
    myMusic = new sound("sounds/gameover.mp3");
    myMusic.play();
}
function audiocereza(){
    myMusic = new sound("sounds/fiftypoints.mp3");
    myMusic.play();
}
function winner(){
    myMusic = new sound("sounds/youwin.mp3");
    myMusic.play();
    restart.style.display = 'block';
}
//Funcion rotar Pacman
function rotarpacman(grados) {	
	if (grados != 180){
        document.getElementById('pacman').style.transform = 'scaleX('+ 1 + ')';
        document.getElementById('pacman').style.transform = 'rotate(' + grados + 'deg)';    
    }
    else{
        document.getElementById('pacman').style.transform = 'scaleX('+ -1 + ')';
    }
}
function rotarpacmanhomer(grados) {	
    document.getElementById('pacmanhomer').style.transform = 'rotate(' + grados + 'deg)';
}
//Funcion Aleatorio
function numeroAleatorio(){
    var min = 1;
    var max = 5;
    return Math.floor(Math.random() * (max - min) ) + min;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//Funciones para mover Fantasmas
function movertodosfantasmas(){
    mov_rosado = setInterval(moverFantasmaRosado, 300);
    mov_celeste = setInterval(moverFantasmaCeleste, 300);
    mov_naranjo = setInterval(moverFantasmaNaranjo, 300);
    mov_verde = setInterval(moverFantasmaVerde, 300);
    play.style.display='none';
}
function moverFantasmaRosado(){
    if (numeroAleatorio() == 1 && world[ghost_pink.y][ghost_pink.x-1] != 2){
        ghost_pink.x--;
    }
    else if (numeroAleatorio() == 2 && world[ghost_pink.y][ghost_pink.x+1] != 2){
        ghost_pink.x++;
    }
    else if (numeroAleatorio() == 3 && world[ghost_pink.y-1][ghost_pink.x] != 2){
        ghost_pink.y--;
    }
    else if (numeroAleatorio() == 4 && world[ghost_pink.y+1][ghost_pink.x] != 2){
        ghost_pink.y++;
    }
    displayghost_pink();
}
function moverFantasmaCeleste(){
    if (numeroAleatorio() == 1 && world[ghost_lightblue.y][ghost_lightblue.x-1] != 2){
        ghost_lightblue.x--;
    }
    else if (numeroAleatorio() == 2 && world[ghost_lightblue.y][ghost_lightblue.x+1] != 2){
        ghost_lightblue.x++;
    }
    else if (numeroAleatorio() == 3 && world[ghost_lightblue.y-1][ghost_lightblue.x] != 2){
        ghost_lightblue.y--;
    }
    else if (numeroAleatorio() == 4 && world[ghost_lightblue.y+1][ghost_lightblue.x] != 2){
        ghost_lightblue.y++;
    }
    displayghost_lightblue();
}
function moverFantasmaNaranjo(){
    if (numeroAleatorio() == 1 && world[ghost_orange.y][ghost_orange.x-1] != 2){
        ghost_orange.x--;
    }
    else if (numeroAleatorio() == 2 && world[ghost_orange.y][ghost_orange.x+1] != 2){
        ghost_orange.x++;
    }
    else if (numeroAleatorio() == 3 && world[ghost_orange.y-1][ghost_orange.x] != 2){
        ghost_orange.y--;
    }
    else if (numeroAleatorio() == 4 && world[ghost_orange.y+1][ghost_orange.x] != 2){
        ghost_orange.y++;
    }
    displayghost_orange();
}
function moverFantasmaVerde(){
    if (numeroAleatorio() == 1 && world[ghost_green.y][ghost_green.x-1] != 2){
        ghost_green.x--;
    }
    else if (numeroAleatorio() == 2 && world[ghost_green.y][ghost_green.x+1] != 2){
        ghost_green.x++;
    }
    else if (numeroAleatorio() == 3 && world[ghost_green.y-1][ghost_green.x] != 2){
        ghost_green.y--;
    }
    else if (numeroAleatorio() == 4 && world[ghost_green.y+1][ghost_green.x] != 2){
        ghost_green.y++;
    }
    displayghost_green();
}
//Funcion choque de fantasmas y Pacman
function choquefantasmas(){
    if (pacman.y == ghost_pink.y && pacman.x == ghost_pink.x){
        perdervidas();
        displayworld(); 
    }
    if (pacman.y == ghost_lightblue.y && pacman.x == ghost_lightblue.x){
        perdervidas();
        displayworld(); 
    }
    if (pacman.y == ghost_orange.y && pacman.x == ghost_orange.x){
        perdervidas();
        displayworld(); 
    }
    if (pacman.y == ghost_green.y && pacman.x == ghost_green.x){
        perdervidas();
        displayworld(); 
    }
    if (pacmanhomer.y == ghost_pink.y && pacmanhomer.x == ghost_pink.x){
        perdervidas();
        displayworld(); 
    }
    if (pacmanhomer.y == ghost_lightblue.y && pacmanhomer.x == ghost_lightblue.x){
        perdervidas();
        displayworld(); 
    }
    if (pacmanhomer.y == ghost_orange.y && pacmanhomer.x == ghost_orange.x){
        perdervidas();
        displayworld(); 
    }
    if (pacmanhomer.y == ghost_green.y && pacmanhomer.x == ghost_green.x){
        perdervidas();
        displayworld(); 
    }
    displaypacman();
    displaypacmanhomer();
    displayghost_pink();
    displayghost_lightblue();
    displayghost_orange();
    displayghost_green();
}
//Funcion perder vidas
function perdervidas(){
    if (lifes == 3){
        document.getElementById('vida3').style.display='none';
        lifes = 2;
    }
    else if (lifes == 2){
        document.getElementById('vida2').style.display='none';
        lifes = 1;
    }
    else if (lifes == 1){
        document.getElementById('vida1').style.display='none';
        lifes = 0;
        gameover();
        clearInterval(mov_rosado);
        clearInterval(mov_celeste);
        clearInterval(mov_naranjo);
        clearInterval(mov_verde);
        restart.style.display = 'block';
        document.getElementById('gameover').style.display='block';
        return;
    }
    audioghostdie();
    pacman.x = 10;
    pacman.y = 2;
    pacmanhomer.x = 12;
    pacmanhomer.y = 2;
    ghost_pink.x = 3;
    ghost_pink.y = 14;
    ghost_lightblue.x = 8;
    ghost_lightblue.y = 14;
    ghost_orange.x = 13;
    ghost_orange.y = 14;
    ghost_green.x = 18;
    ghost_green.y = 14;
    clearInterval(mov_rosado);
    clearInterval(mov_celeste);
    clearInterval(mov_naranjo);
    clearInterval(mov_verde);
}
displayworld();
displaypacman();
displayghost_pink();
displayghost_lightblue();
displayghost_orange();
displayghost_green();
displayscore();
displaylife();
play.style.display = 'none';
restart.style.display = 'none';
document.getElementById('youwin').style.display='none';
document.getElementById('gameover').style.display='none';

document.onkeydown = function(e){
    if (e.keyCode == 37 && world[pacman.y][pacman.x-1] != 2 && start.style.display == 'none' && play.style.display == 'none' && restart.style.display == 'none'){
        pacman.x--;
        rotarpacman(180);
        audiopacman();
    }
    else if (e.keyCode == 39 && world[pacman.y][pacman.x+1] != 2 && start.style.display == 'none' && play.style.display == 'none' && restart.style.display == 'none'){
        pacman.x++;
        rotarpacman(0);
        audiopacman();
    }
    else if (e.keyCode == 38 && world[pacman.y-1][pacman.x] != 2 && start.style.display == 'none' && play.style.display == 'none' && restart.style.display == 'none'){
        pacman.y--;
        rotarpacman(270);
        audiopacman();
    }
    else if (e.keyCode == 40 && world[pacman.y+1][pacman.x] != 2 && start.style.display == 'none' && play.style.display == 'none' && restart.style.display == 'none'){
        pacman.y++;
        rotarpacman(90);
        audiopacman();
    }
    if (e.keyCode == 65 && world[pacmanhomer.y][pacmanhomer.x-1] != 2 && start.style.display == 'none' && play.style.display == 'none' && restart.style.display == 'none'){
        pacmanhomer.x--;
        rotarpacmanhomer(180);
        audiopacman();
    }
    else if (e.keyCode == 68 && world[pacmanhomer.y][pacmanhomer.x+1] != 2 && start.style.display == 'none' && play.style.display == 'none' && restart.style.display == 'none'){
        pacmanhomer.x++;
        rotarpacmanhomer(0);
        audiopacman();
    }
    else if (e.keyCode == 87 && world[pacmanhomer.y-1][pacmanhomer.x] != 2 && start.style.display == 'none' && play.style.display == 'none' && restart.style.display == 'none'){
        pacmanhomer.y--;
        rotarpacmanhomer(270);
        audiopacman();
    }
    else if (e.keyCode == 83 && world[pacmanhomer.y+1][pacmanhomer.x] != 2 && start.style.display == 'none' && play.style.display == 'none' && restart.style.display == 'none'){
        pacmanhomer.y++;
        rotarpacmanhomer(90);
        audiopacman();
    }
    if (world[pacman.y][pacman.x] == 1){
        world[pacman.y][pacman.x] = 0;
        displayworld();
        score += 10;
    }
    if (world[pacmanhomer.y][pacmanhomer.x] == 1){
        world[pacmanhomer.y][pacmanhomer.x] = 0;
        displayworld();
        score += 10;
    }
    else if (world[pacman.y][pacman.x] == 5){
        world[pacman.y][pacman.x] = 0;
        displayworld();
        score += 50;
        audiocereza();
    }
    else if (world[pacmanhomer.y][pacmanhomer.x] == 5){
        world[pacmanhomer.y][pacmanhomer.x] = 0;
        displayworld();
        score += 50;
        audiocereza();
    }
    if (score == 2640){
        winner();
        clearInterval(mov_rosado);
        clearInterval(mov_celeste);
        clearInterval(mov_naranjo);
        clearInterval(mov_verde);
        restart.style.display = 'block';
        document.getElementById('youwin').style.display='block';
    }
    displaypacman();
    displaypacmanhomer();
    displayscore();
}

 