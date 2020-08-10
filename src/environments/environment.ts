// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    nodeList: [
        'node-00.testnet.qwertycoin.org:8197/',
        'node-01.testnet.qwertycoin.org:8197/',
        'node-11.testnet.qwertycoin.org:8197/',
        'pool-01.testnet.qwertycoin.org:8197/'
    ],
    poolList: [
        {
            pool: 'pool-01.testnet.qwertycoin.org',
            api: 'pool-01.testnet.qwertycoin.org:8119/stats'
        }

    ],
    coinUnits: 100000000,
    symbol: 'QWC',
    DEBUG_STATE: false
};
