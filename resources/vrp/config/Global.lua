-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
UsableF7 = true
Whitelisted = true
CombatLogMinutes = 3
SalarySeconds = 1800
BannedText = "Banido"
ServerName = "Bahamas"
ReleaseText = "Envie esse 'ID RANDÔMICO' na sala liberação, lembre-se de que esse 'ID' não é o 'ID' do seu personagem."
SpawnCoords = vec3(-1192.2,-1513.12,4.36)
BackPrison = vec3(1841.62,2585.94,46.02)
BackpackWeightDefault = 30
WipeBackpackDeath = true
NewItemIdentity = true
CleanDeathInventory = true
BlackoutTime = 600000                                                   -- Tempo para o blackout acabar (600000 = 10 minutos)
BlackoutText = "Os serviços em nossa central foram reestabelecidos."    -- Texto da notificação padrão para blackout desativado
-----------------------------------------------------------------------------------------------------------------------------------------
-- BASE
-----------------------------------------------------------------------------------------------------------------------------------------
BaseMode = "steam"
-----------------------------------------------------------------------------------------------------------------------------------------
-- HUNGER / THIRST
-----------------------------------------------------------------------------------------------------------------------------------------
ConsumeHunger = 1
ConsumeThirst = 1
CooldownHungerThrist = 90000
-----------------------------------------------------------------------------------------------------------------------------------------
-- MAINTENANCE
-----------------------------------------------------------------------------------------------------------------------------------------
Maintenance = false
MaintenanceText = "O servidor está em modo manutenção, só pessoas autorizadas tem acesso ao servidor."
MaintenanceLicenses = {
	["11000013f315825"] = true,
	["11000010bec93e4"] = true,
	["110000108dce899"] = true,
	["11000015b3921ee"] = true,
	["110000115845abb"] = true
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- CHARACTERITENS
-----------------------------------------------------------------------------------------------------------------------------------------
CharacterItens = {
	["water"] = 3,
	["sandwich"] = 5,
	["cellphone"] = 1,
	["dollars"] = 5000
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- GROUPBLIPS
-----------------------------------------------------------------------------------------------------------------------------------------
GroupBlips = {
	["Police"] = true,
	["Comanf"] = true,
	["Paramedic"] = true
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- CLIENTSTATE
-----------------------------------------------------------------------------------------------------------------------------------------
ClientState = {
	["Police"] = true,
	["Comanf"] = true,
	["Mechanic"] = true,
	["Paramedic"] = true
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- STARTCLOTHES
-----------------------------------------------------------------------------------------------------------------------------------------
StartClothes = {
	["mp_m_freemode_01"] = {
		["pants"] = { item = 0, texture = 0 },
		["arms"] = { item = 0, texture = 0 },
		["tshirt"] = { item = 1, texture = 0 },
		["torso"] = { item = 0, texture = 0 },
		["vest"] = { item = 0, texture = 0 },
		["shoes"] = { item = 0, texture = 0 },
		["mask"] = { item = 0, texture = 0 },
		["backpack"] = { item = 0, texture = 0 },
		["hat"] = { item = -1, texture = 0 },
		["glass"] = { item = 0, texture = 0 },
		["ear"] = { item = -1, texture = 0 },
		["watch"] = { item = -1, texture = 0 },
		["bracelet"] = { item = -1, texture = 0 },
		["accessory"] = { item = 0, texture = 0 },
		["decals"] = { item = 0, texture = 0 }
	},
	["mp_f_freemode_01"] = {
		["pants"] = { item = 0, texture = 0 },
		["arms"] = { item = 0, texture = 0 },
		["tshirt"] = { item = 1, texture = 0 },
		["torso"] = { item = 0, texture = 0 },
		["vest"] = { item = 0, texture = 0 },
		["shoes"] = { item = 0, texture = 0 },
		["mask"] = { item = 0, texture = 0 },
		["backpack"] = { item = 0, texture = 0 },
		["hat"] = { item = -1, texture = 0 },
		["glass"] = { item = 0, texture = 0 },
		["ear"] = { item = -1, texture = 0 },
		["watch"] = { item = -1, texture = 0 },
		["bracelet"] = { item = -1, texture = 0 },
		["accessory"] = { item = 0, texture = 0 },
		["decals"] = { item = 0, texture = 0 }
	}
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- LANG
-----------------------------------------------------------------------------------------------------------------------------------------
Lang = {
	["Join"] = "Entrando no Bahamas...",
	["Connecting"] = "Conectando no Bahamas...",
	["Position"] = "Você é o %d/%d da fila, aguarde sua conexão com o Bahamas",
	["Error"] = 'Conexão perdida com o Bahamas, você precisa estar com a "STEAM" aberta para efetuar sua conexão com o Bahamas, feche seu "FIVEM" e abra sua "STEAM".'
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- QUEUE
-----------------------------------------------------------------------------------------------------------------------------------------
Queue = {
	["List"] = {},
	["Players"] = {},
	["Counts"] = 0,
	["Connecting"] = {},
	["Threads"] = 0,
	["Max"] = 2048
}