fx_version "bodacious"
game "gta5"
lua54 "yes"

ui_page "web-side/index.html"

client_scripts {
	"@vrp/config/Native.lua",
	"@vrp/config/Global.lua",
	"@vrp/config/Vehicle.lua",
	"@vrp/lib/Utils.lua",
	"client-side/*"
}

server_scripts {
	"@vrp/config/Vehicle.lua",
	"@vrp/config/Global.lua",
	"@vrp/lib/Utils.lua",
	"server-side/*"
}

files {
	"web-side/*",
	"web-side/**/*"
}

shared_scripts {
	"shared-side/*"
}

escrow_ignore {
	"shared-side/shared.lua"
}
