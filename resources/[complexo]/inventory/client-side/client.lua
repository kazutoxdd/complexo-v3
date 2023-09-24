-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp", "lib/Tunnel")
local Proxy = module("vrp", "lib/Proxy")
vRPS = Tunnel.getInterface("vRP")
vRP = Proxy.getInterface("vRP")
local vGARAGE = Tunnel.getInterface("garages")
vSERVER = Tunnel.getInterface(GetCurrentResourceName())

local Creative = {}
Tunnel.bindInterface(GetCurrentResourceName(), Creative)

local CurrentInventory = {}
local CurrentWeapon = ""
local dropList = {}
local UseCooldown = GetGameTimer()
local Usables = 1
local defaultTimeout <const> = 60000
local StoreWeapon = false
local TakeWeapon = false
local Drops = {}
-----------------------------------------------------------------------------------------------------------------------------------------
-- WEAPONS
-----------------------------------------------------------------------------------------------------------------------------------------
exports("Weapons",function()
	return Weapon
end)

local weaponAmmos = {
    ["WEAPON_PISTOL_AMMO"] = {
        "WEAPON_PISTOL_MK2",
        "WEAPON_PISTOL50",
        "WEAPON_SNSPISTOL",
        "WEAPON_SNSPISTOL_MK2",
        "WEAPON_VINTAGEPISTOL"
    },
    ["WEAPON_NAIL_AMMO"] = {
        "WEAPON_NAILGUN"
    },
    ["WEAPON_RPG_AMMO"] = {
        "WEAPON_RPG"
    },
    ["WEAPON_SMG_AMMO"] = {
        "WEAPON_MICROSMG",
        "WEAPON_MINISMG",
        "WEAPON_APPISTOL",
        "WEAPON_GUSENBERG",
        "WEAPON_MACHINEPISTOL"
    },
    ["WEAPON_RIFLE_AMMO"] = {
        "WEAPON_QBZ83",
        "WEAPON_PARAFAL",
        "WEAPON_COLTXM177",
        "WEAPON_COMPACTRIFLE",
        "WEAPON_BULLPUPRIFLE",
        "WEAPON_BULLPUPRIFLE_MK2",
        "WEAPON_ADVANCEDRIFLE",
        "WEAPON_ASSAULTRIFLE",
        "WEAPON_HEAVYRIFLE",
        "WEAPON_ASSAULTSMG",
        "WEAPON_ASSAULTRIFLE_MK2",
        "WEAPON_SPECIALCARBINE",
        "WEAPON_SPECIALCARBINE_MK2"
    },
    ["WEAPON_SHOTGUN_AMMO"] = {
        "WEAPON_PUMPSHOTGUN_MK2",
        "WEAPON_SAWNOFFSHOTGUN"
    },
    ["WEAPON_POLICE_AMMO"] = {
        "WEAPON_FNSCAR",
        "WEAPON_SMG",
        "WEAPON_PISTOL",
        "WEAPON_PUMPSHOTGUN",
        "WEAPON_CARBINERIFLE",
        "WEAPON_TACTICALRIFLE",
        "WEAPON_COMBATPISTOL",
        "WEAPON_CARBINERIFLE_MK2",
        "WEAPON_HEAVYPISTOL",
        "WEAPON_SMG_MK2",
        "WEAPON_FNFAL",

    },
    ["WEAPON_MUSKET_AMMO"] = {
        "WEAPON_MUSKET",
        "WEAPON_SAUER"
    },
    ["WEAPON_PETROLCAN_AMMO"] = {
        "WEAPON_PETROLCAN"
    }
}

local craftList = {
    { vec3(713.95, -961.54, 30.4), "dressMaker" },
    { vec3(82.45, -1553.26, 29.59), "lixeiroShop" },
    { vec3(287.36, 2843.6, 44.7), "lixeiroShop" },
    { vec3(-413.68, 6171.99, 31.48), "lixeiroShop" },
    { vec3(228.35, -1752.9, 25.24), "ilegalWeapons" },
    { vec3(-1001.07, -1025.9, 2.19), "ilegalWeapons" },
    { vec3(-197.84, -1711.81, 32.65), "lockpickShop" },
    { vec3(2115.82, 4770.93, 41.16), "lockpickShop" },
    { vec3(895.06, -962.75, 35.55), "dirtyMoneys" },
    { vec3(1218.28, -275.69, 70.18), "padariaStore" },
    { vec3(473.85, -634.85, 25.65), "drugMixShop" },
    { vec3(-1753.74, -1086.96, 14.05), "jobsCrafting" }
}

-- Variaveis
local fireTimers
local firecracker
local uCarry
local iCarry = false
local sCarry = false
local Types = ""
local scaleForms = {}
local useWeapon = ""
local putWeaponHands = false
local storeWeaponHands = false
local timeReload = GetGameTimer()
local plyIdentity = {}
local plyInventory = {}
local WEAPON_UNARMED <const> = `WEAPON_UNARMED`
local useItemCooldown = 0
local blockButtons = false
local Paralyzing = false
-------------------
--- Refeito ---
-------------------

RegisterNetEvent("inventory:repairAdmin")
AddEventHandler("inventory:repairAdmin", function(Index, Plate)
    if NetworkDoesNetworkIdExist(Index) then
        local Vehicle = NetToEnt(Index)
        if DoesEntityExist(Vehicle) then
            if GetVehicleNumberPlateText(Vehicle) == Plate then
                local Fuel = GetVehicleFuelLevel(Vehicle)

                SetVehicleFixed(Vehicle)
                SetVehicleDeformationFixed(Vehicle)

                SetVehicleFuelLevel(Vehicle, Fuel)
                TriggerServerEvent("CleanVehicle", VehToNet(Vehicle))
            end
        end
    end
end)
CreateThread(function()
    -- FIXME: Remover em produção
    if GetScreenblurFadeCurrentTime() > 0 then TriggerScreenblurFadeOut(0.0) end
end)

function loadAnim(dict)
    RequestAnimDict(dict)
    while not HasAnimDictLoaded(dict) do
        Wait(1)
    end
end

