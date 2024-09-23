// Dependendo das versões de libs o código pode não funcionar, caso ocorra, instale as versões específicadas abaixo.
const bip39 = require('bip39'); // versão 3.1.0
const bip32 = require('bip32'); // versão 2.0.6
const bitcoin = require('bitcoinjs-lib'); // versão 7.0.0-rc.0
const inquirer = require('inquirer'); // versão 8.2.6

async function generateWallet() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'wordCount',
            message: 'Escolha o total de palavras mnemônicas (12 ou 24)',
            choices: [
                { name: '12 palavras (128 bits)', value: 128 },
                { name: '24 palavras (256 bits)', value: 256 }
            ]
        },
        {
            type: 'list',
            name: 'derivationPath',
            message: 'Escolha o Derivation Path',
            choices: [
                { name: 'BIP32 (Legacy)', value: "m/0'/0'" },
                { name: 'BIP44 (Legacy - P2PKH)', value: "m/44'/0'/0'/0" },
                { name: 'BIP49 (P2SH-SegWit)', value: "m/49'/0'/0'/0" },
                { name: 'BIP84 (Native SegWit)', value: "m/84'/0'/0'/0" },
            ]
        }
    ]);

    const wordCount = answers.wordCount;
    const derivationPath = answers.derivationPath;

    // 2. Gerar mnemônica (BIP39)
    const mnemonic = bip39.generateMnemonic(wordCount);
    console.log('Mnemônico Gerado:', mnemonic);

    // 3. Gerar seed a partir da mnemônica
    const seed = await bip39.mnemonicToSeed(mnemonic);

    // 4. Gerar BIP32 Root Key
    const root = bip32.fromSeed(seed);
    console.log('BIP32 Root Key:', root.toBase58());

    // 5. Gerar os primeiros 20 endereços baseados no caminho de derivação
    console.log(`\nDerivation Path utilizado: ${derivationPath}`);
    for (let i = 0; i < 20; i++) {
        const child = root.derivePath(`${derivationPath}/${i}`);

        let address;
        if (derivationPath.startsWith("m/44")) {
            // P2PKH address (Legacy) --> BIP44
            address = bitcoin.payments.p2pkh({ pubkey: child.publicKey }).address;
        } else if (derivationPath.startsWith("m/49")) {
            // P2SH-SegWit address --> BIP49
            address = bitcoin.payments.p2sh({
                redeem: bitcoin.payments.p2wpkh({ pubkey: child.publicKey })
            }).address;
        } else if (derivationPath.startsWith("m/84")) {
            // Native SegWit address --> BIP84
            address = bitcoin.payments.p2wpkh({ pubkey: child.publicKey }).address;
        } else {
            // Default to P2PKH --> BIP32
            address = bitcoin.payments.p2pkh({ pubkey: child.publicKey }).address;
        }

        console.log(`\nAddress #${i + 1}:`);
        console.log('Address:', address);
        console.log('Public Key:', child.publicKey.toString('hex'));
        console.log('Private Key:', child.toWIF());
    }
}

// Executar a função
generateWallet();
