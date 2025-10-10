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

    const announceReq = buildAnnounceReq(connectionReq.connectionId,torrent);

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

function parseConnResp(resp){
    return {
        action : resp.writeUInt32BE(0),
        transactionId : resp.writeUInt32BE(4),
        connectionId : resp.slice(8)
    }
}

function buildAnnounceReq(){
    const buf = Buffer.allocUnsafe(98); //allocate 98 bytes to buf using buffer but might contain lefterover that's why unsafe

    connId.copy(buf,0); // copy connId to buf at 0th offset

    buf.writeInt16BE(1,8);// add 1 in 8th offset in buf

    crypto.randomBytes(4).copy(buf,12); //copy 4 random bytes in buf at 12 offset or index

    torrentParser.infoHash(torrent).copy(buf,16);

    util.genId().copy(buf,36); //generate a peerId from util and copy it into buf at 16th offset

    Buffer.alloc(8).copy(buf,56)

    torrentParser.size(torrent).copy(buf,64)

    Buffer.alloc(8).copy(buf,56)

    buf.writeInt32BE(0,80)

    buf.writeInt32BE(0,80)

    crypto.randomBytes(4).copy(buf,88)

    buf.writeInt32BE(-1,92)

    buf.writeUInt16BE(port,96);

    return buf;
}

function parseAnnounceResp(resp){
    function group(iterable,groupSize){
        let groups = [];
        for(let i=0; i < iterable.length; i+=groupSize){
            groups.push(iterable.slice(i,i+groupSize))
        }
        return groups;
    }

return {
    action: resp.readUInt32BE(0),
    transactionId: resp.readUInt32BE(4),
    leechers: resp.readUInt32BE(8),
    seeders: resp.readUInt32BE(12),
    peers: group(resp.slice(20), 6).map(address => {
      return {
        ip: address.slice(0, 4).join('.'),
        port: address.readUInt16BE(4)
      }
    })
  }
}











export default getPeers;