/** Fisher–Yates shuffle; returns a new array. */
export const shuffle = <T,>(items: readonly T[], random: () => number = Math.random): T[] => {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

type ShuffledMcq = { options: [string, string, string, string]; correctIndex: 0 | 1 | 2 | 3 };

/** Shuffle four options and remap the single correct index (still exactly one correct, three incorrect). */
export const shuffleOptions = (
  options: readonly [string, string, string, string],
  correctIndex: 0 | 1 | 2 | 3,
  random: () => number = Math.random,
): ShuffledMcq => {
  const indexed = options.map((text, i) => ({ text, i }));
  const shuffled = shuffle(indexed, random);
  const nextTexts = shuffled.map((x) => x.text);
  if (nextTexts.length !== 4) {
    throw new Error("shuffleOptions: expected exactly four choices");
  }
  const nextCorrect = shuffled.findIndex((x) => x.i === correctIndex);
  if (nextCorrect < 0 || nextCorrect > 3) {
    throw new Error("shuffleOptions: could not remap correct index");
  }
  return {
    options: nextTexts as [string, string, string, string],
    correctIndex: nextCorrect as 0 | 1 | 2 | 3,
  };
};
