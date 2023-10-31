# LW Index

LW Index è un tool simil-[SMART](https://github.com/smart-tool/smart) per l'analisi qualitativa di algoritmi basati sull'omonimo indice [LW](https://www.sciencedirect.com/science/article/pii/S0304397512003866).

Algoritmi predefiniti:
- [scMAW](https://github.com/solonas13/maw) di M. Crochemore, G. Fici, R. Mercas, S. P. Pissis

## Istruzioni

Clonare la repository tramite `git clone https://github.com/v1enna/maw-lw-index.git` e installare le dipendenze tramite `npm i` sia in `codebase/client` che in `codebase/api`.

Per avviare il client:
`npm start` in `codebase/client` sulla porta 3000

Per avviare il server:
`npm start` in `codebase/server` sulla porta 9000

## Compilazione

`{root}/.pre-install.sh (WSL)`
```
#!/bin/bash

//tar -xvf sdsl-lite.tar.gz
cd sdsl-lite
./install.sh "$(pwd)"/libsdsl
mv libsdsl/ ..
```

Estrarre manualmente il tar `sdsl-lite.tar.gz` prima di lanciare `bash ./pre-install.sh` da WSL.
Potrebbe essere necessario [convertire l'encoding del file](https://stackoverflow.com/questions/11616835/r-command-not-found-bashrc-bash-profile) in un formato adatto a Unix. Successivamente, copiare il contenuto di `sdsl-lite/libsdsl/include/sdsl` in `sdsl-lite`. Creare, infine, una nuova cartella `sdsl` nella root di `scMAW` inserendovi gli stessi file del passo precedente.

Sarà adesso possibile lanciare `make -f Makefile.64-bit.gcc` e utilizzare `./sc-maw`.

*Nota:* aprire file FASTA con editor di testo non appropriati potrebbe compromettere la lettura del file. Altresì, è possibile aprire i file OUT con qualsiasi software.

Esempio d'uso di scMAW:
`./sc-maw -a DNA -i ./data/2.fasta -o 2.fasta.out -k 2 -K 10`
