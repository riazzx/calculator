import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    // States for the row sign and the number
    const [rows, setRows] = useState([{ sign: "+", enabled: true }]);
    const [numbers, setNumbers] = useState([""]);

    // function to add rows
    const handleAddRow = () => {
        setRows([...rows, { sign: "+", enabled: true }]);
        setNumbers([...numbers, ""]);
    };

    // function to remove rows
    const handleRemoveRow = (index) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);

        const updatedNumbers = [...numbers];
        updatedNumbers.splice(index, 1);
        setNumbers(updatedNumbers);
    };

    // function to enable/disable rows
    const handleToggleRow = (index) => {
        const updatedRows = [...rows];
        updatedRows[index].enabled = !updatedRows[index].enabled;
        setRows(updatedRows);
    };

    // function to change the signs +/-
    const handleSignChange = (index, value) => {
        const updatedRows = [...rows];
        updatedRows[index].sign = value;
        setRows(updatedRows);
    };

    // function to keep track of the numbers dynamic changes
    const handleNumberChange = (index, value) => {
        const updatedNumbers = [...numbers];
        updatedNumbers[index] = value;
        setNumbers(updatedNumbers);
    };

    // function to calculate the result
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
        <div>
            <nav className="navbar bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand text-white" href="#">
                        React Calculator
                    </a>
                </div>
            </nav>
            <div className="container-fluid mt-5 p-0 roboto-font">
                <h1 className="text-center mb-4">React Calculator</h1>
                <div className="p-4">
                    <button
                        className="btn btn-primary btn-lg mb-3"
                        onClick={handleAddRow}
                    >
                        Add Row
                    </button>
                    {rows.map((row, index) => (
                        <div className="row mb-3 text-center" key={index}>
                            <div className="col-md-2">
                                {/* inout to select sign */}
                                <select
                                    className="form-select text-center"
                                    value={row.sign}
                                    onChange={(e) =>
                                        handleSignChange(index, e.target.value)
                                    }
                                >
                                    <option value="+">+</option>
                                    <option value="-">-</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                {/* input to accept numbers */}
                                <input
                                    type="number"
                                    className="form-control"
                                    value={numbers[index]}
                                    onChange={(e) =>
                                        handleNumberChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="col-md-1">
                                {/* button to enable/disable row */}
                                <button
                                    className={`btn ${
                                        row.enabled
                                            ? "btn-success"
                                            : "btn-secondary"
                                    }`}
                                    onClick={() => handleToggleRow(index)}
                                >
                                    {row.enabled ? "Enabled" : "Disabled"}
                                </button>
                            </div>
                            <div className="col-md-1">
                                {/* button to remove row */}
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleRemoveRow(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* show result automatically using calculateResult function */}
                <div className="container-fluid text-bg-success p-4">
                    <h2 className="text-center">Result: {calculateResult()}</h2>
                </div>
            </div>
        </div>
    );
}

export default App;
