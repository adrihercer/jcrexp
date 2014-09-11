/**
 * Copyright 2014, Adrian Herrera
 * Licensed under the MIT license.
 */

package com.petroglyphcr.sling.tag;

import javax.jcr.GuestCredentials;
import javax.jcr.Repository;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.BodyTagSupport;

import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.scripting.SlingBindings;
import org.apache.sling.api.scripting.SlingScriptHelper;

public abstract class SecurityTag extends BodyTagSupport {

	protected Session  jcrSession;

    protected Session getJcrSession() {
        return jcrSession;
    }

    protected void setJcrSession(Session jcrSession) {
        this.jcrSession = jcrSession;
    }
    
    protected String getAnonimousUser() {
        Repository currentRepo = jcrSession.getRepository();
        Session tempSession = null;
        try {
            tempSession = currentRepo.login(new GuestCredentials());
            return tempSession.getUserID();
        } catch (RepositoryException e) {
            return "";
        } finally {
            if (tempSession != null) {
                tempSession.logout();
            }
        }

    }
    
    @Override
    public void setPageContext(PageContext pageContext) {
        super.setPageContext(pageContext);

        final SlingBindings bindings = (SlingBindings) pageContext.getRequest().getAttribute(SlingBindings.class.getName());
        final SlingScriptHelper scriptHelper = bindings.getSling();
        ResourceResolver resourceResolver = scriptHelper.getRequest().getResourceResolver();
        jcrSession = resourceResolver.adaptTo(Session.class);

    }
}
