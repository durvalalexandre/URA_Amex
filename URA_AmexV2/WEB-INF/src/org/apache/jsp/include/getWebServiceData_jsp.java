package org.apache.jsp.include;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import javax.naming.InitialContext;
import java.net.*;
import java.io.BufferedInputStream;
import java.io.*;
import java.util.*;
import java.net.HttpURLConnection;
import org.json.JSONObject;
import com.genesyslab.studio.backendlogic.WebServiceBackendProcessor;
import com.genesyslab.studio.backendlogic.BackendLogManager;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLSession;
import org.apache.log4j.Logger;

public final class getWebServiceData_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {


Logger logger = BackendLogManager.getLogger("getWebService");

private String buildErrorResponse(String message) {
	logger.info("buildErrorResponse() in");
    StringBuffer sb = new StringBuffer();
    sb.append("'errorMsg'");
    sb.append(":");
    sb.append("'").append(message).append("'");

	logger.error("buildErrorResponse:" + "{" + sb.toString() + "}");
	logger.info("buildErrorResponse() in");
    return "{" + sb.toString() + "}";

};

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List _jspx_dependants;

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
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;


    try {
      response.setContentType("application/json;charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n");
      out.write('\r');
      out.write('\n');

    // This backend logic will process WebServices requests and responses for URS
    logger.info("getWebServiceData:Start");
    HttpURLConnection con = null;
    String readTimeout = "20000"; // timeout in milliseconds
    String conTimeout = "20000"; // timeout in milliseconds

    WebServiceBackendProcessor processor = new WebServiceBackendProcessor(
            request);
    processor.parseRequest();

    try {
        Properties properties = new Properties();
        FileInputStream ipStr = new FileInputStream(request
                .getRealPath("/WEB-INF/composer.properties"));
        properties.load(ipStr);
        if (properties.getProperty("web.connectionTimeout") != null) {
            conTimeout = properties
                    .getProperty("web.connectionTimeout");
        }
        if (properties.getProperty("web.readTimeout") != null) {
            readTimeout = properties.getProperty("web.readTimeout");
        }
        if (ipStr != null) {
            ipStr.close();
        }
        logger.info("conTimeout: " + conTimeout + ", readTimeout: " + readTimeout);
    } catch (Exception e) {
    	//logger.error(BackendLogManager.printStackTrace(e));
        logger.error("Could not find properties file: "+ e.getMessage());
        logger.info("Hence using default connectionTimeout and readTimeout values");
    }

    String value = null;

    URL url = processor.formURI();
    TrustManager[] trustAllCerts = new TrustManager[] { new X509TrustManager() {
        public java.security.cert.X509Certificate[] getAcceptedIssuers() {
            return null;
        }

        public void checkClientTrusted(
                java.security.cert.X509Certificate[] certs,
                String authType) {
        }

        public void checkServerTrusted(
                java.security.cert.X509Certificate[] certs,
                String authType) {
            logger.info("authType is " + authType);
            logger.info("cert issuers");
            for (int i = 0; i < certs.length; i++) {
                logger.info("\t"
                        + certs[i].getIssuerX500Principal().getName());
                logger.info("\t"
                        + certs[i].getIssuerDN().getName());
            }
        }
    } };

    try {
        SSLContext sc = SSLContext.getInstance("SSL");
        sc.init(null, trustAllCerts, new java.security.SecureRandom());
        HttpsURLConnection.setDefaultSSLSocketFactory(sc
                .getSocketFactory());
    } catch (Exception e) {
    	logger.error(BackendLogManager.printStackTrace(e));
        out.print(buildErrorResponse(e.getMessage()));
        return;
    }
    HostnameVerifier hv = new HostnameVerifier() {
        public boolean verify(String urlHostName, SSLSession session) {
            logger.warn("Warning: URL Host: " + urlHostName
                    + " vs. " + session.getPeerHost());
            return true;
        }
    };

    HttpsURLConnection.setDefaultHostnameVerifier(hv);

    if (url != null) {
        try {
            processor.formHTTPMessage(conTimeout, readTimeout);
            processor.connectToURL();
            value = processor.readWebServiceresponse();
            if (value == null) {
                // URS will generate error.session.fetch when receiving response of 500
                out.print(buildErrorResponse("error.com.genesyslab.composer.webservice.badFetch - Input Stream cannot be read"));
                logger.error("error.com.genesyslab.composer.webservice.badFetch - Input Stream cannot be read");
                return;
            } else {
                value = processor.processSOAPMessage(value);
                String postData = value;
                JSONObject result = org.json.XML.toJSONObject(postData);
                value = result.toString();
                logger.info("result:" + result.toString());
                logger.info("value:" + value.toString());
                if (processor.isSOAPFault()) {
                    out.print(buildErrorResponse(value));
                    return;
                }
            }
        } catch (Exception e) {
        	logger.error(BackendLogManager.printStackTrace(e));
            out.print(buildErrorResponse(e.getMessage()));

            return;
        }

    } else {
        out.print(buildErrorResponse("error.com.genesyslab.composer.webservice.badFetch - Requested URL cannot be fetched"));
        logger.error("error.com.genesyslab.composer.webservice.badFetch - Requested URL cannot be fetched");
        return;

    }

    processor.disconnectConnection();
    if (null != value) {
        // value should not be null here 
        out.print(value);
        logger.info("value:" + value.toString());
    }
    logger.info("getWebServiceData:End");

      out.write("\r\n\r\n\r\n");
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
