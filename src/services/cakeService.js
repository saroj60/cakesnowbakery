export const getCakes = () => {
  return [];
};

export const addCake = (cake) => {
  return { ...cake, id: Date.now().toString() };
};

export const deleteCake = (id) => {
};