function LoadModel(mHash, timeout)
    if not IsModelValid(mHash) then error("Not valid model requested:", mHash) end
    if not HasModelLoaded(mHash) then
        RequestModel(mHash)
        while not HasModelLoaded(mHash) do Wait(50) end
        SetTimeout(timeout or defaultTimeout, function() SetModelAsNoLongerNeeded(mHash) end)
    end
end

function LoadAnimDict(animDict, timeout)
    if not DoesAnimDictExist(animDict) then error("Not valid animDict requested:", animDict) end
    if not HasAnimDictLoaded(animDict) then
        RequestAnimDict(animDict)
        while not HasAnimDictLoaded(animDict) do Wait(50) end
        SetTimeout(timeout or defaultTimeout, function() RemoveAnimDict(animDict) end)
    end
end

function LoadNamedPtfxAsset(asset, timeout)
    if not HasNamedPtfxAssetLoaded(asset) then
        RequestNamedPtfxAsset(asset)
        while not HasNamedPtfxAssetLoaded(asset) do Wait(50) end
        SetTimeout(timeout or defaultTimeout, function() RemoveNamedPtfxAsset(asset) end)
    end
end

local function errorSound()
    PlaySound(-1, "CHECKPOINT_MISSED", "HUD_MINI_GAME_SOUNDSET", false, false, false)
end


local function genereteProfilePicture()
    local mugshot = RegisterPedheadshotTransparent(PlayerPedId())
    while not IsPedheadshotReady(mugshot) do
        Wait(100)
    end
    SendNUIMessage { action = "generateMugshot", payload = GetPedheadshotTxdString(mugshot) }
    SetTimeout(1500, function()
        UnregisterPedheadshot(mugshot)
    end)
end

local function GetDropList()
    local Items = {}

    local Ped = PlayerPedId()
    local Coords = GetEntityCoords(Ped)
    local _, CoordsZ = GetGroundZFor_3dCoord(Coords["x"], Coords["y"], Coords["z"])

    for Index, v in pairs(Drops) do
        if #(vec3(Coords["x"], Coords["y"], CoordsZ) - vec3(v["Coords"][1], v["Coords"][2], v["Coords"][3])) <= 0.9 then
            local Number = #Items + 1

            Items[Number] = v
            Items[Number]["id"] = Index
        end
    end

    return Items
end

local function SetDropData()
    local Ped = PlayerPedId()
    local groundDropList = GetDropList()
    if table.type(groundDropList) == "empty" then return end
    SendNUIMessage({
        action = "setOtherInventory",
        payload = {
            title = "Chão",
            inventory = groundDropList,
            slots = 90
        }
    })
end

RegisterNUICallback("openCrafting", function(_, cb)
    local ply = PlayerPedId()

    local plyCds = GetEntityCoords(ply)
    for i = 1, #craftList do
        local v = craftList[i]
        local distance = #(plyCds - v[1])
        if distance < 5.0 then
            currentCrafting = v[2]
            return cb(vSERVER.requestCrafting(v[2]))
        end
    end
    cb({})
end)

RegisterNUICallback("functionCraft", function(data, cb)
    if currentCrafting == "" then error("empty crafting station") end
    vSERVER._functionCrafting(data.index, currentCrafting, data.amount)
    cb('ok')
end)

RegisterCommand("moc", function()
    local Ped = PlayerPedId()
    if GetEntityHealth(Ped) < 102 then return end
    if not LocalPlayer["state"]["Commands"] and not LocalPlayer["state"]["Handcuff"] and not IsPauseMenuActive() then
        if IsPlayerFreeAiming(128) then return end
        if GetScreenblurFadeCurrentTime() > 0 then return end
        SetNuiFocus(true, true)
        SetCursorLocation(0.5, 0.5)
        TriggerScreenblurFadeIn(250.0)
        SendNUIMessage({ action = "showMenu" })
        SetDropData()
        local NewInventory, MaxWeight, MaxSlots, PlayerData = vSERVER.requestInventory()
        if not NewInventory then return errorSound() end
        CurrentInventory = NewInventory
        SendNUIMessage({
            action = "setPlayerInventory",
            payload = {
                inventory = NewInventory,
                maxWeight = math.floor(MaxWeight + 1),
                slots = MaxSlots or 18
            }
        })
        SendNUIMessage({ action = "setPlayerData", payload = PlayerData })
        genereteProfilePicture()
    else
        CloseInventory()
    end
end)

RegisterNetEvent("inventory:Slot")
AddEventHandler("inventory:Slot", function(Number, Amount)
    Usables = parseInt(Number)
    if MumbleIsConnected() then
        vSERVER.UseItem(Number, Amount)
    end
end)

RegisterNUICallback("useItem", function(Data, cb)
    if GetGameTimer() >= UseCooldown then
        TriggerEvent("inventory:Slot", Data["slot"], Data["amount"])
        UseCooldown = GetGameTimer() + 1000
    end

    cb("Ok")
end)

RegisterNUICallback("updateSlot", function(Data, cb)
    vRPS.invUpdate(Data["slot"], Data["target"], Data["amount"])
    cb("ok")
end)


function Creative.returnWeapon()
    return CurrentWeapon ~= "" and CurrentWeapon
end

exports("returnWeapon", function()
    return CurrentWeapon ~= "" and CurrentWeapon
end)


function Creative.storeWeaponHands()
    if not StoreWeapon then
        StoreWeapon = true

        local Last = CurrentWeapon
        local Ped = PlayerPedId()
        LocalPlayer["state"]:set("Cancel", true, true)

        if not IsPedInAnyVehicle(Ped) then
            if LoadAnim("weapons@pistol@") then
                TaskPlayAnim(Ped, "weapons@pistol@", "aim_2_holster", 8.0, 8.0, -1, 48, 0, 0, 0, 0)
            end

            Wait(450)

            ClearPedTasks(Ped)
        end

        local Ammos = GetAmmoInPedWeapon(Ped, CurrentWeapon)

        StoreWeapon = false
        TriggerEvent("inventory:CleanWeapons", true)
        LocalPlayer["state"]:set("Cancel", false, true)

        return true, Ammos, Last
    end

    return false
end

