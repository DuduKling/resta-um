var tabuleiro = [
    ["E", "E", 1, 1, 1, "E", "E"],
    ["E", "E", 1, 1, 1, "E", "E"],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ["E", "E", 1, 1, 1, "E", "E"],
    ["E", "E", 1, 1, 1, "E", "E"]
];

var tabuleiro_final = [
    ["E", "E", 0, 0, 0, "E", "E"],
    ["E", "E", 0, 0, 0, "E", "E"],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
    ["E", "E", 0, 0, 0, "E", "E"],
    ["E", "E", 0, 0, 0, "E", "E"]
];

var totalJogadas = new Array;
var posJogadas = new Array;
var tabCorrente = 0;
var pos = -1;
var voltando = false;



var r0 = document.getElementById('r0');
var r1 = document.getElementById('r1');
var r2 = document.getElementById('r2');
var r3 = document.getElementById('r3');
var r4 = document.getElementById('r4');
var r5 = document.getElementById('r5');
var r6 = document.getElementById('r6');

var r0c2 = r0.getElementsByClassName('c2')[0];
var r0c3 = r0.getElementsByClassName('c3')[0];
var r0c4 = r0.getElementsByClassName('c4')[0];
var r1c2 = r1.getElementsByClassName('c2')[0];
var r1c3 = r1.getElementsByClassName('c3')[0];
var r1c4 = r1.getElementsByClassName('c4')[0];
var r2c0 = r2.getElementsByClassName('c0')[0];
var r2c1 = r2.getElementsByClassName('c1')[0];
var r2c2 = r2.getElementsByClassName('c2')[0];
var r2c3 = r2.getElementsByClassName('c3')[0];
var r2c4 = r2.getElementsByClassName('c4')[0];
var r2c5 = r2.getElementsByClassName('c5')[0];
var r2c6 = r2.getElementsByClassName('c6')[0];
var r3c0 = r3.getElementsByClassName('c0')[0];
var r3c1 = r3.getElementsByClassName('c1')[0];
var r3c2 = r3.getElementsByClassName('c2')[0];
var r3c3 = r3.getElementsByClassName('c3')[0];
var r3c4 = r3.getElementsByClassName('c4')[0];
var r3c5 = r3.getElementsByClassName('c5')[0];
var r3c6 = r3.getElementsByClassName('c6')[0];
var r4c0 = r4.getElementsByClassName('c0')[0];
var r4c1 = r4.getElementsByClassName('c1')[0];
var r4c2 = r4.getElementsByClassName('c2')[0];
var r4c3 = r4.getElementsByClassName('c3')[0];
var r4c4 = r4.getElementsByClassName('c4')[0];
var r4c5 = r4.getElementsByClassName('c5')[0];
var r4c6 = r4.getElementsByClassName('c6')[0];
var r5c2 = r5.getElementsByClassName('c2')[0];
var r5c3 = r5.getElementsByClassName('c3')[0];
var r5c4 = r5.getElementsByClassName('c4')[0];
var r6c2 = r6.getElementsByClassName('c2')[0];
var r6c3 = r6.getElementsByClassName('c3')[0];
var r6c4 = r6.getElementsByClassName('c4')[0];


mostraTabuleiro();


