-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
Creative = {}
Tunnel.bindInterface("shops",Creative)
vSERVER = Tunnel.getInterface("shops")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local selectShop = ""
-----------------------------------------------------------------------------------------------------------------------------------------
-- CLOSE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("closeShop",function(data,cb)
	SetNuiFocus(false,false)
	--SendNUIMessage({ action = "hideNUI" })
	EmitNuiMessage("SHOP:HIDE")
	cb("ok")
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- BUY OR SELL
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("SHOP:BUYORSELL",function(data,cb)
	vSERVER._buyOrSell(selectShop,data.products)
	cb("ok")
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SHOP:FORCECLOSE
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.closeShops()
	SetNuiFocus(false,false)
	EmitNuiMessage("SHOP:HIDE")
	selectShop = ""
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- SHOPLIST
-----------------------------------------------------------------------------------------------------------------------------------------
local shopList = {
	{ 1462.53,-215.61,202.57,"departamentStore",true, 0.7 },
	{ 1496.44,-212.33,213.74,"departamentStore",true, 0.7 },
	{ 1523.42,3782.3,34.51,"fishingStore",true },
	{ 24.9,-1346.8,29.49,"departamentStore",true, 0.7 },
	{ 2556.74,381.24,108.61,"departamentStore",true, 0.7 },
	{ 1164.82,-323.65,69.2,"departamentStore",true, 0.7 },
	{ -706.15,-914.53,19.21,"departamentStore",true, 0.7 },
	{ -47.38,-1758.68,29.42,"departamentStore",true, 0.7 },
	{ 373.1,326.81,103.56,"departamentStore",true, 0.7 },
	{ -3242.75,1000.46,12.82,"departamentStore",true, 0.7 },
	{ 1728.47,6415.46,35.03,"departamentStore",true, 0.7 },
	{ 1960.2,3740.68,32.33,"departamentStore",true, 0.7 },
	{ 2677.8,3280.04,55.23,"departamentStore",true, 0.7 },
	{ 1697.31,4923.49,42.06,"departamentStore",true, 0.7 },
	{ -1819.52,793.48,138.08,"departamentStore",true, 0.7 },
	{ 1391.69,3605.97,34.98,"departamentStore",true, 0.7 },
	{ -2966.41,391.55,15.05,"departamentStore",true, 0.7 },
	{ -3039.54,584.79,7.9,"departamentStore",true, 0.7 },
	{ 1134.33,-983.11,46.4,"departamentStore",true, 0.7 },
	{ 1165.28,2710.77,38.15,"departamentStore",true, 0.7 },
	{ -1486.72,-377.55,40.15,"departamentStore",true, 0.7 },
	{ -1221.45,-907.92,12.32,"departamentStore",true, 0.7 },
	{ 161.2,6641.66,31.69,"departamentStore",true, 0.7 },
	{ -160.62,6320.93,31.58,"departamentStore",true, 0.7 },
	{ 548.7,2670.73,42.16,"departamentStore",true, 0.7 },
	{ 1691.86,3758.67,34.69,"ammunationStore",false },
	{ 253.3,-48.32,69.94,"ammunationStore",false },
	{ 844.3,-1034.01,28.19,"ammunationStore",false },
	{ -332.16,6082.58,31.46,"ammunationStore",false },
	{ -664.37,-934.87,21.82,"ammunationStore",false },
	{ -1304.86,-392.38,36.7,"ammunationStore",false },
	{ -1119.57,2697.55,18.55,"ammunationStore",false },
	{ 2569.89,293.91,108.73,"ammunationStore",false },
	{ -3173.14,1086.12,20.84,"ammunationStore",false },
	{ 20.22,-1106.08,29.79,"ammunationStore",false },
	{ 812.18,-2157.77,29.62,"ammunationStore",false },
	{ -3243.33,1001.25,12.82,"departamentFishs",true },
	{ 1729.43,6415.76,35.03,"departamentFishs",true },
	{ 1533.68, 3781.19, 34.51, "baitShop",false },
	{ 1525.72, 3775.73, 34.51,"fishingSell",false },
	{ -325.75,6228.3,31.49,"fishingSell",false },
	{ -695.56,5802.1,17.32,"huntingSell",false },
	{ -678.26,5838.62,17.32,"huntingStore",false },
	{ -172.5,6380.98,31.48,"pharmacyStore",false },
	{ 1690.07,3581.68,35.62,"pharmacyStore",false },
	{ -707.31, 270.48, 83.12,"pharmacyStore",false },
	{ -700.98, 269.27, 83.12,"pharmacyStore",false },
	{ -705.89, 271.5, 83.12,"pharmacyStore",false },
	{ -456.75, 180.1, 83.17,"pharmacyParamedic",false },
	{ -254.64,6326.95,32.82,"pharmacyParamedic",false },
	{ 1842.44,3683.93,34.27,"pharmacyParamedic",false },
	{ 2748.22,3473.94,55.67,"mercadoCentral",false },
	{ 2747.36,3471.78,55.67,"mercadoCentral",false },
	{ -428.57,-1728.35,19.78,"recyclingSell",false },
	{ -1634.25, -795.34, 10.5,"playerTools",false },
	{ -1650.73, -777.74, 10.5,"mechanicTools",false }, -- MechanicSul
	{ -1669.12, -794.98, 10.5,"mechanicTools",false }, -- MechanicSul
	{ -1677.66, -783.27, 10.5,"mechanicTools",false }, -- MechanicSul
	{ -1666.27, -769.66, 10.5,"mechanicTools",false }, -- MechanicSul
	{ 1763.54,3325.64,41.43,"mechanicTools",false }, -- MechanicNorte
	{ -620.99,-228.69,38.05,"minerSellShop",false },
	{ 2832.28, 2806.59, 57.41,"minerBuyShop",false },
	{ 563.32,2751.7,42.87,"animalStore",false },
	{ -1204.66,-1460.36,4.36,"drinkStore",false },
	{ 472.33,-1308.96,29.23,"ilegalTicket",false },
	{ 263.07,2592.12,44.94,"ilegalTicket",false },
	{ 1217.28,-273.67,70.18,"padariaStore",false },
	{ -2077.35,-298.68,13.28,"Bateria",false },
	{ -2076.21,-298.85,13.31,"Bateria",false },
	{ -2089.96,-295.46,13.19,"Bateria",false },
	{ -1231.39,-1440.93,4.36,"mercadoDigital",false },
	{ -1219.08,-1432.06,4.36,"mercadoMask",false },
	{ -1217.52,-1430.98,4.36,"mercadoMask",false },
	{ -1209.3,-1465.46,4.36,"mercadoWeed",false },
	{ -1210.77,-1463.34,4.36,"mercadoWeed",false },
	{ -1600.68,5204.42,4.31, "lumberShop", false },
	{ 1113.12,-645.17,57.54,"christmasShop",false },
	{ 1109.57,210.76,-49.44,"drinkStore",false },
	-- { -583.78, -885.48, 25.72, "pitStopStore", false },
	-- { -580.57, -887.23, 26.0, "pitStopStoreEmployees", true },
	{ 59.56, -124.79, 55.45, "popsicleShop", false },
	{ -368.86, 203.94, 77.48, "addamsDrinkStore", false },
	{ -1750.41, -1082.55, 14.05, "vendinhaStore", false },
	{ -1620.15, -1036.4, 5.95, "ilegalCosmetics", false },
	{ 700.25, -303.07, 59.24, "ilegalHouse", false },
	{ 1162.03, -1566.43, 34.78, "ilegalCosmetics", false },
	{ 850.16, -967.41, 26.52, "ilegalCosmetics", false },
	{ 198.08, -2200.95, 6.98, "ilegalCosmetics", false },
	{ 1266.89, 332.54, 81.99, "ilegalToys", false },
	{ 2675.83, 3499.26, 53.3, "ilegalCosmetics", false },
	{ -778.44, 354.52, 87.85, "ilegalCriminal", false },

	-- NOVOS SHOPS
	{ -912.05, -2030.59, 9.32, "policeBCRF", false },
	{ 357.67, -1597.92, 29.28, "policeBCE", false },
	{ 815.52, -1296.06, 19.85, "policePC", false },
	{ 1841.25, 2573.82, 46.02, "policePENAL", false },
	{ 462.22, -693.9, 27.43, "fair", false },
	{ 178.7, -977.89, 29.57, "sunflowers", false },

	-- ILLEGAL SHOPS
	{ 898.99, -3204.34, -97.19, "weaponFarm", false },
	{ 1081.38, -1980.39, 31.48, "ammoFarm", false },
	{ 709.18, -965.57, 30.4, "clothesFarm", false },
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADTARGET
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	SetNuiFocus(false,false)
	for k,v in pairs(shopList) do
		exports["target"]:AddCircleZone("shops:"..k,vector3(v[1],v[2],v[3]),v[6] or 1.25,{
			name = "shops:"..k
		},{
			shop = Number,
			distance = 1.0,
			options = {
				{
					event = "shops:openSystem",
					label = "Abrir",
					tunnel = "shop"
				}
			}
		})
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SHOPS:OPENSYSTEM
-----------------------------------------------------------------------------------------------------------------------------------------
AddEventHandler("shops:openSystem",function(shopId)
	if not shopId or not shopList[shopId] then return end

	if plyInWorld then
		selectShop = shopList[shopId][4]
		local shopConfig,shopProducts = vSERVER.requestShop(selectShop)
		if not shopConfig then return end
		SetNuiFocus(true,true)

		EmitNuiMessage("SHOP:SHOW", {
			config = shopConfig,
			products = shopProducts
		})

		if shopList[shopId][5] then
			TriggerEvent("sounds:source","shop",0.5)
		end
	end
end)


local ShopsOpenedByEvent = {
	["shops:coffeeMachine"] = "coffeeMachine",
	["shops:donutMachine"] = "donutMachine",
	["shops:sodaMachine"] = "sodaMachine",
	["shops:burgerMachine"] = "burgerMachine",
	["shops:hotdogMachine"] = "hotdogMachine",
	["shops:waterMachine"] = "waterMachine",
	["crafting:fuelShop"] = "fuelShop",
}

do
	for eventName, shopName in pairs(ShopsOpenedByEvent) do
		RegisterNetEvent(eventName, function()
			if plyInWorld then
				selectShop = shopName
				local shopConfig,shopProducts = vSERVER.requestShop(selectShop)
				if not shopConfig then return end
				SetNuiFocus(true,true)

				EmitNuiMessage("SHOP:SHOW", {
					config = shopConfig,
					products = shopProducts
				})
			end
		end)
	end
end