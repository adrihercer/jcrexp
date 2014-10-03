<%@page import="org.apache.sling.api.resource.*,org.apache.sling.api.*"%>
<%@page session="false" contentType="text/html; charset=utf-8" %>
<%@taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="pcr" uri="http://www.petroglyphcr.com/sling" %>
<sling:defineObjects/>
<%
    String suffix = slingRequest.getRequestPathInfo().getSuffix();
    if (suffix == null) {
	suffix = "/";
    }
    Resource r = slingRequest.getResourceResolver().getResource(suffix);
    pageContext.setAttribute("r", r);
    pageContext.setAttribute("suffix", suffix == "/" ? "" : suffix );
    response.setContentType("application/json");
%>
[ 
<pcr:authenticated>
<sling:adaptTo adaptable="${r}" adaptTo="org.apache.sling.api.resource.ValueMap" var="valueMap"/>
<c:forEach items="${valueMap}" var="item" varStatus="status">
{
"${item.key}" : "<c:out value="${item.value}" escapeXml="true" />",
"editable" : 
<c:choose>
<c:when test="${ item.key == 'jcr:created' || item.key == 'jcr:primaryType' || item.key == 'jcr:createdBy'}">
"false"
</c:when>
<c:otherwise>
"true"
</c:otherwise>
</c:choose>
}
<c:if test="${not status.last}">,</c:if>
</c:forEach>
</pcr:authenticated>
]