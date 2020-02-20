package org.apache.jsp.include;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import org.json.JSONObject;
import java.util.Map;
import java.net.URL;
import java.net.URLConnection;
import javax.net.ssl.*;
import java.security.*;
import java.io.OutputStreamWriter;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import org.json.JSONObject;
import com.genesyslab.studio.backendlogic.GVPHttpRequestProcessor;
import java.util.Map;

public final class doConsultaCase_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {



public JSONObject performLogic(JSONObject state, Map<String, String> additionalParams) throws Exception{
	
	String sessao = additionalParams.get("sessao");
	String cartao = additionalParams.get("cartao");
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
			"<sfd:doConsultaCase>" + 
			"<sfd:NumeroCartao>" + cartao + "</sfd:NumeroCartao>" + 
			"</sfd:doConsultaCase>" + 
			"</soapenv:Body>" + 
			"</soapenv:Envelope>";
			
	URL url = new URL("https://na25.salesforce.com/services/Soap/class/SFDCWS");
	
	SSLContext sc = SSLContext.getInstance("TLSv1.2");
	sc.init(null, null, new java.security.SecureRandom());
	HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
	conn.setSSLSocketFactory(sc.getSocketFactory());
	
	conn.setDoOutput(true);
	conn.setRequestProperty("SOAPAction", "doConsultaCase");
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

      out.write("\r\n\r\n");
      out.write("\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n");
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
