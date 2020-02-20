<%@page language="java" contentType="application/json;charset=UTF-8" pageEncoding="UTF-8" %>
<%!

public JSONObject performLogic(JSONObject state, Map<String, String> additionalParams) throws Exception{
	
	JSONObject result = new JSONObject();
	String username = additionalParams.get("username");
	String password = additionalParams.get("password");
	String request = "";
	String response = "";
	
	request = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:urn='urn:enterprise.soap.sforce.com'>" + 
			"<soapenv:Header>" + 
			"<urn:LoginScopeHeader>" + 
			"<urn:organizationId></urn:organizationId>" + 
			"<urn:portalId></urn:portalId>" + 
			"</urn:LoginScopeHeader>" + 
			"</soapenv:Header>" + 
			"<soapenv:Body>" + 
			"<urn:login>" + 
			"<urn:username>" + username + "</urn:username>" + 
			"<urn:password>" + password + "</urn:password>" + 
			"</urn:login>" + 
			"</soapenv:Body>" + 
			"</soapenv:Envelope>";
			
	URL url = new URL("https://login.salesforce.com/services/Soap/c/33.0/0DFi0000000PJ7Q");
	
	SSLContext sc = SSLContext.getInstance("TLSv1.2");
	sc.init(null, null, new java.security.SecureRandom());
	HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
	conn.setSSLSocketFactory(sc.getSocketFactory());
	
	conn.setDoOutput(true);
	conn.setRequestProperty("SOAPAction", "login");
	conn.setRequestProperty("Type", "Request-Response");
	conn.setRequestProperty("HttpsURLConnection", "Request-Response");
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

<%@page import="java.io.BufferedReader"%>
<%@page import="java.io.InputStreamReader"%>
<%@page import="java.io.OutputStreamWriter"%>
<%@include file="../include/backend.jspf"%>