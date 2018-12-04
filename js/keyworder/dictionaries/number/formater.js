/*------------------------------------------------------------------------
	- Keyworder: Format number
	- Do not hesitate to edit this document to match your project 
	requirements
------------------------------------------------------------------------*/

var kwdToUSNb = {
	dictionary:[
		{ regExpPattern: '(\\b|^|-)?[0-9]+[\\.]?[0-9]+(\\b|$)', decimal_separator:'.', thousand_separator: ',', precision: 2 }
	],
	fnFormatTemplate: kwd_FormatTemplate,
	template: '{key}',
	type: 'match'
}

var kwdToEUNb = {
	dictionary:[
		{ regExpPattern: '(\\b|^|-)[0-9]+[\\.]?[0-9]+(\\b|$)', decimal_separator:',', thousand_separator: '.', precision: 2 }
	],
	fnFormatTemplate: kwd_FormatTemplate,
	template: '{key}',
	type: 'match'
}

var kwdFromUSToEUNb = {
	dictionary:[
		{ regExpPattern: '(\\b|^|-)([0-9]{1,3}(,[0-9]{3})*(\\.[0-9]+)?|\\.[0-9])+(\\b|$)', decimal_separator:',', thousand_separator: '.', precision: 2 }
	],
	fnFormatTemplate: kwd_FormatTemplate,
	template: '{key}',
	type: 'match'
}

var kwdFromEUToUSNb = {
	dictionary:[
		{ regExpPattern: '(\\b|^|-)([0-9]{1,3}(.[0-9]{3})*(\\,[0-9]+)?|\\,[0-9])+(\\b|$)', decimal_separator:'.', thousand_separator: ',', precision: 2 }
	],
	fnFormatTemplate: kwd_FormatTemplate,
	template: '{key}',
	type: 'match'
}

function kwd_FormatTemplate(m, o){// this = keyworder instance
	// m = regular expression match, o = current dictionary item
	if(m===''){ return ''; }
	var html = this.getHtml(o); // this = keyworder instance
	var nStr = kwd_RemoveNbFormat(m);
	var n = nStr!='' ? new Number(kwd_RemoveNbFormat(m)) : nStr;
	if(o.precision){ n = n.toFixed(o.precision); }
	return html.replace(new RegExp('{key}', 'gi'), kwd_FormatNumber(n, o.decimal_separator, o.thousand_separator));
}

function kwd_FormatNumber(nStr, decimal_separator, thousand_separator){
	nStr += '';
	var x = nStr.split('.'),
		x1 = x[0],
		x2 = x.length > 1 ? decimal_separator + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + thousand_separator + '$2');
	}
	return x1 + x2;
}

function kwd_RemoveNbFormat(data){
	if(data == null){ return; }
	var dotLastIndex = data.lastIndexOf('.'),
		commaLastIndex = data.lastIndexOf(','),
		spaceLastIndex = data.lastIndexOf(' ');
	if(dotLastIndex === commaLastIndex === spaceLastIndex === -1){ return data; }
	if(dotLastIndex > commaLastIndex){
		if(spaceLastIndex > -1){
			data =+ data.replace(/\ /g,'');
		} else {
			if(commaLastIndex > -1){
				data =+ data.replace(/\,/g,'');
			}
		}
	} 
	else if(commaLastIndex > dotLastIndex){
		if(spaceLastIndex > -1){
			data =+ data.replace(/\ /g,'').replace(',','.');
		} else {
			if(dotLastIndex > -1){
				data =+ data.replace(/\./g,'').replace(',','.');
			} else {
				data =+ data.replace(',', '.');
			}
		}
	}	
	return data;
}