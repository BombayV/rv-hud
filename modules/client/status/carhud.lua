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
        headlight = 'low'
    }

--#region Check
    if status.entity <= 0 then return end
--#endregion Check

--#region Apply new status
    if status.entity > 0 then
        status.speed = math.floor(GetEntitySpeed(status.entity) * 3.6) or 0
        status.rpm = math.floor(GetVehicleCurrentRpm(status.entity) * 10000) or 2000

        status.gear = GetVehicleCurrentGear(status.entity)
        if (status.speed == 0) and (status.gear == 0 or 1) then
            status.gear = 'N'
        elseif status.speed and (status.gear == 0) then
            status.gear = 'R'
        end

        status.class = GetVehicleClass(status.entity) or 1
        if status.class ~= 13 then
            status.fuel = math.floor(GetVehicleFuelLevel(status.entity))
        else
            status.fuel = "bike"
        end
        
        status.damage = math.floor((GetVehicleEngineHealth(status.entity) / 10)) or 100
        if status.damage < 0 then
            status.damage = 0
        end

        local _, headlightMedium, headlightHigh = GetVehicleLightsState(status.entity)
        if headlightMedium and headlightHigh then
            status.headlight = "high"
        elseif headlightMedium and not headlightHigh then
            status.headlight = "low"
        else
            status.headlight = "off"
        end
    end
--#endregion

    return status
end