$(function() {
    new WebsiteRoutes().addRoutes([
        {
            'n' : 'article/save',
            't' : '/topic/{topicPathPart}/article/create',
            'm' : 'POST'
        },
        {
            'n' : 'article/update',
            't' : '/article/{articleId}',
            'm' : 'POST'
        }
    ]);

    var pageLink = window.location.hash.substr(1)
    if (pageLink.indexOf('/article') > -1) {
        window.location.href = pageLink
        return
    }

    var isNew = window.location.href.indexOf('/article/blank') > -1

//    var toolbar = 'introduction style-h1 style-h2 style-h3 | ' +
    var toolbar = 'style-h3 style-h4 style-h5 | ' +
        'undo redo | '                                         +
        'bold italic link | bullist numlist | table'

    $('.editor-container').gldWysiwyg({
        sections        : window.sections,
        tinymceOptions  : {
            menubar                       : false,
            theme                         : "modern",
            skin                          : 'gld',
            toolbar                       : toolbar,
            branding                      : false,
            statusbar                     : false,
            height                        : '30vh',
            paste_retain_style_properties : "all",
            indent                        : false,
            force_br_newlines             : true,
            force_p_newlines              : false,
            relative_urls                 : false
        },
        sortableOptions : {
            'axis'                 : 'y',
            'forcePlaceholderSize' : true,
            'tolerance'            : 'intersect'
        },
        uris            : WebsiteRoutes,
        afterPublished  : function ($editorContainer, article) {
            if (isNew) {
                window.location.href = '#/article/' + article._id
                isNew = false
                $('.add-edit-hint').text('Edit Guidance')
            }
            $editorContainer.find('.flash-notice.published')
                .show().delay(5000).fadeOut()
        }
    })
})

/**
 * Custom UK Government Legal Department plugin for doing WYSIWYG
 * Wraps around tinyMCE, adds plugins, and manages section tabs */
