$(function() {
    var timetable;
    // Used for restore state of si-table
    var loadedData = null;
    var stepCount = 7;

    var breakPoints = {
        isTablet: function() {
            return window.matchMedia("(max-width: 768px)").matches
        },
        isMobile: function() {
            return window.matchMedia("(max-width: 600px)").matches
        }
    }

    function dateFormatter(date) {
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + '-' + monthNames[monthIndex].substring(0, 3) + '-' + year.toString().substring(2,4);
    }

    // Update year on question 1 (A1 - A0) based on current day
    // The date format is mm-dd-yy
    function commDateUpdate(input) {
        var currentDate = new Date();
        var commDate = new Date($(input).val());
        if (currentDate > commDate) {
            var commYear = commDate.getFullYear();
            var inputValue = $(input).val().replace(commYear, commYear+1);
            $(input).val(inputValue);
            var inputLabel = $(input).closest("label").find(".label-text").html().replace(commYear, commYear+1);
            $(input).closest("label").find(".label-text").html(inputLabel);
        }
    }
    commDateUpdate("input#A1");
    commDateUpdate("input#A0");

    var $siTimetable = $('table.si-table');

    $.support.cors = true;
    var $siTimetableAjaxBoot = $.ajax({
        url: 'https://www.gov.uk/bank-holidays.json',
        type: "get",
        dataType: "json",
        cache: false, 
        success:function(data){
            if (!data['england-and-wales']) {
                throw 'Unable to get England and Wales Bank Holidays'
            }

            $siTimetable.gldSiTimetable({
                // actionDurations are defined globally
                actionDurations       : actionDurations,
                dateFormatter         : dateFormatter,
                actionsConfigCallback : function (stagesConfig) {
                    timetable = new Timetable(
                        stagesConfig,
                        data['england-and-wales'].events,
                        answers
                    )
                }
            })
        }, 
        error:function(error){
            console.log(error);
        }
    });

    // var $siTimetableAjaxBoot = $.get('http://localhost/2018-12-02.json', null, function(data) {
    // // var $siTimetableAjaxBoot = $.get('https://www.gov.uk/bank-holidays.json', null, function(data) {
    //     if (!data['england-and-wales']) {
    //         throw 'Unable to get England and Wales Bank Holidays'
    //     }

    //     $siTimetable.gldSiTimetable({
    //         // actionDurations are defined globally
    //         actionDurations       : actionDurations,
    //         dateFormatter         : dateFormatter,
    //         actionsConfigCallback : function (stagesConfig) {
    //             timetable = new Timetable(
    //                 stagesConfig,
    //                 data['england-and-wales'].events,
    //                 answers
    //             )
    //         }
    //     })
    // }, 'json');


    $siTimetableAjaxBoot.fail(function () {
        console.log('AJAX to get bank holidays failled')
    })

    // Reset the hash to Step 1
    if (location.hash != "step-1") {
        location.hash = "step-1";
    }

    $('[data-toggle="popover"]').popover(); 
    $('.selector').on("mouseenter", function () {
        var _this = this;
        $(this).popover("show");
        $(this).siblings(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide")
            }
        }, 250);
    });
    $("#datepicker").datepicker({
        dateFormat: "dd-M-yy"
    });

    $("#dateHide").hide();
    $("#A3").on("click", function() {
        $("#dateHide").show();
    });
    // Consultation on Instrument answer step 5
    $("#A13").on("click", function() {
        if ($(this).is(":checked")) {
            $(".consultation-days").removeClass("hidden");
            $(".consultation-days").show();
        } else {
            $(".consultation-days").addClass("hidden");
            $(".consultation-days").hide();
        }       
    });
    // Policy proposal on answer step 5 question 1
    $("#A22, #A23").on("change", function() {
        if ($("#A22").is(":checked")) {
            $(".proposal-days").removeClass("hidden");
            $(".proposal-days").show();
        } else {
            $(".proposal-days").addClass("hidden");
            $(".proposal-days").hide();
        }       
    });
    $("#A0, #A1, #A2").on("click", function() {
        $("#dateHide").hide();
    });
    // Step 7 option
    $("#step-7 input[name=response7]").on("click", function() {
        var value = $(this).val();
        if (value == "yes") {
            $("#step-7 .question7-choice").removeClass("hidden");
            $("#step-7 .question7-choice").find("input[type=radio]#A20").prop("checked", true);
        } else {
            $("#step-7 .question7-choice").addClass("hidden");
            $("#step-7 .question7-choice").find("input[type=radio]").prop("checked", false);
        }
    });
    // Step 5 option
    $("#step-5 input[id=A16]").on("click", function() {
        var value = $(this).is(":checked");
        if (value) {
            $("#step-5 .question5-choice").removeClass("hidden");
        } else {
            $("#step-5 .question5-choice").addClass("hidden");
            $("#step-5 .question5-choice").find("input").prop("checked", false);
        }
    });
    // public consultation
    $(document).on("keyup change", ".si-consultation", function() {
        var value = $(".si-consultation").val();
        var activeStep = $(".step-anchor li.active > a").attr('href').split("#step-")[1];
        if (value && activeStep == stepCount + 1) {
            $(".consultation-days input").val(value).trigger("change");
        }        
    });
    // public proposal
    $(document).on("keyup change", ".si-proposal", function() {
        var value = $(".si-proposal").val();
        var activeStep = $(".step-anchor li.active > a").attr('href').split("#step-")[1];
        if (value && activeStep == stepCount + 1) {
            $(".proposal-days input").val(value).trigger("change");
        }        
    });
    // consultation-days validation
    $(document).on("keyup change", ".consultation-days input", function() {
        var min = parseFloat($(this).attr("data-min"));
        var value = parseFloat($(this).val() || 0);
        var defaults = parseFloat($(this).attr("default") || 60);
        var warningHigh = 'Warning! You\'ve entered {amount} amount of days more than the default recommended value of days';
        var warningLow = 'Warning! You\'ve entered {amount} amount of days lower than the default recommended value of days';

        if ($(this).attr("min") && value < min) {
            minWarning = "Warning! You have chosen a value less than the minimum allowed for this action  by "+(min - value)+" amount of day(s)";
        }        

        if (isFinite(min) && isFinite(value)) {
            if (value < min) {
                $(".consultation-days-warning").css("display", "block");
                $(".consultation-days-warning").html(minWarning);
                return;
            } else if (value >= min || value == defaults) {
                $(".consultation-days-warning").hide();
            }
        }

        if (value > defaults) {
            $(".consultation-days-warning").css("display", "block");
            $(".consultation-days-warning").html(warningHigh.replace("{amount}", value - defaults));            
        } else if (value < defaults) {
            $(".consultation-days-warning").css("display", "block");
            $(".consultation-days-warning").html(warningLow.replace("{amount}", defaults - value));   
        } else if (value = defaults) {
            $(".consultation-days-warning").hide();
        }

        // Remove validation text on si-table
        var activeStep = $(".step-anchor li.active > a").attr('href').split("#step-")[1];
        if (value && activeStep != stepCount + 1) {
            $(".si-consultation").val(value).trigger("change");
        } 
    });
    // proposal-days validation
    $(document).on("keyup change", ".proposal-days input", function() {
        var min = parseFloat($(this).attr("data-min"));
        var value = parseFloat($(this).val() || 0);
        var defaults = parseFloat($(this).attr("default") || 10);
        var warningHigh = 'Warning! You\'ve entered {amount} amount of days more than the default recommended value of days';
        var warningLow = 'Warning! You\'ve entered {amount} amount of days lower than the default recommended value of days';

        if ($(this).attr("min") && value < min) {
            minWarning = "Warning! You have chosen a value less than the minimum allowed for this action  by "+(min - value)+" amount of days";
        }        

        if (isFinite(min) && isFinite(value)) {
            if (value < min) {
                $(".proposal-days-warning").css("display", "block");
                $(".proposal-days-warning").html(minWarning);
                return;
            } else if (value >= min || value == defaults) {
                $(".proposal-days-warning").hide();
            }
        }

        if (value > defaults) {
            $(".proposal-days-warning").css("display", "block");
            $(".proposal-days-warning").html(warningHigh.replace("{amount}", value - defaults));            
        } else if (value < defaults) {
            $(".proposal-days-warning").css("display", "block");
            $(".proposal-days-warning").html(warningLow.replace("{amount}", defaults - value));   
        } else if (value = defaults) {
            $(".proposal-days-warning").hide();
        }

        // Remove validation text on si-table
        var activeStep = $(".step-anchor li.active > a").attr('href').split("#step-")[1];
        if (value && activeStep != stepCount + 1) {
            $(".si-proposal").val(value).trigger("change");
        } 
    });
    // Restrict - character on number input 
    $(document).on("keydown", ".si-table .duration input", function(e) {
        if (e.which == 189) {
            e.preventDefault();
            return false; 
        }
    });
    // Change event for table's number input
    $(document).on("keyup change", ".si-table .duration input", function(e) {
        var self = this;
        setTimeout(function() {            
            var min = parseFloat($(self).attr("data-min"));
            var value = parseFloat($(self).val() || 0);
            var defaults = parseFloat($(self).attr("default") || 0);
            var minWarning = "";
            if ($(self).attr("min") && value < min) {
                minWarning = "Warning! You have chosen a value less than the minimum allowed for self action  by "+(min - value)+" amount of days";
            }        

            if (isFinite(min) && isFinite(value)) {
                if (value < min) {
                    $(self).closest("tr").find(".validation").html(minWarning).show();
                } else if (value >= min || value == defaults) {
                    $(self).closest("tr").find(".validation").html("").hide();
                }
            }

            var origin = parseFloat($(self).closest("tr").find(".calculated").html() || 0);
            if (origin == value) {
                $(self).closest("tr").find(".validation").html("").hide();
                //$(self).closest("tr").find(".calculated").addClass("hidden");
            } else {
                var word = origin > value ? "less" : "more";
                var noti = Math.abs(origin - value) + " day(s) "+word+" than best practice";
                $(self).closest("tr").find(".validation").html(minWarning || noti).show();
                
                if (word == "less") {
                    $(self).closest("tr").find(".validation").addClass("less-than-default");
                } else {
                    $(self).closest("tr").find(".validation").removeClass("less-than-default");
                }
            }
            $(self).closest("td.duration").find(".validation").removeClass("warning-box");
            // When default value > 0 , turn box to green
            if (value == 0 && defaults > 0) {
                $(self).closest("td.duration").find(".validation").addClass("warning-box");
                $(self).closest("td.duration").find(".validation").html(defaults + " days is usually recommended for self step").show();
            }
            
            // Enter key make lost focus
            if (e.which == 13) {
                self.blur();    
            }
        }, 250);
    });
    // Click event for disabled input
    $(document).on("mousedown", ".si-table .duration.locked", function() {
        var self = this;
        var warning = "This value is fixed and cannot be changed";
        $(this).closest("tr").find(".validation").addClass("fixed-value-validation").html(warning).show();

        setTimeout(function() {
            $(self).closest("tr").find(".validation").html("").hide();
        }, 3000);
    });

    $(window).resize(function() {
        detachProgressBar();

        resizeStuff();
    });


    // PRINT button
    function printReady(shortcut) {
        //$("body").addClass("print-mode"); 
        $(".si-table .duration input").each(function(i, el) {
            $(el).attr("hidden-value", $(el).val());
        });
        $("body").append("<div class='printable'>"+$(".si-table")[0].outerHTML+"</div>");   
        
        $(".printable .duration input").each(function(i, el) {
            $(el).replaceWith($(el).attr("hidden-value"));
        }); 
    }

    //PRINT event
    $(document).bind("keydown", function (e) { 
        if (e.ctrlKey && e.keyCode === 80) { 
            pdfMake.createPdf(generateDocDefinition()).print();
        } 
        return true; 
    });
    $(document).on("click", "#print-table", function() {   
        pdfMake.createPdf(generateDocDefinition()).print();
    });
    window.onafterprint = function(e){
        $(window).off('mousemove', window.onafterprint);
        $(".printable").remove();
        $(".si-table .quantity input").removeAttr("hidden-value");
        $("body").removeClass("print-mode");
    };   
    // BACK button
    $(document).on("click", "#back-button", function() {
        $(".step-anchor li > a[href='#step-7']").trigger("click");
    });

    // SAVE button
    $(document).on("click", "#save-table", function() {
        saveSI()
        alert(
            JSON.stringify(JsonAnswers())
        )
        // Show and Hide elements in saving process
        $(".save-input").val("");
        $(".save-input,#cancel-save-table,#cancel-save-table").removeClass("hidden");
        $("#print-table,#back-table,.si-table,#print-table").addClass("hidden");
        $(".save-label").val("");
      
        if ($(this).hasClass("confirm")) {
            $(".save-input,.save-label,#save-table,#cancel-save-table").addClass("hidden");
            $(".save-message,#back-table").removeClass("hidden");
            $(this).removeClass("confirm");
        } else {
            $(".save-input,.save-label").removeClass("hidden");
            $(this).addClass("confirm");
        }
    });
      $(document).on("click", "#cancel-save-table", function() {
        //$("#save-table-modal").modal("show");
        $(".save-input,.save-label,.save-message,#cancel-save-table,#back-table").addClass("hidden");
        $("#print-table,#save-table,.si-table").removeClass("hidden");
    });
    $(document).on("click", "#back-table", function() {
        //$("#save-table-modal").modal("show");
        $(".save-input,.save-label,.save-message,#cancel-save-table,#back-table").addClass("hidden");
        $("#print-table,#save-table,.si-table").removeClass("hidden");
    });


    $(document).on("click", "#stepzero", function () {

        var loadedAns = $("#savedAns").val();
        alert(loadedAns);
        reloadAnswers(loadedAns);
    });
    
    
    function changeDateFormat(_string){
        var arrDates = _string.split("-");
        if( arrDates.length < 3)return "";
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];
        for( var i = 0; i < monthNames.length; i++){
            if( arrDates[1] == monthNames[i].substr(0,3)){
                var monthNum = i + 1;
                var month = ( monthNum > 9 ? monthNum : '0' + monthNum);
                return arrDates[2] + "-" + month + "-"  + arrDates[0];
            }
        }
        return '';
    }

    var stepsValidationAndSave = (function(){
        var callbacks = []
        callbacks[1] = function () {
            var value = $('#step-1 :checked').val();
            if (value == 'A3') {
                $('#step-1 :checked').val();
                // should only be one "datepicker" on the whole wizard
                value = $('#datepicker').val();
            }

            // Use Date object to check the date valid
            // var date = new Date(value);
            var date1 = changeDateFormat(value);
            if ( date1 == "") {
                throw 'Invalid date';
            }
            var date = new Date(date1);
            if (isNaN(date.getTime())) {
                throw 'Invalid date';
            }
            answers.addOrOverwriteAnswer('question1', date);
        }

        callbacks[2] = function () {
            answers.addOrOverwriteAnswer('question2', $('#step-2 :checked').val());
        }

        callbacks[3] = function () {
            answers.addOrOverwriteAnswer('question3', $('#step-3 :checked').val());
        }
        callbacks[4] = function () {
            answers.addOrOverwriteAnswer('question4', $('#step-4 :checked').val());
        }
        callbacks[5] = function () {
            var values = $('#step-5 :checked').map(function() {
                return $(this).val();
            }).get();

            answers.addOrOverwriteAnswer('question5', values);
        }
        callbacks[6] = function () {
            answers.addOrOverwriteAnswer('question6', $('#step-6 :checked').val());
        }
        callbacks[7] = function () {
            var question7Select = $('#step-7 [type=radio][name=response7]:checked').val();
            if (question7Select == "yes") {
                question7Select = $('#step-7 [type=radio][name=response7]:checked').val();                  
            }
            answers.addOrOverwriteAnswer('question7', question7Select);
        }

        return callbacks;
    })();

    function getNotAnswerStep(selectTableAnchor) {
        // Current Step
        var totalStep = stepCount;
        var missSteps = [];
        var step = $(".step-anchor li.active > a").attr('href').split("#step-")[1];
        if (step == stepCount || selectTableAnchor) {
            for (var i = 1; i <= stepCount; i++) {
                if ($("#step-"+i).find("[type=radio]:checked,[type=checkbox]:checked").length <= 0 
                    && i != 5) {
                    missSteps.push(i);
                }
            }
        }

        if (missSteps.length == 0) {
            return false
        } else {
            $("#miss-step-modal").find(".miss-steps").html(missSteps.join(" ,"));

            return true;
        }
    }

    // Init event
    $("#smartwizard").on("init", function(e) {
        $("#smartwizard").removeClass("hidden");
    });

    // Step leave event
    $("#smartwizard").on("leaveStep", function(e, anchorObject) {
        // Format is #step-xxx
        var step = anchorObject.attr('href').split("#step-")[1];

        if (step < stepCount + 1) {
            stepsValidationAndSave[step]();
        }

        // On leave check for checked radio and input
        if ($(anchorObject.attr('href')).find("input[type=radio]:checked, input[type=checkbox]:checked").length == 0 
            && step != 5 && step != 7) {
            anchorObject.closest("li").addClass("un-done");
        }
    });

    // Step show event
    $("#smartwizard").on("showStep", function(e, anchorObject, stepNumber, stepDirection, stepPosition) {
        // Remove 'done' class on un-done anchor
        $(".un-done").removeClass("un-done done");      

        if ($('input:radio[name=response1]').is(':checked') === true) {
            $("#r1").val($('input[name=response1]:checked').val());
        }
        if ($('input[name=response1]:checked').val() == 'A3') {
            $("#r1").val($("#datepicker").val());
        }
        if ($('input:radio[name=response2]').is(':checked') === true) {
            $("#r2").val($('input[name=response2]:checked').val());
        }
        if ($('input:radio[name=response3]').is(':checked') === true) {
            $("#r3").val($('input[name=response3]:checked').val());
        }
        if ($('input:radio[name=response4]').is(':checked') === true) {
            $("#r4").val($('input[name=response4]:checked').val());
        }
        if ($('input[name=response5]:checked').length > 0) {
            var values = $('#step-5 :checked').map(function() {
                return $(this).val();
            }).get();

            $("#r5").val(values);
        } else {
            $("#r5").val("");
        }
        if ($('input:radio[name=response6]').is(':checked') === true) {
            $("#r6").val($('input[name=response6]:checked').val());
        }
        if ($('input:radio[name=response7]').is(':checked') === true) {
            var question7Select = $('#step-7 [type=radio][name=response7]:checked').val();
            if (question7Select == "yes") {
                //question7Select = $('#step-7 [type=radio][name=response7b]:checked').val();                  
            }
            $("#r7").val(question7Select);
        }
        if ($("#r1").val() != '') {
            $("#ans1, #ans01").html('' + $("#r1").val());
        }
        if ($("#r2").val() != '') {
            $("#ans2, #ans02").html('' + $("#r2").val());
        }
        if ($("#r3").val() != '') {
            $("#ans3, #ans03").html('' + $("#r3").val());
        }
        if ($("#r4").val() != '') {
            $("#ans4, #ans04").html('' + $("#r4").val());
        }
        if ($("#r5").val() != '') {
            var answersArr = $("#r5").val().split(",");

            if (answersArr.length == 1) {
                $("#ans5, #ans05").html('' + answersArr[0]);
                $("#ans05").addClass("hide-popover");                
            } else {
                $("#ans5, #ans05").html('' + answersArr.length + " selected");
                $("#ans05").attr("data-content", answersArr.join("<br>"));  
                $("#ans05").removeClass("hide-popover");              
            }
            //$("#ans5, #ans05").html('' + $("#r5").val().split(",").join("\n"));
        } else {
            $("#ans05").addClass("hide-popover");  
            if ($("[href=#step-5]").closest("li").is(".done")) {
                $("#ans5, #ans05").html('' + "none selected");  
            }            
        }
        if ($("#r6").val() != '') {
            $("#ans6, #ans06").html('' + $("#r6").val());
        }
        if ($("#r7").val() != '') {
            $("#ans7, #ans07").html('' + $("#r7").val());
        }

        if (stepPosition === 'first') {
            $("#prev-btn").addClass('disabled');
        } else if (stepPosition === 'final') {
            $("#next-btn").addClass('disabled');
        } else {
            $("#prev-btn").removeClass('disabled');
            $("#next-btn").removeClass('disabled');
        }

        // Start the calculate date
        if (anchorObject.attr('href') == '#step-' + (stepCount + 1)) {
            $siTimetable.trigger('recalculate', timetable);

        }

        // Display com-date
        $(".com-date").html(dateFormatter(new Date(answers.get("question1"))));

        // Change next/prev button, button based zero count
        if (stepNumber == 7) {
            $(".sw-btn-next").html("Show timetable ready for printing");
        } else {
            $(".sw-btn-next").html("Next");
        }       
        
        // Reduce progress bar        
        if (stepNumber == stepCount) {
            $(".sw-btn-group").addClass("si-btn-group");
        } else {
            $(".si-warning-date-wrapper p").addClass("hidden");
            $(".sw-btn-group").removeClass("si-btn-group");
        }
        detachProgressBar(stepNumber);

        // Enable Prev button on step 1
        $(".sw-btn-prev").removeClass("disabled");

        // Show/ Hide print
        if (stepNumber == 7) {
            $(".prt-btn-wrapper").css({
                'display': 'block'
            });
            $(".SItable-header").removeClass("hidden");        
        } else {
            //$(".prt-btn-wrapper").hide();
        }

        // Change the icon on active step
        $("a[href*='#step-']").closest("li").removeClass("active-done");
        var hasAnwserYet = $(anchorObject.attr('href')).find("[type=radio]:checked,[type=checkbox]:checked").length > 0;
        if (hasAnwserYet) {
            anchorObject.closest("li").addClass("active-done");
        }
         // Add linethrough on zero value input
        $(".quantity input").each(function(index, input) {
            var value = $(input).val();
            if (value == 0) {
                $(input).closest("tr").addClass("zero-value");
                $(input).closest(".quantity").addClass("zero-value");
            } else {
                $(input).closest("tr").removeClass("zero-value");
                $(input).closest(".quantity").removeClass("zero-value");
            }            
        });
    });

    function resizeStuff() {
        var pos = breakPoints.isTablet() ? 'bottom' : 'left';
        $("[data-toggle='popover']").popover('destroy');
        setTimeout(function () {
            $("[data-toggle='popover']").popover({'placement': pos});
        }, 200);
    }
    
    // Used to move the progress bar into space
    function detachProgressBar(stepNumber) {
        var isLastStep = stepNumber ? (stepNumber == stepCount) : $(".step-anchor li.active").is(".si-step");
        // Reduce progress bar        
        if (isLastStep) {
            if (!breakPoints.isTablet()) {
                // Move the progress into intro place
                $("#smartwizard").find(".step-anchor").detach().appendTo(".si-timetable-intro .intro-placeholder");
                $("#smartwizard").find(".answer-list").detach().appendTo(".si-timetable-intro .intro-placeholder");
            } else {
                // Move the progress into intro place
                $(".si-timetable-intro .intro-placeholder").find(".step-anchor").detach().prependTo("#smartwizard");
                $(".si-timetable-intro .intro-placeholder").find(".answer-list").detach().prependTo("#smartwizard .questions-container");
            }
        } else {
            if (!breakPoints.isTablet()) {
                // Move the progress into intro place
                $(".si-timetable-intro .intro-placeholder").find(".step-anchor").detach().prependTo("#smartwizard");
                $(".si-timetable-intro .intro-placeholder").find(".answer-list").detach().prependTo("#smartwizard .questions-container");
            } 
        }
    }

    // Toolbar extra buttons
    var btnFinish = $('<button></button>').text('Finish')
        .addClass('btn btn-info')
        .on('click', function() {
            alert('Finish Clicked');
        });
    var btnCancel = $('<button></button>').text('Cancel')
        .addClass('btn btn-danger')
        .on('click', function() {
            $('#smartwizard').smartWizard("reset");
        });

    // Smart Wizard
    $('#smartwizard').smartWizard({
        selected: 0,
        theme: 'default',
        transitionEffect: 'fade',
        keyNavigation: false,
        showStepURLhash: true,
        toolbarSettings: {
            toolbarPosition: 'both',
            toolbarExtraButtons: [btnFinish, btnCancel],
            toolbarButtonPosition: 'none',
            showPrintButton: false
        },
        anchorSettings: {
            markDoneStep: true
        }
    });

    // External Button Events
    $("#reset-btn").on("click", function() {
        // Reset wizard
        $('#smartwizard').smartWizard("reset");
        return true;
    });

    $(".sw-btn-prev").off().on("click", function() {
        var activeStep = $(".step-anchor li.active > a").attr('href').split("#step-")[1];
        if (activeStep == 1) {
            $("#smartwizard").fadeOut();
            $("#intro").fadeIn();
        }
        // Navigate previous
        $('#smartwizard').smartWizard("prev");
        return true;
    });

    $(".sw-btn-next").off().on("click", function() {
        var step = $(".step-anchor li.active > a").attr('href').split("#step-")[1];

        if (step == 7) {
            stepsValidationAndSave[step]();
        }

        var currentStep = $($(".step-anchor li.active > a").attr('href'));
        var hasAnwserYet = currentStep.find("[type=radio]:checked,[type=checkbox]:checked").length > 0;
        if (!hasAnwserYet && step != 5) {
            $("#miss-answer-modal").modal("show");
        } else {
            if (!getNotAnswerStep()) {
                // Navigate next
                $('#smartwizard').smartWizard("next");
            }
        }       

        return true;
    });

    // Intro next button, show prev btn and screen-2 
    $(".intro-btn-next").on("click", function() {
        $(".intro-btn-next, .si-start-page .screen-1").addClass("hidden");
        $(".sw-btn-start, .intro-btn-prev, .sw-btn-load, .si-start-page .screen-2").removeClass("hidden");
    });
    // Intro prev button, show next btn and screen-1
    $(".intro-btn-prev").on("click", function() {
        $(".intro-btn-next, .si-start-page .screen-1").removeClass("hidden");
        $(".sw-btn-start, .intro-btn-prev, .sw-btn-load, .si-start-page .screen-2").addClass("hidden");
    });

    // Start button
    $(".sw-btn-start").on("click", function() {
        $("#smartwizard").fadeIn();
        $("#intro").fadeOut();
    });

    /* LOAD json data */
    $("#load-json-input").on("change", function(evt) {  
        var files = evt.target.files; // FileList object
        // files is a FileList of File objects. List some properties.
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
            var reader = new FileReader();
            // Closure to capture the file information.
            reader.onload = (function (theFile) {
                $(".file-name-loaded").removeClass("hidden").find("span").html(theFile.name);
                return function (e) {
                    try {
                        loadedData = JSON.parse(e.target.result);
                        loadState(loadedData);                       
                        $(".step-anchor li > a").trigger("mousedown");
                        //$(".step-anchor li > a[href='#step-1']").trigger("click");
                        $(".sw-btn-start").trigger("click");
                    } catch (ex) {
                        console.log(ex);
                        $(".file-name-loaded").addClass("hidden");
                    }
                }
            })(f);
            reader.readAsText(f);
        }
    });
    // trigger click on hidden file input
    $(".sw-btn-load, #load-data").on("click", function() {
        $("#load-json-input").trigger("click");
    });

    function loadState(data) {
        var answers = data.answers;
        var siValue = data.siValue || [];
        if (answers) {
            for (j = 0; j < answers.length; j++) {
                var item = answers[j];
                var selection = item.selection;
                var value = item.value;
                // Iterate over each selection to restore input check
                for (var i = 0; i < selection.length; i++) {
                    $(".questions-container").find("#" + selection[i]).trigger("click");
                } 
                // Iterate over each question textinput to restore value
                for (var i = 0; i < value.length; i++) {
                    $(".questions-container").find("#" + value[i].el).val(value[i].val).trigger("change");
                }   
            };
        }       
    }
    /* LOAD json data - end */

    // SAVE data as json //
    $("#export-table").on("click", function() {
        var saveData = {
            answers: [],
            siValue: []
        };
        $(".step-content").each(function() {
            var id = $(this).attr("id");
            if (id != "step-" + (stepCount + 1)) {
                var answerItem = {
                    selection: [],
                    value: []   
                } 
                $(this).find("input[type=radio]:checked, input[type=checkbox]:checked").each(function() {
                    answerItem.selection.push($(this).attr("id"));
                });
                $(this).find("input[type=text], input[type=number]").each(function() {
                    var _default = parseInt($(this).attr("default")) || 10;     
                    var _value = $(this).val();

                    if (_default != _value) {
                        answerItem.value.push({
                            el: $(this).attr("id"),
                            val: $(this).val()
                        });
                    }
                });
                saveData.answers.push(answerItem);
            }                      
        });
        $(".si-table input[type=number]").each(function() {
            var _default = parseInt($(this).attr("default")) || 0;     
            var _value = $(this).val();

            if (_default != _value) {
                saveData.siValue.push({
                    el: $(this).attr("id"),
                    val: $(this).val()
                });
            }   
        });  
        var fileName = prompt("Please choose the name for the data") || "";
        // Generate file name as timestamp
        var timeStamp = new Date().toString().substr(4, 21);
        timeStamp = timeStamp.replace(" ", "-").replace(" ", "-");
        var blob = new Blob([JSON.stringify(saveData, null, 4)], {type: "text/plain;charset=utf-8"});
        saveAs(blob, fileName+ "_" +timeStamp + ".json");
    });
    // Print Guide button
    $("#print-guide-table").on("click", function() {
        $("#print-guide-modal").modal("show");
        //pdfMake.createPdf(generateDocDefinition()).download();
    });
    $(".options li").not(".question7-choice li").on("click", function(e) {
        if ($(e.target).is("li")) {
            $(this).find("[type=radio], [type=checkbox]").trigger("click");
        }        
    });

    $(".options input").on("change", function() {
        var liParent = $(this).closest("li");
        var answered = liParent.find("input[type=radio]:checked, input[type=checkbox]:checked").length;
        if (answered > 0) {
            liParent.addClass("answered");
        } else {
            liParent.removeClass("answered");
        }
        // Trigger all radio with same name
        var radName = $(this).attr("name");
        if ($(this).is("[type=radio]")) {
            $("[name="+radName+"]").not(this).closest("li").removeClass("answered");
        }
    });

    // Prevent mouse click on si-table step before checking the miss steps
    $("a[href*='#step-']").on("mousedown", function(event) {
        var activeStep = $(".step-anchor li.active > a").attr('href').split("#step-")[1];
        var targetStep = $(this).attr('href').split("#step-")[1];
        var activeOptions = $("#step-"+activeStep);
        var targetOptions = $("#step-"+targetStep);
        var activeAnsweredYet = activeOptions.find("[type=radio]:checked,[type=checkbox]:checked").length > 0 || activeStep == 5;
        var targetAnsweredYet = targetOptions.find("[type=radio]:checked,[type=checkbox]:checked").length > 0; 

        // Check if all answer has placed, change si-table as done
        if (!getNotAnswerStep(true)) {
            $('.step-anchor .si-step').addClass("si-done");
        } else {
            $('.step-anchor .si-step').removeClass("si-done");
        }
        // If user click si-table
        if (targetStep == stepCount + 1) {
            if (!getNotAnswerStep(true)) {
                $('#smartwizard').smartWizard("moveTo", targetStep - 1);
            } else {
                $("#miss-step-modal").modal("show");
            }
        } else if (activeStep != stepCount + 1 && activeStep < targetStep) {
            if (!activeAnsweredYet) {
                $("#miss-answer-modal").modal("show");
            } else {
                if (targetStep - activeStep == 1) {
                    $('#smartwizard').smartWizard("next");
                }
                if (targetStep - activeStep > 1 && (targetAnsweredYet || targetStep == 5)) {
                    $('#smartwizard').smartWizard("moveTo", targetStep - 1);
                }
                if (targetStep - activeStep > 1 && !(targetAnsweredYet || targetStep == 5)) {
                    $("#miss-previous-modal").modal("show");
                }
            }
        }

        // Restore table state
        if (targetStep == stepCount + 1) {
            if (loadedData && loadedData.siValue) {
                var siValue = loadedData.siValue;
                for (var j = 0; j < siValue.length; j++) {
                    $(".si-table").find("#" + siValue[j].el).val(siValue[j].val).trigger("change");
                }
                loadedData = null;
            }
        }

        event.stopPropagation();
        event.stopImmediatePropagation();
        event.preventDefault();
        return false;
    });

    $("#theme_selector").on("change", function() {
        // Change theme
        $('#smartwizard').smartWizard("theme", $(this).val());
        return true;
    });

    // Trigger the quantity inputs
    quantityInput();

    function quantityInput() {
        $(".duration:not(.locked) input, .consultation-days input, .proposal-days input").wrap("<div class='quantity'></div>");
         $('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div></div>').insertAfter('.quantity input');
        $('<div class="quantity-nav"><div class="quantity-button quantity-down">-</div></div>').insertBefore('.quantity input');
        $('.quantity').each(function() {
          var spinner = $(this),
            input = spinner.find('input[type="number"]'),
            btnUp = spinner.find('.quantity-up'),
            btnDown = spinner.find('.quantity-down'),
            min = input.attr('min'),
            max = input.attr('max');

        //btnUp.click(function() {
        //    var oldValue = parseFloat(input.val());
        //    if (oldValue >= max) {
       //       var newVal = oldValue;
       //     } else {
       //       var newVal = oldValue + 1;
       //     }
       //     spinner.find("input").val(newVal);
       //     spinner.find("input").trigger("change");
       //   });

      input.on("keyup change", function() {
            var value = parseFloat($(input).val() || 0);
            var defaults = parseFloat($(input).attr("default") || 0);
            if (value == 0) {
                $(input).closest("tr").addClass("zero-value");
                $(input).closest(".quantity").addClass("zero-value");
            } else {
                $(input).closest("tr").removeClass("zero-value");
                $(input).closest(".quantity").removeClass("zero-value");
            }                
        });
        function increaseVal() {
            var oldValue = parseFloat(input.val()) || 0;
            if (oldValue >= max) {
              var newVal = oldValue;
            } else {
              var newVal = oldValue + 1;
            }
 
            return newVal;
        }
 
        function decreaseVal() {
 
            var oldValue = parseFloat(input.val());
            if (oldValue <= min) {
              var newVal = oldValue;
            } else {
              var newVal = oldValue - 1;
            }
 
            return newVal;
        }
 
        btnUp.mousedown(function() {
            var interval = setInterval(function() {
                spinner.find("input").val(increaseVal(input));
            }, 200);
            $(this).data("interval", interval);
        });
 
        btnUp.mouseup(function() {
            var interval = $(this).data("interval");
            spinner.find("input").trigger("change");
            clearInterval(interval);
        });
 
        btnDown.mousedown(function() {
            var interval = setInterval(function() {
                spinner.find("input").val(decreaseVal(input));
            }, 200);
            $(this).data("interval", interval);
 
        });
 
        btnDown.mouseup(function() {
            var interval = $(this).data("interval");
            spinner.find("input").trigger("change");
            clearInterval(interval);
        });
 
        btnUp.click(function() {
            spinner.find("input").val(increaseVal(input));
            spinner.find("input").trigger("change");
          });
 
        btnDown.click(function() {
            spinner.find("input").val(decreaseVal(input));
            spinner.find("input").trigger("change");
          });
 
        });
 
 
    }

    //json for answers

    function JsonAnswers()
    {
        var JsonAnswers = {};
        JsonAnswers.ans01 = answers.get("question1");
        JsonAnswers.ans02 = answers.get("question2");
        JsonAnswers.ans03 = answers.get("question3");
        JsonAnswers.ans04 = answers.get("question4");
        JsonAnswers.ans05 = answers.get("question5");
        JsonAnswers.ans06 = answers.get("question6");
        JsonAnswers.ans07 = answers.get("question7");

        return JsonAnswers;

    }

    function reloadAnswers(stringAnswers)
    {
        var loadedAns = jQuery.parseJSON(stringAnswers);
        alert(loadedAns.ans01);
        answers.addOrOverwriteAnswer('question1', loadedAns.ans01);
        answers.addOrOverwriteAnswer('question2', loadedAns.ans02);
        answers.addOrOverwriteAnswer('question3', loadedAns.ans03);
        answers.addOrOverwriteAnswer('question4', loadedAns.ans04);
        answers.addOrOverwriteAnswer('question5', loadedAns.ans05);
        answers.addOrOverwriteAnswer('question6', loadedAns.ans06);
        answers.addOrOverwriteAnswer('question7', loadedAns.ans07);

        stepsValidationAndSave[step]();
    }

    function saveSI()
    {
        var saveSettings = $.extend(true, {}, {
            url: 'si-save',
            type: "POST",
            data: ({answers: JSON.stringify(JsonAnswers()) }),
            dataType: "text",
            beforeSend: function(){
                //elm.parent('li').addClass('saving');
            },
            error: function(jqXHR, status, message){

                $.error(message);
            },
            success: function(res){
                alert("Saved SI")
                if(res && res.length > 0){
                    elm.data('has-content',true);
                    selPage.html(res);
                }
            }
        }, '');

        $.ajax(saveSettings);
    }

    // Set selected theme on page refresh
    $("#theme_selector").change();
});