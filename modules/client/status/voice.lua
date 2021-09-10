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