document.getElementById("jogaBTN").addEventListener("click", function(){


var debug = 0;
//while (debug < 60) {
while (!compara()) {
	var jogadas = new Array;
	//console.log("tabCorrente: "+ tabCorrente);	

	verificaJogadas();

	//console.log("jogadas:");
	//console.log(jogadas);

	if(posJogadas[tabCorrente] == null){
		posJogadas[tabCorrente] = 0;
		//console.log("ADD posJog: "+posJogadas[tabCorrente]);
	}

	if(totalJogadas[tabCorrente] == null){
		totalJogadas[tabCorrente] = ['A'];
		//console.log("ADD totJog: "+totalJogadas[tabCorrente]);
	}

	//console.log("totalJogadas:");
	//console.log(totalJogadas);
	//console.log("totalJogadas.length: "+totalJogadas.length);
	//console.log("posJogadas: "+posJogadas);
	//console.log("posJogadas.length: "+posJogadas.length);

	//console.log("jogadas.length: "+jogadas.length);
	//console.log("posJogadas[tabCorrente]: "+posJogadas[tabCorrente]);
	//console.log("totalJogadas[tabCorrente].length: "+totalJogadas[tabCorrente].length);
	
	if(jogadas.length > 0 && totalJogadas[tabCorrente].length > posJogadas[tabCorrente]){
		//console.log("JOGAAAAA");

		totalJogadas[tabCorrente] = jogadas;
		
		if(posJogadas[tabCorrente] == -1){
			jogada = totalJogadas[tabCorrente][0];
		}else{
			pos = posJogadas[tabCorrente];
			jogada = totalJogadas[tabCorrente][pos];
		}
		
		joga(jogada);

		//console.log("pos:");
		//console.log(pos);
		tabCorrente++;
	}else{
		//console.log("nao");
		volta();
	}

	//console.log("\n\n\n");
	//debug++;
}

function volta(){
	//console.log("******************* SEM JOGADAS **********************");

	posJogadas.pop();
	totalJogadas.pop();

	tabCorrente--;

	//console.log(tabCorrente);

	//console.log("totalJogadas.length: "+totalJogadas.length);
	//console.log("posJogadas: "+posJogadas);
	//console.log("posJogadas.length: "+posJogadas.length);

	pos = posJogadas[tabCorrente];

	//console.log("pos: "+pos);
	//console.log("tabCorrente: "+tabCorrente);

	jogada = totalJogadas[tabCorrente][pos];
	desfazJogada(jogada);

	posJogadas[tabCorrente]++;

	//posJogadas.pop();
	//totalJogadas.pop();
	
	//console.log("posJogadas: "+posJogadas);
	//console.log("posJogadas.length: "+posJogadas.length);

	//console.log(tabCorrente);
	//console.log("FIM");
}

function compara(){
	var igual = false;
	for(i=0; i<=6; i++){
        	for(j=0; j<=6; j++) {
			if(tabuleiro_final[i][j]===tabuleiro[i][j]){
				// console.log("igual");
				igual = true;
			}else {
				// console.log("não igual");
				return false;
			}
		}
	}
	return igual;
}

/* Verifica quais posições da matriz são peças. Tem 3 tipos: Peça = 1, Vazio = 0, Espaço que não faz parte do tabuleiro = "E". */
function verificaJogadas(){
	for(i=0; i<=6; i++){
		for(j=0; j<=6; j++) {
			if(tabuleiro[i][j] == "E")
				continue;
			else if(tabuleiro[i][j] == 0)
				continue;
			else if(tabuleiro[i][j] == 1) {
				testaVizinho(i,j);
			}
		}
	}
}

/* Testa as 2 proximas posições seguintes de uma peça em todas as direções (Cima, baixo, esquerda e direita). Procura por peça na seguinte e vazio na posterior. */
function testaVizinho(i,j){
	// Direita
	if((j+1)<=6 && (j+2)<=6 ) {
		if (tabuleiro[i][j+1] == 1 && tabuleiro[i][j+2] == 0) {
			addJogada(i, j, i, j+1, i, j+2);
		}
	}
	// Esquerda
	if((j-1)>=0 && (j-2)>=0) {
		if( tabuleiro[i][j-1] == 1 && tabuleiro[i][j-2] == 0){
			addJogada(i, j, i, j-1, i, j-2);
		}
	}
	// Cima
	if((i-1)>=0 && (i-2)>=0) {
		if(tabuleiro[i-1][j] == 1 && tabuleiro[i-2][j] == 0){
			addJogada(i, j, i-1, j, i-2, j);
		}
	}
	// Baixo
	if((i+1)<=6 && (i+2)<=6){
		if(tabuleiro[i+1][j] == 1 && tabuleiro[i+2][j] == 0){
			addJogada(i, j, i+1, j, i+2, j);
		}
	}
}

/* Adiciona uma jogada no vetor de jogadas para aquele momento da partida. p1, p2 e p3 são as peças participantes da jogada. i e j são suas posições no tabuleiro. */
function addJogada(p1i, p1j, p2i, p2j, p3i, p3j){
	var jogAux = new Array;
	jogAux.push(p1i);
	jogAux.push(p1j);
	jogAux.push(p2i);
	jogAux.push(p2j);
	jogAux.push(p3i);
	jogAux.push(p3j);

	// console.log("Jogada: "+p1i+"."+p1j+", "+p2i+"."+p2j+", "+p3i+"."+p3j);

	jogadas.push(jogAux);
}

/* Faz uma jogada. p1 é quem "come", p2 é o "comido", e p3 é o destino de p1. */
function joga(jogada){
	//console.log("joga: ");
	//console.log(jogada);
	// console.log("\n");
	p1i = jogada[0];
	p1j = jogada[1];
	p2i = jogada[2];
	p2j = jogada[3];
	p3i = jogada[4];
	p3j = jogada[5];

	tabuleiro[p1i][p1j] = 0;
	tabuleiro[p2i][p2j] = 0;
	tabuleiro[p3i][p3j] = 1;
}

function desfazJogada(jogada){
	//console.log("desfaz jogada: ");
	//console.log(jogada);

	p1i = jogada[0];
	p1j = jogada[1];
	p2i = jogada[2];
	p2j = jogada[3];
	p3i = jogada[4];
	p3j = jogada[5];

	tabuleiro[p1i][p1j] = 1;
	tabuleiro[p2i][p2j] = 1;
	tabuleiro[p3i][p3j] = 0;
}

function jogadasFeitas(){
	var qtdJogadasFeitas = 0;
	var stringJogadas = '';
	for(i=0; i<posJogadas.length; i++){
		var jogada = totalJogadas[i][posJogadas[i]];
		qtdJogadasFeitas++;
		stringJogadas = stringJogadas+"<p class='jogada'>"+"Jogada "+qtdJogadasFeitas+": &nbsp;&nbsp;&nbsp;&nbsp;"+jogada[0]+"."+jogada[1]+"&nbsp;&nbsp;&nbsp;&nbsp;"+jogada[2]+"."+jogada[3]+"&nbsp;&nbsp;&nbsp;&nbsp;"+jogada[4]+"."+jogada[5]+"</p>";
	}
	return stringJogadas;
}

mostraTabuleiro();

mostraJogadasFeitasNaTela();

//console.log(totalJogadas);
//console.log(posJogadas);

//console.log(tabuleiro);

function mostraJogadasFeitasNaTela(){
	var result = document.getElementsByClassName('resultados')[0];
	result.classList.add("color-result");
	var resultado = jogadasFeitas();
	result.innerHTML = resultado;
}

});

