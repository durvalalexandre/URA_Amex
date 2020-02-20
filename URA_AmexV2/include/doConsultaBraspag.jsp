<%@page language="java" contentType="application/json;charset=UTF-8" pageEncoding="UTF-8" %>
<%!

public JSONObject performLogic(JSONObject state, Map<String, String> additionalParams) throws Exception{
	
	JSONObject result = new JSONObject();
	String cartao = additionalParams.get("cartao");
	String request = "";
	String response = "";
	
	
		request = "<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>" +
				  "<soap:Body>" +
			      "<AuthorizeTransaction xmlns='https://www.pagador.com.br/webservice/pagador'>" +
			         "<request>" +
			            "<OrderData>" +
			               "<MerchantId>190A732C-F77B-E411-93FC-005056932B77</MerchantId>" +
			               "<OrderId>0000000000</OrderId>" +
			              "<BraspagOrderId xsi:nil='true'/>" +
			            "</OrderData>" +
			            "<CustomerData>" +
			               "<CustomerName>*</CustomerName>" +
			            "</CustomerData>" +
			            "<PaymentDataCollection>" +
			               "<PaymentDataRequest xsi:type='CreditCardDataRequest'>" +
			                  "<PaymentMethod>502</PaymentMethod>" +
			                  "<Amount>100</Amount> " +
			                  "<Currency>BRL</Currency> " +
			                  "<Country>BRA</Country> " +
			                  "<NumberOfPayments>1</NumberOfPayments> " +
			                  "<PaymentPlan>0</PaymentPlan>" +
			                  "<TransactionType>1</TransactionType>" +
			                  "<CardHolder>Teste</CardHolder>" +
			                  "<CardNumber>"+ cartao +"</CardNumber>" +
			                  "<CardSecurityCode/>" +
			                  "<CardExpirationDate>10/2019</CardExpirationDate>" +
			               "</PaymentDataRequest>" +
			            "</PaymentDataCollection>" +
			            "<RequestId>73440ee7-4465-49ff-a63e-20dfe5509170</RequestId>" +
			            "<Version>1.0</Version>" +
			         "</request>" +
			      "</AuthorizeTransaction>" +
			   "</soap:Body>" +
			"</soap:Envelope>";

	
	URL url = new URL("https://pagador.com.br/webservice/pagadorTransaction.asmx");
	
	URLConnection conn = url.openConnection();
	
	conn.setDoOutput(true);
	conn.setRequestProperty("SOAPAction", "https://www.pagador.com.br/webservice/pagador/AuthorizeTransaction");
	conn.setRequestProperty("Type", "AuthorizeTransactionRequest");
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
<%@page import="java.net.URL" %>
<%@page import="java.net.URLConnection"%>
<%@page import="java.io.BufferedReader"%>
<%@page import="java.io.InputStreamReader"%>
<%@page import="java.io.OutputStreamWriter"%>
<%@include file="../include/backend.jspf"%>