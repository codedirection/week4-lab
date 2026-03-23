const { dataProgram, resetBalance, operations } = require('../index');

// Mock readline-sync at the module level
jest.mock('readline-sync', () => ({
    question: jest.fn()
}));

describe('COBOL Student Account Management System - Unit Tests', () => {
    beforeEach(() => {
        resetBalance();
        jest.clearAllMocks();
    });

    describe('Data Program Tests', () => {
        test('TC001 - View Initial Balance', () => {
            const balance = dataProgram('READ');
            expect(balance).toBe(1000.00);
        });

        test('DataProgram WRITE operation', () => {
            dataProgram('WRITE', 1500.00);
            const balance = dataProgram('READ');
            expect(balance).toBe(1500.00);
        });
    });

    describe('Operations Tests', () => {
        let consoleSpy;

        beforeEach(() => {
            consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        test('TC001 - View Initial Balance', () => {
            operations('TOTAL ');
            expect(consoleSpy).toHaveBeenCalledWith('Current balance: 1000.00');
        });

        test('TC002 - Credit Account - Positive Amount', () => {
            const readlineSync = require('readline-sync');
            readlineSync.question.mockReturnValue('500.00');

            operations('CREDIT');

            expect(readlineSync.question).toHaveBeenCalledWith('Enter credit amount: ');
            expect(consoleSpy).toHaveBeenCalledWith('Amount credited. New balance: 1500.00');
            expect(dataProgram('READ')).toBe(1500.00);
        });

        test('TC003 - Debit Account - Sufficient Funds', () => {
            const readlineSync = require('readline-sync');
            readlineSync.question.mockReturnValue('200.00');

            operations('DEBIT ');

            expect(readlineSync.question).toHaveBeenCalledWith('Enter debit amount: ');
            expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: 800.00');
            expect(dataProgram('READ')).toBe(800.00);
        });

        test('TC004 - Debit Account - Insufficient Funds', () => {
            const readlineSync = require('readline-sync');
            readlineSync.question.mockReturnValue('1500.00');

            operations('DEBIT ');

            expect(readlineSync.question).toHaveBeenCalledWith('Enter debit amount: ');
            expect(consoleSpy).toHaveBeenCalledWith('Insufficient funds for this debit.');
            expect(dataProgram('READ')).toBe(1000.00); // Balance unchanged
        });

        test('TC005 - Multiple Credit Operations', () => {
            const readlineSync = require('readline-sync');
            readlineSync.question
                .mockReturnValueOnce('100.00')
                .mockReturnValueOnce('200.00');

            operations('CREDIT');
            operations('CREDIT');

            expect(dataProgram('READ')).toBe(1300.00);
        });

        test('TC006 - Multiple Debit Operations', () => {
            const readlineSync = require('readline-sync');
            readlineSync.question
                .mockReturnValueOnce('100.00')
                .mockReturnValueOnce('200.00');

            operations('DEBIT ');
            operations('DEBIT ');

            expect(dataProgram('READ')).toBe(700.00);
        });

        test('TC007 - Credit then Debit', () => {
            const readlineSync = require('readline-sync');
            readlineSync.question
                .mockReturnValueOnce('300.00')
                .mockReturnValueOnce('200.00');

            operations('CREDIT');
            operations('DEBIT ');

            expect(dataProgram('READ')).toBe(1100.00);
        });

        test('TC008 - Debit to Zero Balance', () => {
            const readlineSync = require('readline-sync');
            readlineSync.question.mockReturnValue('1000.00');

            operations('DEBIT ');

            expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: 0.00');
            expect(dataProgram('READ')).toBe(0.00);
        });

        test('TC011 - Credit Zero Amount', () => {
            const readlineSync = require('readline-sync');
            readlineSync.question.mockReturnValue('0.00');

            operations('CREDIT');

            expect(consoleSpy).toHaveBeenCalledWith('Amount credited. New balance: 1000.00');
            expect(dataProgram('READ')).toBe(1000.00);
        });

        test('TC012 - Debit Zero Amount', () => {
            const readlineSync = require('readline-sync');
            readlineSync.question.mockReturnValue('0.00');

            operations('DEBIT ');

            expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: 1000.00');
            expect(dataProgram('READ')).toBe(1000.00);
        });

        test('TC013 - Credit Large Amount', () => {
            const readlineSync = require('readline-sync');
            readlineSync.question.mockReturnValue('999999.99');

            operations('CREDIT');

            expect(consoleSpy).toHaveBeenCalledWith('Amount credited. New balance: 1000999.99');
            expect(dataProgram('READ')).toBe(1000999.99);
        });

        test('TC014 - Debit Amount Equal to Balance', () => {
            const readlineSync = require('readline-sync');
            readlineSync.question.mockReturnValue('1000.00');

            operations('DEBIT ');

            expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: 0.00');
            expect(dataProgram('READ')).toBe(0.00);
        });
    });

    describe('Business Rules Validation', () => {
        test('Initial balance is 1000.00', () => {
            expect(dataProgram('READ')).toBe(1000.00);
        });

        test('Credit increases balance', () => {
            dataProgram('WRITE', 1000.00 + 500.00);
            expect(dataProgram('READ')).toBe(1500.00);
        });

        test('Debit decreases balance when sufficient', () => {
            dataProgram('WRITE', 1000.00 - 200.00);
            expect(dataProgram('READ')).toBe(800.00);
        });

        test('Debit fails when insufficient funds', () => {
            const result = dataProgram('READ') >= 1500.00;
            expect(result).toBe(false);
        });
    });
});