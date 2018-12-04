(function($) {
    $.fn.gldEditor = function() {
        alert($(this).length)
        return this.each(function() {
            alert(56)
            // Do something to each element here.
        })
    }
}(jQuery));
var editor = null;
$(function() {
    $(document).ready(function() {
        editor = new MediumEditor('textarea.editable')
        //$('form').gldEditor()
    })
})