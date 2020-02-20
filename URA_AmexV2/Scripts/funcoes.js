//funcao que pega um attach AvayaUUI no Header do SIP
function getAttachAvayaUUI(){
	return session.connection.protocol.sip.headers["originalcase"]["User-to-User"];
}

//funcao que verifica se no texto tem um caractere especifico
function contains(texto, valor){
	return texto.indexOf(valor) != -1;
}

//funcao que cria e retorna um json vazio
function criaJsonVazio(){
	var json = {};
	return json;
}

//funcao que adiciona um campo em um json
function addJson(json, nome, valor){
	json[nome] = valor;
	return json;
}

//funcao que cria e retorna um json vazio
function addNewJson(){
	var json = {};
	return json;
}

function getTrue(buffer){
	if(buffer == null || buffer == undefined || buffer == ""){
		return false;
	}
	return true;
}

function getMatch(buffer1,buffer2){
	if(buffer1 == buffer2){
		return true;
	}
	return false;
}

function getFalse(buffer){
	if(buffer == null || buffer == undefined || buffer == ""){
		return true;
	}
	return false;
}

function getExpiracaoCartao(expiracao){
	var dataAtual = new Date();
	var mesAtual = parseInt(dataAtual.getMonth()+1,10);
	var anoAtual = parseInt(dataAtual.getFullYear(),10);
	anoAtual = parseInt(anoAtual.toString().substr(2,2),10);
	var mesExpiracao = parseInt((expiracao.toString()).substr(0,2),10);
	var anoExpiracao = parseInt((expiracao.toString()).substr(2,2),10);
	  
	if((mesExpiracao >= 1 && mesExpiracao <= 12 && anoExpiracao >= anoAtual) && (anoExpiracao > anoAtual || mesExpiracao >= mesAtual)){
		return true;
	}
	  
	return false;
}

function setCampoJson(json, nome, valor){
	json[nome] = valor;
	return json;
}

//funcao que adiciona um campo em um json
function adicionaCampoJson(json, nome, valor){
	json[nome] = valor;
	return json;
}

function addRelatorioJson(json){
	json["fila"] = [];
	
	return json;
}


