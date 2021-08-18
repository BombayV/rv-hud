function currentVoiceMode(value)
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