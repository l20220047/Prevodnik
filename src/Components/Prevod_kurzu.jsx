import React, { useState, useEffect } from 'react';

const Prevod_kurzu = () => {
  const [cislo, setCislo] = useState(0);  // Stav pro částku
  const [kurzy, setKurzy] = useState({}); // Stav pro kurzy
  const [currency, setCurrency] = useState('USD'); // Stav pro vybranou měnu
  const [result, setResult] = useState(null); // Stav pro výsledek převodu

  // Načítání kurzů z API
  const getKurzy = async () => {
    try {
      const response = await fetch('https://api.frankfurter.dev/v1/latest?base=EUR');
      const data = await response.json();
      setKurzy(data.rates); // Uložení směnných kurzů do stavu
    } catch (error) {
      console.error('Chyba při načítání kurzů:', error);
    }
  };

  // Spuštění funkce při načítání komponenty
  useEffect(() => {
    getKurzy();
  }, []);

  // Funkce pro výpočet převodu
  const handleConvert = () => {
    if (kurzy[currency]) {
      setResult(cislo * kurzy[currency]);
    }
  };

  return (
    <div>
      <h1>Převod EUR do jiné měny</h1>
      <div>
        <label>Částka (EUR): </label>
        <input
          type="number"
          value={cislo}
          onChange={(e) => setCislo(e.target.value)}
          style={{ padding: '5px' }}
        />
      </div>
      <div>
        <label>Vyber měnu:</label>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          {/* Dynamicky generujeme měny na základě získaných kurzů */}
          {Object.keys(kurzy).map((currencyCode) => (
            <option key={currencyCode} value={currencyCode}>
              {currencyCode}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={handleConvert}>Převeď</button>
      </div>
      {result !== null && (
        <div>
          <h3>Výsledek: {result.toFixed(2)} {currency}</h3>
        </div>
      )}
    </div>
  );
};

export default Prevod_kurzu;
