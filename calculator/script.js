// script.js
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    {
        const toggleInput = document.querySelector('.theme-toggle input');
        const body = document.body;
    
        toggleInput.addEventListener('change', () => {
            body.classList.toggle('dark-mode');
        });
    }
    const historyList = document.getElementById('history-list');
    const historyToggle = document.getElementById('history-toggle');
    const historySection = document.getElementById('history');
    const clearHistoryButton = document.getElementById('clear-history-button');
    let currentInput = '0';
    let operator = null;
    let previousInput = null;
    let history = [];

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '0';
                operator = null;
                previousInput = null;
            } else if (value === '=') {
                if (operator && previousInput !== null) {
                    const result = calculate(previousInput, currentInput, operator);
                    addHistory(`${previousInput} ${operator} ${currentInput} = ${result}`);
                    currentInput = result;
                    operator = null;
                    previousInput = null;
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (operator && previousInput !== null) {
                    currentInput = calculate(previousInput, currentInput, operator);
                }
                operator = value;
                previousInput = currentInput;
                currentInput = '0';
            } else if (value === '+/-') {
                currentInput = (parseFloat(currentInput) * -1).toString();
            } else if (value === '%') {
                currentInput = (parseFloat(currentInput) / 100).toString();
            } else {
                if (currentInput === '0') {
                    currentInput = value;
                } else {
                    currentInput += value;
                }
            }

            display.textContent = currentInput;
        });
    });

    historyToggle.addEventListener('click', () => {
        historyList.style.display = historyList.style.display === 'none' ? 'block' : 'none';
    });

    function calculate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);

        switch (operator) {
            case '+':
                return (a + b).toString();
            case '-':
                return (a - b).toString();
            case '*':
                return (a * b).toString();
            case '/':
                return (a / b).toString();
        }
    }

    function addHistory(entry) {
        history.push(entry);
        updateHistory();
    }

    function clearHistory() {
        history = [];
        updateHistory();
    }

    function updateHistory() {
        historyList.innerHTML = '';
        history.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = entry;
            historyList.appendChild(li);
        });
    }
    clearHistoryButton.addEventListener('click', clearHistory);
    
});
