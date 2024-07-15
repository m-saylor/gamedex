// determine variant for horizontal cards to alternate colors between outline and filled
function alternateCardColor(index) {
  if (index % 2 === 0) {
    return 'outline';
  } else {
    return 'filled';
  }
}

export default alternateCardColor;
