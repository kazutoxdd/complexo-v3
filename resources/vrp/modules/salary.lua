-----------------------------------------------------------------------------------------------------------------------------------------
-- SALARY
-----------------------------------------------------------------------------------------------------------------------------------------
local Groups = vRP.Groups()
local Salary = {}
-----------------------------------------------------------------------------------------------------------------------------------------
-- SALARY:ADD
-----------------------------------------------------------------------------------------------------------------------------------------
AddEventHandler("Salary:Add", function(Passport, Permission)
    if not Salary[Permission] then
        Salary[Permission] = {}
    end
    if not Salary[Permission][Passport] then
        Salary[Permission][Passport] = os.time() + SalarySeconds
    end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SALARY:REMOVE
-----------------------------------------------------------------------------------------------------------------------------------------
AddEventHandler("Salary:Remove", function(Passport, Permission)
    if Permission then
        if Salary[Permission] and Salary[Permission][Passport] then
            Salary[Permission][Passport] = nil
        end
    else
        for k, v in pairs(Salary) do
            if Salary[k][Passport] then
                Salary[k][Passport] = nil
            end
        end
    end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREAD
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
    while true do
        Wait(60000)
        for k, v in pairs(Salary) do
            for Passport, Time in pairs(Salary[k]) do
                if Time <= os.time() then
                    Salary[k][Passport] = os.time() + SalarySeconds
                    if vRP.HasPermission(Passport, k) then
                        if Groups[k] and Groups[k].Salary and Groups[k].Salary[vRP.GetUserHierarchy(Passport,k)] then
                            vRP.GiveBank(Passport, Groups[k].Salary[vRP.GetUserHierarchy(Passport,k)])
                            TriggerClientEvent("Notify", vRP.Source(Passport), "verde", "Seu salário de "..vRP.Hierarchy(k)[vRP.GetUserHierarchy(Passport,k)].." | "..k.." foi depositado em sua conta.", 6000)
                        end
                    else
                        Salary[k][Passport] = nil
                    end
                end
            end
        end
    end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- DISCONNECT
-----------------------------------------------------------------------------------------------------------------------------------------
AddEventHandler("Disconnect", function(Passport)
    for k, v in pairs(Salary) do
        if Salary[k][Passport] then
            Salary[k][Passport] = nil
        end
    end
end)