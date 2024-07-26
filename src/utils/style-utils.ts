// determine variant for horizontal cards to alternate colors between outline and filled
export function alternateCardColor(index: number) {
  if (index % 2 === 0) {
    return 'outline';
  } else {
    return 'filled';
  }
}

export function getTrendingGameStyles(gameIdx: number, hoveredIdx: number, modalOpen: boolean) {
  if (modalOpen) {
    return {
      className: 'blue-gray-filter',
      zIndex: 0,
      filter: 'blur(2px) grayscale(100%)',
    };
  }

  if (hoveredIdx === null) return null;

  if (hoveredIdx === gameIdx) {
    return {
      transform: 'scale(1.08)',
      saturate: '20%',
      zIndex: 20,
    };
  }

  return {
    zIndex: 0,
  };
}
