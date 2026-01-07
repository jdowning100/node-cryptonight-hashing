const multiHashing = require('../build/Release/cryptonight-hashing');

// Suspicious block data
const headerHash = Buffer.from('972d4225c5809527fec1ad1c11d4b50035f1236b9b424ce14e6cef854358f65c', 'hex');
const nonce = Buffer.from('0d56000021e38006', 'hex');
const mixHash = Buffer.from('c59d1c81c59d1c81c59d1c81c59d1c81c59d1c81c59d1c81c59d1c81c59d1c81', 'hex');
const height = 4184444;

console.log('=== KawPow Verification Test ===\n');
console.log('Input:');
console.log('  Header Hash:', headerHash.toString('hex'));
console.log('  Nonce:      ', nonce.toString('hex'));
console.log('  Mix Hash:   ', mixHash.toString('hex'));
console.log('  Height:     ', height);
console.log('  Epoch:      ', Math.floor(height / 7500));
console.log('');

console.log('Running kawpow_verify (this will compute DAG, may take a moment on first run)...\n');

try {
    const startTime = Date.now();
    const result = multiHashing.kawpow_verify(headerHash, nonce, height, mixHash);
    const elapsed = Date.now() - startTime;

    console.log('Result (computed in ' + elapsed + 'ms):');
    console.log('  Valid:           ', result.valid);
    console.log('  Computed Hash:   ', result.hash.toString('hex'));
    console.log('  Computed Mix:    ', result.mix_hash.toString('hex'));
    console.log('');
    console.log('Provided Mix Hash: ', mixHash.toString('hex'));
    console.log('');

    if (!result.valid) {
        console.log('=== INVALID PROOF OF WORK ===');
        console.log('The provided mix_hash does NOT match the computed mix_hash!');
    } else {
        console.log('=== VALID PROOF OF WORK ===');
        console.log('The mix_hash was correctly computed from the DAG.');
    }

} catch (e) {
    console.error('Error:', e.message);
}
