'use strict';

import fs from "fs";
import bencode from "bencode";

import dgram from "dgram"
import { Buffer } from "buffer";
import { parse as urlParse } from "url";

const torrent = bencode.decode(fs.readFileSync('anim.jpg.torrent'));

console.log(torrent.announce.toString('utf-8'));

const url = urlParse(torrent.announce.toString('utf8'));

// 3
const socket = dgram.createSocket('udp4');
// 4
const myMsg = Buffer.from('hello?', 'utf8');

const port = url.port ? Number(url.port) : 80;
const host = url.hostname;

// 5
socket.send(myMsg, 0, myMsg.length, port, host, () => {console.log("Message sent");
});
// 6
socket.on('message', msg => {
  console.log('message is', msg);
});

