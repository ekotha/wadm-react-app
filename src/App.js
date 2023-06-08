import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [criteria, setCriteria] = useState([]);
  const [weights, setWeights] = useState([]);
  const [options, setOptions] = useState([]);
  const [optionTotalScores, setOptionTotalScores] = useState([]);

  const addCriteria = (event) => {
    event.preventDefault();
    const criteriaInput = event.target.elements.criteria.value;
    if (criteriaInput) {
      setCriteria((prevCriteria) => [...prevCriteria, criteriaInput]);
      setWeights((prevWeights) => [...prevWeights, 0]);
      event.target.reset();
    }
  };

  const addOption = (event) => {
    event.preventDefault();
    const optionInput = event.target.elements.option.value;
    if (optionInput) {
      setOptions((prevOptions) => [...prevOptions, optionInput]);
      event.target.reset();
    }
  };

  const updateWeight = (index, weight) => {
    setWeights((prevWeights) =>
      prevWeights.map((prevWeight, i) => (i === index ? weight : prevWeight))
    );
  };

  const calculateScores = (event) => {
    event.preventDefault();
    const newScores = options.map(() => 0);
    const optionTotalScores = [];

    options.forEach((_, optionIndex) => {
      let optionScore = 0;
      criteria.forEach((_, criteriaIndex) => {
        const score = parseFloat(
          event.target.elements[`score_${optionIndex}_${criteriaIndex}`].value
        );
        if (!isNaN(score)) {
          optionScore += score * weights[criteriaIndex];
        }
      });
      newScores[optionIndex] = optionScore;
      optionTotalScores.push(optionScore.toFixed(2));
    });
  
    setOptionTotalScores(optionTotalScores);
  };
  return (
    <div className='container'>
      <h1 className='containerTitle'>Weighted Average Decision Matrix</h1>
    <div className='internals'>

      <div className='formStyle'>
        <form onSubmit={addCriteria}>
          <label htmlFor="criteria">Criteria:</label>
          <input type="text" id="criteria" name="criteria" />
          <button type="submit">Add Criteria</button>
        </form>
      </div>

      <div className='formStyle'>
        <form onSubmit={addOption}>
          <label htmlFor="option">Option:</label>
          <input type="text" id="option" name="option" />
          <button type="submit">Add Option</button>
        </form>
      </div>
      {/* <div> <h2>Total Score: {totalScore}</h2> </div> */}
      <div className='formStyle'>
        <table>
          <thead>
            <tr>
              <th>Criteria</th>
              {criteria.map((criterion, index) => (
                <th key={index}>
                  <div>{criterion}</div>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    value={weights[index]}
                    onChange={(event) => updateWeight(index, event.target.value)}
                  />
                </th>
              ))}
            </tr>
          </thead>
          {/* <tbody>          </tbody> */}
        </table>
      </div>

      <form className='formStyle' onSubmit={calculateScores}>
        <button className='formStyle' type="submit">Calculate</button>
        {criteria.map((_, criteriaIndex) => (
          <div key={criteriaIndex}>
            {options.map((_, optionIndex) => (
              <div key={optionIndex}>
                <label>
                  Score for {options[optionIndex]} on criteria "{criteria[criteriaIndex]}":
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    name={`score_${optionIndex}_${criteriaIndex}`}
                  />
                </label>
              </div>
            ))}
          </div>
        ))}
      </form>
      <div>
      {options.map((option, index) => (
        <h2 key={index}>
          {option} Total Score: {optionTotalScores[index] || "-"}
        </h2>
      ))}
    </div>

    </div>
    </div>
    
  );
  
};

export default App;
