module.exports = {
    "make_targets": {
        "win32": [
            "squirrel"
        ],
        "darwin": [
            "zip"
        ],
        "linux": [
            "deb",
            "rpm"
        ]
    },
    "electronPackagerConfig": {
        "packageManager": "yarn"
    },
    "electronWinstallerConfig": {
        "name": "ebyte_modules_setting"
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