function Creative.putAttachs(nameItem, nameWeapon)
    GiveWeaponComponentToPed(PlayerPedId(), nameWeapon, Attachs[nameItem][nameWeapon])
end

function Creative.putWeaponHands(Name, Ammo, Components, Type)
    if LocalPlayer["state"]["SafeZone"] then
        TriggerEvent("Notify", "negado", "Você não pode fazer isso aqui.", "Atenção", 5000)
        return
    end

    if not TakeWeapon then
        if not Ammo then
            Ammo = 0
        end

        if Ammo > 0 then
            Actived = true
        end

        TakeWeapon = true
        LocalPlayer["state"]:set("Cancel", true, true)

        local Ped = PlayerPedId()
        if not IsPedInAnyVehicle(Ped) then
            if LoadAnim("rcmjosh4") then
                TaskPlayAnim(Ped, "rcmjosh4", "josh_leadout_cop2", 8.0, 8.0, -1, 48, 0, 0, 0, 0)
            end

            Wait(200)

            CurrentWeapon = Name
            TriggerEvent("inventory:RemoveWeapon", Name)
            GiveWeaponToPed(Ped, Name, Ammo, false, true)

            Wait(300)

            ClearPedTasks(Ped)
        else
            CurrentWeapon = Name
            TriggerEvent("inventory:RemoveWeapon", Name)
            GiveWeaponToPed(Ped, Name, Ammo, false, true)
        end

        if Components then
            for nameItem, _ in pairs(Components) do
                Creative.putAttachs(nameItem, Name)
            end
        end

        if Type then
            Types = Type
        end

        TakeWeapon = false
        LocalPlayer["state"]:set("Cancel", false, true)

        if itemAmmo(Name) then
            TriggerEvent("hud:Weapon", true, Name)
        end

        if not MumbleIsConnected() or vSERVER.dropWeapons(Name) or LocalPlayer["state"]["Safezone"] then
            TriggerEvent("inventory:CleanWeapons", true)
        end

        return true
    end

    return false
end

function Creative.rechargeCheck(ammoType)
    local weaponAmmo = 0
    local weaponHash = nil
    local Ped = PlayerPedId()
    local weaponStatus = false

    if weaponAmmos[ammoType] then
        weaponAmmo = GetAmmoInPedWeapon(Ped, Weapon)
        for _, v in pairs(weaponAmmos[ammoType]) do
            if CurrentWeapon == v then
                weaponHash = CurrentWeapon
                weaponStatus = true
                break
            end
        end
    end

    return weaponStatus, weaponHash, weaponAmmo
end

RegisterNetEvent("drops:Adicionar")
AddEventHandler("drops:Adicionar", function(Number, Table)
    Drops[Number] = Table
end)

RegisterNetEvent("drops:Remover")
AddEventHandler("drops:Remover", function(Number)
    if Drops[Number] then
        Drops[Number] = nil
    end
end)



