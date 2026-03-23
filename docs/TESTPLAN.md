# COBOL Student Account Management System - Test Plan

This test plan covers the business logic and functionality of the COBOL-based student account management system. It includes test cases for all account operations and business rules.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status | Comments |
|--------------|----------------------|----------------|------------|----------------|----------------|--------|----------|
| TC001 | View Initial Balance | Application is compiled and running | 1. Start the application<br>2. Select option 1 (View Balance) | Display shows "Current balance: 1000.00" |  |  | Initial balance should be $1000.00 |
| TC002 | Credit Account - Positive Amount | Application is running with initial balance | 1. Select option 2 (Credit Account)<br>2. Enter amount: 500.00 | Display shows "Amount credited. New balance: 1500.00" |  |  | Credit operation adds to balance |
| TC003 | Debit Account - Sufficient Funds | Application is running with balance >= debit amount | 1. Select option 3 (Debit Account)<br>2. Enter amount: 200.00 | Display shows "Amount debited. New balance: 800.00" |  |  | Debit operation subtracts from balance when funds are sufficient |
| TC004 | Debit Account - Insufficient Funds | Application is running with balance < debit amount | 1. Select option 3 (Debit Account)<br>2. Enter amount: 1500.00 | Display shows "Insufficient funds for this debit." |  |  | Debit operation is rejected when balance is insufficient |
| TC005 | Multiple Credit Operations | Application is running | 1. Select option 2, enter 100.00<br>2. Select option 2, enter 200.00<br>3. Select option 1 (View Balance) | Balance displays 1300.00 after operations |  |  | Multiple credits accumulate correctly |
| TC006 | Multiple Debit Operations | Application is running with sufficient balance | 1. Select option 3, enter 100.00<br>2. Select option 3, enter 200.00<br>3. Select option 1 (View Balance) | Balance displays 700.00 after operations |  |  | Multiple debits accumulate correctly |
| TC007 | Credit then Debit | Application is running | 1. Select option 2, enter 300.00<br>2. Select option 3, enter 200.00<br>3. Select option 1 (View Balance) | Balance displays 1100.00 after operations |  |  | Combined credit and debit operations work correctly |
| TC008 | Debit to Zero Balance | Application is running with balance = debit amount | 1. Select option 3, enter 1000.00<br>2. Select option 1 (View Balance) | Balance displays 0.00 after debit |  |  | Debiting entire balance results in zero balance |
| TC009 | Invalid Menu Choice | Application is running | 1. Enter invalid choice (e.g., 5) | Display shows "Invalid choice, please select 1-4." and menu redisplays |  |  | Invalid inputs are handled gracefully |
| TC010 | Exit Application | Application is running | 1. Select option 4 (Exit) | Application terminates with "Exiting the program. Goodbye!" |  |  | Exit option properly terminates the application |
| TC011 | Credit Zero Amount | Application is running | 1. Select option 2 (Credit Account)<br>2. Enter amount: 0.00 | Balance remains unchanged, displays new balance same as old |  |  | Zero credit should not change balance |
| TC012 | Debit Zero Amount | Application is running | 1. Select option 3 (Debit Account)<br>2. Enter amount: 0.00 | Balance remains unchanged, displays new balance same as old |  |  | Zero debit should not change balance |
| TC013 | Credit Large Amount | Application is running | 1. Select option 2 (Credit Account)<br>2. Enter amount: 999999.99 | Balance updates correctly with large amount |  |  | System handles large credit amounts |
| TC014 | Debit Amount Equal to Balance | Application is running with balance > 0 | 1. Select option 3 (Debit Account)<br>2. Enter amount equal to current balance | Balance becomes 0.00 |  |  | Debiting exact balance amount is allowed |
| TC015 | View Balance After Multiple Operations | Application has undergone several credit/debit operations | 1. Perform various credit/debit operations<br>2. Select option 1 (View Balance) | Balance reflects all previous operations accurately |  |  | Balance persistence across operations |

## Test Execution Notes

- All test cases should be executed in sequence where dependencies exist
- Balance calculations should use exact decimal arithmetic
- Input validation for amounts (positive numbers only) is assumed but should be verified
- The application maintains state between operations within a single session
- Tests should be run on a fresh application instance for each complete test suite execution