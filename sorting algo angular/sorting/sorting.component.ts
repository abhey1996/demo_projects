import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent implements OnInit {

  constructor() { }

  timeOutSpeed = 10
  randoms = []
  length = 100
  maxNumber = 400
  animations = []

  ngOnInit() {
    this.reset()
  }

  reset() {
    this.randomArray()
  }

  sort_Radix() {
    this.animations = []
    let secondArr = this.randoms.slice()
    this.radixSort(secondArr)
    console.log(this.randoms, secondArr)
    let boxes = document.getElementsByClassName('array')
    for (let i = 0; i < this.animations.length; i++) {
      let color = i % 3 == 0 ? 'blue' : 'red'
      if (i % 3 != 2) {
        setTimeout(() => {
          if (color == 'red') {
            if (boxes[this.animations[i].one].classList.contains('blue')) {
              boxes[this.animations[i].one].classList.remove('blue')
            }
            boxes[this.animations[i].one].classList.add(color)
          } else if (color == 'blue') {
            if (boxes[this.animations[i].one].classList.contains('red')) {
              boxes[this.animations[i].one].classList.remove('red')
            }
            boxes[this.animations[i].one].classList.add(color)
          }
        }, i * this.timeOutSpeed)
      } else {
        setTimeout(() => {
          boxes[this.animations[i].one].setAttribute('style', `height:${this.animations[i].two}px`)
        }, i * this.timeOutSpeed)
      }

    }
  }

  radixSort(array) {
    let max = String(Math.max(...array)).length

    for (let i = 0; i < max; i++) {
      let buckets = Array.from({ length: 10 }, () => [])

      for (let j = 0; j < array.length; j++) {
        let num = this.getNum(array[j], i)

        if (num !== undefined) buckets[num].push(array[j])
      }
      let k = 0
      for (let j = 0; j < buckets.length; j++) {
        let ind = 0
        while (buckets[j].length > ind) {
          this.animations.push({ one: k, two: k })
          this.animations.push({ one: k, two: k })
          this.animations.push({ one: k, two: buckets[j][ind] })
          array[k++] = buckets[j][ind++]
        }
      }
    }

  }

  getNum(num, index) {
    let str = String(num)
    let found = str[str.length - 1 - index]
    if (found == undefined) return 0
    return found
  }

  sort_Quick() {
    this.animations = []
    let secondArr = this.randoms.slice()
    this.quickSort(secondArr, 0, secondArr.length - 1)
    this.animator()
  }

  quickSort(array, left, right) {
    let index = this.partition(array, left, right)

    if (left < index - 1) {
      this.quickSort(array, left, index - 1)
    }
    if (index < right) {
      this.quickSort(array, index, right)
    }
  }

  partition(array, left, right) {
    let pivot = array[Math.floor((right + left) / 2)]
    let i = left
    let j = right

    while (i <= j) {
      while (array[i] < pivot) {
        i++
      }
      while (pivot < array[j]) {
        j--
      }
      if (i <= j) {
        this.animations.push({ one: i, two: j })
        this.animations.push({ one: i, two: j })
        this.animations.push({ one: array[i], two: array[j] })
        let tmp = array[i]
        array[i] = array[j]
        array[j] = tmp
        i++
        j--
      }
    }
    return i
  }

  sort_Counting() {
    this.animations = []
    let secondArr = this.randoms.slice()
    this.countingSort(secondArr)
    let boxes = document.getElementsByClassName('array')
    for (let i = 0; i < this.animations.length; i++) {
      let color = i % 3 == 0 ? 'blue' : 'red'
      if (i % 3 != 2) {
        setTimeout(() => {
          if (color == 'red') {
            if (boxes[this.animations[i].one].classList.contains('blue')) {
              boxes[this.animations[i].one].classList.remove('blue')
            }
            boxes[this.animations[i].one].classList.add(color)
          } else if (color == 'blue') {
            if (boxes[this.animations[i].one].classList.contains('red')) {
              boxes[this.animations[i].one].classList.remove('red')
            }
            boxes[this.animations[i].one].classList.add(color)
          }
        }, i * this.timeOutSpeed)
      } else {
        setTimeout(() => {
          boxes[this.animations[i].one].setAttribute('style', `height:${this.animations[i].two}px`)
        }, i * this.timeOutSpeed)
      }

    }
  }

  countingSort(array) {
    let min = Math.min(...array)
    let max = Math.max(...array)
    let count = []

    for (let i = min; i <= max; i++) {
      count[i] = 0
    }

    for (let i = 0; i < array.length; i++) {
      count[array[i]]++
    }

    let z = 0
    for (let i = min; i <= max; i++) {
      while (count[i] != 0) {
        this.animations.push({ one: z, two: z })
        this.animations.push({ one: z, two: z })
        this.animations.push({ one: z, two: i })
        array[z++] = i
        count[i]--;
      }
    }

  }

  sort_Insertion() {
    this.animations = []
    let secondArr = this.randoms.slice()
    this.insertionSort(secondArr)
    let boxes = document.getElementsByClassName('array')
    for (let i = 0; i < this.animations.length; i++) {
      let color = i % 3 == 0 ? 'blue' : 'red'
      if (i % 3 != 2) {
        setTimeout(() => {
          if (color == 'red') {
            if (boxes[this.animations[i].one].classList.contains('blue')) {
              boxes[this.animations[i].one].classList.remove('blue')
            }
            if (boxes[this.animations[i].two].classList.contains('blue')) {
              boxes[this.animations[i].two].classList.remove('blue')
            }
            boxes[this.animations[i].one].classList.add(color)
            boxes[this.animations[i].two].classList.add(color)
          } else if (color == 'blue') {
            if (boxes[this.animations[i].one].classList.contains('red')) {
              boxes[this.animations[i].one].classList.remove('red')
            }
            if (boxes[this.animations[i].two].classList.contains('red')) {
              boxes[this.animations[i].two].classList.remove('red')
            }
            boxes[this.animations[i].one].classList.add(color)
            boxes[this.animations[i].two].classList.add(color)
          }

        }, i * this.timeOutSpeed)
      } else {
        setTimeout(() => {
          if (`height:${secondArr[this.animations[i - 1].one]}px` == boxes[this.animations[i - 1].one].getAttribute('style')) { }
          else {
            boxes[this.animations[i - 1].one].setAttribute('style', `height:${this.animations[i].two}px`)
          }
          if (`height:${secondArr[this.animations[i - 1].two]}px` == boxes[this.animations[i - 1].two].getAttribute('style')) { }
          else {
            boxes[this.animations[i - 1].two].setAttribute('style', `height:${this.animations[i].one}px`)
          }
          // if (boxes[this.animations[i - 1].two].getAttribute('style').includes(`${secondArr[`${[this.animations[i - 1].two]}`]}px`)) {}

        }, i * this.timeOutSpeed)
      }
    }
  }

  insertionSort(array) {

    for (let i = 1; i < array.length; i++) {
      let key = array[i]
      let j = i - 1
      while (j >= 0 && array[j] > key) {

        this.animations.push({ one: j + 1, two: j })
        this.animations.push({ one: j + 1, two: j })
        this.animations.push({ one: array[j + 1], two: array[j] })
        array[j + 1] = array[j]
        j--
      }

      this.animations.push({ one: j + 1, two: i })
      this.animations.push({ one: j + 1, two: i })
      this.animations.push({ one: array[j + 1], two: key })

      array[j + 1] = key
    }

  }

  sort_Selection() {
    this.animations = []
    let secondArr = this.randoms.slice()
    this.selectionSort(secondArr)
    this.animator()
  }

  selectionSort(array) {
    let min_index;

    for (let i = 0; i < array.length - 1; i++) {
      min_index = i

      for (let j = i + 1; j < array.length; j++) {

        if (array[j] < array[min_index]) {
          min_index = j
        }
      }
      this.animations.push({ one: min_index, two: i })
      this.animations.push({ one: min_index, two: i })
      this.animations.push({ one: array[min_index], two: array[i] })
      let tmp = array[min_index]
      array[min_index] = array[i]
      array[i] = tmp
    }
  }

  sort_Heap() {
    this.animations = []
    let secondArr = this.randoms.slice()
    this.heapSort(secondArr)
    this.animator()
  }

  heapSort(array) {
    let length = array.length

    for (let i = Math.floor(length / 2); i >= 0; i -= 1) {
      this.heapify(array, length, i)
    }

    for (let i = array.length - 1; i > 0; i--) {
      this.animations.push({ one: i, two: 0 })
      this.animations.push({ one: i, two: 0 })
      this.animations.push({ one: array[i], two: array[0] })
      let tmp = array[i]
      array[i] = array[0]
      array[0] = tmp
      length--;
      this.heapify(array, i, 0)
    }
  }

  heapify(array, length, i) {
    let left = 2 * i + 1
    let right = 2 * i + 2
    let max = i

    if (left < length && array[left] > array[max]) {
      max = left
    }
    if (right < length && array[right] > array[max]) {
      max = right
    }

    if (max != i) {
      this.animations.push({ one: i, two: max })
      this.animations.push({ one: i, two: max })
      this.animations.push({ one: array[i], two: array[max] })
      let tmp = array[i]
      array[i] = array[max]
      array[max] = tmp
      this.heapify(array, length, max)
    }
  }

  sort_Bubble() {
    this.animations = []
    let secondArr = this.randoms.slice()
    this.bubbleSort(secondArr)
    this.animator();
  }

  bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          this.animations.push({ one: j, two: j + 1 })
          this.animations.push({ one: j, two: j + 1 })
          this.animations.push({ one: arr[j], two: arr[j + 1] })
          let tmp = arr[j]
          arr[j] = arr[j + 1]
          arr[j + 1] = tmp
        }
      }
    }
  }

  sort_Merge() {
    this.animations = []
    let secondArr = this.randoms.slice()
    let arr = this.randoms.slice()
    let result = this.mergeSort(arr, 0, this.randoms.length - 1, secondArr)
    let boxes = document.getElementsByClassName('array')
    for (let i = 0; i < this.animations.length; i++) {
      let color = i % 3 == 0 ? 'blue' : 'red'
      if (i % 3 != 2) {
        setTimeout(() => {
          if (color == 'red') {
            if (boxes[this.animations[i].one].classList.contains('blue')) {
              boxes[this.animations[i].one].classList.remove('blue')
            }
            boxes[this.animations[i].one].classList.add(color)
          } else if (color == 'blue') {
            if (boxes[this.animations[i].one].classList.contains('red')) {
              boxes[this.animations[i].one].classList.remove('red')
            }
            boxes[this.animations[i].one].classList.add(color)
          }
        }, i * this.timeOutSpeed)
      } else {
        setTimeout(() => {
          boxes[this.animations[i].one].setAttribute('style', `height:${this.animations[i].two}px`)
        }, i * this.timeOutSpeed)
      }

    }
  }

  mergeSort(MainArr, start, end, secondArr) {
    if (start === end) return;
    let middle = Math.floor((start + end) / 2)
    this.mergeSort(secondArr, start, middle, MainArr)
    this.mergeSort(secondArr, middle + 1, end, MainArr)
    return this.merge(MainArr, start, middle, end, secondArr)
  }

  merge(MainArr, start, middle, end, secondArr) {
    let k = start, i = start, j = middle + 1
    while (i <= middle && j <= end) {
      if (secondArr[i] <= secondArr[j]) {
        this.animations.push({ one: k, two: i })
        this.animations.push({ one: k, two: i })
        this.animations.push({ one: k, two: secondArr[i] })
        MainArr[k++] = secondArr[i++]
      } else {
        this.animations.push({ one: k, two: j })
        this.animations.push({ one: k, two: j })
        this.animations.push({ one: k, two: secondArr[j] })
        MainArr[k++] = secondArr[j++]
      }
    }
    while (i <= middle) {
      this.animations.push({ one: i, two: i })
      this.animations.push({ one: i, two: i })
      this.animations.push({ one: k, two: secondArr[i] })
      MainArr[k++] = secondArr[i++]
    }
    while (j <= end) {
      this.animations.push({ one: j, two: j })
      this.animations.push({ one: j, two: j })
      this.animations.push({ one: k, two: secondArr[j] })
      MainArr[k++] = secondArr[j++]
    }
    return MainArr
  }

  animator() {
    let boxes = document.getElementsByClassName('array')
    for (let i = 0; i < this.animations.length; i++) {
      let color = i % 3 == 0 ? 'blue' : 'red'
      if (i % 3 != 2) {
        setTimeout(() => {
          if (color == 'red') {
            if (boxes[this.animations[i].one].classList.contains('blue')) {
              boxes[this.animations[i].one].classList.remove('blue')
            }
            if (boxes[this.animations[i].two].classList.contains('blue')) {
              boxes[this.animations[i].two].classList.remove('blue')
            }
            boxes[this.animations[i].one].classList.add(color)
            boxes[this.animations[i].two].classList.add(color)
          } else if (color == 'blue') {
            if (boxes[this.animations[i].one].classList.contains('red')) {
              boxes[this.animations[i].one].classList.remove('red')
            }
            if (boxes[this.animations[i].two].classList.contains('red')) {
              boxes[this.animations[i].two].classList.remove('red')
            }
            boxes[this.animations[i].one].classList.add(color)
            boxes[this.animations[i].two].classList.add(color)
          }
        }, i * this.timeOutSpeed)
      } else {
        setTimeout(() => {
          boxes[this.animations[i - 1].one].setAttribute('style', `height:${this.animations[i].two}px`)
          boxes[this.animations[i - 1].two].setAttribute('style', `height:${this.animations[i].one}px`)
          // if (boxes[this.animations[i - 1].two].getAttribute('style').includes(`${secondArr[`${[this.animations[i - 1].two]}`]}px`)) {}
        }, i * this.timeOutSpeed)
      }
    }
  }

  randomArray() {
    this.randoms = []
    for (let i = 0; i < this.length; i++) {
      this.randoms.push(this.randomGenerator(5, this.maxNumber))
    }
    let boxes = document.getElementsByClassName('array')
    setTimeout(() => {
      for (let i = 0; i < this.length; i++) {
        boxes[i].setAttribute('style', `height:${this.randoms[i]}px`)
        if (boxes[i].classList.contains('blue')) boxes[i].classList.remove('blue')
        if (boxes[i].classList.contains('purple')) boxes[i].classList.remove('purple')
        boxes[i].classList.add('red')
      }
    }, 10)

  }

  randomGenerator(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

}
