/**
 * Given a Date object, will create a new Date instance with days subtracted
 * Assumes the current date is also to be subtracted from the date (i.e. Inclusive counting)
 *
 * @param   Date    date            The source date (will not be altered)
 * @param   Number  daysToSubtract  Positive Integer to subtract inclusivly
 * @param   Boolean onlyWorking     If true will subtract extra days to allow for weekends
 *
 * @returns Date
 */
function dateSubtractorInclusive(date, daysToSubtract, onlyWorking, holidays) {
    if (!(date instanceof Date)) {
        throw 'Invalid Date object'
    }

    if (daysToSubtract < 1 || daysToSubtract != Math.ceil(daysToSubtract)) {
        throw 'daysToSubtract must be positive integer, it is "' + daysToSubtract + '"'
    }
    
    if (!onlyWorking) {
        var newDate = new Date(date.getTime())
        newDate.setDate(date.getDate() - daysToSubtract + 1)
        return newDate
    }

    var sunday      = 0
    var saturday    = 6

    var workingDays = 0
    var tempDate    = new Date(date.getTime())

    while (true) {
        var day = tempDate.getDay()
        var isWorkingDay = (day !== sunday  &&
                            day != saturday &&
                            !holidays.isDateBankHoliday(tempDate))
        if (isWorkingDay) {
            workingDays++
        }

        if (workingDays >= daysToSubtract) {
            return tempDate
        }

        tempDate.setDate(tempDate.getDate() - 1)
    }
}

/*exported dateSubtractorInclusive */