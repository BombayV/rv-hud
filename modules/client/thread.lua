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
    local status = EVModule.Status.Hud(ped, PlayerId())
    SendNUIMessage({
        action = 'updateHud',
        health = status.health,
        armor = status.armor,
        stamina = status.stamina,
        hunger = hunger,
        thirst = thirst,
        stress = stress
    })
    status = EVModule.Status.Carhud(ped, GetVehiclePedIsIn(ped, false))
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