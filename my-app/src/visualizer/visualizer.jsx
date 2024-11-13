import React from 'react';
import {getBubbleSortAnimations, getHeapSortAnimations, getMergeSortAnimations, getQuickSortAnimations} from '../sort_algo/algo.js';
import './visualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 150;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }
// Reset the array to random values from 10 to 600. This range is defined for visibility.
  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(10, 600));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
// Original work below
  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    for(let i = 0; i < animations.length; i ++)
    {
        // arrayBars holds all bars in array
        // animations[i] is each pair of bars being compared
        const arrayBars = document.getElementsByClassName('array-bar');
        let [pivotBar, compBar, change] = animations[i];
        //If a swap is not committed, we just highlight the pivot and the value we're comparing to
        if(!change)
        {
          const pivotBarStyle = arrayBars[pivotBar].style;
          const compBarStyle = arrayBars[compBar].style;
          const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          setTimeout(() => {
            pivotBarStyle.backgroundColor = color;
            compBarStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        } else {
        // This is the case where a swap is happening. Simply set the bar's height to the second bar
        setTimeout(() => {
          const pivotBarStyle = arrayBars[pivotBar].style;
          pivotBarStyle.height = `${compBar}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
// Below two animations follow same structure as above (names of bar different for clarity)
  heapSort() {
    const animations = getHeapSortAnimations(this.state.array);
    for(let i = 0; i < animations.length; i ++)
    {
      const arrayBars = document.getElementsByClassName('array-bar');
      let [barOne, barTwo, change] = animations[i];
      if(!change)
      {
        const barOneStyle = arrayBars[barOne].style;
        const barTwoStyle = arrayBars[barTwo].style;
        const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const barOneStyle = arrayBars[barOne].style;
          barOneStyle.height = `${barTwo}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    for(let i = 0; i < animations.length; i ++)
    {
      const arrayBars = document.getElementsByClassName('array-bar');
      let [barOne, barTwo, change] = animations[i];
      if(!change)
      {
        const barOneStyle = arrayBars[barOne].style;
        const barTwoStyle = arrayBars[barTwo].style;
        const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const barOneStyle = arrayBars[barOne].style;
          barOneStyle.height = `${barTwo}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }


// Pass index for React syntax. Pass in array values and map them.
// Set hight in style to the value of the item in the array, value reflects height
  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`
            }}></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}