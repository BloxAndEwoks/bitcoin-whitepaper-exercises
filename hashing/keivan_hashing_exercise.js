"use strict";

var crypto = require("crypto");

function createBlock (_data) {
	let block = {
        index: Blockchain.blocks.at(-1).index + 1,
		prevHash: Blockchain.blocks.at(-1).hash,
		data: _data,
		timestamp: Date.now(),
    };
	block.hash = blockHash(block);
	Blockchain.blocks.push(block);
}

// TODO: use block data to calculate hash
function blockHash(bl) {
	return crypto.createHash("sha256").update(
		`${bl.index};${bl.prevHash};${JSON.stringify(bl.data)};${bl.timestamp}`
		).digest("hex");
}

function verifyBlock(bl) {
    if (bl.data == null) return false; // non-empty check
    if (bl.index === 0) {
        if (bl.hash !== "000000") return false;
    } //for genesis block check hash is correct
    else {
        if (!bl.prevHash) return false;
        if (!(
            typeof bl.index === "number" &&
            Number.isInteger(bl.index) &&
            bl.index > 0
        )) {
            return false;
        }
        if (bl.hash !== blockHash(bl)) return false;
    } 

    return true;
}

function verifyChain(veri_counter, _blockchain) {
	if (_blockchain.blocks.length !== veri_counter) return false;
	return true;
}

// ************************************************************

let verification_counter = 0;
// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block (adding the first block to the blockchain)
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: " ",
	timestamp: Date.now(),
});

console.log(`Block verification ${Blockchain.blocks.length}`)
if (verifyBlock(Blockchain.blocks.at(-1))) {
	console.log("Genesis block verified")
	console.log(Blockchain.blocks.at(-1));
	verification_counter += 1;
}

// TODO: insert each line into blockchain
for (let line of poem) {
	createBlock(line);
	console.log(`Block verification ${Blockchain.blocks.length}...`);
	console.log(Blockchain.blocks.at(-1));

	if (verifyBlock(Blockchain.blocks.at(-1))) {
		console.log(`Block ${Blockchain.blocks.at(-1).index + 1} verified`);
		verification_counter +=1
	}
	else {
		console.log(`Block ${Blockchain.blocks.at(-1).index + 1} not verified`);
	}
	console.log(verifyBlock(Blockchain.blocks.at(-1)));
}


console.log(`Blockchain is valid: ${verifyChain(verification_counter, Blockchain)}`)
