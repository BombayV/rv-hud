---Get day in text form
---@returns string
local function getDayText()
    local allDays = {'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'}
    local dayNum = GetClockDayOfWeek()
    return allDays[dayNum]
end

---Get month in text form
---@return string
local function getMonthText()
    local allMonths = {'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'}
    local monthNum = GetClockMonth()
    return allMonths[monthNum]
end

---Returns table with multiple complete time status
---@param minutes number
---@param hours number
---@param day number
---@return table
EVModule.Status.Time = function(minutes, hours, day)
    local status = {
        time = 'AM',
        minutes = '01',
        hours = '01',
        hour = '12:00PM',
        day = "1",
        dayText = 'Mon',
        month = 'Jan'
    }

    --#region Refactor time
    if minutes <= 9 then
        status.minutes = tostring(0 .. minutes)
    else
        status.minutes = tostring(minutes)
    end
    if hours >= 12 then
        status.time = 'PM'
        status.hours = tostring(hours - 12)
    else
        status.hours = tostring(hours) or '01'
    end
    --#endregion

    --#region Set status to return
    status.hour = ('%s:%s %s'):format(status.hours, status.minutes, status.time)
    status.day = day or "1"
    status.dayText = getDayText() or 'Mon'
    status.month = getMonthText() or 'Jan'
    --#endregion
    return status
end