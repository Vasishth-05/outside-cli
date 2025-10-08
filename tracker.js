'use strict';

import dgram from "dgram"
import { parse as urlParse } from "url";
import crypto from "crypto";

const getPeers = (torrent,callback) => {
    const socket = dgram.createSocket("udp4");
    const url = torrent.announce.toString("utf8");

    udpSend(socket,url,buildConnReq());

    socket.on('message', response => {
        if(respType(response) === 'connect'){
            const connResp = parseConnResp(response);
            const announceReq = buildAnnounceRe(connResp.connectionId);
            udpSend(socket,announceReq,url);
        } else if (respType(response) === 'announce'){
            const announceResp = parseAnnounceResp(response);
            callback(announceResp.peers);
        }
    });
}

function udpSend(socket,message,rawUrl, callback=()=>{}){
    const url = urlParse(rawUrl);
    socket.send(message,0,message.length,url.port,url.host,callback);
}

function buildConnReq(){
    const buf = Buffer.alloc(16);

    buf.writeUInt32BE(0x234,0);
    buf.writeUInt32BE(0x12345123,4);

    buf.writeUInt32BE(0,8);

    crypto.randomBytes(4).copy(buf,12);

    return buf;
}













export default getPeers;