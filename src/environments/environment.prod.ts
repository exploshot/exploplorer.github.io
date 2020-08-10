export const environment = {
  production: true,
  nodeList: [
    'node-01.qwertycoin.org:8197/',
    'node-02.qwertycoin.org:8197/'
  ],
  poolList: [
    {
        pool: 'pool.qwertycoin.org',
        api: 'pool.qwertycoin.org:8119/stats'
    },
    {
        pool: 'qwertycoin.fairhash.org',
        api: 'qwertycoin.fairhash.org/api/stats'
    },
    {
        pool: 'qwc.superpools.online',
        api: 'qwc.cryptonote.club:8199/stats'
    },
    {
        pool: 'superblockchain.con-ip.com/qwc',
        api: 'superblockchain.con-ip.com:8333/stats'
    },
    {
        pool: 'easyhash.pro/qwc',
        api: 'easyhash.pro/qwc/api/stats'
    },
    {
        pool: 'qwc.cryptonote.club',
        api: 'qwc.cryptonote.club:8199/stats'
    },
    {
        pool: 'newpool.pw/qwc',
        api: 'minenice.newpool.pw:8205/stats'
    }
  ],
  coinUnits: 100000000,
  symbol: 'QWC',
  DEBUG_STATE: false
};
