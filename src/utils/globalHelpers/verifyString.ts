const verifyString = (text: string): boolean => {
  let admissible = true;
  if (!text.replace(/\s/g, '').length) {
    admissible = false;
  }
  if (!text) {
    admissible = false;
  }
  return admissible;
};

export default verifyString;
