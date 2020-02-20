package org.apache.jsp.include;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import org.json.JSONObject;
import org.json.JSONException;
import org.json.JSONArray;
import br.com.europ.util.*;
import org.apache.commons.codec.binary.Base64;
import java.util.Map;
import java.util.HashMap;
import java.util.Iterator;
import java.util.HashSet;
import java.util.Set;
import java.net.URL;
import java.net.URLConnection;
import java.net.MalformedURLException;
import java.io.*;
import org.json.JSONObject;
import com.genesyslab.studio.backendlogic.GVPHttpRequestProcessor;
import java.util.Map;

public final class doConsultaProtocolo_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {



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
      out.write("\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n");
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