function mostraTabuleiro(){
	if(tabuleiro[0][2] == 1){
		r0c2.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r0c2.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[0][3] == 1){
		r0c3.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r0c3.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[0][4] == 1){
		r0c4.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r0c4.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[1][2] == 1){
		r1c2.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r1c2.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[1][3] == 1){
		r1c3.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r1c3.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[1][4] == 1){
		r1c4.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r1c4.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[2][0] == 1){
		r2c0.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r2c0.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[2][1] == 1){
		r2c1.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r2c1.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[2][2] == 1){
		r2c2.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r2c2.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[2][6] == 1){
		r2c3.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r2c3.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[2][4] == 1){
		r2c4.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r2c4.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[2][5] == 1){
		r2c5.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r2c5.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[2][6] == 1){
		r2c6.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r2c6.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[3][0] == 1){
		r3c0.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r3c0.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[3][1] == 1){
		r3c1.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r3c1.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[3][2] == 1){
		r3c2.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r3c2.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[3][3] == 1){
		r3c3.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r3c3.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[3][4] == 1){
		r3c4.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r3c4.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[3][5] == 1){
		r3c5.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r3c5.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[3][6] == 1){
		r3c6.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r3c6.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[4][0] == 1){
		r4c0.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r4c0.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[4][1] == 1){
		r4c1.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r4c1.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[4][2] == 1){
		r4c2.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r4c2.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[4][3] == 1){
		r4c3.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r4c3.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[4][4] == 1){
		r4c4.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r4c4.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[4][5] == 1){
		r4c5.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r4c5.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[4][6] == 1){
		r4c6.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r4c6.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[5][2] == 1){
		r5c2.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r5c2.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[5][3] == 1){
		r5c3.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r5c3.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[5][4] == 1){
		r5c4.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r5c4.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[6][2] == 1){
		r6c2.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r6c2.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[6][3] == 1){
		r6c3.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r6c3.innerHTML = "<div class='bolinhaBranca'></div>";
	}
	if(tabuleiro[6][4] == 1){
		r6c4.innerHTML = "<div class='bolinhaPreta'></div>";
	}else{
		r6c4.innerHTML = "<div class='bolinhaBranca'></div>";
	}

	//r0c2.innerHTML = tabuleiro[0][2];
	//r0c3.innerHTML = tabuleiro[0][3];
	//r0c4.innerHTML = tabuleiro[0][4];
	//r1c2.innerHTML = tabuleiro[1][2];
	//r1c3.innerHTML = tabuleiro[1][3];
	//r1c4.innerHTML = tabuleiro[1][4];
	//r2c0.innerHTML = tabuleiro[2][0];
	//r2c1.innerHTML = tabuleiro[2][1];
	//r2c2.innerHTML = tabuleiro[2][2];
	//r2c3.innerHTML = tabuleiro[2][3];
	//r2c4.innerHTML = tabuleiro[2][4];
	//r2c5.innerHTML = tabuleiro[2][5];
	//r2c6.innerHTML = tabuleiro[2][6];
	//r3c0.innerHTML = tabuleiro[3][0];
	//r3c1.innerHTML = tabuleiro[3][1];
	//r3c2.innerHTML = tabuleiro[3][2];
	//r3c3.innerHTML = tabuleiro[3][3];
	//r3c4.innerHTML = tabuleiro[3][4];
	//r3c5.innerHTML = tabuleiro[3][5];
	//r3c6.innerHTML = tabuleiro[3][6];
	//r4c0.innerHTML = tabuleiro[4][0];
	//r4c1.innerHTML = tabuleiro[4][1];
	//r4c2.innerHTML = tabuleiro[4][2];
	//r4c3.innerHTML = tabuleiro[4][3];
	//r4c4.innerHTML = tabuleiro[4][4];
	//r4c5.innerHTML = tabuleiro[4][5];
	//r4c6.innerHTML = tabuleiro[4][6];
	//r5c2.innerHTML = tabuleiro[5][2];
	//r5c3.innerHTML = tabuleiro[5][3];
	//r5c4.innerHTML = tabuleiro[5][4];
	//r6c2.innerHTML = tabuleiro[6][2];
	//r6c3.innerHTML = tabuleiro[6][3];
	//r6c4.innerHTML = tabuleiro[6][4];	
}