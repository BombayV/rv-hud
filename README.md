# rv-hud
A custom paid overall hud for RevelationRP

# LICENSE
If purchaser files a refund or an issue arises with payment, a DMCA takedown request will be filed and it will be shared publicly. Sharing of this work is explicitly forbidden. This resource may only be used within one server per purchaser as stated by this license.

```lua
--PMA Voice
function VoiceStatus()
    local status = {
        mode = mode,
        muted = playerMuted
    }
    return status
end

--RP-RADIO
function CurrentFrequency()
    return radioConfig.Frequency.Current
end
```