/*------------------------------------------------------------------------
	- Keyworder v1.0
	- Copyright (c) 2012 Max Guglielmi 
	- License required for use
------------------------------------------------------------------------*/

(function ($) {

    $.fn.keyworder = function (options) {

        var 
		version = '1.0',
		types = {
		    TITLE: 'title',
		    TOOLTIP: 'tooltip',
		    INLINE: 'inline',
		    REPLACE: 'replace',
		    MATCH: 'match'
		},

        // Default settings
		settings = {
		    type: types.TITLE,
		    dictionary: null,
		    template: null, 						//global or definition wise
		    css: 'kwd-yellow', 					    //global or definition wise
		    cssDefinition: 'kwd-definition', 	    //global or definition wise
		    cssIgnore: 'kwd-ignore',
		    caseSensitive: false, 				    //global or definition wise
		    modifier: null,
		    regExpPattern: '(\\b|^)({key})(\\b|$)', //global or definition wise
		    onBeforeReplace: null,
		    onAfterReplace: null,
		    fnReplaceText: null, 				    //global or definition wise			
		    onBeforeReplaceText: null, 			    //global or definition wise
		    onAfterReplaceText: null, 			    //global or definition wise
		    fnFormatTemplate: null, 				//global or definition wise					
		    cssTooltip: 'kwd-tooltip',
		    tooltipOptions: { gravity: 'sw', fade: true, html: true }
		},

        // Combine user and default configuration
		config = $.extend({}, settings, options);

        // Default templates
        config.tpl = {};
        config.tpl[types.TITLE] = '<acronym title="{def}" class="{css}">{key}</acronym>';
        config.tpl[types.TOOLTIP] = '<a href="#" original-title="{def}" class="{css} ' + config.cssTooltip + '">{key}</a>';
        config.tpl[types.INLINE] = '<acronym class="kwdt">{key}</acronym> (<span class="{cssDef}">{def}</span>)';
        config.tpl[types.REPLACE] = '{key}';
        config.tpl[types.MATCH] = '<span title="{def}" class="{css}">{key}</span>';
        config.modifier = (config.caseSensitive ? 'g' : 'gi');

        // Expose public properties
        this.config = function () { return config; };
        this.types = types;
        this.getType = getType;
        this.getTemplate = getTemplate;
        this.getRegularExpression = getRegularExpression;
        this.getHtml = getHtml;
        this.regexpEscape = regexpEscape;

        var hasTooltip = false,
			isFn = $.isFunction, 	//shortcut
			kwd = this; 			//reference for callbacks

        if (isFn(config.onBeforeReplace)) {
            config.onBeforeReplace.call(this, config);
        }

        this.each(function () {

            var $this = $(this);

            $.each(
                config.dictionary,
                function (index, o) {

                    function scan(elm) {

                        elm.contents().each(function () {
                            if (this.nodeType === 3) {
                                var t = $(this).text(),
                                    r = replaceKeywords(t,o);
                                if (t !== r && r !== '') {
                                    $(this).replaceWith(r);
                                }
                            }
                            else if (this.nodeType === 1) {
                                if (!$(this).is(":link") && !$(this).hasClass(config.css) && !$(this).hasClass(config.cssIgnore)) {
                                    scan($(this));
                                }
                            }
                        });
                        if (hasTooltip) {
                            $('.' + config.cssTooltip).tipsy(config.tooltipOptions);
                        }
                    }

                    scan($this);
                }
            )

        }); //this.each

        if (isFn(config.onAfterReplace)) {
            config.onAfterReplace.call(this, config);
        }

        function replaceKeywords(text, o) {
            var fnReplace = o.fnReplaceText || config.fnReplaceText,
                onBeforeReplace = o.onBeforeReplaceText || config.onBeforeReplaceText,
                onAfterReplace = o.onAfterReplaceText || config.onAfterReplaceText;
            if (isFn(onBeforeReplace)) { onBeforeReplace.call(kwd, text, o); }
            if (!isFn(fnReplace)) {
                text = replaceText.call(kwd, text, o);
            } else {
                text = fnReplace.call(kwd, text, o);
            }
            if (isFn(onAfterReplace)) { onAfterReplace.call(kwd, text, o); }

            return text;
        }

        function replaceText(text, o) {
            if (!text) { return ''; }
            var that = this,
				rgx = getRegularExpression(o);
            return text.replace(rgx, function (m) { return formatTemplate.call(that, m, o); });
        }

        function getType(o) {
            if (!o) { return config.type.toLowerCase(); }
            return o && o['type'] ? o.type.toLowerCase() : config.type.toLowerCase();
        }

        function getTemplate(o) {
            if (!o) { return config.template || config.tpl[getType()]; }
            if (getType(o) === types.TOOLTIP) { hasTooltip = true; }
            if (o.template) { return o.template; }
            return config.template || config.tpl[getType(o)];
        }

        function getPattern(o) {
            var pattern;
            if (o.regExpPattern) { pattern = o.regExpPattern; }
            else if (getType(o) === types.REPLACE) {
                pattern = '{key}';
            } else { pattern = config.regExpPattern; }
            return pattern.replace('{key}', regexpEscape(o.keyword));
        }

        function getRegularExpression(o) {
            var modifier;
            if (o.caseSensitive) { modifier = 'g'; }
            return new RegExp(getPattern(o), modifier || config.modifier);
        }

        function getHtml(o) {
            var tpl = getTemplate(o),
				css = o && o.css ? o.css : config.css,
				cssDef = o && o.cssDefinition ? o.cssDefinition : config.cssDefinition,
				def = o && o.definition ? o.definition : '',
				html;
            if (getType(o) === types.REPLACE) {
                html = tpl.replace(new RegExp('{key}', 'g'), def);
            } else {
                html = tpl.replace(new RegExp('{def}', 'g'), def)
						.replace(new RegExp('{css}', 'g'), css)
						.replace(new RegExp('{cssDef}', 'g'), cssDef);
            }
            return html;
        }

        function formatTemplate(m, o) {
            if (isFn(config.fnFormatTemplate)) {
                return config.fnFormatTemplate.call(this, m, o);
            }
            return getHtml(o).replace(new RegExp('{key}', 'gi'), m);
        }

        function regexpEscape(s) {
            if (!s) { return s; }
            function escape(e) {
                var a = new RegExp('\\' + e, 'g');
                s = s.replace(a, '\\' + e);
            }
            var chars = ['\\', '[', '^', '$', '.', '|', '?', '*', '+', '(', ')'];
            for (var i = 0; i < chars.length; i++) { escape(chars[i]); }
            return s;
        }

        return this;

    } //fn.keyworder

})(jQuery);