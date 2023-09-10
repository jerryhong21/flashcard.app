import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './FlashcardList';
import axios from 'axios';

const defaultUrl = "https://opentdb.com/api.php?amount=10";
const getCategoryUrl = "https://opentdb.com/api_category.php";
const apiUrl = "https://opentdb.com/api.php";

export default function App() {

  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);

  const categoryEl = useRef();
  const amountEl = useRef();

  // Generate default questions
  useEffect(() => {
    axios
      .get(defaultUrl)
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

  useEffect(() => {
    axios
      .get(getCategoryUrl)
      .then(res => setCategories(res.data.trivia_categories))
  });

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get(apiUrl, {
        params: {
          categpry: categoryEl.current.value,
          amount: amountEl.current.value,
        }
      })
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
    // request url here using params

  }


  return (
    <div className='App'>
      <form className='header' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='category'>Category</label>
          <select id='category' ref={categoryEl}>
            {categories.map(c => {
              return <option value={c.name} key={c.id}>{c.name}</option>
            })}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='amount'>Number of questions</label>
          <input type="number" id="amount" min={1} step={1} defaultValue={10} ref={amountEl}></input>
        </div>
        <div className='form-group'>
          <button className='btn'>Generate</button>
        </div>
      </form>
      <div className='container'>
        <FlashcardList flashcards={flashcards} />
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


// const SAMPLE_FLASHCARDS = [
//   {
//     id: 1,
//     question: 'Which is the best looking',
//     options: [
//       'Lizzie',
//       'da queen',
//       'meghan markle',
//       'harvey specter'
//     ],
//     answer: 'harvey specter',
//   },
//   {
//     id: 2,
//     question: 'Which is the worst looking',
//     options: [
//       'Lizzie',
//       'no one',
//       'meghan markle',
//       'harvey specter'
//     ],
//     answer: 'no one',
//   }
// ]

