import { EVENTS } from "../../util/constants.js";

export default class Node {
    constructor(id, name, system_id, root=false) {
        this.id = id;
        this.name = name;
        this.system_id = system_id;
        this.root = root;
        
        this.socket = undefined;
        this.connected = false;
        this.connectedSince = undefined;
    }

    isConnected() {
        return this.connected;
    }

    isRoot() {
        return this.root;
    }

    setName(name) {
        this.name = name;
    }

    setSystem(system_id) {
        this.system_id = system_id;
    }

    setRoot(root) {
        this.root = root;
    }

    connect(socket) {
        if (this.connected) throw new Error(`Node: "${this.id} is already connected"`);
        this.socket = socket;
        this.connected = true;
        this.connectedSince = new Date();
        this.socket.node_id = this.id;
    }

    disconnect() {
        if (!this.connected) throw new Error(`Node: "${this.id} is not connected"`);
        this.socket = undefined;
        this.connected = false;
        this.connectedSince = new Date();
    }

    forceDisconnect(message) {
        if (!this.connected) throw new Error(`Node: "${this.id} is not connected"`);
        this.socket.emit(EVENTS.NODE_DISCONNECTED, { msg: message });
        this.disconnect();
    }
}