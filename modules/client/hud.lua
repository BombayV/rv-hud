---Returns all the player status data in a table
---@param ped any
---@param player number
---@param playerData any
EVModule.Status.Hud = function(ped, player, playerData)
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
    status.armor = playerData.metadata['armor'] or 0
    status.stamina = GetPlayerSprintStaminaRemaining(player) or (GetPlayerUnderwaterTimeRemaining(player) * 4) or 100
    status.hunger = playerData.metadata['hunger'] or 100
    status.thirst = playerData.metadata['thirst'] or 100
    status.stress = playerData.metadata['stress'] or 0
    --#endregion
    return status
end

---Returns and applies voice mode in NUI
---@param mode number
---@return number
EVModule.Status.Voice = function(mode)
    if mode == 1 then
        SendNUIMessage({
            action = 'voiceMode',
            microphone = 33
        })
    elseif mode == 2 then
        SendNUIMessage({
            action = 'voiceMode',
            microphone = 66
        })
    elseif mode == 3 then
        SendNUIMessage({
            action = 'voiceMode',
            microphone = 100
        })
    end
    return mode
end