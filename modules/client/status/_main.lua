EVModule = {}
EVModule.Status = {}
EVModule.Status.Opened = false

---Sets suggestion if not already active on resource start
AddEventHandler('onClientResourceStart', function()
	TriggerEvent('chat:addSuggestion', '/panelHud', 'Configura tu HUD a tu estilo', {})
	if not IsRadarHidden() then
		DisplayRadar(false)
	end
end)
---Sets suggestion if not already active on spawn
AddEventHandler('playerSpawned', function()
	if not IsRadarHidden() then
		DisplayRadar(false)
	end
	TriggerEvent('chat:addSuggestion', '/panelHud', 'Configura tu HUD a tu estilo', {})
end)

---Open the tablet if NUI is not opened
RegisterCommand('panelHud', function()
	if not EVModule.Status.Opened then
		EVModule.Status.Opened = true
		SendNUIMessage({action = 'updateTabletState'})
		SetNuiFocus(true, true)
	end
end)

---Closes the tablet from if NUI is opened
RegisterNUICallback('closeTablet', function(_, cb)
    if EVModule.Status.Opened then
        EVModule.Status.Opened = false
		SetNuiFocus(false, false)
    end
    cb({})
end)