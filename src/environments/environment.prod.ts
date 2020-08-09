export const environment = {
  production: true,
  nodeList: [
    'http://node-01.qwertycoin.org:8197/',
    'http://node-02.qwertycoin.org:8197/'
  ],
  poolList: [
    {
        pool: 'pool.qwertycoin.org',
        api: 'https://pool.qwertycoin.org:8119/stats'
    },
    {
        pool: 'qwertycoin.fairhash.org',
        api: 'https://qwertycoin.fairhash.org/api/stats'
    },
    {
        pool: 'qwc.superpools.online',
        api: 'https://qwc.cryptonote.club:8199/stats'
    },
    {
        pool: 'superblockchain.con-ip.com/qwc',
        api: 'https://superblockchain.con-ip.com:8333/stats'
    },
    {
        pool: 'easyhash.pro/qwc',
        api: 'https://easyhash.pro/qwc/api/stats'
    },
    {
        pool: 'qwc.cryptonote.club',
        api: 'https://qwc.cryptonote.club:8199/stats'
    },
    {
        pool: 'newpool.pw/qwc',
        api: 'https://minenice.newpool.pw:8205/stats'
    }
  ],
  coinUnits: 100000000,
  symbol: 'QWC',
  DEBUG_STATE: false
};
