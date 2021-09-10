---Get day in text form
---@returns string
local function getDayText()
    local day = 'Mon'
    local dayNum = GetClockDayOfWeek()
    if dayNum == 2 then
        day = 'Tue'
    elseif dayNum == 3 then
        day = 'Wed'
    elseif dayNum == 4 then
        day = 'Thu'
    elseif dayNum == 5 then
        day = 'Fri'
    elseif dayNum == 6 then
        day = 'Sat'
    elseif dayNum == 7 then
        day = 'Sun'
    end
    return day
end

---Get month in text form
---@return string
local function getMonthText()
    local month = 'Jan'
    local dayMonth = GetClockMonth()
    if dayMonth == 2 then
        month = 'Feb'
    elseif dayMonth == 3 then
        month = 'Mar'
    elseif dayMonth == 4 then
        month = 'Apr'
    elseif dayMonth == 5 then
        month = 'May'
    elseif dayMonth == 6 then
        month = 'Jun'
    elseif dayMonth == 7 then
        month = 'Jul'
    elseif dayMonth == 8 then
        month = 'Aug'
    elseif dayMonth == 9 then
        month = 'Sep'
    elseif dayMonth == 10 then
        month = 'Oct'
    elseif dayMonth == 11 then
        month = 'Nov'
    elseif dayMonth == 12 then
        month = 'Dec'
    end
    return month
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
        hour = "12:00PM",
        day = "1",
        dayText = "Mon",
        month = "Jan"
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
        status.hours = tostring(hours) or "01"
    end
    --#endregion

    --#region Set status to return
    status.hour = ("%s:%s %s"):format(status.hours, status.minutes, status.time)
    status.day = day or "1"
    status.dayText = getDayText() or "Mon"
    status.month = getMonthText() or "Jan"
    --#endregion
    return status
end