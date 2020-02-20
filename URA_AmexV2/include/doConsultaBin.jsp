<%@page language="java" contentType="application/json;charset=UTF-8" pageEncoding="UTF-8"%>
<%!

public JSONObject performLogic(JSONObject state, Map<String, String> additionalParams) throws Exception{
	
	String sessao = additionalParams.get("sessao");
	String bin = additionalParams.get("bin");
	String request = "";
	String response = "";
	JSONObject result = new JSONObject();
	
	//request = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:urn='urn:enterprise.soap.sforce.com'>" +
	request = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:sfd='http://soap.sforce.com/schemas/class/SFDCWS'>" +
	
			"<soapenv:Header>" + 
			"<sfd:SessionHeader>" + 
			"<sfd:sessionId>" + sessao + "</sfd:sessionId>" + 
			"</sfd:SessionHeader>" + 
			"</soapenv:Header>" + 
			"<soapenv:Body>" + 
			"<sfd:doConsultaBin>" + 
			"<sfd:BinDoCartao>" + bin + "</sfd:BinDoCartao>" + 
			"<sfd:CodClienteCorp>" + 1 + "</sfd:CodClienteCorp>" + 
			"</sfd:doConsultaBin>" + 
			"</soapenv:Body>" + 
			"</soapenv:Envelope>";
	
	URL url = new URL("https://na25.salesforce.com/services/Soap/class/SFDCWS");
	
	SSLContext sc = SSLContext.getInstance("TLSv1.2");
	sc.init(null, null, new java.security.SecureRandom());
	HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
	conn.setSSLSocketFactory(sc.getSocketFactory());
	
	
	conn.setDoOutput(true);
	conn.setRequestProperty("SOAPAction", "doConsultaBin");
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
<%@page import="java.util.Map"%>

<%@page import="javax.net.ssl.*"%>
<%@page import="java.security.*"%>

<%@page import="java.net.URL"%>
<%@page import="java.net.URLConnection"%>
<%@page import="java.io.BufferedReader"%>
<%@page import="java.io.InputStreamReader"%>
<%@page import="java.io.OutputStreamWriter"%>
<%@include file="../include/backend.jspf"%>