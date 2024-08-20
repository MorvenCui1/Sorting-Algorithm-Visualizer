import React from 'react';
import './SortingVisualizer.css';

import {getBubbleSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';
import {getInsertionSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';
import {getSelectionSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';
import {getHeapSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';
import {getQuickSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';
import {getMergeSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';
import {getShellSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';

// animation speed in MS
const animationSpeedMS = 5;

// number of bars in array
const numberOfArrayBars = 300;

// sets upper and lower bounds for array values
const upperBoundArrayValues = 500;
const lowerBoundArrayValues = 5;

// array bar main colour
const primaryColour = 'salmon';

// main sorting visualizer class
export default class SortingVisualizer extends React.Component{
    // creates object
    constructor(props){
        super(props);

        this.state = {
            array: [],
            arrayState: "",
        };
    }

    // random array if website loaded
    componentDidMount() {
        this.randomArray();
    }

    // generates random array
    randomArray() {
        const array = [];
        const arrayState = "random";
        for (let i = 0; i < numberOfArrayBars; i++) {
            array.push(randomIntFromInterval(lowerBoundArrayValues, upperBoundArrayValues));
        }
        this.setState({array, arrayState});
    }

    // generates nearly sorted array
    nearlySortedArray() {
        const array = [];
        const arrayState = "nearlySorted";
        for (let i = 0; i < numberOfArrayBars; i++) {
            array.push(i + upperBoundArrayValues - numberOfArrayBars);
        }
        for (let i = 0; i < 15; i++){
            array[randomIntFromInterval(0, numberOfArrayBars - 1)] = randomIntFromInterval(lowerBoundArrayValues, upperBoundArrayValues);
        }
        this.setState({array, arrayState});
    }

    // generates reverse sorted array
    reverseArray() {
        const array = [];
        const arrayState = "reverse";
        // change array to reset reverse array
        const randomizedValue = randomIntFromInterval(-2, 3);
        for (let i = numberOfArrayBars; i > 0; i--) {
            array.push(i + upperBoundArrayValues - numberOfArrayBars + randomizedValue);
        }
        this.setState({array, arrayState});
    }

    // bubble sort array
    bubbleSort() {
        // get animations array
        const animations = getBubbleSortAnimations(this.state.array);
        // animate each change with time delay
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');

            setTimeout(() => {
                // animate bar
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
            }, 10 * animationSpeedMS);
        }
    }

    // insertion sort array
    insertionSort() {
        // get animations array
        const animations = getInsertionSortAnimations(this.state.array);
        // animate each change with time delay
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            setTimeout(() => {
                // animate first bar in pair
                const [barOneIdx, newHeight] = animations[i]
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
            }, (i/5) * animationSpeedMS);
        }
    }

    // selection sort array
    selectionSort() {
        // get animations array
        const animations = getSelectionSortAnimations(this.state.array);
        // animate each change with time delay
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
            }, 5 * i * animationSpeedMS);
        }
    }

    // heap sort array
    heapSort() {
        // get animations array
        const animations = getHeapSortAnimations(this.state.array);
        // animate each change with time delay
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
            }, (i/3) * animationSpeedMS);
        }
    }

    // quick sort array
    quickSort() {
        // change speed of animations depending type of array being sorted
        var speed = 1;
        if (this.state.arrayState == "random") {
            speed = 1;
        }
        else if (this.state.arrayState == "nearly sorted") {
            speed = 25;
        }
        else {
            speed = 25;
        }

        // get animations array
        const animations = getQuickSortAnimations(this.state.array);
        // animate each change with time delay
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
            }, (i/speed) * animationSpeedMS);
        }
    }

    // merge sort array
    mergeSort() {
        // get animations array
        const animations = getMergeSortAnimations(this.state.array);
        // animate each change with time delay
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i]
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
            }, i * animationSpeedMS);
        }
    }

    // shell sort array
    shellSort() {
        // get animations array
        const animations = getShellSortAnimations(this.state.array);
        // animate each change with time delay
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i]
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
            }, (i/2) * animationSpeedMS);
        }
    }

    // set up front end display
    render() {
        const {array} = this.state;
           
        return (
          <div className = "array-container">
            {array.map((value, idx) => (
              
              <div
                className = "array-bar"
                key={idx}
                style={{
                  backgroundColor: primaryColour,
                  height: `${value}px`,
                }}></div>
            ))}
            
            <div class = "headerOne">
                <h1>Generate Array</h1>
            </div>

            <div class = "button-container-wrapper" >
                <div class = "button-container-one">
                    <button onClick={() => this.randomArray()} className = "custom-button-one">Random Array</button>
                    <button onClick={() => this.nearlySortedArray()} className = "custom-button-one">Nearly Sorted Array</button>
                    <button onClick={() => this.reverseArray()} className = "custom-button-one">Reverse Sorted Array</button>
                </div>
            </div>

            <div class = "headerTwo">
                <h1>Sort Array</h1>
            </div>

                <div class = "button-container-two">
                    <button onClick={() => this.bubbleSort()} className = "custom-button-two">Bubble Sort</button>
                    <button onClick={() => this.insertionSort()} className = "custom-button-two">Insertion Sort</button>
                    <button onClick={() => this.selectionSort()} className = "custom-button-two">Selection Sort</button>
                    <button onClick={() => this.heapSort()} className = "custom-button-two">Heap Sort</button>
                    <button onClick={() => this.quickSort()} className = "custom-button-two">Quick Sort</button>
                    <button onClick={() => this.mergeSort()} className = "custom-button-two">Merge Sort</button>
                    <button onClick={() => this.shellSort()} className = "custom-button-two">Shell Sort</button>
                </div>

          </div>
        );
      }
}

// generates random integer
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}