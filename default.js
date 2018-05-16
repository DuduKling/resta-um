var tabuleiro = [
    ["E", "E", 1, 1, 1, "E", "E"],
    ["E", "E", 1, 1, 1, "E", "E"],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ["E", "E", 1, 1, 1, "E", "E"],
    ["E", "E", 1, 1, 1, "E", "E"]
];

const tabuleiro_final = [
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
var jogadas = new Array;

var qtdEncontradosIgual = 0;
var CliquesContinua = 1;
var someTudo = '';

var timeInit = 0;
var timeEnd = 0;
var timeAll = 0;

var posTabuleiroTela = document.querySelectorAll(".c");

mostraTabuleiro();


document.getElementById("jogaBTN").addEventListener("click", function(){
	totalJogadas = [];
	posJogadas = [];
	tabCorrente = 0;
	pos = -1;
	
	timeInit = new Date();
	while (!compara()) {
		calcula();

	}
	timeEnd = new Date();

	mostraTempo();
	mostraTabuleiro();
	mostraJogadasFeitasNaTela();
	document.getElementById("jogaBTN").disabled = true;
	document.getElementById("reiniciaBTN").disabled = false;
	document.getElementById("outraJogadaBTN").disabled = false;
});

document.getElementById("outraJogadaBTN").addEventListener("click", function(){
	tabuleiro = [
	    ["E", "E", 1, 1, 1, "E", "E"],
	    ["E", "E", 1, 1, 1, "E", "E"],
	        [1, 1, 1, 1, 1, 1, 1],
	        [1, 1, 1, 0, 1, 1, 1],
	        [1, 1, 1, 1, 1, 1, 1],
	    ["E", "E", 1, 1, 1, "E", "E"],
	    ["E", "E", 1, 1, 1, "E", "E"]
	];

	totalJogadas = [];
	posJogadas = [];
	tabCorrente = 0;
	pos = -1;
	jogadas = [];
	qtdEncontradosIgual = 0;

	CliquesContinua++;
	//console.log("Cliques: "+CliquesContinua);

	timeInit = new Date();
	while(compara2()!=CliquesContinua) {
		calcula();
	}
	timeEnd = new Date();
	
	mostraTempo();
	mostraTabuleiro();
	someTudo = 'nao';
	limpaJogadasFeitasNaTela(someTudo);
	mostraJogadasFeitasNaTela();
});



document.getElementById("reiniciaBTN").addEventListener("click", function() {
	tabuleiro = [
	    ["E", "E", 1, 1, 1, "E", "E"],
	    ["E", "E", 1, 1, 1, "E", "E"],
	        [1, 1, 1, 1, 1, 1, 1],
	        [1, 1, 1, 0, 1, 1, 1],
	        [1, 1, 1, 1, 1, 1, 1],
	    ["E", "E", 1, 1, 1, "E", "E"],
	    ["E", "E", 1, 1, 1, "E", "E"]
	];

	totalJogadas = [];
	posJogadas = [];
	tabCorrente = 0;
	pos = -1;
	jogadas = [];
	qtdEncontradosIgual = 0;
	CliquesContinua = 1;
	timeInit = 0;
	timeEnd = 0;
	timeAll = 0;
	document.getElementById("time").innerHTML = '';

	mostraTabuleiro();
	someTudo = 'some';
	limpaJogadasFeitasNaTela(someTudo);
	
	document.getElementById("reiniciaBTN").disabled = true;
	document.getElementById("jogaBTN").disabled = false;	
	document.getElementById("outraJogadaBTN").disabled = true;
});


function calcula(){
	jogadas = [];
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

function compara2(){
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
	qtdEncontradosIgual++;
	//console.log("qtdIgual: "+qtdEncontradosIgual);
	return qtdEncontradosIgual;
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
	var stringTitle = '';
	
	stringTitle = "<h3>Solução "+ CliquesContinua +" encontrada:</h3>";

	for(i=0; i<posJogadas.length; i++){
		var jogada = totalJogadas[i][posJogadas[i]];
		qtdJogadasFeitas++;
		stringJogadas = stringJogadas+"<p class='jogada'>"+"Jogada "+qtdJogadasFeitas+": &nbsp;&nbsp;&nbsp;&nbsp;"+jogada[0]+"."+jogada[1]+"&nbsp;&nbsp;vai para&nbsp;&nbsp;"+jogada[4]+"."+jogada[5]+"</p>";
	}
	return stringTitle+stringJogadas;
}

function mostraJogadasFeitasNaTela(){
	var listaResult = document.getElementsByClassName('listaResultado')[0];		
	var resultado = jogadasFeitas();
	listaResult.innerHTML = resultado;

	var result = document.getElementsByClassName('resultados')[0];
	result.classList.remove("-hide");
	result.classList.add("-show");
}


function limpaJogadasFeitasNaTela(someTudo){
	var listaResult = document.getElementsByClassName('listaResultado')[0];
	listaResult.innerHTML = '';

	if(someTudo == "some"){
			var result = document.getElementsByClassName('resultados')[0];
		result.classList.remove("-show");
		result.classList.add("-hide");
	}


}



function mostraTabuleiro(){
	var count = 0;
	for(i=0; i<=6; i++){
        	for(j=0; j<=6; j++) {
			if(tabuleiro[i][j]!='E'){
				if(tabuleiro[i][j]==1){
					posTabuleiroTela[count].innerHTML = "<div class='bolinha -preta'></div>";
				}else {
					posTabuleiroTela[count].innerHTML = "<div class='bolinha -branca'></div>";
				}
			}
		count++;
		}
	}
}


function mostraTempo(){
	timeAll = timeEnd - timeInit;
	document.getElementById("time").innerHTML =  "Duração: " + timeAll + " ms";
}