$.fn.gldWysiwyg = function(options) {
    var settings = $.extend({
        sections        : [],
        tinymceOptions  : {},
        sortableOptions : {},
        uris            : function (routeName, args) {return ''},
        afterPublished  : function ($editorContainer, article) {}
    }, options)

    /** Extra plugins are created and added here */
    function setupTinyMce() {
        function addExtraButtonsToEditor(editor) {
            ['h3', 'h4', 'h5', 'h6'].forEach(function(name) {
                var nameDisplay  = 'h' + (name.substring(1, 2) - 2)
                var text         = nameDisplay.toUpperCase()
                var tooltip      = 'Toggle ' + text
                var nameOfButton = 'style-' + name

                editor.addButton(nameOfButton, {
                    tooltip      : tooltip,
                    text         : text,
                    onClick      : function() {
                        editor.execCommand('mceToggleFormat', false, name)
                    },
                    onPostRender : function() {
                        var self = this
                        var setup = function() {
                            editor.formatter.formatChanged(name, function(state) {
                                self.active(state)
                            })
                        }

                        if (editor.formatter) {
                            setup()
                        } else {
                            editor.on('init', setup)
                        }
                    }
                })
            })
        }

        settings.tinymceOptions.plugins = [
            'advlist autolink lists link image charmap print preview anchor',
            'textcolor searchreplace  visualblocks code fullscreen',
            'insertdatetime media table code help stylebuttons paste'
        ]

        tinyMCE.PluginManager.add('stylebuttons', addExtraButtonsToEditor)
    }
    setupTinyMce()

    function getSectionDataById(id) {
        var section = null
        $(settings.sections).each(function () {
            if (this._id == id) {
                section = this
                return false
            }
        })

        return section
    }

    function updateSectionData(section) {
        for (var i in settings.sections) {
            if (settings.sections[i]._id == section._id) {
                settings.sections[i] = section
            }
        }
    }

    function updateSectionWeightById(id, weight) {
        for (var i in settings.sections) {
            if (settings.sections[i]._id == id) {
                settings.sections[i].weight = weight
            }
        }
    }

    function deleteSectionById(id) {
        for (var i in settings.sections) {
            if (settings.sections[i]._id == id) {
                settings.sections.splice(i, 1)
            }
        }
    }

    function publish($editorContainer, callback) {
        var data = {
            'id'         : $editorContainer.data('articleId'),
            'parentPath' : $editorContainer.data('topicPath'),
            'title'      : $editorContainer.find('.title').val(),
            'sections'   : settings.sections
        }

        if ($editorContainer.data('articleId')) {
            var uri = settings.uris('article/update', {
                'articleId': $editorContainer.data('articleId')
            }).toString()

            $.post(uri, data, function(article) {
                callback($editorContainer, article)
            })
        } else {
            var uri = settings.uris('article/save', {
                'topicPathPart': $editorContainer.data('topicPath')
            }).toString()

            $.post(uri, data, function (article) {
                $editorContainer.data('articleId', article._id)
                callback($editorContainer, article)
            })
        }
    }

    function setWysiwygContent(tinymceInstance, section, $header) {
        tinymceInstance.setContent(section.content)
        $header.val(section.header)
    }

    function setJurisdictionsUi($juristictionsCont, section) {
        $(':checked', $juristictionsCont).prop('checked', false)
        if (section.jurisdictions) {
            var spacesRegex = / /g
            $(section.jurisdictions).each(function () {
                var cssClass = this
                    .replace()
                    .toLowerCase()
                    .replace(spacesRegex, '-')

                $('input.' + cssClass, $juristictionsCont).prop('checked', true)
            })
        }
    }

    function saveAddJuristiction(currentSavedSection, value) {
        if (currentSavedSection.jurisdictions === null) {
            currentSavedSection.jurisdictions = []
        }
        var position = currentSavedSection.jurisdictions.indexOf(value)
        if (position == -1) {
            currentSavedSection.jurisdictions.push(value)
        }
    }

    function saveRemoveJuristiction(currentSavedSection, value) {
        if (currentSavedSection.jurisdictions === null) {
            currentSavedSection.jurisdictions = []
        }
        var position = currentSavedSection.jurisdictions.indexOf(value)
        if (position > -1) {
            currentSavedSection.jurisdictions.splice(position, 1)
        }
    }

    return this.each(function() {
        var $editorContainer        = $(this)
        var $wysiwyg                = $('textarea.wysiwyg', $editorContainer)
            .tinymce(settings.tinymceOptions)

        var $juristictionsContainer = $(
            '.juristictions-container',
            $editorContainer
        )

        var $currentTab             = null
        var currentSavedSection     = null
        var tinymceInstance         = $wysiwyg.tinymce()
        var $header                 = $('input.header', $editorContainer)
        var $tabs                   = $('.sections.tabs', $editorContainer)
        var newAddedCount           = 0

        /**
         * Show the first tab
         */
        tinymceInstance.on('init', function () {
            if ($tabs.find('li').length == 1) {
                sectionAddNewAndSelect()
            }
            $.extend($tabs.find('li:nth-child(2)'), {
                loadSectionFromTab: loadSectionFromTab}
            ).loadSectionFromTab()
        })

        function unselectCurrentTab() {
            currentSavedSection.content = tinymceInstance.getContent()
            updateSectionData(currentSavedSection)
            $currentTab.removeClass('selected')
        }

        /**
         * Activating a tab
         * load the content into the textbox
         * $(this) == $tab
         */
        function loadSectionFromTab() {
            if ($currentTab) {
                unselectCurrentTab()
            }
            $currentTab = $(this).addClass('selected')
            currentSavedSection = getSectionDataById($currentTab.data('id'))
            setJurisdictionsUi($juristictionsContainer, currentSavedSection)

            setWysiwygContent(
                tinymceInstance,
                currentSavedSection,
                $header
            )
        }

        function numberTabs($tabs) {
            $('.number', $tabs).each(function (i, _) {
                this.innerHTML = i
            })
        }

        function sectionAddNewAndSelect() {
            var $tabNew = $tabs.find('li.blank').clone()
            var newId = '_new_' + newAddedCount

            $tabNew.removeClass('blank').data('id', newId)

            settings.sections.push({
                _id           : newId,
                header        : '',
                content       : '',
                jurisdictions : [],
                weight        : $tabs.find('li').length - 1
            })

            $tabs.append($tabNew.show())
            newAddedCount++

            // refactor
            $.extend($tabNew, {
                loadSectionFromTab: loadSectionFromTab}
            ).loadSectionFromTab()
            numberTabs($tabs)
        }

        function selectLastSection(){
            var $tabSelect = $tabs.find('li').last()

            $.extend($tabSelect, {
                loadSectionFromTab: loadSectionFromTab}
            ).loadSectionFromTab()

        }

        $header.on('change paste keyup', function() {
            var text = $.trim(this.value)
            if (!text) {
                text = $tabs.find('li.blank .header').text()
            }

            $currentTab.find('.header').text(text)
            currentSavedSection.header = this.value
        })

        settings.sortableOptions.update = function () {
            $tabs.find('li').each(function (index) {
                updateSectionWeightById($(this).data('id'), index)
                numberTabs($tabs)
            })
        }

        $tabs
            .sortable(settings.sortableOptions)
            .disableSelection()
            .on('click', 'li', loadSectionFromTab)

        $tabs.on('mouseenter', 'li', function () {
            $('.delete', this).show()
        })
        $tabs.on('mouseleave', 'li', function () {
            $('.delete', this).hide()
        })
        $tabs.on('click', '.delete', function (e) {
            e.preventDefault()
            e.stopPropagation()
            var $tab = $(this).parents('li.tab')
            deleteSectionById($tab.data('id'))
            $tab.remove()

            numberTabs($tabs)
            selectLastSection()
        })

        $('.add', $editorContainer).click(function (e) {
            e.preventDefault()
            sectionAddNewAndSelect()
        })

        $editorContainer.submit(function (e) {
            e.preventDefault()
            if ($currentTab) {
                currentSavedSection.content = tinymceInstance.getContent()
                updateSectionData(currentSavedSection)
            }

            publish($editorContainer, settings.afterPublished)
        })

        $('.exit', $editorContainer).click(function () {
            window.location.href = $(this).data('pageToReturnTo')
        })

        $('input', $juristictionsContainer).click(function () {
            if ($(this).prop('checked')) {
                saveAddJuristiction(currentSavedSection, this.value)
            } else {
                saveRemoveJuristiction(currentSavedSection, this.value)
            }
        })
    })
}