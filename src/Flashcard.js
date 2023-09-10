import React, {useState} from 'react';
import './Flashcard.css';


// interface Flashcard {
//   id: number,
//   question: string,
//   options: string[] | number[],
//   correct_answer: string | number,
//   thumbnail: string,
// }



export default function Flashcard({flashcard}) {

  const [flip, setFlip] = useState(false);

  return (
    <div 
      className={`card ${flip ? 'flip' : ''}`}
      onClick={() => setFlip(!flip)}
    >
      <div className='front'>
        {flashcard.question}
        <div className='flashcard-options'>
          {flashcard.options.map((option) => {
            return <div className='flashcard-option'>{option}</div>
          })}
        </div>
      </div>
      <div className='back'>{flashcard.answer}</div>
      {/* {flip ? flashcard.answer : flashcard.question} */}
    </div>
  )
}
