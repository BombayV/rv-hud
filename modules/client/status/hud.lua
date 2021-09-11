EVModule.Status.Stamina = false

---Returns all the player status data in a table
---@param ped any
---@param player number
---@param currentStatus table
---@return table
EVModule.Status.Hud = function(ped, player, currentStatus)
    local status = {
        health = 100,
        armor = 0,
        stamina = 100,
        hunger = 100,
        thirst = 100,
        stress = 0
    }
    --#region Set return status to actual data
    status.health = (GetEntityHealth(ped) - 100) or 100
    status.armor = GetPedArmour(ped) or 0
    if IsPedSwimmingUnderWater(ped) then
        if not EVModule.Status.Stamina then
            SendNUIMessage({
                action = 'updateHudStamina',
                icon = 'fa-swimmer',
                remove = 'fa-bolt'
            })
            EVModule.Status.Stamina = true
        end
        status.stamina = math.floor(GetPlayerUnderwaterTimeRemaining(player) * 10) or 100
    else
        if EVModule.Status.Stamina then
            SendNUIMessage({
                action = 'updateHudStamina',
                icon = 'fa-bolt',
                remove = 'fa-swimmer'
            })
            EVModule.Status.Stamina = false
        end
        status.stamina =  math.floor((100 - GetPlayerSprintStaminaRemaining(player))) or 100
    end
    
    for _, v in pairs(currentStatus) do
        status.hunger = v.name == 'hunger' and v.percent or 100
        status.thirst = v.name == 'thirst' and v.percent or 100
        status.stress = v.name == 'stress' and v.percent or 0
    end
    --#endregion
    return status
end