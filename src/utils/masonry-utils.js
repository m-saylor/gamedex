function pattern1(index) {
  if (index === 0) {
    return 6;
  }
  if (index === 1 || index === 2) {
    return 3;
  }
  if (index === 3 || index === 4) {
    return 6;
  }
  if (index > 4 && index <= 8) {
    return 3;
  }

  return 3;
}

function pattern2(index) {
  if (index <= 2) {
    return 2;
  }
  if (index === 3 || index === 4) {
    return 3;
  }
  if (index > 4 && index <= 7) {
    return 2;
  }
  if (index > 7 && index <= 11) {
    return 3;
  }
  if (index > 11 && index <= 14) {
    return 2;
  }
  return 2;
}

export function getSpan(index) {
  // Pattern 1
  if (index < 9) {
    return pattern1(index);
  }
  if (index < 18) {
    return pattern1(index - 9);
  }
  if (index < 33) {
    return pattern2(index - 18);
  }
  if (index < 48) {
    return pattern2(index - 33);
  }
  if (index < 63) {
    return pattern2(index - 48);
  }
  if (index < 78) {
    return pattern2(index - 63);
  }

  return 2;
}

export const TILE_INDEX_TO_GAME_INDEX = [
  0,
  6,
  7,
  1,
  2,
  8,
  9,
  10,
  11,
  3,
  12,
  13,
  4,
  5,
  14,
  15,
  16,
  17,
  42,
  43,
  44,
  18,
  19,
  45,
  46,
  47,
  20,
  21,
  22,
  23,
  48,
  49,
  50,
  51,
  52,
  53,
  24,
  25,
  54,
  55,
  56,
  26,
  27,
  28,
  29,
  57,
  58,
  59,
  60,
  61,
  62,
  30,
  31,
  63,
  64,
  65,
  32,
  33,
  34,
  35,
  66,
  67,
  68,
  69,
  70,
  71,
  36,
  37,
  72,
  73,
  74,
  38,
  39,
  40,
  41,
  75,
  76,
  77,
];
