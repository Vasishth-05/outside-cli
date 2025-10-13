import fs from "fs";
import bencode from "bencode";

const open = (filePath) => {
    return bencode.decode(fs.readFileSync(filePath))
}

const size = torrent => {

}

const infoHash = torrent => {
    const info = bencode.encode(torrent.info);
    return crypto.createHash('sha1').update(info).digest();
}

export default {
    open,
    size,
    infoHash
}