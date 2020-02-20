<%@page language="java" contentType="application/json;charset=UTF-8"
	pageEncoding="UTF-8"%>
<%!
// Implement this method to execute some server-side logic.
public JSONObject performLogic(JSONObject state, Map<String, String> additionalParams) throws Exception {
	
	int idCliente = 10;
	String ani = state.optString("ANI");
	String dnis = state.optString("DNIS");
	String horaChamada = additionalParams.get("dateTime");
	JSONArray lista = new JSONArray(additionalParams.get("fila"));
	int evento = 0;
	String data = "";

	if (ani.equals("")||ani.equals(null)||ani.equals(" ")){
		ani = "0";
	}
	
	ConexaoSocket conn = new ConexaoSocket("10.132.197.210", 33);
    
    conn.send("client "+ idCliente +";");
    conn.send("dnis " + dnis + ";");
	conn.send("ani " + ani + ";");
	conn.send("date_time " + horaChamada + ";");
	
	for(int i = 0; i < lista.length(); i++)
	{
		evento = lista.getJSONObject(i).optInt("evento");
		data =   lista.getJSONObject(i).optString("data");
		conn.send("evento "+ evento + " " + data + ";");	
	}
	
	conn.conectionClose();
	
	JSONObject result = new JSONObject();
	
	return result;
	
};
%>
<%-- GENERATED: DO NOT REMOVE --%>
<%@page import="br.com.relatorio.socket.*"%>
<%@page import="java.lang.Integer"%>
<%@page import="org.json.JSONObject"%>
<%@page import="org.json.JSONException"%>
<%@page import="org.json.JSONArray"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.io.*"%>
<%@include file="../include/backend.jspf"%>