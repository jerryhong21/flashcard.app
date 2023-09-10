import './App.css';
import React, { useState, useEffect } from 'react';
import FlashcardList from './FlashcardList';
import axios from 'axios';


const apiUrl = "https://opentdb.com/api.php?amount=10";

export default function App() {

  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);
  useEffect(() => {
    axios
    .get(apiUrl)
    .then(res => {
      setFlashcards(
        res.data.results.map((question, questionIndex) => {
          const options = [...question.incorrect_answers, question.correct_answer]
          return {
            id: questionIndex,
            question: question.question,
            options: options.sort(() => Math.random() - 0.5),
            answer: question.correct_answer,
          }
        })
      )
    });
    
  }, [])

  console.log(flashcards);



  return (
    <div className='App'>
      <FlashcardList flashcards={flashcards}/>
    </div>
  );
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: 'Which is the best looking',
    options: [
      'Lizzie',
      'da queen',
      'meghan markle',
      'harvey specter'
    ],
    answer: 'harvey specter',
  },
  {
    id: 2,
    question: 'Which is the worst looking',
    options: [
      'Lizzie',
      'no one',
      'meghan markle',
      'harvey specter'
    ],
    answer: 'no one',
  }
]

