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

var qtdIteracao = 0;
var mostraConsole = 0;

var posTabuleiroTela = document.querySelectorAll(".c");

mostraTabuleiro();

/* Criando funções para acontecerem ao clicar dos botões na tela. */
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
	qtdIteracao = 0;

	CliquesContinua++;

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
	qtdIteracao = 0;
	document.getElementById("time").innerHTML = '';

	mostraTabuleiro();
	someTudo = 'some';
	limpaJogadasFeitasNaTela(someTudo);
	
	document.getElementById("reiniciaBTN").disabled = true;
	document.getElementById("jogaBTN").disabled = false;	
	document.getElementById("outraJogadaBTN").disabled = true;
});
/* Fim das funções de botões. */


/* Função principal que roda o verifica jogada e também decide se joga ou volta. */
function calcula(){
	qtdIteracao++; 
	if(mostraConsole){
		console.log(qtdIteracao);
	}
	jogadas = [];

	verificaJogadas();

	if(posJogadas[tabCorrente] == null){
		posJogadas[tabCorrente] = 0;
	}
	
	if(totalJogadas[tabCorrente] == null){
		totalJogadas[tabCorrente] = ['A'];
	}
		
	if(jogadas.length > 0 && totalJogadas[tabCorrente].length > posJogadas[tabCorrente]){

		totalJogadas[tabCorrente] = jogadas;
		
		if(posJogadas[tabCorrente] == -1){
			jogada = totalJogadas[tabCorrente][0];
		}else{
			pos = posJogadas[tabCorrente];
			jogada = totalJogadas[tabCorrente][pos];
		}
		
		joga(jogada);

		tabCorrente++;
	}else{
		volta();
	}
}

/* Função que prepara para voltar uma jogada */
function volta(){
	posJogadas.pop();
	totalJogadas.pop();

	tabCorrente--;

	pos = posJogadas[tabCorrente];
	jogada = totalJogadas[tabCorrente][pos];
	desfazJogada(jogada);

	posJogadas[tabCorrente]++;
}

/* Função que compara o tabuleiro atual com o tabuleiro final. Retorna true e false. */
function compara(){
	var igual = false;
	for(i=0; i<=6; i++){
        	for(j=0; j<=6; j++) {
			if(tabuleiro_final[i][j]===tabuleiro[i][j]){
				igual = true;
			}else {
				return false;
			}
		}
	}
	return igual;
}

/* Função que compara o tabuleiro atual com o tabuleiro final. Retorna a quantidade de tabuleiros iguais encontrados. */
function compara2(){
	var igual = false;
	for(i=0; i<=6; i++){
        	for(j=0; j<=6; j++) {
			if(tabuleiro_final[i][j]===tabuleiro[i][j]){
				igual = true;
			}else {
				return false;
			}
		}
	}
	qtdEncontradosIgual++;
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

/* Testa as 2 proximas posições seguintes de uma peça em todas as direções (Cima, baixo, esquerda e direita). Procura por peça na casa seguinte e vazio na posterior. */
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

	jogadas.push(jogAux);
}
	
/* Faz uma jogada. p1 é quem "come", p2 é o "comido", e p3 é o destino de p1. */
function joga(jogada){
	if(mostraConsole){
		console.log("joga: ");
		console.log(jogada);
		console.log("\n");
	}

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

/* Desfaz uma jogada. Faz o contrário do joga. */
function desfazJogada(jogada){
	if(mostraConsole){
		console.log("## Desfaz: ");
		console.log(jogada);
		console.log("\n");
	}

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

/* Verifica as jogadas feitas e prepara elas em uma string para serem mostradas na tela. */
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

/* Mostra as jogadas verificadas na função jogadasFeitas na tela. */
function mostraJogadasFeitasNaTela(){
	var listaResult = document.getElementsByClassName('listaResultado')[0];		
	var resultado = jogadasFeitas();
	listaResult.innerHTML = resultado;

	var result = document.getElementsByClassName('resultados')[0];
	result.classList.remove("-hide");
	result.classList.add("-show");
}

/* Limpa as jogadas da tela. */
function limpaJogadasFeitasNaTela(someTudo){
	var listaResult = document.getElementsByClassName('listaResultado')[0];
	listaResult.innerHTML = '';

	if(someTudo == "some"){
			var result = document.getElementsByClassName('resultados')[0];
		result.classList.remove("-show");
		result.classList.add("-hide");
	}


}

/* Função que mostra/atualiza o tabuleiro. */
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

/* função que mostra o tempo que durou o cálculo do resultado. */
function mostraTempo(){
	timeAll = timeEnd - timeInit;
	document.getElementById("time").innerHTML =  "Duração: " + timeAll + " ms";
}