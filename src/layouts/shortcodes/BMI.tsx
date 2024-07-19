import { useState } from 'react';

const BMI = () => {
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');

  const calculateBmi = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const form = event.currentTarget;
    const height = parseFloat(form.height.value) / 100; // convert height to meters
    const weight = parseFloat(form.weight.value);
    
    if (weight > 0 && height > 0) {
      const calculatedBmi = weight / (height * height);
      let bmiCategory = '';

      if (calculatedBmi < 18.5) {
        bmiCategory = 'Underweight';
      } else if (calculatedBmi >= 18.5 && calculatedBmi <= 24.9) {
        bmiCategory = 'Normal weight';
      } else if (calculatedBmi >= 25 && calculatedBmi <= 29.9) {
        bmiCategory = 'Overweight';
      } else {
        bmiCategory = 'Obese';
      }

      setBmi(calculatedBmi);
      setCategory(bmiCategory);
    } else {
      alert('Please enter valid values for weight and height.');
    }
  };

  return (
    <div className="container">
      <h2>Calculate Your BMI</h2>
      <form onSubmit={calculateBmi}>
        <label htmlFor="height">Height (cm):</label>
        <input type="number" id="height" name="height" step="0.1" required placeholder="Enter your height" />
        <label htmlFor="weight">Weight (kg):</label>
        <input type="number" id="weight" name="weight" step="0.1" required placeholder="Enter your weight" />
        <input type="submit" value="Calculate BMI" />
      </form>
      <div className={`result ${category.toLowerCase()}`}>
        {bmi !== null && <strong>Your BMI:</strong>} {bmi?.toFixed(1)} {category && `(${category})`}
      </div>
    </div>
  );
};

export default BMI;