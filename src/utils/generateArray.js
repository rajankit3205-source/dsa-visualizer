export function generateArray(size){
  const arr = [];

  for(let i=0; i<size; i++){
    const randomNumber = Math.floor(Math.random()*300)+20;
    arr.push(randomNumber);
  }
  return arr;
}