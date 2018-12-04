jQuery.fn.gldSiTimetable = function (options) {
    var settings = $.extend({
        actionDurations: []
    }, options)
 
    function getActionUnit($rows, actionsParsed, $stage, actionRow) {
        var $script = $($rows.get(actionsParsed)).find('script')
        if ($script.length != 1) {
            throw 'Action: %s -> %s must have 1 script tag'
                .replace('%s', $stage.find('.title').text())
                .replace('%s', $(actionRow).find('td:not(.stage) .title').text())
        }
 
        var unit = $script.data('unit')
 
        if (!unit) {
            throw 'Action: %s -> %s does not have a days unit'
                .replace('%s', $stage.find('.title').text())
                .replace('%s', $(actionRow).find('td:not(.stage) .title').text())
        }
        if (unit != 'working-days' && unit != 'calendar-days') {
            throw ('Action: %s -> %s does not have a days unit must ' +
                'be either "working-days" or "calendar-days"')
                .replace('%s', $stage.find('.title').text())
                .replace('%s', $(actionRow).find('td:not(.stage) .title').text())
        }
 
        return unit
    }
 
    var actionsParsed = 0
    function createConfigFromTable($table) {
        var stagesConfig = []
        var $rows = $table.find('tbody tr')
        var actionsConfigured = 0
 
        if (settings.actionDurations.length != $rows.length) {
            throw ('there are %d actionDurations and %d table rows')
                .replace('%d', settings.actionDurations.length)
                .replace('%d', $rows.length)
        }
        $table.find('td.stage').each(function () {
            var $stage = $(this)
            var actionsCount = $stage.attr('rowspan') - 0
            if (!actionsCount) {
                actionsCount = 1
            }
 
            var newActionsConfigured = actionsConfigured + actionsCount
            var $rowsForActionsForStage = $rows.slice(
                actionsConfigured,
                newActionsConfigured)
 
            var actionConfig = []
 
            $rowsForActionsForStage.each(function (index, actionRow) {
                actionConfig.push([
                    $(actionRow).find('td:not(.stage) .title').text(),
                    settings.actionDurations[actionsConfigured + index],
                    $(actionRow).find('td:not(.stage)'),
                    getActionUnit($rows, actionsParsed, $stage, actionRow)
                ])
 
                actionsParsed++
            })
            actionsConfigured = newActionsConfigured
 
            stagesConfig.push({
                'title'   : $stage.find('.title').text(),
                'actions' : actionConfig
            })
        })
 
        return stagesConfig
    }
    
    function rowspanFix(table) {
        table.find(".header-row").each(function(i, row) {
            var dataHeader = $(row).attr("data-header");
            var visibleRow = table.find("[data-header="+dataHeader+"]:visible");
            if (visibleRow.length > 0 ) {
                $(row).find("td[rowspan]").attr("rowspan", visibleRow.length);
            }

            // When header-row is hidden, clone the rowspan below
            if (!table.find(".header-row[data-header="+dataHeader+"]").is(":visible")) {
                var subStage = $(row).find("td.stage").clone().wrap("<div/>").parent().html();
                subStage = $(subStage);
                subStage.addClass("sub-stage");
                if ($(visibleRow[0]).find(".sub-stage").length < 1) {
                    $(visibleRow[0]).prepend(subStage);
                } 
            } else {
                table.find("[data-header="+dataHeader+"]").find(".sub-stage").remove();
            }
        });
    }

    function recalculate(timetable, $table) {
        if ($("#r2").val() != "affirmative" && $("#r2").val() != "negative") {
            $(".si-table").find(".four-month-warning-wrap").remove();
        }
        rowspanFix($(".si-table"));

        if (answers.isEmpty('question1')) {
            throw 'Unable to generate timetable as question 1 has not been answered'
        }
 
        timetable.recalculateAllDates()
        
        function hideStage(stageIndex, stage) {
            $(".si-table").find("tr[data-header=header-"+(stageIndex+1)+"]").addClass("hidden-action").hide();
        }
    
        $table.find('tr, td').show();        
        $(timetable.stages).each(function (stageIndex, stage) {
            var numberOfActionsVisibile = stage.calculateNumberOfActionsVisibile()
 
            // hide a whole stage
            if (!numberOfActionsVisibile) {
                hideStage(stageIndex, stage)
            } else {
                $(stage.actions).each(function () {
                    if (this.calculateShouldShow()) {
                        $(this.actionElements[0]).closest("tr").removeClass("hidden-action");
                        this.actionElements.find('.calculated').text(this.daysCalculate())
                        this.actionElements.find('input').val(this.daysCalculateWithOverride())
 
                        updateDateTd(this.actionElements.filter('.start-date'), settings.dateFormatter(this.startDate));
 
                        var startDateText = settings.dateFormatter(this.startDate);
                        var endDateText = settings.dateFormatter(this.endDate);
                        var startCellText = startDateText + "<div class='hidden-date'>to</div> <div class='hidden-date'>" + endDateText + "</div>";
                        this.actionElements.filter('.start-date').html(
                            startCellText)
 
                        updateDateTd(this.actionElements.filter('.end-date'), settings.dateFormatter(this.endDate));
 
                        this.actionElements.filter('.end-date').text(
                            settings.dateFormatter(this.endDate))
                    } else {
                        this.actionElements.hide();
                        // Add marked class for hidden tr
                        $(this.actionElements[0]).closest("tr").addClass("hidden-action");
                    }
                });

            }
        })

        setTimeout(function() {
            // Check start date
            var $pblWarning = $(".four-month-warning-wrap");
            var firstVisibleRow = $(".si-table tbody tr:not('.hidden-action')").first();
            var startDate1st = new Date(firstVisibleRow.find(".start-date").textOnly());
            var presentDate  = new Date().setHours( 0,0,0,0 );
            if (startDate1st.getTime() > presentDate) {
              $(".si-warning-date-wrapper p").addClass("hidden");
            } else {
              $(".si-warning-date-wrapper p").removeClass("hidden");
              $(".si-warning-date").html(firstVisibleRow.find(".start-date").textOnly());
            }
            // Get question2 answer
            // Display pbl warning
            //$(".si-table").find(".four-month-warning-wrap").remove();

            var answer = $("#r2").val();
            var targetRow = "";
            if (answer == "affirmative") {
                targetRow = ".affirmative-answer";
            } else if (answer == "negative") {
                targetRow = ".negative-answer";
            }

            if (targetRow) {
                var targetDate = $(targetRow).find(".start-date").textOnly();
                var minSpace = 0;
                var minDateCell = "";
                $(".si-table").find("tr:not('"+targetRow+"'):visible:not('.hidden-action')").each(function(index, el) {
                    var startDate = $(el).find("td.start-date").textOnly();
                    var endDate = $(el).find("td.end-date").html();
                    if (startDate && endDate) {
                        var spaceStartDays = (new Date(targetDate) - new Date(startDate)) / 3600 / 1000 / 24;
                        var spaceEndDays = (new Date(targetDate) - new Date(endDate)) / 3600 / 1000 / 24;
                        if (spaceStartDays >= 120 && spaceEndDays <= 120) {
                            minDateCell = el;
                        }
                    }                        
                });
                var dataHeader = $(minDateCell).attr("data-header");
                var $rowBeforePBL = $(minDateCell).closest("tr");
                var template = "<tr data-header='"+dataHeader+"' class='four-month-warning-wrap'><td colspan='4'><div class='four-months-warning'>You will not be able to lay a draft affirmative instrument, nor make a negative instrument, nor seek JCSI pre-scrutiny, unless you have PBL clearance. You should therefore start planning for seeking this clearance now. Further details on these requirements can be obtained from PBL Secretariat in the Cabinet Office.</div></td></tr>";

                if ($pblWarning.length) {
                    if (!$pblWarning.prev().is($rowBeforePBL)) {
                        $pblWarning.remove();
                        $rowBeforePBL.after(template);
                    } 
                } else {
                    $pblWarning.remove();
                    $rowBeforePBL.after(template);
                }


                rowspanFix($(".si-table"));
            } else {
                rowspanFix($(".si-table"));
            }
        }, 500);
    }
 
    function updateDateTd(cell, value) {
        var oldDate = cell.textOnly();
        var newDate = value;
        if (oldDate != newDate) {
            cell.addClass("td-date-change");
            setTimeout(function() {
                cell.removeClass("td-date-change");
            }, 500);
        }
    }
    
    var recalculateCountdown = 0
    function updateOverrideDays($table, action, timetable, value) {
        action.daysOverride = value
        recalculateCountdown = 999
        
        function countdown() {
            recalculateCountdown--
            if (recalculateCountdown) {
                setTimeout(function () {
                    countdown()
                }, 1)
            } else {
                recalculate(timetable, $table)
            }
        }
        //countdown();
        recalculate(timetable, $table);
    }
 
    return this.each(function () {
        var $table = $(this)
        var calculated = false
        settings.actionsConfigCallback(createConfigFromTable($table))
 
        function addOverrideListenersIfNeeded(timetable) {
            if (!calculated) {
                $(timetable.stages).each(function () {
                    $(this.actions).each(function () {
                        var action = this
                        this.actionElements.find('input').on(
                            'propertychange change click keyup input paste', function () {
                            updateOverrideDays($table, action, timetable, this.value);
                        })
                    })
                })
            }
 
            calculated = true
        }
 
        $table.on('recalculate', function (event, timetable) {
            recalculate(timetable, $table)
 
            if (!calculated) {
                addOverrideListenersIfNeeded(timetable)
            }
 
            calculated = true
        })
    })
}
$.fn.textOnly = function(sel){
  return $(this).contents().filter(function() {
      return this.nodeType == 3;
    }).text().trim()
};