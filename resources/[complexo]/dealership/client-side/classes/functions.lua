--- Retorna uma tabela contendo todos os veículos que podem ser comprados.
function mathLength(n)
    return math.ceil(n * 100) / 100
end

---@param stockList table
---@return table
function GetVehicleListWithClasses(stockList)
    local vehiclesList = VehicleGlobal()

    local vehiclesToTablet = {}

    for k, v in pairs(vehiclesList) do
        local hashName = GetHashKey(k)
        local vehicleClass = GetVehicleClassFromName(hashName)
        local vehPrice = parseInt(v.Price)
        local className = v.Class
        if not className then
            className = "Utilitários"
        end

        if vehicleMode == "work" then
            className = "Serviços"
        elseif vehicleMode == "rental" or vehicleMode == "Rental" then
            className = "VIP"
            vehPrice = parseInt(v.Gemstone)
        end

        vehiclesToTablet[#vehiclesToTablet+1] = {
            model = k,
            name = v[1],
            chest = parseInt(v[2]),
            type = v[4],
            price = vehPrice,
            testDrivePrice = 500,
            tax = VehiclePrice(k),
            category = className,
            quantity = GetVehicleStock(stockList, k) or 0,
            tier = VehicleClass(k),
        }
    end

    return vehiclesToTablet
end

--- Retorna a quantidade de estoque de um veículo.
---@param stockList table
---@param vehicleName string
---@return number
function GetVehicleStock(stockList, vehicleName)
    if not vehicleName then return false end
    local vehStock = 100
    if parseInt(vehStock) <= 0 then return 99 end
    if stockList[vehicleName] then
        return stockList[vehicleName]
    end
    return parseInt(vehStock)
end