---Returns Voice Status Status
---@return table
EVModule.Status.Voice = function()
    local status = {
        modeStatus = 2,
        frequencyStatus = 1,
        mutedStatus = false,
        radioStatus = false,
        isTalking = false
    }
    status.modeStatus = exports['pma-voice']:VoiceStatus().mode or 2
    status.mutedStatus = exports['pma-voice'].VoiceStatus().muted or false
    status.radioStatus = exports['rp-radio']:IsRadioOn() or false
    status.frequencyStatus = exports['rp-radio']:CurrentFrequency() or 1
    status.isTalking = NetworkIsPlayerTalking(PlayerId())
    print(status.radioStatus)
    return status
end