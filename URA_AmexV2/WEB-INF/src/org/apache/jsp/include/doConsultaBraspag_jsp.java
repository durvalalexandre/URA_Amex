package org.apache.jsp.include;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import org.json.JSONObject;
import java.util.Map;
import java.net.URL;
import java.net.URLConnection;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import org.json.JSONObject;
import com.genesyslab.studio.backendlogic.GVPHttpRequestProcessor;
import java.util.Map;

public final class doConsultaBraspag_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {



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


  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List _jspx_dependants;

  static {
    _jspx_dependants = new java.util.ArrayList(1);
    _jspx_dependants.add("/include/../include/backend.jspf");
  }

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.AnnotationProcessor _jsp_annotationprocessor;

  public Object getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_annotationprocessor = (org.apache.AnnotationProcessor) getServletConfig().getServletContext().getAttribute(org.apache.AnnotationProcessor.class.getName());
  }

  public void _jspDestroy() {
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;


    try {
      response.setContentType("application/json;charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, false, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write('\r');
      out.write('\n');
      out.write("\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n");
      out.write("\r\n\r\n\r\n\r\n\r\n");

response.setHeader("Cache-Control", "no-cache");

String output = null;

try {
    // process the post data
    GVPHttpRequestProcessor processor = new GVPHttpRequestProcessor(request);
    processor.parseRequest();
    
    // "state" encapsulates the state variable submitted by the VXML page
    JSONObject state = processor.getState();
    
    // additional parameters that were passed in the namelist
    Map<String, String> additionalParams = processor.getAdditionalParams();
    
    // perform the logic
    JSONObject result = performLogic(state, additionalParams);
    
	output = result.toString();
    
    out.print(output);
    
} catch (Exception e) {
    
    e.printStackTrace();
    String msg = e.getMessage();
    if (null != msg){
    	msg = msg.replace('"', '\'');
    }
	out.print("{\"errorMsg\": \"" + msg + "\"}");
	
}

    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try { out.clearBuffer(); } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
