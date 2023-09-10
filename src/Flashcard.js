import React, { useState, useRef, useEffect } from 'react';
import './Flashcard.css';


// to set dynamically changing heights
// use useEffect to set max height for all the elements everytime they change, and everytime on start, use an event listener
// to dynamically keep track of the front and back element we use useRef, we could also use useState but useRefs do the same job without rerendering everytime

const optionIndexes = ['A', 'B', 'C', 'D'];
export default function Flashcard({ flashcard }) {

  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState();

  const frontElement = useRef();
  const backElement = useRef();

  function setMaxHeight() {
    const frontHeight = frontElement.current.getBoundingClientRect().height
    const backHeight = backElement.current.getBoundingClientRect().height
    setHeight(Math.max(frontHeight, backHeight, 100));

  }

  useEffect(() => {

  }, [])


  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      onClick={() => setFlip(!flip)}
    >
      <div ref={frontElement} className='front'>
        {flashcard.question}
        <div className='flashcard-options'>
          {flashcard.options.map((option, index) => {
            return <div className='flashcard-option'>{`${optionIndexes[index]}: ${option}`}</div>
          })}
        </div>
      </div>
      <div className='back' ref={backElement}>
        {`${optionIndexes[flashcard.options.findIndex((option) => option === flashcard.answer)]}: ${flashcard.answer}`}
      </div>
    </div>
  )
}
