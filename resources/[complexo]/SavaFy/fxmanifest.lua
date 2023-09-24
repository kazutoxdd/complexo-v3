fx_version "adamant"
game "gta5"

this_is_a_map 'yes'
ui_page 'html/index.html'
author 'ℕ𝔼𝕏𝕋#0001' 



client_scripts {
	'@vrp/lib/Utils.lua',
  'config.lua',
  'client/main.lua',
}

files {
	'html/index.html',
	'html/script.js',
	'html/*.svg',
	'html/radio.png',
	'html/main.css',
}

server_scripts {
	'@vrp/lib/Utils.lua',
  'config.lua',
  'server/main.lua',
}
      