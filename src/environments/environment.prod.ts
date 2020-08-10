export const environment = {
  production: true,
  nodeList: [
    'http://node-01.qwertycoin.org:8197/',
    'http://node-02.qwertycoin.org:8197/'
  ],
  poolList: [
    {
        pool: 'pool.qwertycoin.org',
        api: 'http://pool.qwertycoin.org:8119/stats'
    },
    {
        pool: 'qwertycoin.fairhash.org',
        api: 'http://qwertycoin.fairhash.org/api/stats'
    },
    {
        pool: 'qwc.superpools.online',
        api: 'http://qwc.cryptonote.club:8199/stats'
    },
    {
        pool: 'superblockchain.con-ip.com/qwc',
        api: 'http://superblockchain.con-ip.com:8333/stats'
    },
    {
        pool: 'easyhash.pro/qwc',
        api: 'http://easyhash.pro/qwc/api/stats'
    },
    {
        pool: 'qwc.cryptonote.club',
        api: 'http://qwc.cryptonote.club:8199/stats'
    },
    {
        pool: 'newpool.pw/qwc',
        api: 'http://minenice.newpool.pw:8205/stats'
    }
  ],
  coinUnits: 100000000,
  symbol: 'QWC',
  DEBUG_STATE: false
};