CreateThread(function()
    while true do
        local TimeDistance = 999

        local Ped = PlayerPedId()
        local Coords = GetEntityCoords(Ped)

        for _, v in pairs(Drops) do
            if #(Coords - vec3(v["Coords"][1], v["Coords"][2], v["Coords"][3])) <= 50 then
                TimeDistance = 1
                DrawMarker(23, v["coords"][1], v["coords"][2], v["coords"][3] + 0.05, 0.0, 0.0, 0.0, 0.0, 180.0, 0.0, 0.15, 0.15, 0.0, 255, 255, 255, 50, 0, 0, 0, 0)
                DrawMarker(21, v["coords"][1], v["coords"][2], v["coords"][3] + 0.25, 0.0, 0.0, 0.0, 0.0, 180.0, 0.0, 0.20, 0.20, 0.20, 42, 137, 255, 125, 0, 0, 0, 1)
            end
        end

        Wait(TimeDistance)
    end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- INVENTORY:CLEANWEAPONS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("inventory:CleanWeapons")
AddEventHandler("inventory:CleanWeapons", function(Create)
    if Weapon ~= "" then
        RemoveAllPedWeapons(PlayerPedId(), true)
    end

    TriggerEvent("hud:Weapon", false)
    Actived = false
    CurrentWeapon = ""
    Types = ""
end)



RegisterNetEvent("trunkchest:Open")
AddEventHandler("trunkchest:Open", function()
    SetNuiFocus(true, true)
    local NewInventory, MaxWeight, MaxSlots = vSERVER.requestInventory()
    if not NewInventory then return errorSound() end
    CurrentInventory = NewInventory
    local myInfos, vehInfos, InventoryWeight, PlayerWeight, ChestWeight, VehicleWeight = vSERVER.openChest()
    CurrentInventory = myInfos
    openTrunkChest(CurrentInventory, MaxWeight, vehInfos, ChestWeight)
    vRP.playAnim(false, { "amb@prop_human_bum_bin@base", "base" }, true)
end)


function openTrunkChest(myInventory, myBackpack, vehInventory, vehWeight)
    -- if not IsNuiFocused() then
    trunking = true
    SetNuiFocus(true, true)
    SetCursorLocation(0.5, 0.5)
    TriggerScreenblurFadeIn(250.0)
    SendNUIMessage({ action = "showMenu" })
    -- end

    SendNUIMessage({
        action = "setPlayerInventory",
        payload = {
            inventory = myInventory,
            maxWeight = myBackpack
        }
    })
    SendNUIMessage({
        action = "setOtherInventory",
        payload = {
            title = "Porta Malas",
            inventory = vehInventory,
            maxWeight = vehWeight,
            slots = 90
        }
    })
end

RegisterNetEvent("inventory:Cancel")
AddEventHandler("inventory:Cancel", function()
    vSERVER.Cancel()
end)

RegisterNuiCallback("tradeItem", function(data, cb)
    if chestOpen and chestId then
        if data.from == "Mochila" then
            vSERVER.storeChestItem(data.item.labelName, data.slot, data.amount, data.target, chestOpen, chestId)
        else
            vSERVER.takeChestItem(data.item.labelName, data.slot, data.amount, data.target, chestOpen, chestId)
        end
    elseif inspecting then
        if data.from == "Mochila" then
            vSERVER.storeInspectItem(data.item.Item, data.slot, data.amount, data.target)
        else
            vSERVER.takeInspectItem(data.item.Item, data.slot, data.amount, data.target)
        end
    elseif trunking then
        if data.from == "Mochila" then
            vSERVER.storeTrunkChestItem(data.item.Item, data.slot, data.amount, data.target)
        else
            vSERVER.takeTrunkChestItem(data.item.Item, data.slot, data.amount, data.target)
        end
    elseif housing then
        if data.from == "Mochila" then
            vSERVER.storeHouseItem(data.item.Item, data.slot, data.amount, data.target, houseName, houseVault)
        else
            vSERVER.takeHouseItem(data.item.Item, data.slot, data.amount, data.target, houseName, houseVault)
        end
    elseif data.to == "Chão" then
        print('pegou do chao')
        data.item = data.item.Item
        dropItem(data)
    end
    cb("ok")
end)

RegisterNetEvent("inventory:clearWeapons", function()
    local ply = PlayerPedId()
    if CurrentWeapon ~= "" then RemoveAllPedWeapons(ply, true) end
    CurrentWeapon = ""
    Types = ""
    TriggerEvent("utils:PedWeapons", IsPedArmed(ply, 7), GetSelectedPedWeapon(ply))
end)

RegisterNetEvent("inventory:verifyWeapon", function(splitName)
    splitName = splitString(splitName, "-")
    if CurrentWeapon == splitName[1] then
        print('caiu aq')
        local ply = PlayerPedId()
        local weaponAmmo = GetAmmoInPedWeapon(ply, CurrentWeapon)
        if not vSERVER.VerificarArma(splitName[1], weaponAmmo) then
            RemoveAllPedWeapons(ply, true)
            CurrentWeapon = ""
            Types = ""
        end
    else
        if CurrentWeapon == "" then
            vSERVER.VerificarArma(splitName[1])
        end
    end
    TriggerEvent("utils:PedWeapons", IsPedArmed(ply, 7), GetSelectedPedWeapon(ply))
end)

RegisterNetEvent("inventory:preventWeapon", function(storeWeapons)
    if CurrentWeapon ~= WEAPON_UNARMED then
        local ply = PlayerPedId()
        local weaponAmmo = GetAmmoInPedWeapon(ply, CurrentWeapon)
        vSERVER.PreventWeapons(CurrentWeapon, weaponAmmo)
        if storeWeapons then RemoveAllPedWeapons(ply, true) end
        CurrentWeapon = ""
        Types = ""
        TriggerEvent("utils:PedWeapons", IsPedArmed(ply, 7), GetSelectedPedWeapon(ply))
    end
end)

function CloseInventory()
    while IsScreenblurFadeRunning() do Wait(25) end
    SetNuiFocus(false, false)
    SetCursorLocation(0.5, 0.5)
    SendNUIMessage({ action = "hideMenu" })
    if chestOpen or chestId then
        chestId = nil
        chestOpen = false
    end
    if inspecting then
        inspecting = false
        vSERVER.resetInspect()
    end
    if trunking then
        trunking = false
        vSERVER.trunkChestClose()
        vRP.removeObjects()
    end
    if housing then
        housing = false
        houseName = nil
        houseVault = nil
    end
    TriggerScreenblurFadeOut(500.0)
end

local function dropItem(data)
    if IsPedInAnyVehicle(ply) then return end
    local coords = GetEntityCoords(ply)
    local gridZone = getGridzone(coords["x"], coords["y"])
    local _, cdz = GetGroundZFor_3dCoord(coords["x"], coords["y"], coords["z"])
    vSERVER.Drops(data["item"], data["slot"], data["amount"], coords["x"], coords["y"], cdz, gridZone)
end


RegisterNUICallback("pickupItem", function(data, cb)
    local coords = GetEntityCoords(ply)
    local gridZone = getGridzone(coords["x"], coords["y"])
    vSERVER.Pickup(data["id"], data["amount"], data["target"], gridZone)
    cb("ok")
end)

function gridChunk(x)
    return math.floor((x + 8192) / 128)
end

function toChannel(v)
    return (v["x"] << 8) | v["y"]
end

-------------------

local function BlockButtons()
    while blockButtons do
        DisableControlAction(1, 75, true)
        DisableControlAction(1, 47, true)
        DisableControlAction(1, 257, true)
        DisablePlayerFiring(128, true)
        Wait(0)
    end
end

local function blockInvents()
    if exports["player"]:handCuff() then return false end
    return blockButtons
end

exports("blockInvents", blockInvents)

local function PreventWeapon()
    while plyArmed do
        local weaponAmmo = GetAmmoInPedWeapon(ply, useWeapon)
        if GetGameTimer() >= timeReload and IsPedReloading(ply) then
            vSERVER._preventWeapon(useWeapon, weaponAmmo)
            timeReload = GetGameTimer() + 1000
        end
        if (useWeapon == "WEAPON_PETROLCAN" and weaponAmmo <= 135 and IsPedShooting(ply)) or (useWeapon == "WEAPON_FIREEXTINGUISHER" and weaponAmmo <= 135 and IsPedShooting(ply)) or IsPedSwimming(ply) then
            if Types ~= "" then
                vSERVER._removeThrowing(Types)
            else
                vSERVER._preventWeapon(useWeapon, weaponAmmo)
            end
            RemoveAllPedWeapons(ply, true)
            useWeapon = ""
            Types = ""
            TriggerEvent("utils:PedWeapons", IsPedArmed(ply, 7), GetSelectedPedWeapon(ply))
        end
        Wait(100)
    end
end


local function ApplyBarbershopToPed(ped, custom)
    local weightFace = custom[2] / 100 + 0.0
    local weightSkin = custom[4] / 100 + 0.0
    SetPedHeadBlendData(ped, custom[41], custom[1], 0, custom[41], custom[1], 0, weightFace, weightSkin, 0.0, false)
    SetPedEyeColor(ped, custom[3])
    if custom[5] == 0 then
        SetPedHeadOverlay(ped, 0, custom[5], 0.0)
    else
        SetPedHeadOverlay(ped, 0, custom[5], 1.0)
    end
    SetPedHeadOverlay(ped, 6, custom[6], 1.0)
    if custom[7] == 0 then
        SetPedHeadOverlay(ped, 9, custom[7], 0.0)
    else
        SetPedHeadOverlay(ped, 9, custom[7], 1.0)
    end
    SetPedHeadOverlay(ped, 3, custom[8], 1.0)
    SetPedComponentVariation(ped, 2, custom[9], 0, 1)
    SetPedHairColor(ped, custom[10], custom[11])
    SetPedHeadOverlay(ped, 4, custom[12], custom[13] * 0.1)
    SetPedHeadOverlayColor(ped, 4, 1, custom[14], custom[14])
    SetPedHeadOverlay(ped, 8, custom[15], custom[16] * 0.1)
    SetPedHeadOverlayColor(ped, 8, 1, custom[17], custom[17])
    SetPedHeadOverlay(ped, 2, custom[18], custom[19] * 0.1)
    SetPedHeadOverlayColor(ped, 2, 1, custom[20], custom[20])
    SetPedHeadOverlay(ped, 1, custom[21], custom[22] * 0.1)
    SetPedHeadOverlayColor(ped, 1, 1, custom[23], custom[23])
    SetPedHeadOverlay(ped, 5, custom[24], custom[25] * 0.1)
    SetPedHeadOverlayColor(ped, 5, 1, custom[26], custom[26])
    SetPedFaceFeature(ped, 0, custom[27] * 0.1)
    SetPedFaceFeature(ped, 1, custom[28] * 0.1)
    SetPedFaceFeature(ped, 4, custom[29] * 0.1)
    SetPedFaceFeature(ped, 6, custom[30] * 0.1)
    SetPedFaceFeature(ped, 8, custom[31] * 0.1)
    SetPedFaceFeature(ped, 9, custom[32] * 0.1)
    SetPedFaceFeature(ped, 10, custom[33] * 0.1)
    SetPedFaceFeature(ped, 12, custom[34] * 0.1)
    SetPedFaceFeature(ped, 13, custom[35] * 0.1)
    SetPedFaceFeature(ped, 14, custom[36] * 0.1)
    SetPedFaceFeature(ped, 15, custom[37] * 0.1)
    SetPedFaceFeature(ped, 16, custom[38] * 0.1)
    SetPedFaceFeature(ped, 17, custom[39] * 0.1)
    SetPedFaceFeature(ped, 19, custom[40] * 0.1)
end
local function ApplyClothingToPed(ped, data, category)
    local item = data.item
    local texture = data.texture
    if category == "pants" then
        SetPedComponentVariation(ped, 4, item, 0, 1)
        SetPedComponentVariation(ped, 4, GetPedDrawableVariation(ped, 4), texture, 1)
    elseif category == "arms" then
        SetPedComponentVariation(ped, 3, item, 0, 1)
        SetPedComponentVariation(ped, 3, GetPedDrawableVariation(ped, 3), texture, 1)
    elseif category == "tshirt" then
        SetPedComponentVariation(ped, 8, item, 0, 1)
        SetPedComponentVariation(ped, 8, GetPedDrawableVariation(ped, 8), texture, 1)
    elseif category == "decals" then
        SetPedComponentVariation(ped, 10, item, 0, 1)
        SetPedComponentVariation(ped, 10, item, texture, 1)
    elseif category == "accessory" then
        SetPedComponentVariation(ped, 7, item, 0, 1)
        SetPedComponentVariation(ped, 7, item, texture, 1)
    elseif category == "torso" then
        SetPedComponentVariation(ped, 11, item, 0, 1)
        SetPedComponentVariation(ped, 11, GetPedDrawableVariation(ped, 11), texture, 1)
    elseif category == "shoes" then
        SetPedComponentVariation(ped, 6, item, 0, 1)
        SetPedComponentVariation(ped, 6, GetPedDrawableVariation(ped, 6), texture, 1)
    elseif category == "mask" then
        SetPedComponentVariation(ped, 1, item, 0, 1)
        SetPedComponentVariation(ped, 1, GetPedDrawableVariation(ped, 1), texture, 1)
    elseif category == "hat" then
        if item ~= -1 then
            SetPedPropIndex(ped, 0, item, texture, 1)
        else
            ClearPedProp(ped, 0)
        end
        SetPedPropIndex(ped, 0, item, texture, 1)
    elseif category == "glass" then
        if item ~= -1 then
            SetPedPropIndex(ped, 1, item, texture, 1)
        else
            ClearPedProp(ped, 1)
        end
        SetPedPropIndex(ped, 1, item, texture, 1)
    elseif category == "ear" then
        if item ~= -1 then
            SetPedPropIndex(ped, 2, item, texture, 1)
        else
            ClearPedProp(ped, 2)
        end
        SetPedPropIndex(ped, 2, item, texture, 1)
    elseif category == "watch" then
        if item ~= -1 then
            SetPedPropIndex(ped, 6, item, texture, 1)
        else
            ClearPedProp(ped, 6)
        end
        SetPedPropIndex(ped, 6, item, texture, 1)
    elseif category == "bracelet" then
        if item ~= -1 then
            SetPedPropIndex(ped, 7, item, texture, 1)
        else
            ClearPedProp(ped, 7)
        end
        SetPedPropIndex(ped, 7, item, texture, 1)
    end
end
local function ApplyTattoosToPed(ped, tattoos)
    for index, tatto in pairs(tattoos) do
        SetPedDecoration(ped, joaat(tatto[1]), joaat(index))
    end
end
local function CreateLocalPed(hash)
    LoadModel(hash)
    local ped = CreatePed(4, hash, GetEntityCoords(ply), false, false)
    while not DoesEntityExist(ped) do Wait(25) end
    return ped
end
local function DeleteEntityWhileUsingAlpha(entity)
    local alpha = GetEntityAlpha(entity)
    while alpha > 0 do
        alpha -= 1.0
        SetEntityAlpha(entity, alpha, false)
        Wait(0)
    end
    DeleteEntity(entity)
end
local function chaikin(dest, points, iterations)
    local result = {}
    for i = 1, #points - 1 do
        result[#result + 1] = points[i]
        result[#result + 1] = vec3((points[i].x + points[i + 1].x) / 2, (points[i].y + points[i + 1].y) / 2,
            (points[i].z + points[i + 1].z) / 2)
    end
    result[#result + 1] = points[#points]
    if iterations > 1 then
        chaikin(dest, result, iterations - 1)
    else
        dest.points = result
    end
end
local function draw_curve(points, particleDict, particleSet, scale, insertionTable)
    insertionTable = {}
    for i = 1, #points - 1 do
        local random_offset_x = math.random(-1, 1)
        local random_offset_y = math.random(-1, 2)
        local random_offset_z = math.random(-1, 2)
        local distance = math.sqrt(random_offset_x * random_offset_x + random_offset_y * random_offset_y)
        random_offset_x /= distance * 2
        random_offset_y /= distance * 2
        UseParticleFxAssetNextCall(particleDict)
        local fx = StartParticleFxLoopedAtCoord(particleSet, points[i].x + random_offset_x, points[i].y + random_offset_y,
            points[i].z + random_offset_z, 0.0, 0.0, 0.0, scale, false, false, false, false)
        table.insert(insertionTable, fx)
    end
    Wait(500)
    for i = 1, #insertionTable do StopParticleFxLooped(insertionTable[i], 0) end
end
local function quickFadeIn()
    DoScreenFadeOut(1000)
    Wait(1000)
    DoScreenFadeIn(1000)
end
local function LoadScaleform(scaleForm, text)
    local scaleform = RequestScaleformMovie(scaleForm)
    while not HasScaleformMovieLoaded(scaleform) do Wait(0) end
    BeginScaleformMovieMethod(scaleform, "SET_PLAYER_NAME")
    PushScaleformMovieMethodParameterString(text)
    EndScaleformMovieMethod()
    return scaleform
end


exports("useItem", useItem)
RegisterNUICallback("invError", function(_, cb)
    errorSound()
    cb("ok")
end)
RegisterNUICallback("invClose", function(_, cb)
    CloseInventory()
    cb("ok")
end)

RegisterNUICallback("sendItem", function(data, cb)
    vSERVER.SendItem(data["slot"], data["amount"])
    cb("ok")
end)

RegisterNUICallback("dropItem", function(Data, Callback)
    if MumbleIsConnected() and not TakeWeapon and not StoreWeapon then
        local Ped = PlayerPedId()
        local Coords = GetEntityCoords(Ped)
        local _, CoordsZ = GetGroundZFor_3dCoord(Coords["x"], Coords["y"], Coords["z"])

        vSERVER.Drops(Data["item"], Data["slot"], Data["amount"], Coords["x"], Coords["y"], CoordsZ)
    end

    Callback("Ok")
end)

function getGridzone(x, y)
    local gridChunk = vector2(gridChunk(x), gridChunk(y))
    return toChannel(gridChunk)
end

RegisterKeyMapping("moc", "Abrir a mochila", "keyboard", "oem_3")

RegisterNetEvent("inventory:CleanWeapons", function()
    RemoveAllPedWeapons(ply, true)
    useWeapon = ""
    Types = ""
    TriggerEvent("utils:PedWeapons", IsPedArmed(ply, 7), GetSelectedPedWeapon(ply))
end)
RegisterNetEvent("inventory:Close", CloseInventory)

RegisterNetEvent("inventory:Update", function(data)
    local NewInventory, MaxWeight, MaxSlots = vSERVER.requestInventory()
    if not NewInventory then return errorSound() end
    CurrentInventory = NewInventory
    SendNUIMessage({ action = "setPlayerInventory", payload = { inventory = CurrentInventory } })
end)

--TODO: Substituir uso do evento `inventory:Update` para esta função
function Creative.updateInventory(data)
    plyInventory = data
    SendNUIMessage({ action = "setPlayerInventory", payload = { inventory = data } })
end

RegisterNetEvent("inventory:blockButtons", function(status)
    blockButtons = status
    if not blockButtons then return end
    CreateThread(BlockButtons)
end)


RegisterNetEvent("inventory:parachuteColors", function()
    GiveWeaponToPed(ply, "GADGET_PARACHUTE", 1, false, true)
    SetPedParachuteTintIndex(ply, math.random(7))
end)
RegisterNetEvent("inventory:Firecracker", function()
    local mHash = `ind_prop_firework_03`
    LoadNamedPtfxAsset("scr_indep_fireworks")
    LoadModel(mHash)
    local explosives = 25
    local fireCrackerDuration = 300000
    fireTimers = GetGameTimer() + fireCrackerDuration
    local coords = GetOffsetFromEntityInWorldCoords(ply, 0.0, 0.6, 0.0)
    firecracker = CreateObject(mHash, coords["x"], coords["y"], coords["z"], true, true, false)
    local netObjs = ObjToNet(firecracker)
    SetNetworkIdCanMigrate(netObjs, true)
    SetEntityAsMissionEntity(firecracker, true, false)
    PlaceObjectOnGroundProperly(firecracker)
    FreezeEntityPosition(firecracker, true)
    Wait(10000)
    repeat
        UseParticleFxAssetNextCall("scr_indep_fireworks")
        StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_trailburst", coords["x"], coords["y"], coords["z"],
            0.0, 0.0, 0.0, 2.5, false, false, false, false)
        explosives = explosives - 1
        Wait(2000)
    until explosives <= 0
    _TRE("tryDeleteObject", netObjs)
    SetTimeout(fireCrackerDuration, function()
        fireTimers = nil
    end)
end)
RegisterNetEvent("inventory:stealTrunk", function(entity)
    if useWeapon ~= "WEAPON_CROWBAR" then
        return TriggerEvent("Notify", "amarelo", "<b>Pé de Cabra</b> não encontrado.",
            5000)
    end
    if GetVehicleDoorsLockedForPlayer(entity[3], 128) == 1 then return end
    local trunk = GetEntityBoneIndexByName(entity[3], "boot")
    if trunk == -1 then return end
    if GetVehicleDoorAngleRatio(entity[3], 5) > 0.89 then return end
    local coords = GetOffsetFromEntityInWorldCoords(ply, 0.0, 0.5, 0.0)
    local coordsEnt = GetWorldPositionOfEntityBone(entity[3], trunk)
    local distance = #(coords - coordsEnt)
    if distance > 1.9 then return end
    vSERVER._stealTrunk(entity)
end)

RegisterNetEvent("inventory:applyCondom", function()
    local angle = 1.0
    local radius = 0.4
    local lastGameTimer = GetGameTimer()
    local endTimer = lastGameTimer + 60000
    if table.type(scaleForms) == "empty" then
        table.insert(scaleForms,
            {
                scaleform = LoadScaleform("PLAYER_NAME_11", "~y~PROTEGIDO"),
                angleOffset = 0.0,
                rot = vec2(0.0, 0.0),
                posOffset = vec3(0, 0, 0)
            })
        table.insert(scaleForms,
            {
                scaleform = LoadScaleform("PLAYER_NAME_12", "~y~PROTEGIDO "),
                angleOffset = 210.5,
                rot = vec2(0.0, 0.0),
                posOffset = vec3(0, 0, 0)
            })
        table.insert(scaleForms,
            {
                scaleform = LoadScaleform("PLAYER_NAME_13", "~b~PROTEGIDO"),
                angleOffset = 105.25,
                rot = vec2(0.0, 0.0),
                posOffset = vec3(0, 0, 0)
            })
        table.insert(scaleForms,
            {
                scaleform = LoadScaleform("PLAYER_NAME_14", "~b~PROTEGIDO "),
                angleOffset = -105.25,
                rot = vec2(0.0, 0.0),
                posOffset = vec3(0, 0, 0)
            })
    end
    while GetGameTimer() < endTimer do
        local plyCoords = GetEntityCoords(ply)
        for i = 1, 4 do
            local v = scaleForms[i]
            local coords = vec3(plyCoords.x + radius * math.cos(-angle + v.angleOffset),
                plyCoords.y + radius * math.sin(-angle + v.angleOffset), plyCoords.z)
            local heading = GetHeadingFromVector_2d(plyCoords.x - coords.x, plyCoords.y - coords.y)
            DrawScaleformMovie_3dSolid(v.scaleform, coords.x + v.posOffset.x, coords.y + v.posOffset.y,
                coords.z + v.posOffset.z, v.rot.x, v.rot.y, -heading, 1.0, 2.0, 1.0, 2.0, 1.0, 1.0, 1)
        end
        if (GetGameTimer() - lastGameTimer) > 1 then
            angle = angle + 0.02
            lastGameTimer = GetGameTimer()
        end
        Wait(1)
    end
    for i = 1, 4 do
        SetScaleformMovieAsNoLongerNeeded(scaleForms[i].scaleform)
    end
    scaleForms = {}
end)


AddEventHandler("utils:PedWeapons", function(armed)
    if not armed then return end
    CreateThread(PreventWeapon)
end)

AddEventHandler("utils:GetVehiclePedIsIn", function(veh, isDriver)
    if veh == 0 then return DrawDropList() end
    if not isDriver then return end
    if GetEntityModel(veh) ~= -1178021069 then return end
    while plyIsDriver do
        if not IsEntityPlayingAnim(ply, "missfinale_c2leadinoutfin_c_int", "_leadin_loop2_lester", 3) then
            vRP.playAnim(true, { "missfinale_c2leadinoutfin_c_int", "_leadin_loop2_lester" }, true)
        end
        Wait(500)
    end
    vRP.removeObjects("one")
end)
function Creative.dropFunctions()
    local coords = GetEntityCoords(ply)
    local gridZone = getGridzone(coords["x"], coords["y"])
    local _, cdz = GetGroundZFor_3dCoord(coords["x"], coords["y"], coords["z"])
    return coords["x"], coords["y"], cdz, gridZone
end

function Creative.checkFountain()
    local coords = GetEntityCoords(ply)
    if DoesObjectOfTypeExistAtCoords(coords, 0.7, `prop_watercooler`, true) or DoesObjectOfTypeExistAtCoords(coords, 0.7, `prop_watercooler_dark`, true) then
        return true, "fountain"
    end
    if IsEntityInWater(ply) then return true, "floor" end
end

function Creative.fishingAnim() return IsEntityPlayingAnim(ply, "amb@world_human_stand_fishing@idle_a", "idle_c", 3) end

function Creative.checkWeapon()
    return (GetPedParachuteState(ply) == -1 or GetPedParachuteState(ply) == 0) and not IsPedInParachuteFreeFall(ply) and
        not IsPedSwimming(ply) and GetSelectedPedWeapon(ply) ~= WEAPON_UNARMED
end

function Creative.checkAttachs(nameItem, nameWeapon) return weaponAttachs[nameItem][nameWeapon] end

function Creative.putAttachs(nameItem, nameWeapon)
    GiveWeaponComponentToPed(ply, nameWeapon,
        weaponAttachs[nameItem][nameWeapon])
end

function Creative.rechargeWeapon(weaponHash, ammoAmount)
    local Ped = PlayerPedId()
    AddAmmoToPed(Ped, weaponHash, ammoAmount)
end

function Creative.adrenalineDistance()
    local coords = GetEntityCoords(ply)
    for i = 1, #adrenalineCds do
        if #(coords - adrenalineCds[i]) < 5 then return true end
    end
end

function Creative.checkCracker() return fireTimers end

function Creative.checkWater() return IsPedSwimming(ply) end

function Creative.checkRagdoll() return IsPedRagdoll(ply) end

function Creative.wheelChair(vehPlate)
    if plyVeh == 0 then return end
    local heading = GetEntityHeading(ply)
    local coords = GetOffsetFromEntityInWorldCoords(ply, 0.0, 0.75, 0.0)
    local myVehicle = vGARAGE.serverVehicle("wheelchair", coords["x"], coords["y"], coords["z"], heading, vehPlate)
    if not NetworkDoesNetworkIdExist(myVehicle) then return end
    local vehicleNet = NetToEnt(myVehicle)
    if not NetworkDoesNetworkIdExist(vehicleNet) then return end
    SetVehicleOnGroundProperly(vehicleNet)
end

function Creative.tyreHealth(vehNet, Tyre)
    if not NetworkDoesNetworkIdExist(vehNet) then return end
    local Vehicle = NetToEnt(vehNet)
    if not DoesEntityExist(Vehicle) then return end
    return GetTyreHealth(Vehicle, Tyre)
end

function Creative.tyreStatus()
    if plyVeh > 0 then return end
    local Vehicle = vRP.nearVehicle(7)
    local coords = GetEntityCoords(ply)
    for k, Tyre in pairs(tyreList) do
        local Selected = GetEntityBoneIndexByName(Vehicle, k)
        if Selected ~= -1 then
            local coordsWheel = GetWorldPositionOfEntityBone(Vehicle, Selected)
            local distance = #(coords - coordsWheel)
            if distance <= 1.2 then
                return true, Tyre, VehToNet(Vehicle), GetVehicleNumberPlateText(Vehicle)
            end
        end
    end
end

function Creative.checkNearDoor(vehNet)
    if not NetworkDoesEntityExistWithNetworkId(vehNet) then return end
    local veh = NetToVeh(vehNet)
    local doorBone = GetEntityBoneIndexByName(veh, "door_dside_f")
    if doorBone == -1 then return true end
    local doorCds = GetWorldPositionOfEntityBone(veh, doorBone)
    return #(GetEntityCoords(ply) - doorCds) <= 1.5
end

--Inspect

function Creative.openInspect(myInventory, myBackpack, targetInventory, targetBackpack, targetId)
    if not IsNuiFocused() then
        inspecting = true
        SetNuiFocus(true, true)
        SetCursorLocation(0.5, 0.5)
        TriggerScreenblurFadeIn(250.0)
        SendNUIMessage({ action = "showMenu" })
    end
    SendNUIMessage({
        action = "setPlayerInventory",
        payload = {
            inventory = myInventory,
            maxWeight = myBackpack
        }
    })
    SendNUIMessage({
        action = "setOtherInventory",
        payload = {
            title = "Mochila  #" .. targetId,
            inventory = targetInventory,
            maxWeight = targetBackpack,
            slots = 23
        }
    })
end

--HomesChest
function Creative.openHomesChest(homeName, vaultMode, myInventory, myBackpack, homeInventory, homeWeight)
    houseName = homeName
    houseVault = vaultMode
    if not IsNuiFocused() then
        housing = true
        SetNuiFocus(true, true)
        SetCursorLocation(0.5, 0.5)
        TriggerScreenblurFadeIn(250.0)
        SendNUIMessage({ action = "showMenu" })
    end

    SendNUIMessage({
        action = "setPlayerInventory",
        payload = {
            inventory = myInventory,
            maxWeight = myBackpack
        }
    })
    SendNUIMessage({
        action = "setOtherInventory",
        payload = {
            title = "Baú",
            inventory = homeInventory,
            maxWeight = homeWeight,
            slots = 90
        }
    })
end

local function showShortcuts()
    SendNUIMessage({ action = "showHotbar", payload = true })
end
local function hideShortcuts()
    SendNUIMessage({ action = "showHotbar", payload = false })
end
RegisterCommand("+shortcuts", showShortcuts)
RegisterCommand("-shortcuts", hideShortcuts)
RegisterKeyMapping("+shortcuts", "Visualizar atalhos.", "keyboard", "TAB")


RegisterNetEvent('putcondom')
AddEventHandler('putcondom', function()
    local angle = 1.0
    local radius = 0.4
    local lastGameTimer = GetGameTimer()
    local ply = PlayerPedId()
    local endTimer = lastGameTimer + 60000
    if table.type(scaleForms) == "empty" then
        table.insert(scaleForms,
            {
                scaleform = LoadScaleform("PLAYER_NAME_11", "~y~PROTEGIDO"),
                angleOffset = 0.0,
                rot = vec2(0.0, 0.0),
                posOffset = vec3(0, 0, 0)
            })
        table.insert(scaleForms,
            {
                scaleform = LoadScaleform("PLAYER_NAME_12", "~y~PROTEGIDO "),
                angleOffset = 210.5,
                rot = vec2(0.0, 0.0),
                posOffset = vec3(0, 0, 0)
            })
        table.insert(scaleForms,
            {
                scaleform = LoadScaleform("PLAYER_NAME_13", "~b~PROTEGIDO"),
                angleOffset = 105.25,
                rot = vec2(0.0, 0.0),
                posOffset = vec3(0, 0, 0)
            })
        table.insert(scaleForms,
            {
                scaleform = LoadScaleform("PLAYER_NAME_14", "~b~PROTEGIDO "),
                angleOffset = -105.25,
                rot = vec2(0.0, 0.0),
                posOffset = vec3(0, 0, 0)
            })
    end
    while GetGameTimer() < endTimer do
        local plyCoords = GetEntityCoords(ply)
        for i = 1, 4 do
            local v = scaleForms[i]
            local coords = vec3(plyCoords.x + radius * math.cos(-angle + v.angleOffset),
                plyCoords.y + radius * math.sin(-angle + v.angleOffset), plyCoords.z)
            local heading = GetHeadingFromVector_2d(plyCoords.x - coords.x, plyCoords.y - coords.y)
            DrawScaleformMovie_3dSolid(v.scaleform, coords.x + v.posOffset.x, coords.y + v.posOffset.y,
                coords.z + v.posOffset.z, v.rot.x, v.rot.y, -heading, 1.0, 2.0, 1.0, 2.0, 1.0, 1.0, 1)
        end
        if (GetGameTimer() - lastGameTimer) > 1 then
            angle = angle + 0.02
            lastGameTimer = GetGameTimer()
        end
        Wait(1)
    end
    for i = 1, 4 do
        SetScaleformMovieAsNoLongerNeeded(scaleForms[i].scaleform)
    end
    scaleForms = {}
end)

RegisterNetEvent("itensNotify")
AddEventHandler("itensNotify", function(status)
    SendNUIMessage({
        action = "itemResponse",
        payload = { type = status[1], name = status[2], quantity = status[3], label = status[4], duration = 5 }
    })
end)

RegisterNetEvent("inventory:updateInterfaceAchievements")
AddEventHandler("inventory:updateInterfaceAchievements",function()
    SendNUIMessage({
        action = "updateEnsing",
        payload = {}
    })
end)
