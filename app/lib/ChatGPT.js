import { ChatGPTAPI } from 'chatgpt';
import stream from 'stream';

export default class ChatGPT {
    constructor(socket) {
        this.connected = false;
        this.socket = socket;
        this.init();
    }

    async init() {
        this.api = new ChatGPTAPI({
            apiKey: process.env.GPTAPIKEY
        });
    }

    async sendMessage(id, msg) {
        const res = await this.api.sendMessage(msg, {
            onProgress: (pRes) => pRes.delta ? this.socket.emit('progress', {pRes: pRes, id: id}) : null,
            timeoutMs: 1 * 60 * 1000
        });
        res.id = id;
        return res;
    }
}