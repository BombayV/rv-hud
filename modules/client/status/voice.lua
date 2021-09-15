---Returns Voice Status Status
---@return table
EVModule.Status.Voice = function()
    local status = {
        modeStatus = 2,
        mutedStatus = false,
        radioStatus = false,
        frequencyStatus = false
    }
    status.modeStatus = exports['pma-voice']:VoiceStatus().mode or 2
    status.mutedStatus = exports['pma-voice'].VoiceStatus().mutedStatus or false
    status.radioStatus = exports['rp-radio']:IsRadioOn() or false
    status.frequencyStatus = exports['rp-radio']:CurrentFrequency() or 1
    return status
end