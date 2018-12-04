/*------------------------------------------------------------------------
	- Keyworder: Detect IP Address
	- Do not hesitate to edit this document to match your project 
	requirements
------------------------------------------------------------------------*/

var kwdIP = {
	dictionary:[{ 
			keyword: null,
			definition: 'An Internet Protocol address (IP address) is a numerical label assigned to each device (e.g., computer, printer) participating in a computer network that uses the Internet Protocol for communication'
	}],
	regExpPattern: '(\\b|^)(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)[\.](25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)[\.](25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)[\.](25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\\b|$)',
	css: 'kwd-green',
	type: 'match'
};