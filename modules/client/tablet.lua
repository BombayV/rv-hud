local Wait = Wait
local CreateThread = CreateThread

isTabletOpen = false
local isTabletOpen = isTabletOpen

local function getDayText()
    local day = 'Mon'
    local dayNum = GetClockDayOfWeek()
    if (dayNum == 1) then
        day = day
    elseif (dayNum == 2) then
        day = 'Tue'
    elseif (dayNum == 3) then
        day = 'Wed'
    elseif (dayNum == 4) then
        day = 'Thu'
    elseif (dayNum == 5) then
        day = 'Fri'
    elseif (dayNum == 6) then
        day = 'Sat'
    elseif (dayNum == 7) then
        day = 'Sun'
    end
    return day
end

local function getMonthText()
    local month = 'Jan'
    local dayMonth = GetClockMonth()
    if (dayMonth == 1) then
        month = month
    elseif (dayMonth == 2) then
        month = 'Feb'
    elseif (dayMonth == 3) then
        month = 'Mar'
    elseif (dayMonth == 4) then
        month = 'Apr'
    elseif (dayMonth == 5) then
        month = 'May'
    elseif (dayMonth == 6) then
        month = 'Jun'
    elseif (dayMonth == 7) then
        month = 'Jul'
    elseif (dayMonth == 8) then
        month = 'Aug'
    elseif (dayMonth == 9) then
        month = 'Sep'
    elseif (dayMonth == 10) then
        month = 'Oct'
    elseif (dayMonth == 11) then
        month = 'Nov'
    elseif (dayMonth == 12) then
        month = 'Dec'
    end
    return month
end

CreateThread(function()
    while true do
        if isTabletOpen then
            local min, hours, day, month, dayText = GetClockMinutes(), GetClockHours(), GetClockDayOfMonth(), getMonthText(), getDayText()
            local basedHour = 0
            local timeText = 'AM'
            if (min <= 9) then
                min = 0 .. min
            end
            if (hours <= 11) then
                basedHour = hours
                timeText = 'AM'
            elseif (hours >= 12) then
                basedHour = hours - 12
                timeText = 'PM'
            end
            local time = tostring(basedHour .. ':' .. min .. ' ' .. timeText)
            SendNUIMessage({
                action = "updateTime",
                time = time,
                day = day,
                dayText = dayText,
                month = month
            })
        end
        Wait(Config.updateTimeWait)
    end
end)