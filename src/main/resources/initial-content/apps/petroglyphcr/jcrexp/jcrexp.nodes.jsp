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
<sling:listChildren resource="${r}" var="children"/>
<c:forEach items="${children}" var="item" varStatus="status">
	<sling:adaptTo adaptable="${item}" adaptTo="org.apache.sling.api.resource.ValueMap" var="valueMap"/>
	<sling:getProperty properties="${valueMap}" key="jcr:primaryType" var="type"/>
	{"id":"${suffix}/${item.name}","text":"${item.name}","a_attr":{"jcr:primaryType":"${type}"},"children":true}
	<c:if test="${not status.last}">,</c:if>
</c:forEach>
</pcr:authenticated>
]