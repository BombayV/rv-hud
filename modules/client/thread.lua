AddEventHandler("esx_status:onTick", function(status)
    local ped = PlayerPedId()
    local hudStatus = EVModule.Status.Hud(ped, PlayerId(), status)
    local voiceStatus = EVModule.Status.Voice()
    SendNUIMessage({
        action = 'updateStatus',
        hud = hudStatus,
        voice = voiceStatus
    })
    if EVModule.Status.Opened then
        local time = EVModule.Status.Time(GetClockMinutes(), GetClockHours(), GetClockDayOfMonth())
        SendNUIMessage({
            action = 'updateTime',
            time = time.hour,
            day = time.day,
            dayText = time.dayText,
            month = time.month
        })
    end
end)

CreateThread(function()
    local sleep = 250
    while true do
        local ped = PlayerPedId()
        local carhud = EVModule.Status.Carhud(ped, GetVehiclePedIsIn(ped, false))
        if carhud then
            if sleep ~= 250 then
                sleep = 250
            end
            SendNUIMessage({action = 'updateCarhud', carhud = carhud})
        elseif not carhud and sleep ~= 500 then
            SendNUIMessage({action = 'updateCarhud', carhud = carhud})
            sleep = 500
        end
        print(sleep)
        Wait(sleep)
    end
end)