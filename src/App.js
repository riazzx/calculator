import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    const [rows, setRows] = useState([{ sign: "+", enabled: true }]);
    const [numbers, setNumbers] = useState([""]);

    const handleAddRow = () => {
        setRows([...rows, { sign: "+", enabled: true }]);
        setNumbers([...numbers, ""]);
    };

    const handleRemoveRow = (index) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);

        const updatedNumbers = [...numbers];
        updatedNumbers.splice(index, 1);
        setNumbers(updatedNumbers);
    };

    const handleToggleRow = (index) => {
        const updatedRows = [...rows];
        updatedRows[index].enabled = !updatedRows[index].enabled;
        setRows(updatedRows);
    };

    const handleSignChange = (index, value) => {
        const updatedRows = [...rows];
        updatedRows[index].sign = value;
        setRows(updatedRows);
    };

    const handleNumberChange = (index, value) => {
        const updatedNumbers = [...numbers];
        updatedNumbers[index] = value;
        setNumbers(updatedNumbers);
    };

    const calculateResult = () => {
        let result = 0;
        rows.forEach((row, index) => {
            if (row.enabled && numbers[index] !== "") {
                const value =
                    row.sign === "+"
                        ? parseFloat(numbers[index])
                        : -parseFloat(numbers[index]);
                result += value;
            }
        });
        return result;
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">React Calculator</h1>
            <button className="btn btn-primary mb-3" onClick={handleAddRow}>
                Add Row
            </button>
            {rows.map((row, index) => (
                <div className="row mb-3" key={index}>
                    <div className="col">
                        <select
                            className="form-select"
                            value={row.sign}
                            onChange={(e) =>
                                handleSignChange(index, e.target.value)
                            }
                        >
                            <option value="+">+</option>
                            <option value="-">-</option>
                        </select>
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            className="form-control"
                            value={numbers[index]}
                            onChange={(e) =>
                                handleNumberChange(index, e.target.value)
                            }
                        />
                    </div>
                    <div className="col">
                        <button
                            className={`btn ${
                                row.enabled ? "btn-success" : "btn-secondary"
                            }`}
                            onClick={() => handleToggleRow(index)}
                        >
                            {row.enabled ? "Enabled" : "Disabled"}
                        </button>
                    </div>
                    <div className="col">
                        <button
                            className="btn btn-danger"
                            onClick={() => handleRemoveRow(index)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
            <h2 className="text-center">Result: {calculateResult()}</h2>
        </div>
    );
}

export default App;
