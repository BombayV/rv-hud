---Returns vehicle entity status
---@param ped any
---@param vehicle any
---@return table
EVModule.Status.Carhud = function(ped, vehicle)
    local status = {
        entity = vehicle,
        speed = 0,
        rpm = 0,
        fuel = 0,
        gear = 0,
        class = 1,
        damage = 100,
        headlight = 'low',
        isPaused = false
    }

--#region Check
    if status.entity <= 0 then
        cV = coroutine.create(function()
            while status.entity <= 0 do
                print("Starting Status: "..tostring(coroutine.status(cV)))
                status.entity = GetVehiclePedIsIn(PlayerPedId(), false) or nil
                if status.entity ~= nil and DoesEntityExist(status.entity) then
                    print("After Status: "..tostring(coroutine.status(cV)))
                end
                Wait(750)
            end
        end)
        if status.entity <= 0 and coroutine.status(cV) == 'suspended' then
            coroutine.resume(cV)
        end
    end
--#endregion Check

--#region Apply new status
    if status.entity > 0 then
        status.speed = (math.floor(GetEntitySpeed(status.entity)) * 3.6) or 0
        status.rpm = (math.floor(GetVehicleCurrentRpm(status.entity) * 10000)) or 2000
        status.gear = GetVehicleCurrentGear(status.entity) or 0
        status.damage = (math.floor(GetVehicleEngineHealth(status.entity)) / 10) or 100
        status.class = GetVehicleClass(status.entity) or 1
        if (not status.speed and not status.gear) or (not status.speed and status.gear) then
            status.gear = "N"
        elseif speed and (gear == 0) then
            status.gear = "R"
        end

        if status.class ~= 13 then
            status.fuel = math.floor(GetVehicleFuelLevel(status.entity))
        else
            status.fuel = "bike"
        end

        local _, headlightMedium, headlightHigh = GetVehicleLightsState(status.entity)
        if headlightMedium and headlightHigh then
            status.headlight = "high"
        elseif headlightMedium and not headlightHigh then
            status.headlight = "low"
        else
            status.headlight = "off"
        end

        if IsPauseMenuActive() and not status.isPaused then
            status.isPaused = true
        elseif not IsPauseMenuActive() and status.isPaused then
            status.isPaused = false
        end
    end
--#endregion

    return status
end