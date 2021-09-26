"use strict";

var crypto = require("crypto");

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
	data: "",
	timestamp: Date.now(),
});

// TODO: insert each line into blockchain
for (let line of poem) {
	createBlock(line)
}

// **********************************

function blockHash(bl) {
	let hashInput = JSON.stringify(bl);
	return crypto.createHash("sha256").update(
		// TODO: use block data to calculate hash
		hashInput
	).digest("hex");
}

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
console.log(Blockchain)