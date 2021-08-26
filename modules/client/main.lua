EVModule = {}
EVModule.Status = {}
EVModule.Status.Opened = false

AddEventHandler('onClientResourceStart', function(resource)
    print(resource)
end)

AddEventHandler('playerSpawned', function()
	Wait(3500)
	SendNUIMessage({action = 'startUp'})
	TriggerEvent('chat:addSuggestion', '/panelHud', 'Configura tu HUD a tu estilo', {})
end)