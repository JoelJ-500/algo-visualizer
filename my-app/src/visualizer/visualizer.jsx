import React from 'react';
import {getBubbleSortAnimations, getHeapSortAnimations, getMergeSortAnimations, getQuickSortAnimations} from '../sort_algo/algo.js';
import './visualizer.css';

const ANIMATION_SPEED_MS = 1;
const NUMBER_OF_ARRAY_BARS = 150;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      isSorting: false,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    if (this.state.isSorting) return; // Prevent resetting if sorting is in progress
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(10, 600));
    }
    this.setState({array});
  }

  mergeSort() {
    this.setState({ isSorting: true });
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
    setTimeout(() => this.setState({ isSorting: false }), animations.length * ANIMATION_SPEED_MS);
  }

  quickSort() {
    this.setState({ isSorting: true });
    const animations = getQuickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      let [pivotBar, compBar, change] = animations[i];
      if (!change) {
        const pivotBarStyle = arrayBars[pivotBar].style;
        const compBarStyle = arrayBars[compBar].style;
        const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          pivotBarStyle.backgroundColor = color;
          compBarStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const pivotBarStyle = arrayBars[pivotBar].style;
          pivotBarStyle.height = `${compBar}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    setTimeout(() => this.setState({ isSorting: false }), animations.length * ANIMATION_SPEED_MS);
  }

  heapSort() {
    this.setState({ isSorting: true });
    const animations = getHeapSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      let [barOne, barTwo, change] = animations[i];
      if (!change) {
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
    setTimeout(() => this.setState({ isSorting: false }), animations.length * ANIMATION_SPEED_MS);
  }

  bubbleSort() {
    this.setState({ isSorting: true });
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      let [barOne, barTwo, change] = animations[i];
      if (!change) {
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
    setTimeout(() => this.setState({ isSorting: false }), animations.length * ANIMATION_SPEED_MS);
  }

  render() {
    const {array, isSorting} = this.state;

    return (
      <div className="sorting-visualizer-container">
        <div className="buttons-container">
          <button
            onClick={() => this.resetArray()}
            disabled={isSorting}
            style={{ backgroundColor: isSorting ? 'grey' : 'initial' }}
          >
            Generate New Array
          </button>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.quickSort()}>Quick Sort</button>
          <button onClick={() => this.heapSort()}>Heap Sort</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        </div>
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
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}