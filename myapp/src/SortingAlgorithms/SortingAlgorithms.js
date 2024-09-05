// bubble sort function
export function getBubbleSortAnimations(array) {
    const animations = [];

    // indicate decrease of array to be sorted
    for (var i = 0; i < array.length; i++) {
        // sort array to be sorted
        for (var j = 0; j < (array.length - i - 1); j++) {
            // check if swap is needed
            if (array[j] > array[j + 1]) {
                // push animations
                animations.push([j, j + 1]);
                animations.push([j, j + 1]);
                animations.push([j, array[j + 1]]);
                animations.push([j + 1, j]);
                animations.push([j + 1, j]);
                animations.push([j + 1, array[j]]);
                // swap values
                var temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] =  temp;
            }
            else {
                // push animations
                animations.push([j, j]);
                animations.push([j, j]);
                animations.push([j, array[j]]);
                animations.push([j + 1, j + 1]);
                animations.push([j + 1, j + 1]);
                animations.push([j + 1, array[j + 1]]);
            }
        }
    }

    return animations;
}

// insertion sort function
export function getInsertionSortAnimations(array) {
    const animations = [];

    // go through all of the elements after first to insert them
    for (let i = 1; i < array.length; i++) {
        // insert element
        let j = i;
        while (j > 0 && array[j - 1] > array[j]) {
            // push animations
            animations.push([j, j - 1]);
            animations.push([j, j - 1]);
            animations.push([j, array[j - 1]]);
            animations.push([j - 1, j]);
            animations.push([j - 1, j]);
            animations.push([j - 1, array[j]]);

            // swap element and decrement pointer
            let temp = array[j];
            array[j] = array[j - 1];
            array[j - 1] = temp;
            j--;
        }
    }

    return animations;
}

// selection sort
export function getSelectionSortAnimations(array) {
    const animations = [];

    // decrease starting point of selecting minimum element each time
    for (let i = 0; i < array.length - 1; i++) {
        let minimumValueIndex = i;

        // search through remaining section of unsorted array
        for (let j = i + 1; j < array.length; j++) {
            // push animations
            animations.push([j, j]);
            animations.push([j, j]);
            animations.push([j, array[j]]);

            // check if there is new minimum value
            if (array[j] < array[minimumValueIndex]) {
                minimumValueIndex = j;
            }
        }
        // push animations
        animations.push([i, minimumValueIndex]);
        animations.push([i, minimumValueIndex]);
        animations.push([i, array[minimumValueIndex]]);
        animations.push([minimumValueIndex, i]);
        animations.push([minimumValueIndex, i]);
        animations.push([minimumValueIndex, array[i]]);

        // swap starting element and minimum index values
        let temp = array[i];
        array[i] = array[minimumValueIndex];
        array[minimumValueIndex] = temp;
    }

    return animations;
}

// heap sort
export function getHeapSortAnimations(array) { 
    const animations = [];

    // build the heap tree in the array
    for (var i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
        heapify(array, array.length, i, animations);
    }

    // sort the array
    for (var i = array.length - 1; i > 0; i--) {
        // push animations
        animations.push([0, i]);
        animations.push([0, i]);
        animations.push([0, array[i]]);
        animations.push([0, i]);
        animations.push([0, i]);
        animations.push([i, array[0]]);

        // put largest element of array at the back
        var temp = array[0];
        array[0] = array[i];
        array[i] = temp;

        // heapify remaining portion of array that is not sorted
        heapify(array, i, 0, animations);
    }

    return animations;
}

// build a heap out of a specific portion of the array
function heapify(array, arraySize, i,  animations) {
    // set first element of array as largest element
    var largest = i;
    var left = 2 * i + 1;
    var right = 2 * i + 2;

    // check if there is new largest at left pointer
    if (left < arraySize && array[left] > array[largest]) {
        largest = left;
    }

    // check if there is new largest at right pointer
    if (right < arraySize && array[right] > array[largest]) {
        largest = right;
    }

    // check if swap is needed
    if (largest != i) {
        // push animations
        animations.push([i, largest]);
        animations.push([i, largest]);
        animations.push([i, array[largest]]);
        animations.push([i, largest]);
        animations.push([i, largest]);
        animations.push([largest, array[i]]);

        // put largest element at first element of array portion
        var swap  = array[i];
        array[i] = array[largest];
        array[largest] = swap;

        // heapify remaning portion of array
        heapify(array, arraySize, largest, animations);
    }
}

