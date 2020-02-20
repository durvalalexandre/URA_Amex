<%@page language="java" contentType="application/json;charset=UTF-8" pageEncoding="UTF-8"%>
<%!

public JSONObject performLogic(JSONObject state, Map<String, String> additionalParams) throws Exception{
	
	String hexa = additionalParams.get("hex");
	JSONObject result = new JSONObject();
	String dec = "";
	char c;
	
	for(int i=0; i<hexa.length(); i+=2){
		c = (char) Integer.parseInt(hexa.substring(i, (i+2)), 16);
		dec += c;
	}
	
	result.put("retorno", dec);
	
	return result;
}

%>

<%@page import="org.json.JSONObject"%>
<%@page import="java.util.Map"%>
<%@include file="../include/backend.jspf"%>