var descriptionInput = document.getElementById('description');
var amountInput = document.getElementById('amount');
var dateInput = document.getElementById('date');
var mainBtn = document.getElementById('mainBtn');

// Initialize an array to store expenses
var expenses = [];

// Load expenses from local storage if available
if(localStorage.getItem('expenses') !== null) {
    expenses = JSON.parse(localStorage.getItem('expenses'));
    displayExpenses(expenses);
}

// Function to add expense
function addExpense() {
    // Validation
    if(descriptionInput.value.trim() === '' || isNaN(amountInput.value) || dateInput.value === '') {
        alert('Please fill out all fields correctly.');
        return;
    }

    // Add expense
    var expense = {
        description: descriptionInput.value,
        amount: parseFloat(amountInput.value),
        date: dateInput.value
    };

    expenses.push(expense);

    // Update local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Update UI
    displayExpenses(expenses);

    // Clear input fields
    clearFields();
}

// Function to display expenses in table
function displayExpenses(expenses) {
    var tableRows = '';
    expenses.forEach(function(expense, index) {
        tableRows += `
            <tr>
                <td>${index + 1}</td>
                <td>${expense.description}</td>
                <td>${expense.amount}</td>
                <td>${expense.date}</td>
                <td><button onclick="editExpense(${index})" class="btn btn-secondary">Edit</button></td>
                <td><button onclick="deleteExpense(${index})" class="btn btn-danger">Delete</button></td>
            </tr>
        `;
    });
    document.getElementById('expenseRows').innerHTML = tableRows;
}

// Function to clear input fields
function clearFields() {
    descriptionInput.value = '';
    amountInput.value = '';
    dateInput.value = '';
}

// Function to delete an expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses(expenses);
}

// Function to edit an expense
function editExpense(index) {
    var expense = expenses[index];
    descriptionInput.value = expense.description;
    amountInput.value = expense.amount;
    dateInput.value = expense.date;
    mainBtn.innerHTML = 'Update Expense';
    // Set a temporary variable to track the index of the expense being edited
    mainBtn.onclick = function() {
        updateExpense(index);
    };
}

// Function to update an expense
function updateExpense(index) {
    expenses[index] = {
        description: descriptionInput.value,
        amount: parseFloat(amountInput.value),
        date: dateInput.value
    };
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses(expenses);
    mainBtn.innerHTML = 'Add Expense';
    // Reset the click event handler to addExpense function
    mainBtn.onclick = addExpense;
}

// Function for searching expenses
function searchOnExpenses(query) {
    var searchResult = expenses.filter(function(expense) {
        return expense.description.toLowerCase().includes(query.toLowerCase());
    });
    displayExpenses(searchResult);
}

