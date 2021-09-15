---Returns Voice Status Status
---@return table
EVModule.Status.Voice = function()
    local status = {
        modeStatus = 2,
        frequencyStatus = 1,
        mutedStatus = false,
        radioStatus = false
    }
    status.modeStatus = exports['pma-voice']:VoiceStatus().mode or 2
    status.mutedStatus = exports['pma-voice'].VoiceStatus().mutedStatus or false
    status.radioStatus = exports['rp-radio']:IsRadioOn() or false
    status.frequencyStatus = exports['rp-radio']:CurrentFrequency() or 1
    return status
end