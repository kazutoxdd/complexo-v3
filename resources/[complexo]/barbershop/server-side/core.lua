-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRPC = Tunnel.getInterface("vRP")
vRP = Proxy.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
Creative = {}
Tunnel.bindInterface("barbershop",Creative)
local Debug = {}
-----------------------------------------------------------------------------------------------------------------------------------------
-- VERIFY
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Verify()
	local source = source
	local Passport = vRP.Passport(source)
	if Passport then
		if vRP.GetFine(Passport) > 0 then
			TriggerClientEvent("Notify",source,"amarelo","Você possui multas pendentes.",10000)
			return false
		end

		if exports["hud"]:Wanted(Passport,source) and exports["hud"]:Reposed(Passport) then
			return false
		end
	end

	return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- BARBER
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.CheckWanted()
	local source = source
	local Passport = vRP.Passport(source)
	if Passport and not exports["hud"]:Wanted(Passport,source) then
		return true
	end

	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UPDATESKIN
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Update(Barbers)
	local source = source
	local Passport = vRP.Passport(source)
	if Passport then
		local Tables = json.encode(Barbers)
		if Tables ~= "[]" then
			vRP.Query("playerdata/SetData",{ Passport = Passport, dkey = "Barbershop", dvalue = Tables })
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DEBUG
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("barbershop:Debug")
AddEventHandler("barbershop:Debug",function()
	local source = source
	local Passport = vRP.Passport(source)
	TriggerClientEvent("Notify",source,"verde","Limpeza efetuada.","Sucesso",5000)
	if Passport and not Debug[Passport] or os.time() > Debug[Passport] then
		TriggerClientEvent("barbershop:Apply",source,vRP.UserData(Passport,"Barbershop"))
		TriggerClientEvent("skinshop:Apply",source,vRP.UserData(Passport,"Clothings"))
		TriggerClientEvent("tattooshop:Apply",source,vRP.UserData(Passport,"Tatuagens"))
		TriggerClientEvent("target:Debug",source)
		TriggerEvent("DebugObjects",Passport)

		Debug[Passport] = os.time() + 300
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- DISCONNECT
-----------------------------------------------------------------------------------------------------------------------------------------
AddEventHandler("Disconnect",function(Passport)
	if Debug[Passport] then
		Debug[Passport] = nil
	end
end)