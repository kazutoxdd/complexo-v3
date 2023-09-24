local Proxy = module("vrp","lib/Proxy")
local Tunnel = module("vrp","lib/Tunnel")
local vRP = Proxy.getInterface("vRP")
local xSound = exports.xsound
src = {}
API = {}
Tunnel.bindInterface(GetCurrentResourceName(), src)
Tunnel.bindInterface("SavaFy", API)

RegisterCommand(cfg.dommandVehicle, function(source,args,rawCommand)
	local Passport = vRP.Passport(source)
	if Passport then
		if vRP.HasPermission(Passport, cfg.permissao) then
			TriggerClientEvent("SavaFy:ShowNui",source)
		end
	end
end)

RegisterCommand(cfg.comandojbl, function(source,args,rawCommand)
	local Passport = vRP.Passport(source)
	if Passport then
		if vRP.HasPermission(Passport, cfg.permissao) then 
			if vRP.InventoryItemAmount(Passport,"cellphone") then
			TriggerClientEvent("SavaFy:ShowNui2",source)
			else
				TriggerClientEvent('Notify',source,'aviso','Precisa ter uma JBL',5000) 
			end
		else 
			TriggerClientEvent('Notify',source,'aviso','Sem permissão',5000) 
		end
	end
end)

function src.GetMusic()
	return cfg.zones
end

function API.checkPermission()
    local source = source
    return vRP.HasPermission(vRP.Passport(source), cfg.permdj)
end

RegisterNetEvent("SavaFy:ChangeVolume")
AddEventHandler("SavaFy:ChangeVolume", function(vol, nome)
    local somafter = false
    local rangeafter = false
    for i = 1, #cfg.zones do
        local v = cfg.zones[i]
        if nome == v.name then
            local vadi = v.volume + vol
            if vadi <= 1.01 and vadi >= -0.001 then
				if vadi < 0.005 then
					vadi = 0.0
				end
                if v.popo then
                    v.range = (v.volume*cfg.distanceToVolume)
                else
					if vadi >= 0.05 then
						v.range = (vadi*v.range)/v.volume
					end
                end
                v.volume = vadi
                somafter = v.volume
                rangeafter = v.range
            end
        end
    end
    if somafter and rangeafter then
        TriggerClientEvent("SavaFy:ChangeVolume",-1,somafter,rangeafter, nome)
    end
end)

RegisterNetEvent("SavaFy:ChangeLoop")
AddEventHandler("SavaFy:ChangeLoop", function(nome,tip)
	local loopstate
	for i = 1, #cfg.zones do
		local v = cfg.zones[i]
		if nome == v.name then
			v.loop = tip
			loopstate = v.loop
		end
	end
	if loopstate ~= nil then
		TriggerClientEvent("SavaFy:ChangeLoop",-1,loopstate, nome)
	end
end)

RegisterNetEvent("SavaFy:ChangeState")
AddEventHandler("SavaFy:ChangeState", function(type, nome)
	for i = 1, #cfg.zones do
		local v = cfg.zones[i]
		if nome == v.name then
			v.isplaying = type
		end
	end
	TriggerClientEvent("SavaFy:ChangeState",-1,type, nome)
end)

RegisterNetEvent("SavaFy:ChangePosition")
AddEventHandler("SavaFy:ChangePosition", function(quanti, nome)
	for i = 1, #cfg.zones do
		local v = cfg.zones[i]
		if nome == v.name then
			v.deftime = v.deftime+quanti
			if v.deftime < 0 then
				v.deftime = 0
			end
		end
	end
	TriggerClientEvent("SavaFy:ChangePosition",-1,quanti, nome)
end)

RegisterNetEvent("SavaFy:ModifyURL")
AddEventHandler("SavaFy:ModifyURL", function(data)
	local _data = data
	local zena = false
	for i = 1, #cfg.zones do
		local v = cfg.zones[i]
		if _data.name == v.name then
			v.deflink = _data.link
			if _data.popo then
				v.popo = _data.popo
			end
			v.deftime = 0
			v.isplaying = true
			v.loop = _data.loop
			zena = v
		end
	end
	if zena then
		TriggerClientEvent("SavaFy:ModifyURL",-1,zena)
	end
end)

function countTime()
    SetTimeout(1000, countTime)
    for i = 1, #cfg.zones do
		local v = cfg.zones[i]
        if v.isplaying then
            v.deftime = v.deftime + 1
        end
    end
end

SetTimeout(1000, countTime)

RegisterNetEvent('SavaFy:AddVehicle')
AddEventHandler("SavaFy:AddVehicle", function(vehName)
    local Data = {}
    Data.name = vehName.plate
    Data.coords = vehName.coords
    Data.range = vehName.volume * cfg.distanceToVolume
    Data.volume = vehName.volume
    Data.deflink = vehName.link
    Data.isplaying = true
    Data.loop = vehName.loop
    Data.deftime = 0
    Data.popo = vehName.popo
    table.insert(cfg.zones, Data)
    TriggerClientEvent('SavaFy:AddVehicle', math.floor(-1), cfg.zones[#cfg.zones])
end)

RegisterNetEvent('SavaFy:GetDate')
AddEventHandler('SavaFy:GetDate', function()
    TriggerClientEvent('SavaFy:SendData', math.floor(-1), cfg.zones)
end)
