fx_version "bodacious"
game "gta5"
lua54 "yes"

ui_page "web-side/index.html"

client_scripts {
	"@vrp/config/Native.lua",
	"@vrp/lib/Utils.lua",
	"client-side/*"
}

server_scripts {
	"@vrp/lib/Utils.lua",
	"Config.lua",
	"server-side/*"
}

shared_scripts {
	"config.lua"
}

files {
	"web-side/*",
	"web-side/**/*"
}