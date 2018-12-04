/*------------------------------------------------------------------------
	- Keyworder: Generate mailto links
	- Do not hesitate to edit this document to match your project 
	requirements
------------------------------------------------------------------------*/

var kwdMailto = {
	dictionary:[{ keyword: null, definition: 'Send an email to ' }],
	regExpPattern: '(\\b|^)([0-9a-zA-Z]+([_.-]?[0-9a-zA-Z]+)*@[0-9a-zA-Z]+[0-9,a-z,A-Z,.,-]*(.){1}[a-zA-Z]{2,4})(\\b|$)',
	template: '<a href="mailto:{key}" title="{def}{key}">{key}</a>',
	type: 'match'
}