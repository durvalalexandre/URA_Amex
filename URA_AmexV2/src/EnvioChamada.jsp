<%@page language="java" contentType="application/json;charset=UTF-8" pageEncoding="UTF-8"%>
<%!
// Implement this method to execute some server-side logic.

public JSONObject performLogic(JSONObject state, Map<String, String> additionalParams) throws Exception {
	String ani = state.optString("ANI");
   	String resultado;
	
	if (ani.equals("")||ani.equals(null)||ani.equals(" "))
	{
		ani = "0";
	}
	
	ConexaoSocket conn = new ConexaoSocket("10.132.197.210", 33);
	
	conn.send("rechamada " + ani + ";");
	conn.recv();
	
	resultado = conn.getDados();
	
	conn.conectionClose();
	
	JSONObject result = new JSONObject();
	
	result.put("rechamada", resultado);
	
	return result;
};
%>
<%-- GENERATED: DO NOT REMOVE --%>
<%@page import="br.com.relatorio.socket.*"%>
<%@page import="org.json.JSONObject"%>
<%@page import="org.json.JSONException"%>
<%@page import="org.json.JSONArray"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.io.*"%>
<%@include file="../include/backend.jspf"%>