const tokenHashConst = require('./token').hashConst;

wShingling = (first, second) => {
    const  nGram = Math.min(4, Math.min(first.length, second.length));      // number of tokens in shingle (8)
    const  hashMod = 91015742504299;
    let headDigitHashConst = 1;
    for ( i = 0; i < nGram - 1; ++i) {
        headDigitHashConst = (headDigitHashConst * tokenHashConst) % hashMod; 
    }
    let firstHash = 0;
    let secondHash = 0;
    firstShingles = new Set();
    secondShingles = new Set();;

    for ( i = 0; i < first.length; ++i) {                     // calculating hashes of shingles from the first vector
        firstHash = (firstHash * tokenHashConst) % hashMod;
        firstHash = (firstHash + first[i].tokenType) % hashMod;

        if (i + 1 >= nGram) {
            firstShingles.add(firstHash);
            firstHash = (firstHash - (first[i - nGram + 1].tokenType * headDigitHashConst) % hashMod + hashMod) % hashMod;
        }
    }

    for ( i = 0; i < second.length; ++i) {                     // calculating hashes of shingles from the second vector
        secondHash = (secondHash * tokenHashConst) % hashMod;
        secondHash = (secondHash + second[i].tokenType) % hashMod;

        if (i + 1 >= nGram) {
            secondShingles.add(secondHash);
            secondHash = (secondHash - (second[i - nGram + 1].tokenType * headDigitHashConst) % hashMod + hashMod) % hashMod;
        }
    }

    let countIntersection = 0;                 // counting сardinality of set intersection

    for (let hash of firstShingles) {
        if (secondShingles.has(hash)) {
            countIntersection++;
        }
    }
    return (countIntersection * 100) / (firstShingles.size + secondShingles.size - countIntersection);      // (|A| ⋂ |B|) / (|A| U |B|) * 100%
}

levenshtein = (first, second) => {
    const n = first.length;
    const m = second.length;
    const max = Math.max(n, m);
    let distance = [];

    for (let i = 0; i <= n; ++i) {
        distance[i] = [];
        distance[i][0] = i;
    }

    for (let i = 0; i <= m; ++i) {
        distance[0][i] = i;
    }

    for (let i = 1; i <= n; ++i) {
        for (let j = 1; j <= m; ++j) {
            distance[i][j] = Math.min(distance[i - 1][j] + 1, distance[i][j - 1] + 1);
            distance[i][j] = Math.min(distance[i][j],
                                      distance[i - 1][j - 1] + (first[i-1].tokenType != second[j-1].tokenType));
        }
    }

    return ((max - distance[n][m]) * 100) / max;                                        // (1 - LD / max(n, m)) * 100%
}

exports.wShingling = wShingling;
exports.levenshtein = levenshtein;