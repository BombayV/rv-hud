---Returns Voice Status Status
---@return table
EVModule.Status.Voice = function()
    local status = {
        modeStatus = 2,
        radioStatus = false
    }
    status.modeStatus = exports['pma-voice']:GetVoiceMode() or 2
    status.radioStatus = exports['rp-radio']:IsRadioOn() or false
    return status
end