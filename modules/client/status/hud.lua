EVModule.Status.Stamina = false

---Returns all the player status data in a table
---@param ped any
---@param player number
EVModule.Status.Hud = function(ped, player)
    local status = {
        health = 100,
        armor = 0,
        stamina = 100
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
    --#endregion
    return status
end