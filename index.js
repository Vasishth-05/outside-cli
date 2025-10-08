'use strict';

import fs from "fs";
import bencode from "bencode";

import tracker from "./tracker.js"

const torrent = bencode.decode(fs.readFileSync('anim.jpg.torrent'));

tracker.getPeers(torrent,peers => {
  console.log("list of peers :", peers);
})