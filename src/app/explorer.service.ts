import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {Functions} from './functions';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {CacheEntryOptions, CacheService} from '@dagonmetric/ng-cache';

declare var $: any;

@Injectable({
    providedIn: 'root'
})
export class ExplorerService {
    public heightCache = 0;
    public heightLastTimeRetrieve = 0;
    public lastBlock: any;
    public lastLiveStats: any;
    public txMemPool: any;
    public latestBlockList: any;
    public peerCache: any;

    public isAdvanced = true;

    constructor(private func: Functions,
                private httpClient: HttpClient,
                private cachSer: CacheService) {
        const self = this;

        setInterval(() => {
            self.refresh();
        }, 10 * 1000);
        self.refresh();
    }

    refresh() {
        const self = this;
        self.getPoolTransactions();
        self.getLastBlock();
        self.getLiveStats().then((lastLiveStats: any) => {
            this.lastLiveStats = lastLiveStats;
            this.heightCache = this.lastLiveStats.height;
            self.getHttpBlockListByHeight(this.heightCache);
        });
    }

    getHeight(): Promise<number> {
        if (Date.now() - this.heightLastTimeRetrieve < 20 * 1000 && this.heightCache !== 0) {
            return Promise.resolve(this.heightCache);
        }

        const self = this;
        this.heightLastTimeRetrieve = Date.now();
        return new Promise<number>(function (resolve, reject) {
            self.postData(self.func.getRandomNodeUrl() + 'getheight', {}).then(data => {
                // tslint:disable-next-line:radix
                self.heightCache = data.height;
                resolve(self.heightCache);
            }).catch(error => {
                try {
                    console.log(JSON.parse(error.responseText));
                } catch (e) {
                    console.log(e);
                }
                reject(error);
            });
        });
    }

    getPoolTransactions() {
        const self = this;
        const nodeAddress = self.func.getRandomNodeUrl();

        return new Promise((resolve, reject) => {
            self.postData(nodeAddress + 'json_rpc', {
                'jsonrpc': '2.0',
                'id': 0,
                'method': 'f_mempool_json',
                'params': ''
            }).then((txMemPool: any) => {
                this.txMemPool = txMemPool.result.mempool;
                resolve(this.txMemPool);
            }).catch(error => {
                try {
                    console.log(JSON.parse(error.responseText));
                } catch (e) {
                    console.log(e);
                }
                reject(error);
            });
        });
    }

    getLastBlock() {
        const self = this;
        const nodeAddress = self.func.getRandomNodeUrl();

        return new Promise((resolve, reject) => {
            self.postData(nodeAddress + 'json_rpc', {
                'jsonrpc': '2.0',
                'id': 0,
                'method': 'getlastblockheader',
                'params': ''
            }).then((data: any) => {
                const blockHeaderHash = data.result.block_header.hash;
                self.postData(nodeAddress + 'json_rpc', {
                    'jsonrpc': '2.0',
                    'id': 0,
                    'method': 'f_block_json',
                    'params': {
                        'hash': blockHeaderHash
                    }
                }).then((blockJsonData: any) => {
                    this.lastBlock = blockJsonData.result.block;
                    resolve(this.lastBlock);
                }).catch(error => {
                    try {
                        console.log(JSON.parse(error.responseText));
                    } catch (e) {
                        console.log(e);
                    }
                    reject(error);
                });
            }).catch(error => {
                try {
                    console.log(JSON.parse(error.responseText));
                } catch (e) {
                    console.log(e);
                }
                reject(error);
            });
        });
    }

    getLiveStats() {
        const self = this;
        const nodeAddress = self.func.getRandomNodeUrl();

        return new Promise((resolve, reject) => {
            self.postData(nodeAddress + 'getinfo', {}).then((data: any) => {
                self.lastLiveStats = data;
                resolve(self.lastLiveStats);
            }).catch(error => {
                try {
                    console.log(JSON.parse(error.responseText));
                } catch (e) {
                    console.log(e);
                }
                reject(error);
            });
        });
    }

    getHttpBlockListByHeight(height: number): Observable<any> {
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        };
        const body = {
            'jsonrpc': '2.0',
            'id': 0,
            'method': 'f_blocks_list_json',
            'params': {
                'height': height - 1
            }
        };
        const nodeAddress = this.func.getRandomNodeUrl() + 'json_rpc';
        const options: CacheEntryOptions = {
            absoluteExpiration: 30 * 1000
        };

        return this.cachSer.getOrSet('latest30Blocks', (entryOptions) => {
            const response = this.httpClient.post(nodeAddress, body, {'headers': headers});

            return response;
        }, options);
    }

    /*
      getPeers() {
        const self = this;
        const nodeAddress = self.func.getRandomNodeUrl();

        return new Promise((resolve, reject) => {
          self.postData(nodeAddress + 'peers', {}).then((peers: any) => {
            self.peerCache = peers.peers;
            resolve(self.peerCache);
          }).catch(error => {
            try {
              console.log(JSON.parse(error.responseText));
            } catch (e) {
              console.log(e);
            }
            reject(error);
          });
        });
      }

      getPeerLocation = async (ip) => new Promise(resolve => {
        const self = this;
        const url = `https://ipapi.co/${ip}/json`;

        this.cache.get(ip, async (err, value) => {
          if (value) {
            return resolve(value);
          }

          try {
            const res = self.postData(url, {});
            console.log(res);
    //        cache.set(ip, res)
          } catch (e) {
            console.log('Can\'t get location ', e);
          }
        });
      })

      getPeerLocations = async () => {
        return this.getPeers().then((peers: any) => Promise.all(peers.map(peer => {
          const [ip, ] = peer.split(':');
          return this.getPeerLocation(ip);
        })));
      }

      cacheLocations = async () => {
        const locations = await this.getPeerLocations();
        this.cache.set('locations', JSON.stringify(locations), 100);
      }

      getCachedLocations = () => new Promise(resolve => {
        this.cache.get('locations', (err, value) => {
          resolve(value ? value : []);
        });
      })
    */

    async postData(url: string, data: any) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            },
            body: JSON.stringify(data)
        });

        response.headers.append('Access-Control-Allow-Origin', '*');
        response.headers.append('Access-Control-Allow-Headers', '*')

        return response.json();
    }
}
