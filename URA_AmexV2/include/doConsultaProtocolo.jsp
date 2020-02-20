<%@page language="java" contentType="application/json;charset=UTF-8" pageEncoding="UTF-8" %>
<%!

public JSONObject performLogic(JSONObject state, Map<String, String> additionalParams) throws Exception{
	
	//String sessao = additionalParams.get("sessao");
	//String bin = additionalParams.get("bin");
	String request = "";
	String response = "";
	JSONObject result = new JSONObject();
	
	request = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:v1='http://services.europ-assistance.com.br/domain/Segurado/URA/v1.0/'>" +
			"<soapenv:Header/>"+
			   "<soapenv:Body>" +
			      "<v1:ObterProtocolo>" +
			         "<v1:request>" +
			            "<v1:NumeroAtendimento></v1:NumeroAtendimento>" +
			            "<v1:NumeroProtocolo></v1:NumeroProtocolo>" +
			            "<v1:SistemaOrigem>2</v1:SistemaOrigem>" +
			         "</v1:request>" +
			      "</v1:ObterProtocolo>" +
			   "</soapenv:Body>" +
			"</soapenv:Envelope>";      
			        		 
	URL url = new URL("http://services.europ-assistance.com.br/PROTOCOLO-WCF/Protocolo.svc?wsdl");
	URLConnection conn = url.openConnection();
	
	conn.setDoOutput(true);
	conn.setRequestProperty("SOAPAction", "http://services.europ-assistance.com.br/domain/Segurado/URA/v1.0/IProtocolo/ObterProtocolo");
	conn.setRequestProperty("Type", "Resquest-Response");
	conn.setRequestProperty("Content-Type", "text/xml;charset=UTF-8");
	
	OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream());
	
	wr.write(request);
	wr.flush();
	
	BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
	
	while(br.ready()){
		response += br.readLine();
	}
	
	wr.close();
	br.close();
	conn.getInputStream().close();
	
	result.put("retorno", org.json.XML.toJSONObject(response));
	
	return result;
}

%>
<%@page import="org.json.JSONObject"%>
<%@page import="org.json.JSONException"%>
<%@page import="org.json.JSONArray"%>
<%@page import="br.com.europ.util.*"%>
<%@page import="org.apache.commons.codec.binary.Base64"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.Iterator"%>
<%@page import="java.util.HashSet"%>
<%@page import="java.util.Set"%>
<%@page import="java.net.URL" %>
<%@page import="java.net.URLConnection"%>
<%@page import="java.net.MalformedURLException"%>
<%@page import="java.io.*"%>
<%@include file="../include/backend.jspf"%>