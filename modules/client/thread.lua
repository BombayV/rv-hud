local CreateThread = CreateThread
local Wait = Wait

CreateThread(function()
    local currentPed = PlayerPedId()
    local currentPlayer = PlayerId()
    while true do
        if currentPed ~= PlayerPedId() then
            print('Ped has changed')
            currentPed = PlayerPedId()
            currentPlayer = PlayerId()
        end
        local hudState = EVModule.Status.Hud(currentPed, currentPlayer)
        local carhudState = EVModule.Status.Carhud(currentPed, GetVehiclePedIsIn(currentPed, false))
        print(carhudState.speed)
        print(hudState.hunger)
        Wait(250)
    end
end)

CreateThread(function()
    while true do
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
        Wait(1000)
    end
end)