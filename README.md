# Bitcoin Wallet Generator - Node.js
Este projeto em Node.js gera uma carteira Bitcoin aleatória utilizando padrões BIP39, BIP32, BIP44, BIP49 e BIP84. Ele inclui:

    Geração de frase mnemônica (BIP39): O usuário escolhe entre 12 ou 24 palavras.
    Chave raiz (BIP32): A partir da frase mnemônica, é gerada a chave raiz.
    Caminho de derivação: O usuário escolhe entre diferentes caminhos de derivação (BIP32, BIP44, BIP49 ou BIP84).
    Geração de endereços: O código exibe os 20 primeiros endereços com suas respectivas chaves públicas e privadas.

Dependências:

    bip39: Para gerar a frase mnemônica.  (versão 3.1.0)
    bip32: Para gerar a chave raiz a partir da seed. (versão 2.0.6)
    bitcoinjs-lib: Para gerar endereços Bitcoin. (versão 7.0.0)
    inquirer: Para interação com o usuário via CLI. (versão 8.2.6)

npm install bip39 bip32 bitcoinjs-lib inquirer

Obs: O código pode apresentar erros a depender das versões das depêndencias instaladas, para evita-los utilize as versões acima.
DICA: Recomenda-se que, ao gerar carteiras para uso real, você verifique a segurança do sistema utilizado e execute o código em um ambiente offline.
