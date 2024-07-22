import React, { useState } from 'react';
import '../../styles/gkiCalculator.scss';

const GkiCalculator: React.FC = () => {
  const [glucose, setGlucose] = useState<string>('');
  const [glucoseUnit, setGlucoseUnit] = useState<string>('mmol');
  const [ketone, setKetone] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const calculateGKI = () => {
    let glucoseValue = parseFloat(glucose);
    const ketoneValue = parseFloat(ketone);

    if (isNaN(glucoseValue) || isNaN(ketoneValue) || ketoneValue <= 0) {
        setResult('Please enter valid values for glucose and ketone, and ensure ketone is greater than 0.');
        return;
      }
      
    if (glucoseUnit === 'mgdl') {
      glucoseValue = glucoseValue / 18; // Convert mg/dl to mmol/L
    }

    if (ketoneValue <= 0) {
      setResult('Ketone value must be greater than 0.');
      return;
    }

    const gki = glucoseValue / ketoneValue;
    setResult(`GKI: ${gki.toFixed(2)}`);
  };

  return (
    <div className="container">
      <div className="form-group">
        <label htmlFor="glucose">Glucose:</label>
        <input
          type="number"
          id="glucose"
          step="any"
          placeholder="Enter Glucose level"
          value={glucose}
          onChange={(e) => setGlucose(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="glucose-unit">Unit:</label>
        <select
          id="glucose-unit"
          value={glucoseUnit}
          onChange={(e) => setGlucoseUnit(e.target.value)}
          required
        >
          <option value="mmol">mmol/L</option>
          <option value="mgdl">mg/dl</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="ketone">Ketone (mmol/L):</label>
        <input
          type="number"
          id="ketone"
          step="any"
          placeholder="Enter Ketone level"
          value={ketone}
          onChange={(e) => setKetone(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <button onClick={calculateGKI}>Calculate GKI</button>
      </div>
      <div className="result" id="result" dangerouslySetInnerHTML={{ __html: result }}></div>
    </div>
  );
};

export default GkiCalculator;