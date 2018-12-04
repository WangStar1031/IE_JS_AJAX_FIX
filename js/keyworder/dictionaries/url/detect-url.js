/*------------------------------------------------------------------------
	- Keyworder: Generate links
	- Do not hesitate to edit this document to match your project 
	requirements
------------------------------------------------------------------------*/

var kwdUrl = {
	dictionary:[{ keyword: null, definition: 'Follow this link' }],
	regExpPattern: '(\\b|^)((http|https|ftp)(:\/\/)?[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+)(\\b|$)',
	template: '<a href="{key}" target="_blank" title="{def}">{key}</a>',
	type: 'match'
}