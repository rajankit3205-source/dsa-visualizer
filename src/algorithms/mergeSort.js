export function getMergeSortAnimations(array) {
  const animations=[];
  if(array.length <=1) return array;

  const auxiliaryArray = array.slice();
  mergeSortHelper(array , 0 , array.length-1 ,auxiliaryArray,    animations );
  return animations;
}

function mergeSortHelper(mainArray, start, end, auxiliaryArray,animations){
  if(start === end) return;

  const mid = Math.floor((start +end)/2);
  
  mergeSortHelper(auxiliaryArray, start, mid, mainArray, animations);
  mergeSortHelper(auxiliaryArray, mid+1, end, mainArray, animations);
  merge(mainArray, start, mid, end, auxiliaryArray, animations);
}

function merge(mainArray, start, mid, end, auxiliaryArray, animations) {
  let i = start;
  let j = mid + 1;
  let k = start;

  while (i <= mid && j <= end) {
    animations.push({ type: "compare", indices: [i, j] });

    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push({ type: "overwrite", index: k, value: auxiliaryArray[i] });
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push({ type: "overwrite", index: k, value: auxiliaryArray[j] });
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  while (i <= mid) {
    animations.push({ type: "overwrite", index: k, value: auxiliaryArray[i] });
    mainArray[k++] = auxiliaryArray[i++];
  }

  while (j <= end) {
    animations.push({ type: "overwrite", index: k, value: auxiliaryArray[j] });
    mainArray[k++] = auxiliaryArray[j++];
  }
}
