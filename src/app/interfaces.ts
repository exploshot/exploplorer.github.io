export interface ShortBlock {
    cumul_size: number;
    difficulty: number;
    hash: string;
    height: number;
    min_tx_fee: number;
    timestamp: number;
    tx_count: number;
}

export interface FBlockListJSON {
    id: string;
    jsonrpc: string;
    result: {
        blocks: ShortBlock[];
    };
}

export interface CubesOptions {
    hash: string;
    size: number;
    scale: number;
    color: string;
    backColor: string;
    spotColor: string;
}
