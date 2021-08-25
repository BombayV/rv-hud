---Returns all the player status data in a table
---@param ped any
---@param player number
---@param playerData any
function GetPedDataValues(ped, player, playerData)
    local status = {
        health = 100,
        armor = 0,
        stamina = 100,
        hunger = 100,
        thirst = 100,
        stress = 0
    }
    status.health = (GetEntityHealth(ped) - 100) or 100
    status.armor = playerData.metadata['armor'] or 0
    status.stamina = GetPlayerSprintStaminaRemaining(player) or (GetPlayerUnderwaterTimeRemaining(player) * 4) or 100
    status.hunger = playerData.metadata['hunger'] or 100
    status.thirst = playerData.metadata['thirst'] or 100
    status.stress = playerData.metadata['stress'] or 0
    return status
end

function CurrentVoiceMode(value)
    if (value == 1) then
        SendNUIMessage({
            action = 'voiceMode',
            microphone = 33
        })
    elseif (value == 2) then
        SendNUIMessage({
            action = 'voiceMode',
            microphone = 66
        })
    elseif (value == 3) then
        SendNUIMessage({
            action = 'voiceMode',
            microphone = 100
        })
    end
end