/** Fisher–Yates shuffle; returns a new array. */
export const shuffle = <T,>(items: readonly T[], random: () => number = Math.random): T[] => {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

/** Shuffle MCQ options and remap the correct index. */
export const shuffleOptions = (
  options: readonly [string, string, string, string],
  correctIndex: 0 | 1 | 2 | 3,
  random: () => number = Math.random,
): { options: string[]; correctIndex: number } => {
  const indexed = options.map((text, i) => ({ text, i }));
  const shuffled = shuffle(indexed, random);
  return {
    options: shuffled.map((x) => x.text),
    correctIndex: shuffled.findIndex((x) => x.i === correctIndex),
  };
};
