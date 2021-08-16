function currentVoiceMode(value)
    SendNUIMessage({
        action = 'voiceMode',
        mode = value
    })
end