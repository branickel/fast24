import React, { useState } from 'react';
import '../../styles/bmiCalculator.scss';

const BmiCalculator: React.FC = () => {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height) / 100; // Convert height to meters

    if (weightValue > 0 && heightValue > 0) {
      const bmi = weightValue / (heightValue * heightValue);
      let bmiCategory = '';
      
      if (bmi < 18.5) {
        bmiCategory = 'Underweight';
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        bmiCategory = 'Normal weight';
      } else if (bmi >= 25 && bmi <= 29.9) {
        bmiCategory = 'Overweight';
      } else {
        bmiCategory = 'Obese';
      }

      setResult(`<strong>Your BMI:</strong> ${bmi.toFixed(1)} (${bmiCategory})`);
    } else {
      alert('Please enter valid values for weight and height.');
    }
  };

  return (
    <div className="container">
      <form id="bmiForm" onSubmit={calculateBMI}>
        <div className="form-group">
          <label htmlFor="height">Height (cm):</label>
          <input
            type="number"
            id="height"
            name="height"
            step="0.1"
            required
            placeholder="Enter your height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight (kg):</label>
          <input
            type="number"
            id="weight"
            name="weight"
            step="0.1"
            required
            placeholder="Enter your weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit">Calculate BMI</button>
        </div>
      </form>
      <div className="result" id="result" dangerouslySetInnerHTML={{ __html: result }}></div>
    </div>
  );
};

export default BmiCalculator;