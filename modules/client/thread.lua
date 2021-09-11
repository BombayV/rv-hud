local Wait = Wait

AddEventHandler("esx_status:onTick", function(status)
    local ped = PlayerPedId()
    local hudStatus = EVModule.Status.Hud(ped, PlayerId(), status)
    local carStatus = EVModule.Status.Carhud(ped, GetVehiclePedIsIn(ped, false))
    local voiceStatus = EVModule.Status.Voice()
    SendNUIMessage({
        action 'updateStatus',
        hudStatus = hudStatus,
        carhudStatus = carStatus,
        voiceStatus = voiceStatus
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