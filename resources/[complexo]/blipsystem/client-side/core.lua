-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
vSERVER = Tunnel.getInterface("blipsystem")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local Blips = {}
local Players = {}
local Pause = false
-----------------------------------------------------------------------------------------------------------------------------------------
-- COLORS
-----------------------------------------------------------------------------------------------------------------------------------------
local Colors = {
	["Police"] = 63,
	["Paramedic"] = 6,
	["Prisioneiro"] = 33,
	["Corredor"] = 32
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADBLIPS
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		if LocalPlayer["state"]["Active"] then
			if LocalPlayer["state"]["Police"] or LocalPlayer["state"]["Paramedic"] then
				if IsPauseMenuActive() then
					if not Pause then
						Pause = true

						for Number,_ in pairs(Blips) do
							RemoveBlip(Blips[Number])
							Blips[Number] = nil
						end
					end

					local List = vSERVER.playerList()

					for Number,v in pairs(List) do
						if Blips[Number] then
							MoveBlipSmooth(Blips[k], vec3(v.coords.x, v.coords.y, v.coords.z))
						--	SetBlipCoords(Blips[Number],v["Coords"])
						else
							Blips[Number] = AddBlipForCoord(v["Coords"])
							SetBlipSprite(Blips[Number],1)
							SetBlipDisplay(Blips[Number],4)
							SetBlipAsShortRange(Blips[Number],false)
							SetBlipColour(Blips[Number],Colors[v["service"]]or 0)
							SetBlipScale(Blips[Number],0.7)
							BeginTextCommandSetBlipName("STRING")
							AddTextComponentString("! "..v["service"])
							EndTextCommandSetBlipName(Blips[Number])
						end
					end
				else
					if Pause then
						Pause = false

						for Number,_ in pairs(Blips) do
							RemoveBlip(Blips[Number])
							Blips[Number] = nil
						end
					end

					local Active = activePlayers()

					for Number,v in pairs(Players) do
						if Active[Number] then
							if not Blips[Number] then
								local source = GetPlayerFromServerId(Number)
								local Ped = GetPlayerPed(source)

								Blips[Number] = AddBlipForEntity(Ped)
								SetBlipSprite(Blips[Number],1)
								SetBlipDisplay(Blips[Number],4)
								SetBlipShowCone(Blips[Number],true)
								SetBlipAsShortRange(Blips[Number],false)
								SetBlipColour(Blips[Number],Colors[v["service"]] or 0)
								SetBlipScale(Blips[Number],0.7)
								BeginTextCommandSetBlipName("STRING")
								AddTextComponentString("! "..v["service"])
								EndTextCommandSetBlipName(Blips[Number])
							end
						else
							if Blips[Number] then
								RemoveBlip(Blips[Number])
								Blips[Number] = nil
							end
						end
					end
				end
			end
		end

		Wait(1000)
	end
end)
function MoveBlipSmooth(blip, coords)
    local t = 0.0
    local start_coords = GetBlipCoords(blip)
    local delay_time = GetGameTimer()
    while t < 1.0 do
        if GetTimeDifference(GetGameTimer(), delay_time) > 10 then
            delay_time = GetGameTimer()
            t = t + 0.01
            if DoesBlipExist(blip) then
                SetBlipCoords(blip, VectorLerp(start_coords, coords, t))
            else
                t = 1.0
            end
        end
        Wait(1)
    end
end
function VectorLerp(vec1, vec2, t)
    vecOut = vec1 - (t * (vec1 - vec2))
    return vecOut
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- BLIPSYSTEM:FULL
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("blipsystem:Full")
AddEventHandler("blipsystem:Full",function(Table)
	Players = Table
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- BLIPSYSTEM:ENTER
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("blipsystem:Enter")
AddEventHandler("blipsystem:Enter",function(source,Table)
	Players[source] = Table
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- BLIPSYSTEM:EXIT
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("blipsystem:Exit")
AddEventHandler("blipsystem:Exit",function(source)
	if Players[source] then
		Players[source] = nil
	end

	if Blips[source] then
		if DoesBlipExist(Blips[source]) then
			RemoveBlip(Blips[source])
			Blips[source] = nil
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- BLIPSYSTEM:CLEAR
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("blipsystem:Clear")
AddEventHandler("blipsystem:Clear",function()
	for Number,_ in pairs(Blips) do
		RemoveBlip(Blips[Number])
	end

	Pause = false
	Players = {}
	Blips = {}
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- ACTIVEPLAYERS
-----------------------------------------------------------------------------------------------------------------------------------------
function activePlayers()
	local PlayerList = {}

	for _,v in ipairs(GetActivePlayers()) do
		PlayerList[GetPlayerServerId(v)] = true
	end

	return PlayerList
end