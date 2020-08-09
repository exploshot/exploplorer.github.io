import {Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {CubesOptions} from '../../interfaces';

@Component({
    selector: 'app-cubes',
    template: `
        <canvas #cubie style="border-radius: 16px;"></canvas>
    `,
    styleUrls: ['./cubes.component.css']
})
export class CubesComponent implements OnInit {

    @Input() blockHash: string;
    @ViewChild('cubie', { static: false}) cubie: ElementRef<HTMLCanvasElement>;

    public defaultSize = 16;
    public defaultScale = 4;

    public randArr = new Array(4);

    public imgSrc: any;

    constructor() {
    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        this.create({hash: this.blockHash});
    }

    hashRandomizer(hash: string) {
        const self = this;
        let i: number;
        for (i = 0; i < self.randArr.length; i++) {
            self.randArr[i] = 0;
        }
        for (i = 0; i < hash.length; i++) {
            self.randArr[i % 4] =
                (self.randArr[i % 4] * 32) - self.randArr[i % 4] + hash.charCodeAt(i);
        }
    }

    random() {
        const self = this;
        // based on Java's String.hashCode(), expanded to 4 32bit values
        // tslint:disable-next-line:no-bitwise
        const t = self.randArr[0] ^ (self.randArr[0] << 11);

        self.randArr[0] = self.randArr[1];
        self.randArr[1] = self.randArr[2];
        self.randArr[2] = self.randArr[3];
        // tslint:disable-next-line:no-bitwise
        self.randArr[3] = self.randArr[3] ^ (self.randArr[3] >> 19) ^ t ^ (t >> 8);

        // tslint:disable-next-line:no-bitwise
        return (self.randArr[3] >>> 0) / ((1 << 31) >>> 0);
    }

    createColor() {
        const self = this;
        // saturation is the whole color spectrum
        const h = Math.floor(self.random() * 360);
        // saturation goes from 40 to 100, it avoids grayish colors
        const s = self.random() * 60 + 40 + '%';
        // lightness can be anything from 0 to 100, but probabilities are a bell curve around 50%
        const l = (self.random() + self.random() + self.random() + self.random()) * 25 + '%';

        const color = 'hsl(' + h + ',' + s + ',' + l + ')';
        return color;
    }

    createImageData(size: number) {
        const self = this;
        const width = size; // Only support square icons for now
        const height = size;

        const dataWidth = Math.ceil(width / 2);
        const mirrorWidth = width - dataWidth;

        const data: number[] = [];
        for (let y = 0; y < height; y++) {
            let row: number[] = [];
            for (let x = 0; x < dataWidth; x++) {
                // this makes foreground and background color to have a 43% (1/2.3) probability
                // spot color has 13% chance
                row[x] = Math.floor(self.random() * 2.3);
            }
            const r = row.slice(0, mirrorWidth);
            r.reverse();
            row = row.concat(r);

            for (let i = 0; i < row.length; i++) {
                data.push(row[i]);
            }
        }

        return data;
    }

    parseOptions(options: Partial<CubesOptions>): CubesOptions {
        const self = this;
        const hash = options.hash || Math.floor(Math.random() * Math.pow(10, 16)).toString(16);

        self.hashRandomizer(hash);

        return {
            hash,
            size: options.size || self.defaultSize,
            scale: options.scale || self.defaultScale,
            color: options.color || self.createColor(),
            backColor: options.backColor || self.createColor(),
            spotColor: options.spotColor || self.createColor(),
        };
    }

    render(options: Partial<CubesOptions>,
           canvas: HTMLCanvasElement) {
        const self = this;
        const opts = self.parseOptions(options || {});
        const imageData = self.createImageData(opts.size);
        const width = Math.sqrt(imageData.length);

        canvas.width = canvas.height = opts.size * opts.scale;

        const context = canvas.getContext('2d');
        // @ts-ignore
        context?.fillStyle = opts.bgcolor;
        context?.fillRect(0, 0, canvas.width, canvas.height);
        // @ts-ignore
        context?.fillStyle = opts.color;

        for (let i = 0; i < imageData.length; i++) {
            // if data is 0, leave the background
            if (imageData[i]) {
                const row = Math.floor(i / width);
                const column = i % width;

                // if data is 2, choose spot color, if 1 choose foreground
                // @ts-ignore
                context?.fillStyle = imageData[i] === 1 ? opts.color : opts.spotcolor;

                context?.fillRect(
                    column * opts.scale,
                    row * opts.scale,
                    opts.scale,
                    opts.scale
                );
            }
        }

        return canvas;
    }

    create(options: Partial<CubesOptions>) {
        const self = this;
        const canvas = self.cubie.nativeElement;
        self.render(options, canvas);
    }
}
