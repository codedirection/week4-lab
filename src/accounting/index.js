const readlineSync = require('readline-sync');

// Global balance storage (equivalent to STORAGE-BALANCE in COBOL)
let balance = 1000.00;

/**
 * Data access layer - handles reading and writing balance
 * Equivalent to data.cob (DataProgram)
 */
function dataProgram(operation, amount) {
    if (operation === 'READ') {
        return balance;
    } else if (operation === 'WRITE') {
        balance = amount;
    }
}

/**
 * Reset balance to initial value (for testing)
 */
function resetBalance() {
    balance = 1000.00;
}

/**
 * Business logic operations
 * Equivalent to operations.cob (Operations)
 */
function operations(operation) {
    if (operation === 'TOTAL ') {
        const currentBalance = dataProgram('READ');
        console.log(`Current balance: ${currentBalance.toFixed(2)}`);
        return `Current balance: ${currentBalance.toFixed(2)}`;
    } else if (operation === 'CREDIT') {
        const amount = parseFloat(readlineSync.question('Enter credit amount: '));
        const currentBalance = dataProgram('READ');
        const newBalance = currentBalance + amount;
        dataProgram('WRITE', newBalance);
        console.log(`Amount credited. New balance: ${newBalance.toFixed(2)}`);
        return `Amount credited. New balance: ${newBalance.toFixed(2)}`;
    } else if (operation === 'DEBIT ') {
        const amount = parseFloat(readlineSync.question('Enter debit amount: '));
        const currentBalance = dataProgram('READ');
        if (currentBalance >= amount) {
            const newBalance = currentBalance - amount;
            dataProgram('WRITE', newBalance);
            console.log(`Amount debited. New balance: ${newBalance.toFixed(2)}`);
            return `Amount debited. New balance: ${newBalance.toFixed(2)}`;
        } else {
            console.log('Insufficient funds for this debit.');
            return 'Insufficient funds for this debit.';
        }
    }
}

/**
 * Main program logic with menu interface
 * Equivalent to main.cob (MainProgram)
 */
function main() {
    let continueFlag = true;

    while (continueFlag) {
        console.log('--------------------------------');
        console.log('Account Management System');
        console.log('1. View Balance');
        console.log('2. Credit Account');
        console.log('3. Debit Account');
        console.log('4. Exit');
        console.log('--------------------------------');

        const choice = parseInt(readlineSync.question('Enter your choice (1-4): '));

        switch (choice) {
            case 1:
                operations('TOTAL ');
                break;
            case 2:
                operations('CREDIT');
                break;
            case 3:
                operations('DEBIT ');
                break;
            case 4:
                continueFlag = false;
                break;
            default:
                console.log('Invalid choice, please select 1-4.');
        }
    }

    console.log('Exiting the program. Goodbye!');
}

// Export functions for testing
module.exports = {
    dataProgram,
    resetBalance,
    operations,
    main
};

// Run main if this file is executed directly
if (require.main === module) {
    main();
}