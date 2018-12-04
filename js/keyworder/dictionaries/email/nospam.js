/*------------------------------------------------------------------------
	- Keyworder: Mask email addresses
	- Do not hesitate to edit this document to match your project 
	requirements
------------------------------------------------------------------------*/

var kwdMaskMail = {
	dictionary:[{ keyword: null, definition: null }],
	regExpPattern: '(\\b|^)([0-9a-zA-Z]+([_.-]?[0-9a-zA-Z]+)*@[0-9a-zA-Z]+[0-9,a-z,A-Z,.,-]*(.){1}[a-zA-Z]{2,4})(\\b|$)',
	fnFormatTemplate: function(m, o){ // this = keyworder instance
		// m = regular expression match, o = current dictionary item
		var html = this.getHtml(o);
		var t = m.replace(new RegExp(this.regexpEscape('@'), 'gi'), ' AT ')
						.replace(new RegExp(this.regexpEscape('.'), 'gi'), ' DOT ');		
		return html.replace(new RegExp('{key}', 'gi'), t);
	},
	template: '<span style="color:#999;">{key}</span>',
	type: 'match'
}