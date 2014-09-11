package com.petroglyphcr.sling.tag;

import javax.servlet.jsp.JspException;

import tldgen.BodyContentType;
import tldgen.Tag;

@Tag(bodyContentType= BodyContentType.SCRIPTLESS)
public class AuthenticatedTag extends SecurityTag {

	@Override
    public int doStartTag() throws JspException {
        
        String anonUser = getAnonimousUser();
        if (getJcrSession().getUserID().equals(anonUser)) {
            return SKIP_BODY;
        } else {
            return EVAL_BODY_INCLUDE;
        }
    }

    @Override
    public int doEndTag() throws JspException {
        return super.doEndTag();
    }
}