function addEvento(json, evento)
{
	var d = new Date,
	dformat = 	[d.getFullYear(), (d.getMonth() + 1), d.getDate()].join('-')  +' '+
				[d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
	
	json["fila"].push({"evento": evento, "data": dformat });
	return json;
}



function getTratamentoBraspagV2(retorno)
{
	var tratamento = "";
	
	switch(retorno)
	{
		case "57":
		case "58":
		case "59":
		case "60":
			tratamento="1";
			break;
		default:
			tratamento="2";
			break;
	}
	
	return tratamento;
}

//funcao retorna tratamento braspag
function getTratamentoBraspag(retorno){
	var tratamento = "";
	
	switch(retorno)
	{
		case "Operation Successful":
			tratamento="1";
			break;
		case "Not Authorized":
			tratamento="2";
			break;
		case "Card Expired":
			tratamento="3";
			break;
		case "Blocked Card":
			tratamento="4";
			break;
		case "Timed Out":
			tratamento="5";
			break;
		case "Card Canceled":
			tratamento="6";
			break;
		case "Problems with Creditcard":
			tratamento="7";
			break;
		case "Autorização negada":
			tratamento="2";
			break;
		case "Transação autorizada":
			tratamento="1";
			break;
		default:
			tratamento="0";
			break;
	}
	
	return tratamento;
}

//retorna um campo em um json
function getCampoJson(json, nome){
	var valor = json[nome];
	return valor;
}

//funcao que trunca numero do cartao
//function getCartaoTruncado(cartao,vdn){

function RetornarCartaoPorTipoServico(dadosCliente){
	//var mascara="X";
	//var truncado = "";
	var dadosRetorno = "";
	var cartao = dadosCliente["cartao"];
	var tipoServico = dadosCliente["TipoServico"];
	
	/*
	if(dadosCliente["TipoServico"] == "Assistencia")
	{		
		for(var i = 0; i < cartao.length; i++)
		{
			if (i >= 6 && i <= 10)
			{
				truncado += mascara;
			}
			else
			{
				truncado += cartao.charAt(i);
			}
		}
		dadosRetorno = ";" + truncado;
	}
	*/
	
	if(tipoServico != undefined || tipoServico != null || tipoServico != "" )
	{
		switch(tipoServico)
		{
			case "Concierge":
				dadosRetorno = "";
				break;
			default:
				dadosRetorno = ";" + cartao;
				break;
		}
	}
	
	return dadosRetorno;
}


//funcao que valida o retorna da consulta bin
function validaRetornoConsultaBin(retorno){
	var consulta = "";
	if(retorno != undefined && retorno != null && retorno != ""){
		consulta = retorno["soapenv:Envelope"]["soapenv:Body"].doConsultaBinResponse.result["ConsultaBinResult:CodigoRetorno"];
		if(consulta == 0){
			return true;
		}else{
			return false;
		}
	}
	return false;
}

//funcao que valida o retorno da consulta Braspag
function validaRetornoConsultaBraspag(retorno){
	var consulta = "";
	if(retorno != undefined && retorno != null && retorno != ""){
		//consulta = retorno["soapenv:Envelope"]["soap:Body"].doConsultaBraspag.result["Success"];
		consulta = retorno["soapenv:Envelope"]["soap:Body"]["AuthorizeTransactionResponse"]["AuthorizeTransactionResult"]["PaymentDataResponse"]["ReturnMessage"];
		if(consulta == 0){
			return true;
		}else{
			return false;
		}
	}
	return false;
}

//newfuction
function verificaPerfilDNIS(dnis, dadosClientes)
{
	var tipoPerfil = "";
	var tipoCartao = "";

	switch(dnis){
		case "70575":
		case "70576":
		case "70110":
		case "70163":
			tipoCartao = "Gold Card";
			tipoPerfil = "perfil 1";
			break;
		case "70577":
		case "70578":
		case "70579":
		case "70109":
		case "94001":
		case "70164":
			tipoCartao = "Platinum Card";
			tipoPerfil = "perfil 1";
			break;
		case "70561":
		case "70100":
			tipoCartao = "Blue";
			tipoPerfil = "perfil 2";
			break;
		case "70564":
		case "70102":
			tipoCartao = "Gold Credit";
			tipoPerfil = "perfil 2";
			break;
		case "70574":
		case "70103":
			tipoCartao = "Platinum Credit";
			tipoPerfil = "perfil 2";
			break;
		case "70553":
		case "70111":
			tipoCartao = "Green";
			tipoPerfil = "perfil 2";
			break;
		case "70583":
		case "70108":
			tipoCartao = "Credit";
			tipoPerfil = "perfil 2";
			break;
		case "70563":
			tipoCartao = "Bradesco American Express Credit";
			tipoPerfil = "perfil 3";
			break;
		case "70338":
		case "70105":
			tipoCartao = "Bradesco American Express Gold Credit";
			tipoPerfil = "perfil 3";
			break;
		case "70291":
		case "70106":
			tipoCartao = "Bradesco Perfil Gold";
			tipoPerfil = "perfil 3";
			break;
		case "70295":
		case "70107":
			tipoCartao = "Bradesco Perfil Platinum";
			tipoPerfil = "perfil 3";
			break;
		case "70580":
		case "70104":
			tipoCartao = "Express Fun";
			tipoPerfil = "perfil 3";
			break;
		default:
			//dadosClientes = adicionaCampoJson(dadosClientes, "tipoCartao", "Express Fun");
			//tipoPerfil = "deriva";
			tipoCartao = "Express Fun";
			tipoPerfil = "perfil 3";
			break;
	}
	dadosClientes = adicionaCampoJson(dadosClientes, "validacao", "contingencia");
	dadosClientes = adicionaCampoJson(dadosClientes, "tipoCartao", tipoCartao);
	dadosClientes = adicionaCampoJson(dadosClientes, "perfilCartao", tipoPerfil);

	return dadosClientes;
}
//endfuction
function getPerfilBinCompartilhado(dnis, dadosClientes){
	var tipoPerfil = "";
	var tipoCartao = "";

	switch(dnis){
		case "70561":
		case "70100":
			tipoCartao = "Blue";
			tipoPerfil = "perfil 2";
			break;
		case "70564":
		case "70102":
			tipoCartao = "Gold Credit";
			tipoPerfil = "perfil 2";
			break;
		case "70574":
		case "70103":
			tipoCartao = "Platinum Credit";
			tipoPerfil = "perfil 2";
			break;
		case "70553":
		case "70104":
			tipoCartao = "Bradesco American Express Credit";
			tipoPerfil = "perfil 3";
			break;
		case "70338":
		case "70105":
			tipoCartao = "Bradesco American Express Gold Credit";
			tipoPerfil = "perfil 3";
			break;
		case "70291":
		case "70106":
			tipoCartao = "Bradesco Perfil Gold";
			tipoPerfil = "perfil 3";
			break;
		case "70295":
		case "70107":
			tipoCartao = "Bradesco Perfil Platinum";
			tipoPerfil = "perfil 3";
			break;
		default:
			tipoCartao = "Express Fun";
			tipoPerfil = "perfil 3";
			break;
	}
	
	dadosClientes = adicionaCampoJson(dadosClientes, "tipoCartao", tipoCartao)
	dadosClientes = adicionaCampoJson(dadosClientes, "perfilCartao", tipoPerfil);

	return dadosClientes;
}

//funcao que verifica qual eh o perfil do cliente
function verificaPerfil(dadosCliente){
	var tipoCartao = dadosCliente["tipoCartao"];
	var tipoPerfil = "";
	
	if(tipoCartao == "Gold Card" || tipoCartao == "Platinum Card"){
		tipoPerfil = "perfil 1";
	}else if(tipoCartao == "Blue" || tipoCartao == "Gold Credit" || tipoCartao == "Platinum Credit" || tipoCartao == "Green" || tipoCartao == "Credit"){
		tipoPerfil = "perfil 2";
	}else if(tipoCartao == "Bradesco American Express Credit" || tipoCartao == "Bradesco American Express Gold Credit" || tipoCartao == "Bradesco Perfil Gold" || tipoCartao == "Bradesco Perfil Platinum" || tipoCartao == "Credit BIN Compartilhada"){
		tipoPerfil = "perfil 3";
	}else{
		tipoPerfil = "perfil 3";
	}
	
	dadosCliente = adicionaCampoJson(dadosCliente, "perfilCartao", tipoPerfil);
	return dadosCliente;
}

//Funcao que transforma um json em string para ser visualizado no log.
function jsonLog(json){
	var texto = "";
	
	if(json == null || json == undefined || json == ""){
		return "";
	}
	
	texto += "{";
	
	for(var chave in json){
		if(typeof json[chave] == "string"){
			texto += "'" + chave + "' : '" + json[chave] + "',"; 
		}else if(typeof json[chave] == "number" || typeof json[chave] == "boolean"){
			texto += "'" + chave + "' : " + json[chave] + ",";
		}else{
			texto += "'" + chave + "' : ";
			texto += jsonLog(json[chave]);
		}
	}
	texto += "}";
	if(texto.lastIndexOf(",}") != -1){
		texto = texto.substr(0, texto.lastIndexOf(",}")) + "}";
	}
	return texto;
}

//funcao que verifica se deu erro na consulta
function verificaErrorMsgRetornoWebService(retorno){
	var chave = "";
	
	for(chave in retorno){
		if(chave == "errorMsg"){
			return true;
		}else{
			return false;
		}
	}
}

//funcao que valida retorno ArmazenaProtocolo
function validaRetornoArmazenaProtocolo(retorno){
	var codigoRetorno = "";
	if(retorno != null && retorno != undefined){
		codigoRetorno = retorno["soapenv:Envelope"]["soapenv:Body"].doArmazenaProtocoloResponse.result["ArmazenaProtocoloResult:CodigoRetorno"];
		if(codigoRetorno == 0){
			return true;
		}
		return false;
	}
	return false;
}

//funcao que retorna o numero da vdn de derivacao
function getVdnDerivacao(tipoCartao, dnis){
	var vdn = "";
	
	switch(tipoCartao){
		case "Gold Credit":
			vdn = "80564";
			//vdn = "80103"; //#newfuction
			break;
		case "Express Fun":
			vdn = "80583";
			//vdn = "80103"; //#newfuction
			break;
		case "Gold Card":
			vdn = "80636";
			break;
		default:
			vdn = "80626";
			//vdn = "80103"; //#newfuction
			break;
	}
	return vdn;
}

function getVdnDerivacaoContingencia(dnis){
	var vdn = "";
	
	switch(dnis){
		case "9271":
			vdn = "80620";
			//vdn = "80103"; //#newfuction
			break;
		case "9307":
			vdn = "80555";
			//vdn = "80103"; //#newfuction
			break;
		case "8457":
			vdn = "80557";
			//vdn = "80103"; //#newfuction
			break;
		case "9383":
			vdn = "80558";
			//vdn = "80103"; //#newfuction
			break;
		case "9481":
			vdn = "80559";
			//vdn = "80103"; //#newfuction
			break;
		case "8165":
			vdn = "80560";
			//vdn = "80103"; //#newfuction
			break;
		case "9337":
			vdn = "80606";
			//vdn = "80103"; //#newfuction
			break;
		case "8162":
			vdn = "80562";
			//vdn = "80103"; //#newfuction
			break;
		case "9285":
			vdn = "80602";
			//vdn = "80103"; //#newfuction
			break;
		case "9303":
			vdn = "80626";
			//vdn = "80103"; //#newfuction
			break;
		case "9471":
			vdn = "80565";
			//vdn = "80103"; //#newfuction
			break;
		case "9475":
			vdn = "80566";
			//vdn = "80103"; //#newfuction
			break;
		case "9472":
			vdn = "80567";
			//vdn = "80103"; //#newfuction
			break;
		case "9476":
			vdn = "80568";
			//vdn = "80103"; //#newfuction
			break;
		case "9482":
			vdn = "80569";
			//vdn = "80103"; //#newfuction
			break;
		case "9470":
			vdn = "80570";
			//vdn = "80103"; //#newfuction
			break;
		case "9484":
			vdn = "80571";
			//vdn = "80103"; //#newfuction
			break;
		case "9486":
			vdn = "80572";
			//vdn = "80103"; //#newfuction
			break;
		case "9306":
			vdn = "80573";
			//vdn = "80103"; //#newfuction
			break;
		case "9272":
			vdn = "80612";
			//vdn = "80103"; //#newfuction
			break;
		case "9308":
			vdn = "80632";
			//vdn = "80103"; //#newfuction
			break;
		case "9310":
			vdn = "80645";
			//vdn = "80103"; //#newfuction
			break;
		case "9257":
			vdn = "80583";
			//vdn = "80103"; //#newfuction
			break;
		case "9302":
			vdn = "80592";
			//vdn = "80103"; //#newfuction
			break;
		default:
			vdn = "80102";
			//vdn = "80103"; //#newfuction
			break;
	}
	return vdn;
}

//funcao que transforma um protocolo em hexadecimal.
function transformaProtocoloEmHexadecimal(protocolo){
	var hex = "";
	
	for(var i=0; i<protocolo.length; i++){
		hex += protocolo.charCodeAt(i).toString(16);
	}
	
	return hex;
}




//funcao que valida a data de vencimento do cartao
function validaDataExpiracao(dataExpiracao){
	var data = new Date();
	var anoHoje = parseInt((data.getFullYear()+"").substr(2, 2));
	var mes = parseInt(dataExpiracao.substr(0, 2));
	var ano = parseInt(dataExpiracao.substr(2, 2));
	
	if(mes < 1 || mes > 12){
		return false;
	}else if(ano < anoHoje){
		return false;
	}
	return true;
}

function validaRetornoRegistraCartaoPagamento(retorno){
	var codigo = "";
	if(retorno != undefined || retorno != null || retorno != ""){
		codigo = retorno["soapenv:Envelope"]["soapenv:Body"].doRegistraCartaoPagamentoResponse.result["RegistraCartaoPagamentoResult:CodigoRetorno"];
		if(codigo == 0){
			return true;
		}
		return false;
	}
	return false;
}

/*Funcao que monta a opcao 3 do Menu Perfil 3
 * F52 = PARA RESERVA DE RESTAURANTES...
 * F21 = ... DIGITE 3.
 */
function montaOpc3Perfil3(dadosCliente){
	var voxDirFile = "../Resources/Prompts/pt-BR/Wav/";
	var tipoCartao = dadosCliente["tipoCartao"];
	
	var frases = {};
	
	//if(tipoCartao == "Bradesco American Express Credit" || tipoCartao == "Bradesco American Express Gold Credit" || tipoCartao == "Credit BIN Compartilhada"){
	//	frases["Opc3"] = voxDirFile + "F52_G729.wav";
	//	frases["Digite3"] = voxDirFile + "F21_G729.wav";
	//}else{
		frases["Opc3"] = voxDirFile + "SIL100MS_G729.wav";
		frases["Digite3"] = voxDirFile + "SIL100MS_G729.wav";
	//}
	return frases;
}

/*Funcao que retorna a frase do periodo
 * F1_G729 = BOM DIA...
 * F2_G729 = BOA TARDE...
 * F3_G729 = BOA NOITE...
*/
function getFraseSaudacao(){
	var hora = new Date().getHours();
	
	if(hora < 12){
		return "F1_G729.wav";
	}else if(hora < 19){
		return "F2_G729.wav";
	}else{
		return "F3_G729.wav";
	}
}

/*Funcao que retorna a frase da central de atendimento
 * F7 = ...GOLD ASSISTANCE...
 * F6 = ...PLATINUM ASSISTANCE
 * F9 = ...ASSISTÊNCIA BLUE...
 * F11 = ...ASSISTÊNCIA GOLD CREDIT...
 * F10 = ...ASSISTÊNCIA PLATINUM CREDIT...
 * F8 = ...GREEN ASSISTANCE...
 * F17 = ...EXPRESS FUN...
 * F12 = ...ASSISTÊNCIA CREDIT...
 * F13 = ...ASSISTÊNCIA CARTÃO BRADESCO AMERICAN EXPRESS CREDIT...
 * F14 = ...ASSISTÊNCIA CARTÃO BRADESCO AMERICAN EXPRESS GOLD CREDIT...
 * F16 = ...GOLD BRADESCO SEGUROS....
 * F15 = ...PLATINUM BRADESCO SEGUROS...
*/

function getFraseCentralAtendimento(dnis){
	
	var frase = "";
	
	switch(dnis){
	case "70575":
	case "70110":
		frase = "F7";
		break;
	case "70577":
	case "94001":
	case "70109":
		frase = "F6";
		break;
	case "70561":
	case "70100":
		frase = "F9";
		break;
	case "70564":
	case "70102":
		frase = "F11";
		break;
	case "70574":
	case "70103":
		frase = "F10";
		break;
	case "70553":
	case "70111":
		frase = "F8";
		break;
	case "70580":
	case "70104":
		frase = "F17";
		break;
	case "70563":
		frase = "F13";
		break;
	case "70338":
	case "70105":
		frase = "F14";
		break;
	case "70291":
	case "70106":
		frase = "F16";
		break;
	case "70295":
	case "70107":
		frase = "F15";
		break;
	case "70583":
		frase = "F12";
		break;
	default:
		frase = "F12";
		break;
}
	frase += "_G729.wav";
	return frase;
}

//Funcao que verifica solicitacao em andamento
function verificaSolicitacaoEmAndamento(consultaCase){
	var codRetorno = "";
	
	if(consultaCase != undefined && consultaCase != null && consultaCase != "")
	{
		codRetorno = consultaCase["soapenv:Envelope"]["soapenv:Body"].doConsultaCaseResponse.result["ConsultaCaseResult:CodigoRetorno"];
		
		if(codRetorno == 1)
		{
			return true;
		}
		return false;
	}
	return false;
}

//Funcao que verifica existencia do protocolo
function getProtocoloContingencia(protocolo){
	var retorno = "0000000000";
	
	if(protocolo != undefined && protocolo != null && protocolo != "")
	{
		retorno = protocolo;
	}
	return retorno;
}

//Funcao que verifica o horario de atendimento PTS.
function verificaHorarioAtendimentoPTS(){
	var data = new Date();
	var dia = data.getDay() + 1;
	var hora = data.getHours();
	var minuto = data.getMinutes();
	
	if(dia > 1 && dia < 7)
	{
		if(((hora == 8 && minuto >= 30) || hora >= 9 ) && hora < 20)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	else
	{
		return false;
	}
}

/*Funcao que retorna a frase da Central de Atendimento conforme o tipo do cartao do cliente
 * F32 = ...GOLD CARD...
 * F33 = ...PLATINUM CARD...
 * F28 = ...BLUE...
 * F29 = ...GOLD CREDIT...
 * F30 = ...PLATINUM CREDIT...
 * F31 = ...GREEN...
 * F34 = ...CREDIT...
 * F35 = ...BRADESCO AMERICAN EXPRESS CREDIT...
 * F36 = ...BRADESCO AMERICAN EXPRESS GOLD CREDIT...
 * F37 = ...BRADESCO SEGUROS AMERICAN EXPRESS GOLD...
 * F38 = ...BRADESCO SEGUROS AMERICAN EXPRESS PLATINUM...
 */
function getFraseCentralAtendimentoPorTipoCartao(tipoCartao){
	var frase = "";
	
	switch(tipoCartao){
		case "Gold Card":
			frase = "F32";
			break;
		case "Platinum Card":
			frase = "F33";
			break;
		case "Blue":
			frase = "F28";
			break;
		case "Gold Credit":
			frase = "F29";
			break;
		case "Platinum Credit":
			frase = "F30";
			break;
		case "Green":
			frase = "F31";
			break;
		case "Credit BIN Compartilhada":
			frase = "F34";
			break;
		case "Credit":
			frase = "F34";
			break;
		case "Bradesco American Express Credit":
			frase = "F35";
			break;
		case "Bradesco American Express Gold Credit":
			frase = "F36";
			break;
		case "Bradesco Perfil Gold":
			frase = "F37";
			break;
		case "Bradesco Perfil Platinum":
			frase = "F38";
			break;
		case "Express Fun":
			frase = "F17";
			break;
		default:
			frase = "F17";
			break;
	}
	
	frase += "_G729.wav";
	return frase;
}

//Funcao que verifica cartao seguradora
function verificaCartaoSeguradora(dadosCliente){
	var tipoCartao = dadosCliente["tipoCartao"];
	
	return (tipoCartao == "Bradesco Perfil Gold" || tipoCartao == "Bradesco Perfil Platinum");
}

/*Funcao que retorna a frase Informacao da Cobertura AMEX
 * F88 = O CARTÃO GOLD CARD POSSUI UMA COBERTURA DE ASSISTÊNCIA MÉDICA EMERGENCIAL PARA ACIDENTES E DOENÇAS NO VALOR DE TRINTA MIL EUROS DENTRO DOS PAÍSES PERTENCENTES AO ESPAÇO SCHENGEN (XENGUEN) E DEZ MIL DÓLARES NOS DEMAIS PAÍSES, EXCETO BRASIL. POSSUI TAMBÉM A COBERTURA DE DUZENTOS E CINQUENTA DÓLARES PARA ATENDIMENTO DENTÁRIO EMERGENCIAL, 500 DÓLARES PARA DESPESAS FARMACÊUTICAS, ASSISTÊNCIA JURÍDICA NO VALOR DE DOIS MIL E QUINHENTOS DÓLARES ALÉM DE OUTRAS COBERTURAS, COMO AUXÍLIO À EXTRAVIO DE BAGAGEM E ADIANTAMENTO DE FUNDOS. CASO PRECISE UTILIZAR SUA ASSISTÊNCIA VIAGEM, NÃO SE ESQUEÇA DE NOS CONTATAR PARA ORGANIZARMOS O ATENDIMENTO OU EM CASO DE EXTREMA URGÊNCIA NOS CONTATE ANTES DA ALTA HOSPITALAR, ATRAVÉS DO TELEFONE 55 11 4133-9308.
 * F87 = O CARTÃO PLATINUM CARD POSSUI UMA COBERTURA DE ASSISTÊNCIA MÉDICA EMERGENCIAL PARA ACIDENTES E DOENÇAS NO VALOR DE TRINTA MIL EUROS. DENTRO DOS PAÍSES PERTENCENTES AO ESPAÇO SCHENGEN (XENGUEN) E TRINTA MIL DÓLARES NOS DEMAIS PAÍSES, EXCETO BRASIL. POSSUI TAMBÉM A COBERTURA DE MIL DÓLARES PARA ATENDIMENTO DENTÁRIO EMERGENCIAL, MIL DÓLARES PARA DESPESAS FARMACÊUTICAS, ASSISTÊNCIA JURÍDICA NO VALOR DE QUATRO MIL DÓLARES. ALÉM DE OUTRAS COBERTURAS, COMO AUXÍLIO À EXTRAVIO DE BAGAGEM E ADIANTAMENTO DE FUNDOS. CASO PRECISE UTILIZAR SUA ASSISTÊNCIA VIAGEM, NÃO SE ESQUEÇA DE NOS CONTATAR PARA ORGANIZARMOS O ATENDIMENTO OU EM CASO DE EXTREMA URGÊNCIA NOS CONTATE ANTES DA ALTA HOSPITALAR, ATRAVÉS DO TELEFONE 55 11 4133-9310.
 */
function getFraseInfoCoberturaAmex(dadosCliente){
	var tipoCartao = dadosCliente["tipoCartao"];
	var voxFileDir = "../Resources/Prompts/pt-BR/Wav/";
	var frase = "";
	
	if(tipoCartao == "Gold Card"){
		frase = voxFileDir + "F88_G729.wav";
	}else{
		frase = voxFileDir + "F87_G729.wav";
	}
	return frase;
}

function getVDNProblema(dadosCliente){
	var tipoCartao = dadosCliente["tipoCartao"];
	var vdn = "";
	
	switch(tipoCartao){
		case "Bradesco Perfil Platinum":
			vdn = "80584";
			//vdn = "80103"; //#newfuction
			break;
		case "Credit BIN Compartilhada":
			vdn = "80584";
			//vdn = "80103"; //#newfuction
			break;
		case "Bradesco Perfil Gold":
			vdn = "80588";
			//vdn = "80103"; //#newfuction
			break;
		case "Credit":
			vdn = "80592";
			//vdn = "80103"; //#newfuction
			break;
		case "Bradesco American Express Gold Credit":
			vdn = "80598";
			//vdn = "80103"; //#newfuction
			break;
		case "Bradesco American Express Credit":
			vdn = "80602";
			//vdn = "80103"; //#newfuction
			break;
		case "Blue":
			vdn = "80606";
			//vdn = "80103"; //#newfuction
			break;
		case "Platinum Credit":
			vdn = "80612";
			//vdn = "80103"; //#newfuction
			break;
		case "Green":
			vdn = "80620";
			//vdn = "80103"; //#newfuction
			break;
		case "Gold Credit":
			vdn = "80626";
			//vdn = "80103"; //#newfuction
			break;
		case "Gold Card":
			vdn = "80632";
			//vdn = "80103"; //#newfuction
			break;
		case "Platinum Card":
			vdn = "80645";
			//vdn = "80103"; //#newfuction
			break;
		default:
			vdn = undefined;
	}
	
	dadosCliente = adicionaCampoJson(dadosCliente, "transfer", vdn);
	dadosCliente = adicionaCampoJson(dadosCliente, "TipoServico", "Assistencia");
	return dadosCliente;
}

function getHexToString(hex){
	var str = '';
	for (var i = 0; i < hex.length; i += 2) {
	    var v = parseInt(hex.substr(i, 2), 16);
	    if (v) str += String.fromCharCode(v);
	}
	    
    return str;
}

function getStringToHexa(dadosCliente){
	var protocolo = "" + dadosCliente["protocolo"];
	var opcaoMenu = dadosCliente["opcaoMenu"];
	var cartao = dadosCliente["cartao"];
	
	var hexa = "";
	
	//hexa = protocolo.toString(16);
	
	
	switch(opcaoMenu)
	{
		case "MenuConciergeOpc1":
		case "MenuConciergeOpc2":
		case "MenuConciergeOpc3":
		case "MenuConciergeOpc4":
		case "MenuConciergeOpc9":
		case "MenuConciergeRestaurante":
		case "MenuConciergeIngresso":
		case "MenuConciergeAndamento":
			protocolo += "";
			break;
		default:
			protocolo += ";" + cartao;
			break;
	}
	
    for(var i=0; i < protocolo.length ; i++){
    	hexa += protocolo.charCodeAt(i).toString(16);
    }	
    
    dadosCliente = adicionaCampoJson(dadosCliente, "protocoloHexa", hexa);
    
    return dadosCliente;
}

//newfuction
function getVDNDerivacaoMenuAssistencia(dadosCliente){
	var tipoCartao = dadosCliente["tipoCartao"];
	var vdn = "";
	
	switch(tipoCartao){
		case "Bradesco Perfil Platinum":
			vdn = "80584"; //#newfuction
			//vdn = "80103"; //#newfuction
			break;
		case "Credit BIN Compartilhada":
			vdn = "80584";
			//vdn = "80103"; //#newfuction
			break;
		case "Bradesco Perfil Gold":
			vdn = "80588";
			//vdn = "80103"; //#newfuction
			break;
		case "Credit":
			vdn = "80592";
			//vdn = "80103"; //#newfuction
			break;
		case "Bradesco American Express Gold Credit":
			vdn = "80598";
			//vdn = "80103"; //#newfuction
			break;
		case "Bradesco American Express Credit":
			vdn = "80602";
			//vdn = "80103"; //#newfuction
			break;
		case "Blue":
			vdn = "80606";
			//vdn = "80103"; //#newfuction
			break;
		case "Platinum Credit":
			vdn = "80612";
			//vdn = "80103"; //#newfuction
			break;
		case "Green":
			vdn = "80620";
			//vdn = "80103"; //#newfuction
			break;
		case "Gold Credit":
			vdn = "80626";
			//vdn = "80103"; //#newfuction
			break;
		case "Gold Card":
			vdn = "80632";
			//vdn = "80103"; //#newfuction
			break;
		case "Platinum Card":
			vdn = "80645";
			//vdn = "80103"; //#newfuction
			break;
		default:
			vdn = undefined;
	}
	
	dadosCliente = adicionaCampoJson(dadosCliente, "transfer", vdn);
	dadosCliente = adicionaCampoJson(dadosCliente, "TipoServico", "Assistencia");
	return dadosCliente;
}

function getVDNDerivacaoMenuAssistenciaEmAndamentoOpc1(dadosCliente){
	var tipoCartao = dadosCliente["tipoCartao"];
	var vdn = "";
	/*
	switch(tipoCartao){
		case "Bradesco Perfil Platinum":
			vdn = "80103";
			break;
		case "Bradesco Perfil Gold":
			vdn = "80103";
			break;
		case "Credit":
			vdn = "80103";
			break;
		case "Bradesco American Express Gold Credit":
			vdn = "80103";
			break;
		case "Bradesco American Express Credit":
			vdn = "80103";
			break;
		case "Blue":
			vdn = "80103";
			break;
		case "Platinum Credit":
			vdn = "80103";
			break;
		case "Green":
			vdn = "80103";
			break;
		case "Gold Credit":
			vdn = "80103";
			break;
		case "Gold Card":
			vdn = "80103";
			break;
		case "Platinum Card":
			vdn = "80103";
			break;
		default:
			vdn = "80103";
			break;
	}
	*/
	
	if(tipoCartao == "Bradesco Perfil Platinum"){
		vdn = "80585";
		//vdn = "80103"; //#newfuction
	}else if(tipoCartao == "Credit BIN Compartilhada"){
		vdn = "80589";
	}else if(tipoCartao == "Bradesco Perfil Gold"){
		vdn = "80589";
		//vdn = "80103"; //#newfuction
	}else if(tipoCartao == "Credit"){
		vdn = "80593";
		//vdn = "80103"; //#newfuction
	}else if(tipoCartao == "Bradesco American Express Gold Credit"){
		vdn = "80599";
		//vdn = "80103"; //#newfuction
	}else if(tipoCartao == "Bradesco American Express Credit"){
		vdn = "80603";
		//vdn = "80103"; //#newfuction
	}else if(tipoCartao == "Blue"){
		vdn = "80607";
		//vdn = "80103"; //#newfuction
	}else if(tipoCartao == "Platinum Credit"){
		vdn = "80613";
		//vdn = "80103"; //#newfuction
	}else if(tipoCartao == "Green"){
		vdn = "80621";
		//vdn = "80103"; //#newfuction
	}else if(tipoCartao == "Gold Credit"){
		vdn = "80627";
		//vdn = "80103"; //#newfuction
	}else if(tipoCartao == "Gold Card"){
		vdn = "80633";
		//vdn = "80103"; //#newfuction
	}else if(tipoCartao == "Platinum Card"){
		vdn = "80646";
		//vdn = "80103"; //#newfuction
	}else{
		vdn = undefined;
	}
	
	dadosCliente = adicionaCampoJson(dadosCliente, "transfer", vdn);
	dadosCliente = adicionaCampoJson(dadosCliente, "TipoServico", "Assistencia");
	return dadosCliente;
}

function getVDNDerivacaoMenuAssistenciaEmAndamentoOpc2(dadosCliente){
	var tipoCartao = dadosCliente["tipoCartao"];
	var vdn = "";
	
	switch(tipoCartao){
		case "Bradesco Perfil Platinum":
			vdn = "80586";
			//vdn = "80103"; //#newfuction
			break;
		case "Credit BIN Compartilhada":
			vdn = "80586";
			//vdn = "80103"; //#newfuction
			break;
		case "Bradesco Perfil Gold":
			vdn = "80590";
			//vdn = "80103"; //#newfuction
			break;
		case "Credit":
			vdn = "80594";
			//vdn = "80103"; //#newfuction
			break;
		case "Bradesco American Express Gold Credit":
			vdn = "80600";
			//vdn = "80103"; //#newfuction
			break;
		case "Bradesco American Express Credit":
			vdn = "80604";
			break;
		case "Blue":
			vdn = "80608";
			//vdn = "80103"; //#newfuction
			break;
		case "Platinum Credit":
			vdn = "80614";
			//vdn = "80103"; //#newfuction
			break;
		case "Green":
			vdn = "80622";
			//vdn = "80103"; //#newfuction
			break;
		case "Gold Credit":
			vdn = "80628";
			//vdn = "80103"; //#newfuction
			break;
		case "Gold Card":
			vdn = "80634";
			//vdn = "80103"; //#newfuction
			break;
		case "Platinum Card":
			vdn = "80647";
			//vdn = "80103"; //#newfuction
			break;
		default:
			vdn = undefined;
	}
	
	dadosCliente = adicionaCampoJson(dadosCliente, "transfer", vdn);
	dadosCliente = adicionaCampoJson(dadosCliente, "TipoServico", "Assistencia");
	return dadosCliente;
}

function getVDNDerivacaoMenuAssistenciaEmAndamentoOpc3(dadosCliente){
	var tipoCartao = dadosCliente["tipoCartao"];
	var vdn = "";
	
	switch(tipoCartao){
		case "Bradesco Perfil Platinum":
			vdn = "80587";
			//vdn = "80103"; //#newfuction
			break;
		case "Credit BIN Compartilhada":
			vdn = "80587";
			//vdn = "80103"; //#newfuction
			break;
		case "Bradesco Perfil Gold":
			vdn = "80591";
			//vdn = "80103"; //#newfuction
			break;
		case "Credit":
			vdn = "80595";
			//vdn = "80103"; //#newfuction
			break;
		case "Bradesco American Express Gold Credit":
			vdn = "80601";
			//vdn = "80103"; //#newfuction
			break;
		case "Bradesco American Express Credit":
			vdn = "80605";
			//vdn = "80103"; //#newfuction
			break;
		case "Blue":
			vdn = "80609";
			//vdn = "80103"; //#newfuction
			break;
		case "Platinum Credit":
			vdn = "80615";
			//vdn = "80103"; //#newfuction
			break;
		case "Green":
			vdn = "80623";
			//vdn = "80103"; //#newfuction
			break;
		case "Gold Credit":
			vdn = "80629";
			//vdn = "80103"; //#newfuction
			break;
		case "Gold Card":
			vdn = "80635";
			//vdn = "80103"; //#newfuction
			break;
		case "Platinum Card":
			vdn = "80648";
			//vdn = "80103"; //#newfuction
			break;
		default:
			vdn = undefined;
	}
	
	dadosCliente = adicionaCampoJson(dadosCliente, "transfer", vdn);
	dadosCliente = adicionaCampoJson(dadosCliente, "TipoServico", "Assistencia");
	return dadosCliente;
}

function getVDNDerivacaoPerfil2Opc3(dadosCliente){
	var tipoCartao = dadosCliente["tipoCartao"];
	var vdn = "";
	
	if(tipoCartao == "Credit"){
		vdn = "80596";
		//vdn = "80103"; //#newfuction
	}else if(tipoCartao == "Blue"){
		vdn = "80610";
		//vdn = "80103"; //#newfuction
	}else if(tipoCartao == "Platinum Credit"){
		vdn = "80616";
		//vdn = "80103"; //#newfuction
	}else if(tipoCartao == "Green"){
		vdn = "80624";
		//vdn = "80103"; //#newfuction
	}else if(tipoCartao == "Gold Credit"){
		vdn = "80630";
		//vdn = "80103"; //#newfuction
	}else if(tipoCartao == "Bradesco American Express Gold Credit"){
		vdn = "80618";
		//vdn = "80103"; //#newfuction
	}else if(tipoCartao == "Credit BIN Compartilhada"){
		vdn = "80618";
		//vdn = "80103"; //#newfuction
	}else if(tipoCartao == "Bradesco American Express Credit"){
		//vdn = "80103"; //#newfuction
		vdn = "80619";
	}
	
	//dadosCliente = adicionaCampoJson(dadosCliente, "transfer", vdn);
	return vdn;
}

function getVDNDerivacaoPerfil2Opc4(dadosCliente){
	var tipoCartao = dadosCliente["tipoCartao"];
	var vdn = "";
	
	if(tipoCartao == "Credit"){
		vdn = "80597";
		//vdn = "80103"; //#newfuction
	}else if(tipoCartao == "Blue"){
		vdn = "80611";
		//vdn = "80103"; //#newfuction
	}else if(tipoCartao == "Platinum Credit"){
		vdn = "80617";
		//vdn = "80103"; //#newfuction
	}else if(tipoCartao == "Green"){
		vdn = "80625";
		//vdn = "80103"; //#newfuction
	}else if(tipoCartao == "Gold Credit"){
		vdn = "80631";
		//vdn = "80103"; //#newfuction
	}else{
		vdn = undefined;
	}
	
	//dadosCliente = adicionaCampoJson(dadosCliente, "transfer", vdn);
	return vdn;
}

function getVDNDerivacaoPerfil3Opc3(dadosCliente){
	var tipoCartao = dadosCliente["tipoCartao"];
	var vdn = "";
	
	if(tipoCartao == "Bradesco American Express Gold Credit"){
		vdn = "80618";
	}else if(tipoCartao == "Credit BIN Compartilhada"){
		vdn = "80618";
		//vdn = "80103"; //#newfuction
	}else{
		//vdn = "80103"; //#newfuction
		vdn = "80619";
	}
	
	//dadosCliente = adicionaCampoJson(dadosCliente, "transfer", vdn);
	return vdn;
}

function getVDNDerivacaoPerfil1ConciergeOpc1(dadosCliente){
	var tipoCartao = dadosCliente["tipoCartao"];
	var vdn = "";
	
	if(tipoCartao == "Gold Card"){
		vdn = "80636";
		//vdn = "80103";
	}
	else
	{
		//vdn = "80103";
		vdn = "80649";
		
	}
	
	//dadosCliente = adicionaCampoJson(dadosCliente, "transfer", vdn);
	return vdn;
}

function getVDNDerivacaoPerfil1ConciergeOpc2(dadosCliente){
	var tipoCartao = dadosCliente["tipoCartao"];
	var vdn = "";
	
	if(tipoCartao == "Gold Card"){
		vdn = "80637";
		//vdn = "80103"; //#newfuction
	}else{
		//vdn = "80103"; //#newfuction
		vdn = "80657";
	}
	
	//dadosCliente = adicionaCampoJson(dadosCliente, "transfer", vdn);
	return vdn;
}

function getVDNDerivacaoPerfil1ConciergeOpc3(dadosCliente){
	var tipoCartao = dadosCliente["tipoCartao"];
	var vdn = "";
	
	if(tipoCartao == "Gold Card"){
		vdn = "80638";
		//vdn = "80103"; //#newfuction
	}
	else
	{
		//vdn = "80103"; //#newfuction
		vdn = "80650";
	}
	
	//dadosCliente = adicionaCampoJson(dadosCliente, "transfer", vdn);
	return vdn;
}

function getVDNDerivacaoPerfil1ConciergeOpc4(dadosCliente){
	var tipoCartao = dadosCliente["tipoCartao"];
	var vdn = "";
	
	if(tipoCartao == "Gold Card"){
		vdn = "80639";
		//vdn = "80103"; //#newfuction
	}
	else
	{
		//vdn = "80103"; //#newfuction
		vdn = "80651";
	}
	
	//dadosCliente = adicionaCampoJson(dadosCliente, "transfer", vdn);
	return vdn;
}

function getVDNDerivacaoPerfil1ConciergeOpc9(dadosCliente){
	var tipoCartao = dadosCliente["tipoCartao"];
	var vdn = "";
	
	if(tipoCartao == "Gold Card"){
		vdn = "80640";
		//vdn = "80103"; //#newfuction
	}
	else
	{
		//vdn = "80103"; //#newfuction
		vdn = "80652";
	}
	
	//dadosCliente = adicionaCampoJson(dadosCliente, "transfer", vdn);
	return vdn;
}

function getVDNDerivacaoPerfil1ViagemSchengenOpc9(dadosCliente){
	var tipoCartao = dadosCliente["tipoCartao"];
	var vdn = "";
	
	if(tipoCartao == "Gold Card"){
		vdn = "80641";
		//vdn = "80103"; //#newfuction
	}
	else
	{
		//vdn = "80103"; //#newfuction
		vdn = "80653";
	}
	
	//dadosCliente = adicionaCampoJson(dadosCliente, "transfer", vdn);
	return vdn;
}

function getVDNDerivacaoPerfil1SchengenInfoOpc9(dadosCliente){
	var tipoCartao = dadosCliente["tipoCartao"];
	var vdn = "";
	
	if(tipoCartao == "Gold Card"){
		vdn = "80642";
		//vdn = "80103"; //#newfuction
	}
	else
	{
		//vdn = "80103"; //#newfuction
		vdn = "80654";
	}
	
	//dadosCliente = adicionaCampoJson(dadosCliente, "transfer", vdn);
	return vdn;
}

function getVDNDerivacaoPerfil1SchengenAmexOpc9(dadosCliente){
	var tipoCartao = dadosCliente["tipoCartao"];
	var vdn = "";
	
	if(tipoCartao == "Gold Card"){
		vdn = "80643";
		//vdn = "80103"; //#newfuction
	}
	else
	{
		//vdn = "80103"; //#newfuction
		vdn = "80655";
	}
	
	//dadosCliente = adicionaCampoJson(dadosCliente, "transfer", vdn);
	return vdn;
}

function getVDNDerivacaoPerfil1SchengenSiteOpc9(dadosCliente){
	var tipoCartao = dadosCliente["tipoCartao"];
	var vdn = "";
	
	if(tipoCartao == "Gold Card"){
		vdn = "80644";
		//vdn = "80103"; //#newfuction
	}else{
		//vdn = "80103"; //#newfuction
		vdn = "80656";
	}
	
	//dadosCliente = adicionaCampoJson(dadosCliente, "transfer", vdn);
	return vdn;
}

function horarioEntrada()
{
	var d = new Date();
	var dformat = [d.getFullYear(), (d.getMonth() + 1), d.getDate()].join('-')  +' '+ [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');

	return dformat;
}
//endfuction