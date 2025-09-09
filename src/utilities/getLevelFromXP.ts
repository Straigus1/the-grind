import { levels } from "../data/levels";

export function getLevelFromXP(xp: number) {
    const levelReversed = [...levels].reverse();
    const currentLevel = levelReversed.find((lvl) => xp >= lvl.xp) || levels[0];
    const nextLevel = levels.find((lvl) => lvl.level === currentLevel.level + 1);
    const previousLevel = levels.find((lvl) => lvl.level === currentLevel.level - 1);  
    
    return {
        currentLevel: currentLevel.level,
        currentTitle: currentLevel.title,
        nextLevel: nextLevel ? nextLevel.level : null,
        nextTitle: nextLevel ? nextLevel.title : null,
        xpNeededForNextLevel: nextLevel ? nextLevel.xp - currentLevel.xp : null,
        xpTotalforNextLevel: nextLevel ? nextLevel.xp : null,
        xpTotalforPreviouslevel: previousLevel ? previousLevel.xp : null,
    };
}
