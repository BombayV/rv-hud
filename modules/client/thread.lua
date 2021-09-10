local CreateThread = CreateThread
local Wait = Wait
local hunger, thirst, stress = 100, 100, 0

AddEventHandler("esx_status:onTick", function(status)
    for _, v in pairs(status) do
        if v.name == 'hunger' then hunger = v.percent
        elseif v.name == 'thirst' then thirst = v.percent
        elseif v.name == 'stress' then stress = v.percent
        end
    end
    local ped = PlayerPedId()
    local hudStatus = EVModule.Status.Hud(ped, PlayerId())
    local carStatus = EVModule.Status.Carhud(ped, GetVehiclePedIsIn(ped, false))
    local voiceStatus = EVModule.Status.Voice()
    SendNUIMessage({
        action 'updateStatus',
        hud = hudStatus,
        carhud = carStatus,
        voice = voiceStatus
    })
    if EVModule.Status.Opened then
        local time = EVModule.Status.Time(GetClockMinutes(), GetClockHours(), GetClockDayOfMonth())
        SendNUIMessage({
            action = "updateTime",
            time = time.hour,
            day = time.day,
            dayText = time.dayText,
            month = time.month
        })
    end
end)