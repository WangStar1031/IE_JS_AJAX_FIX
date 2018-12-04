/*------------------------------------------------------------------------
	- Keyworder: Detect file extensions
	- Do not hesitate to edit this document to match your project 
	requirements
------------------------------------------------------------------------*/

var IMG_PATH = 'keyworder/dictionaries/file-extensions/images/'; //modify this value if needed
var kwdFileExtensions = {
	dictionary:[
		{ 
			keyword: null,
			definition: 'Image file',
			regExpPattern: '(\\b|^)[a-zA-Z0-9-_\.]+\.(jpg|gif|png|bmp)(\\b|$)'
		},
		{ 
			keyword: null,
			definition: 'Multimedia file',
			regExpPattern: '(\\b|^)[a-zA-Z0-9-_\.]+\.(swf|mov|wma|mpg|mp3|wav)(\\b|$)'
		},
		{ 
			keyword: null,
			definition: 'Document file',
			regExpPattern: '(\\b|^)[a-zA-Z0-9-_\.]+\.(pdf|txt|doc|docx|csv|xls|xlsx|ppt|pptx)(\\b|$)'
		}
	],
	fnFormatTemplate: function(m, o){ // this = keyworder instance
		// m = regular expression match, o = current dictionary item
		var html = this.getHtml(o);		
		return html.replace(new RegExp('{key}', 'gi'), m)
				.replace(new RegExp('{src}', 'gi'), IMG_PATH+'icon-'+m.split('.')[m.split('.').length-1]+'.png');
	},
	css: 'kwd-fext',
	template: '<span title="{def}" class="{css}"><img src="{src}" alt="" />{key}</span>',
	type: 'match'
};