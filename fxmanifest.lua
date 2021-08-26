fx_version 'cerulean'
 
game 'gta5'
 
lua54 'yes'
 
description 'A paid hud created for RevelationRP'
 
version '0.0.1'

shared_script '@es_extended/imports.lua'
 
client_scripts {
    'config/config_cl.lua',
    'modules/client/*.lua'
}

ui_file 'html/ui.html'

files {
    'html/ui.html',
    'html/css/*.css',
    'html/js/*.js',
    'html/img/*.png'
}

dependency 'es_extended'

exports {
    'EVModule.Status.Voice'
}