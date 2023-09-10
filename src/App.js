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
          const options = [...question.incorrect_answers.map(answer => decodeSting(answer)), decodeSting(question.correct_answer)]
          return {
            id: `${questionIndex}-${Date.now()}`,
            question: decodeSting(question.question),
            options: options.sort(() => Math.random() - 0.5),
            answer: question.correct_answer,
          }
        })
      )
    });
    
  }, [])


  return (
    <div className='App'> 
      <div className='containers'>
        <FlashcardList flashcards={flashcards}/>
      </div>
    </div>
  );
}

// Remove HTML code in strings
function decodeSting(str) {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = str;
  return textArea.value;
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

