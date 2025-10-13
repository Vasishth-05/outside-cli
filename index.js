'use strict';

import fs from "fs";
import tracker from "./tracker.js"
import torrentParser from "./torrent-parser.js"

const torrent = torrentParser.open(fs.readFileSync('anim.jpg.torrent'));

tracker.getPeers(torrent,peers => {
  console.log("list of peers :", peers);
})