import React, { useState } from "react";

function Square({ isChecked, onClick, isTopicalBreadth }) {
  const squareClass = isChecked // checks whether checkbox is checked
    ? isTopicalBreadth // checks whether SE, SS, or AH column
      ? "square topical breadth"
      : "square core literacies"
    : "square unchecked";

  return <div className={squareClass} onClick={onClick}></div>;
}

function TextBox({ value, onChange }) {
  return <input type="text" value={value} onChange={onChange} />;
}

export default function GEVisualizer() {
  // State variables for textboxes and checkboxes
  const [rows, setRows] = useState([
    {
      className: "",
      checkboxes: Array(11).fill(false)
    }
  ]);

  // Handles changes in Class Name textboxes
  const handleClassNameChange = (e, index) => {
    const newRows = [...rows]; //creates copy of current rows state
    newRows[index].className = e.target.value; //updates Class Name at given index
    setRows(newRows); //re-renders component
  };

  // Handles clicking checkboxes
  const handleCheckboxClick = (rowIndex, columnIndex) => {
    const newRows = [...rows]; //creates copy of current rows state
    newRows[rowIndex].checkboxes[columnIndex] = !newRows[rowIndex].checkboxes[
      columnIndex
    ]; //sets checkbox value to its boolean opposite
    setRows(newRows); //re-renders component
  };

  // Function to create a new row
  const addRow = () => {
    const newRow = {
      className: "",
      checkboxes: Array(11).fill(false)
    };
    const newRows = [...rows, newRow];
    setRows(newRows);
  };

  // Function to remove a row
  const removeRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  return (
    <div>
      <h1>UC Davis GE Visualizer</h1>
      <table>
        <thead>
          <tr>
            <th> </th>
            <th>Class Name</th>
            <th>SE</th>
            <th>SS</th>
            <th>AH</th>
            <th>WE</th>
            <th>OL</th>
            <th>VL</th>
            <th>DD</th>
            <th>ACGH</th>
            <th>WC</th>
            <th>QL</th>
            <th>SL</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                {/* remove row button */}
                <button
                  onClick={() => removeRow(rowIndex)}
                  className="button style"
                >
                  x
                </button>
              </td>

              <td>
                {/* class name textbox */}
                <TextBox
                  value={row.className}
                  onChange={(e) => handleClassNameChange(e, rowIndex)}
                />
              </td>

              {/* checkboxes */}
              {row.checkboxes.map((isChecked, columnIndex) => (
                <td key={columnIndex}>
                  <Square
                    isChecked={isChecked}
                    onClick={() => handleCheckboxClick(rowIndex, columnIndex)}
                    isTopicalBreadth={
                      columnIndex === 0 ||
                      columnIndex === 1 ||
                      columnIndex === 2
                    } // Check if SE, SS, or AH column
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* add row button */}
      <table>
        <thead>
          <tr>
            <td>
              <button onClick={addRow} className="button style">
                +
              </button>
            </td>
          </tr>
        </thead>
      </table>
    </div>
  );
}
