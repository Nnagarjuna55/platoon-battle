// backend/logic.js
const advantageMap = {
    Militia: ['Spearmen', 'LightCavalry'],
    Spearmen: ['LightCavalry', 'HeavyCavalry'],
    LightCavalry: ['FootArcher', 'CavalryArcher'],
    HeavyCavalry: ['Militia', 'FootArcher', 'LightCavalry'],
    CavalryArcher: ['Spearmen', 'HeavyCavalry'],
    FootArcher: ['Militia', 'CavalryArcher']
};

function parseInput(line) {
    return line.split(';').map(part => {
        const [type, count] = part.split('#');
        return { type, count: parseInt(count) };
    });
}

function battleResult(your, enemy) {
    let yourEff = your.count;
    let enemyEff = enemy.count;

    if (advantageMap[your.type]?.includes(enemy.type)) {
        yourEff *= 2;
    }

    if (advantageMap[enemy.type]?.includes(your.type)) {
        enemyEff *= 2;
    }

    if (yourEff > enemyEff) return 'win';
    if (yourEff === enemyEff) return 'draw';
    return 'lose';
}

function permute(arr) {
    if (arr.length === 0) return [[]];
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        const rest = permute(arr.slice(0, i).concat(arr.slice(i + 1)));
        for (const r of rest) {
            result.push([arr[i]].concat(r));
        }
    }
    return result;
}

function findWinningArrangement(yourLine, enemyLine) {
    const yourPlatoons = parseInput(yourLine);
    const enemyPlatoons = parseInput(enemyLine);
    const permutations = permute(yourPlatoons);

    for (const perm of permutations) {
        let wins = 0;
        for (let i = 0; i < 5; i++) {
            if (battleResult(perm[i], enemyPlatoons[i]) === 'win') {
                wins++;
            }
        }
        if (wins >= 3) {
            const result = perm.map(p => `${p.type}#${p.count}`).join(';');
            return { result };
        }
    }

    return { result: 'There is no chance of winning' };
}

module.exports = { findWinningArrangement };
