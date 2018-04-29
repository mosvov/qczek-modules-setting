const arch = require('os').arch();
module.exports = {
    "make_targets": {
        "win32": [
            "squirrel"
        ],
        "darwin": [
            "dmg"
        ],
        "linux": [
            "deb",
            "rpm"
        ]
    },
    "electronPackagerConfig": {
        "packageManager": "yarn",
        "icon": "./src/icons/serial_config",
        "dir": "./src"
    },
    "electronWinstallerConfig": {
        "name": `qczek_modules_setting_${arch}`,
        "exe": `qczek_modules_setting_${arch}_<%= version %>`
    },
    "electronInstallerDMG": {
        "icon": "./src/icons/serial_config.icns"
    },
    "electronInstallerDebian": {},
    "electronInstallerRedhat": {},
    "github_repository": {
        "owner": "mosvov",
        "name": "qczek-modules-setting",
        "options": {
            "host": 'api.github.com',
        }
    },
    "windowsStoreConfig": {
        "packageName": "",
        "name": "qczekmodulessetting"
    }
}
