/**
 *     Copyright (c) 2019, ExploShot
 *     Copyright (c) 2019, The Qwertycoin Project
 *
 *     All rights reserved.
 *     Redistribution and use in source and binary forms, with or without modification,
 *     are permitted provided that the following conditions are met:
 *
 *     ==> Redistributions of source code must retain the above copyright notice,
 *         this list of conditions and the following disclaimer.
 *     ==> Redistributions in binary form must reproduce the above copyright notice,
 *         this list of conditions and the following disclaimer in the documentation
 *         and/or other materials provided with the distribution.
 *     ==> Neither the name of Qwertycoin nor the names of its contributors
 *         may be used to endorse or promote products derived from this software
 *          without specific prior written permission.
 *
 *     THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 *     "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 *     LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 *     A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 *     CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *     EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 *     PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *     PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 *     LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *     NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *     SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import {environment} from '../environments/environment';


export class Functions {
    public randInt(): number {
        return Math.floor(Math.random() * Math.floor(environment.nodeList.length));
    }

    public getRandomNodeUrl(): string {
        return environment.nodeList[this.randInt()];
    }

    public getReadableCoins(coins, digits, withoutSymbol) {
        const amount = (parseInt(coins || 0) / environment.coinUnits).toFixed(digits || environment.coinUnits.toString().length - 1);
        return amount + (withoutSymbol ? '' : (' ' + environment.symbol));
    }

    public addCommas(nStr) {
        nStr += '';
        const x = nStr.split('.');
        let x1 = x[0];
        const x2 = x.length > 1 ? '.' + x[1] : '';
        const rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    public getReadableDifficulty(difficulty, precision) {
        if (isNaN(parseFloat(difficulty)) || !isFinite(difficulty)) {
            return 0;
        }
        if (typeof precision === 'undefined') {
            precision = 2;
        }
        const units = ['', 'k', 'M', 'G', 'T', 'P'],
            number = Math.floor(Math.log(difficulty) / Math.log(1000));
        if (units[number] === undefined || units[number] === null) {
            return 0;
        }
        return (difficulty / Math.pow(1000, Math.floor(number))).toFixed(precision) + ' ' + units[number];
    }

    public getReadableHashRateString(hashrate) {
        let i = 0;
        const byteUnits = [' H', ' kH', ' MH', ' GH', ' TH', ' PH', ' EH', ' ZH', ' YH'];
        while (hashrate > 1000) {
            hashrate = hashrate / 1000;
            i++;
        }
        return hashrate.toFixed(2) + byteUnits[i];
    }

    public formatDate(time) {
        if (!time) {
            return '';
        }
        return new Date(parseInt(time) * 1000).toLocaleString();
    }

    public formatBytes(a, b) {
        if (0 == a) {
            return '0 Bytes';
        }
        const c = 1024, d = b || 2, e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            f = Math.floor(Math.log(a) / Math.log(c));
        return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
    }

    public formatPaymentLink(hash) {
        // return '<a href="' + getTransactionUrl(hash) + '">' + hash + '</a>';
    }

    public formatBlockLink(hash) {
        // return '<a href="' + getBlockchainUrl(hash) + '">' + hash + '</a>';
    }
}
