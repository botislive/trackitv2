import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { filterbyyearAtom } from '../atoms';


const YearDropdown = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
   const [,setfilterbyyear]=useAtom(filterbyyearAtom)

  // Generate an array of years (e.g., from 1926 to 2026)
  const years = Array.from(new Array(101), (val, index) => currentYear - index);

  const handleChange = (event) => {
    setSelectedYear(event.target.value);
    console.log("Selected Year:", event.target.value);
  };

  const buttonHandler=()=>{
    if (selectedYear) {
      setfilterbyyear(selectedYear);
  }

    console.log("Selected Year:", selectedYear);
  }


  return (
               <>
                   <div style={{ padding: '20px' }}>
      <label htmlFor="year-select" style={{ marginRight: '10px' }}>
        Select Year:
      </label>
      <select 
        id="year-select" 
        value={selectedYear} 
        onChange={handleChange}
        style={{ padding: '5px', borderRadius: '4px' }}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
               <div>
                <button onClick={buttonHandler}>Submit</button>
               </div>
               </>
  );
};

export default YearDropdown;