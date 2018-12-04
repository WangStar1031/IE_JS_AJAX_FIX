function AnswersCollection(answersObject) {
    if (answersObject === undefined) {
        answersObject = {}
    }

    this.addOrOverwriteAnswer = function (label, data) {
        answersObject[label] = data
    }

    this.get = function (labelTofind) {
        for (var label in answersObject) {
            if (answersObject.hasOwnProperty(label) && label == labelTofind) {
                return answersObject[label]
            }
        }

        return undefined
    }

    this.notEmpty = function (labelTofind) {
        return (this.get(labelTofind) !== undefined)
    }

    this.isEmpty = function (labelTofind) {
        return (this.get(labelTofind) === undefined)
    }
}

function Action(answers, title, daysCalculator, actionElements, unit) {
    this.startDate = null
    this.endDate = null

    this.daysOverride = null

    this.onlyworkingDays = (unit == 'working-days')
    this.title = title
    this.actionElements = actionElements

    this.daysCalculate = function () {
        return daysCalculator(answers)
    }

    this.daysCalculateWithOverride = function () {
        if (this.daysOverride !== null) {
            return this.daysOverride
        }

        return this.daysCalculate()
    }

    this.calculateShouldShow = function () {
        return (this.daysCalculate() !== false)
    }
}

function Stage(answers, title, actionsConfig) {
    this.answers = null
    this.actions = []
    this.title = null

    var CLASS = this

    if (answers) {
        this.answers = answers
    }
    if (title) {
        this.title = title
    }

    actionsConfig.forEach(function (actionConfig) {
        CLASS.actions.push(new Action(
            answers,
            actionConfig[0],
            actionConfig[1],
            actionConfig[2],
            actionConfig[3]
        ))
    })

    this.calculateNumberOfActionsVisibile = function () {
        var visibileCount = 0
        CLASS.actions.forEach(function (action) {
            if (action.calculateShouldShow()) {
                visibileCount++
            }
        })
        return visibileCount
    }
}

function Timetable(stagesConfig, holidayDateStrings, answers) {
    var holidays = new BankHolidayCollection(holidayDateStrings)

    this.answers = null
    if (answers) {
        this.answers = answers
    }
    
    this.stages = []

    var CLASS = this
    stagesConfig.forEach(function (stageConfig) {
        CLASS.stages.push(new Stage(
            this.answers,
            stageConfig.title,
            stageConfig.actions))
    })

    function createNewFinalDateInstance() {
        if (answers.isEmpty('question1')) {
            throw 'Question 1 has not been answered'
        }

        if (!(answers.get('question1') instanceof Date)) {
            throw 'Invalid Date object'
        }

        return new Date(answers.get('question1').getTime())
    }

    this.recalculateAllDates = function () {
        var subtractingDate = createNewFinalDateInstance()
        this.stages.slice().reverse().forEach(function (stage) {
            stage.actions.slice().reverse().forEach(function (action) {
                if (action.calculateShouldShow()) {
                    var daysToSubtract = Math.ceil(action.daysCalculateWithOverride())

                    // set the end date for this action
                    // to be 1 the previous start date of the next action
                    if (daysToSubtract !== 0) {
                        subtractingDate = dateSubtractorInclusive(subtractingDate, 2)
                    }

                    action.endDate = subtractingDate
                    if (daysToSubtract !== 0) {
                        subtractingDate = dateSubtractorInclusive(
                            subtractingDate,
                            daysToSubtract,
                            action.onlyworkingDays,
                            holidays
                        )
                    }
                    action.startDate = subtractingDate
                }
            })
        })
    }
}

function BankHolidayCollection(days) {
    this.days = days
    this.isDateBankHoliday = function (date) {
        var dateString = date.getFullYear() +
            '-' + ('0' + (date.getMonth() + 1)).slice(-2) +
            '-' + ('0' + (date.getDate())).slice(-2)

        for (var i = 0; i < this.days.length; i++) {
            if (this.days[i].date == dateString) {
                return true
            }
        }

        return false
    }
}

/*exported Action, BankHolidayCollection, AnswersCollection, Timetable */