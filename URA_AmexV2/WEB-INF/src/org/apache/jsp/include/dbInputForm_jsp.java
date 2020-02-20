package org.apache.jsp.include;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import org.json.JSONArray;
import com.genesyslab.studio.backendlogic.BackendLogManager;
import org.apache.log4j.Logger;

public final class dbInputForm_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

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
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/xml;charset=utf-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, false, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n\r\n\r\n\r\n\r\n\r\n\r\n");

Logger logger = BackendLogManager.getLogger("dbInputForm");

String dbValues = request.getParameter("dbValues");
logger.info("dbValues: " + dbValues);
String strTimeout = request.getParameter( "timeout" );
logger.info("strTimeout: " + strTimeout);
String strAppLanguage = request.getParameter( "app_language" );
logger.info("strAppLanguage: " + strAppLanguage);
String strAppASRLanguage = request.getParameter( "app_asr_language" );
logger.info("strAppASRLanguage: " + strAppASRLanguage);
String strSecurity = request.getParameter( "security" );
logger.info("strSecurity: " + strSecurity);

JSONArray rows = new JSONArray(dbValues);
int numRows = rows.length();


      out.write("\r\n\r\n<vxml version=\"2.1\" xml:lang=\"");
      out.print(strAppLanguage);
      out.write("\" xmlns=\"http://www.w3.org/2001/vxml\" xmlns:gvp=\"http://www.genesyslab.com/2006/vxml21-extension\" \r\n\t\txmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\r\n\r\n\t<form id=\"DbInputForm\">\r\n\r\n\t\t<field name=\"DbInput\">\r\n\t\t\t");
 if ( strTimeout.length() > 0 ) { 
      out.write("\r\n\t\t\t\t<property name=\"timeout\" value=\"");
      out.print(strTimeout);
      out.write("s\" />\r\n\t\t\t");
}
      out.write("\r\n\t\t\t");
 if ( strSecurity.length() > 0 && strSecurity.equalsIgnoreCase("true")) { 
      out.write("\r\n\t\t\t\t<property name=\"com.genesyslab.private\" value=\"true\" />\r\n\t\t\t");
}
      out.write("\r\n            <grammar xml:lang=\"");
      out.print(strAppASRLanguage);
      out.write("\" root=\"TOPLEVEL\" version=\"1.0\">\r\n\t\t\t\t<rule id=\"TOPLEVEL\" scope=\"public\">\r\n    \t\t\t\t<one-of>\r\n    \t\t\t\t");
 for (int i = 0; i < numRows; i++) { 
                        JSONArray row = rows.getJSONArray(i);
                        String value = row.getString(0);
                        logger.info("row: " + i +  " value: " + value);
                    
      out.write("\r\n        \t\t\t\t<item>");
      out.print(value);
      out.write("</item>\r\n    \t\t\t\t");
 } 
      out.write("\r\n    \t\t\t\t</one-of>\r\n\t\t\t\t</rule>\r\n\t\t\t</grammar>\r\n\t\t\t\r\n            <filled>\r\n\t\t\t\t<return namelist=\"DbInput DbInput$\" />\r\n    \t\t</filled>\r\n\t\t\t<noinput><return event=\"noinput\"/></noinput>\r\n\t\t\t<nomatch><return event=\"nomatch\"/></nomatch>\r\n\t\t\t<catch event=\"error.noresource\"><return event=\"error.noresource\"/></catch>\r\n    \t\t<catch event=\"error\"><return event=\"error\"/></catch>\r\n        </field>\r\n    </form>\r\n</vxml>");
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