// quick sort animation getter
export function getQuickSortAnimations(array) {
    const animations = [];

    quickSort(array, 0, array.length - 1, animations);

    return animations;
}

// quick sort
function quickSort(array, low, high, animations) {
    // if array is length 1 or lower it is automatically sorted
    if (low >= high) return;

    // partition the array
    let partitionIndex = partition(array, low, high, animations);

    // sort the remaining halves of array
    quickSort(array, low, partitionIndex - 1, animations);
    quickSort(array, partitionIndex + 1, high, animations);
}

// parition array
function partition(array, low, high, animations) {
    // set pivot to last element in array section
    let pivot = array[high];

    // set element to be swapped as element before the first index
    let i = low - 1;

    // search array section to see check for elements less than pivot
    for (let j = low; j <= high - 1; j++){
        // check if swap is needed
        if (array[j] < pivot) {
            i++;

            // push animations
            animations.push([i, j]);
            animations.push([i, j]);
            animations.push([i, array[j]]);
            animations.push([i, j]);
            animations.push([i, j]);
            animations.push([j, array[i]]);
            
            // swap array elements
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // push the animations
    animations.push([i + 1, high]);
    animations.push([i + 1, high]);
    animations.push([i + 1, array[high]]);
    animations.push([i + 1, high]);
    animations.push([i + 1, high]);
    animations.push([high, array[i + 1]]);
    
    // swap the pivot to the correct position
    [array[i + 1], array[high]] = [array[high], array[i + 1]];

    // return index of pivot
    return i + 1;
}

// merge sort function
export function getMergeSortAnimations(array) {
    // array of animation orders
    const animations = [];
    // returns arrays that do not need to be sorted
    if (array.length <= 1) return array;
    // creates copy of array
    const auxiliaryArray = array.slice();
    // calls merge sort function
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    // return array of animation orders
    return animations;
}

// splits array in half
function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    // base case array of length 1
    if (startIdx == endIdx) return;

    // calculate middle of array
    const middleIdx = Math.floor((startIdx + endIdx) / 2);

    // partition array in half
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);

    // merge two halfs of array
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

// merges two halves of array together
function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;

    // sort the two halves of the array and push the animation information
    while (i <= middleIdx && j <= endIdx) {        
        // push colour change
        animations.push([i, j]);
        animations.push([i, j]);

        // check which element to swap
        if (auxiliaryArray[i] <= auxiliaryArray[j]){
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++]
        }
        else{
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }

    // clean up and push the remaining sections of the array
    while (i <= middleIdx) {
        // push colour change
        animations.push([i, i]);
        animations.push([i, i]);

        // push swap element
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        // push colour change
        animations.push([j, j]);
        animations.push([j, j]);

        // push swap element
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}

// shell sort
export function getShellSortAnimations(array) {
    const animations = [];

    let arrayLength = array.length;

    // gap sort array starting from gap is half of array length until there is no gap
    for (let gap = Math.floor(arrayLength / 2); gap > 0; gap = Math.floor(gap / 2)) {

        // check if each element is gap sorted
        for (let i = gap; i < arrayLength; i += 1) {
            let temp = array[i];

            // insertion sort of gap is in wrong place
            let j;
            for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                // push animations
                animations.push([j, j - gap]);
                animations.push([j, j - gap]);
                animations.push([j, array[j - gap]]);

                // swap elements
                array[j] = array[j - gap];
            }

            // push animations and insert element
            animations.push([j, j]);
            animations.push([j, j]);
            animations.push([j, temp]);
            array[j] = temp;
        }
    }

    return animations;
}