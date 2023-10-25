document.addEventListener('DOMContentLoaded', function() {
// Define an object to store formulas and their results
const formulas = {};

const formulaInput = document.getElementById('formulaInput');
formulaInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the Enter key from adding a new line
        calculateFormula();
    }
});

function calculateFormula() {
    // Get the formula from the input element
    const formula = formulaInput.value;

    // Check if the formula is empty
    if (!formula) {
        alert('Please enter a formula.');
        return;
    }

    try {
        // Split the formula into its components (e.g., "sum(1, 1)" => ["sum", "1", "1"])
        const formulaParts = formula.match(/([a-zA-Z]+)|(\d+)/g);

        // Extract the function name and arguments
        const functionName = formulaParts[0];
        const args = formulaParts.slice(1).map(part => parseFloat(part));

        // Check if the function is supported (e.g., "sum")
        if (functionName === 'sum') {
            // Calculate the result
            const result = args.reduce((total, num) => total + num, 0);

            // Store the formula and result
            formulas[formula] = result;

            // Display the result in the input field
            formulaInput.value = `Result: ${result}`;

            // Update the list of results
            updateResultsList();
        } else {
            alert('Unsupported function: ' + functionName);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function updateResultsList() {
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';

    // Iterate through stored formulas and display them
    for (const formula in formulas) {
        const listItem = document.createElement('li');
        listItem.textContent = formula + ' = ' + formulas[formula];
        resultsList.appendChild(listItem);
    }
}

});