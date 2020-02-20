<%@page language="java" contentType="application/json;charset=UTF-8" pageEncoding="UTF-8" %>
<%!

public JSONObject performLogic(JSONObject state, Map<String, String> additionalParams) throws Exception{
	
	String sessao = additionalParams.get("sessao");
	String protocolo = additionalParams.get("protocolo");
	String cartao = additionalParams.get("cartao");
	
	String response = "";
	JSONObject result = new JSONObject();
	
	
	//String request = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:urn='urn:enterprise.soap.sforce.com'>" +
	String request = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:sfd='http://soap.sforce.com/schemas/class/SFDCWS'>" + 
			"<soapenv:Header>" + 
			"<sfd:SessionHeader>" + 
			"<sfd:sessionId>" + sessao + "</sfd:sessionId>" + 
			"</sfd:SessionHeader>" + 
			"</soapenv:Header>" + 
			"<soapenv:Body>" + 
			"<sfd:doArmazenaProtocolo>" + 
			"<sfd:Protocolo>" + protocolo + "</sfd:Protocolo>" + 
			"<sfd:NumeroCartao>" + cartao + "</sfd:NumeroCartao>" + 
			"</sfd:doArmazenaProtocolo>" + 
			"</soapenv:Body>" + 
			"</soapenv:Envelope>";
			
	URL url = new URL("https://na25.salesforce.com/services/Soap/class/SFDCWS");

	SSLContext sc = SSLContext.getInstance("TLSv1.2");
	sc.init(null, null, new java.security.SecureRandom());
	HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
	conn.setSSLSocketFactory(sc.getSocketFactory());
	
	conn.setDoOutput(true);
	conn.setRequestProperty("SOAPAction", "doArmazenaProtocolo");
	conn.setRequestProperty("Type", "Request-Response");
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
<%@page import="java.util.Map"%>
<%@page import="java.net.URL"%>
<%@page import="java.net.URLConnection"%>

<%@page import="javax.net.ssl.*"%>
<%@page import="java.security.*"%>

<%@page import="java.io.OutputStreamWriter"%>
<%@page import="java.io.BufferedReader"%>
<%@page import="java.io.InputStreamReader"%>
<%@include file="../include/backend.jspf"%>