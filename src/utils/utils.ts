export const randomNumber = (min: number, max: number, numEx?: number): number  => {
  let num = Math.floor(Math.random() * (max - min + 1)) + min;
  if(numEx || numEx === 0 ){
    while (num === numEx) {
      num = Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
  return num;
};
