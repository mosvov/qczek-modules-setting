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
        "name": "ebyte_modules_setting"
    },
    "electronInstallerDMG": {
        "icon": "./src/icons/serial_config.icns"
    },
    "electronInstallerDebian": {},
    "electronInstallerRedhat": {},
    "github_repository": {
        "owner": "mosvov",
        "name": "ebyte-modules-setting",
        "options": {
            "host": 'api.github.com',
        }
    },
    "windowsStoreConfig": {
        "packageName": "",
        "name": "ebytemodulessetting"
    }
}
