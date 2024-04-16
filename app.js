#!/usr/bin/env node
import inquirer from 'inquirer';
// Zakat Nisab values in grams
const GOLD_NISAB = 87.48; // As of April 2024
const SILVER_NISAB = 612.36; // As of April 2024
// Zakat rate for cash and savings (as a percentage)
const CASH_ZAKAT_RATE = 2.5;
// Function to calculate Zakat on gold
function calculateGoldZakat(goldInGrams, goldPricePerGram) {
    const goldValue = goldInGrams * goldPricePerGram;
    if (goldValue < GOLD_NISAB) {
        return 0;
    }
    return goldValue * 0.025; // Zakat rate for gold is 2.5%
}
// Function to calculate Zakat on silver
function calculateSilverZakat(silverInGrams, silverPricePerGram) {
    const silverValue = silverInGrams * silverPricePerGram;
    if (silverValue < SILVER_NISAB) {
        return 0;
    }
    return silverValue * 0.025; // Zakat rate for silver is 2.5%
}
// Function to calculate Zakat on cash and savings
function calculateCashZakat(cashAndSavings) {
    return cashAndSavings * (CASH_ZAKAT_RATE / 100);
}
// Main function to calculate Zakat
async function calculateZakat() {
    const answers = await inquirer.prompt([
        {
            type: 'number',
            name: 'goldInGrams',
            message: 'Enter the amount of gold you own (in grams):'
        },
        {
            type: 'number',
            name: 'goldPricePerGram',
            message: 'Enter the current price of gold per gram (in your local currency):'
        },
        {
            type: 'number',
            name: 'silverInGrams',
            message: 'Enter the amount of silver you own (in grams):'
        },
        {
            type: 'number',
            name: 'silverPricePerGram',
            message: 'Enter the current price of silver per gram (in your local currency):'
        },
        {
            type: 'number',
            name: 'cashAndSavings',
            message: 'Enter the total amount of cash and savings you have (in your local currency):'
        }
    ]);
    const goldZakat = calculateGoldZakat(answers.goldInGrams, answers.goldPricePerGram);
    const silverZakat = calculateSilverZakat(answers.silverInGrams, answers.silverPricePerGram);
    const cashZakat = calculateCashZakat(answers.cashAndSavings);
    const totalZakat = goldZakat + silverZakat + cashZakat;
    console.log('\nZakat Calculation Result:');
    console.log(`- Zakat on Gold: ${goldZakat.toFixed(2)} units of your currency`);
    console.log(`- Zakat on Silver: ${silverZakat.toFixed(2)} units of your currency`);
    console.log(`- Zakat on Cash and Savings: ${cashZakat.toFixed(2)} units of your currency`);
    console.log(`\nTotal Zakat Due: ${totalZakat.toFixed(2)} units of your currency`);
}
// Run the Zakat calculator
calculateZakat().catch(error => {
    console.error('An error occurred:', error);
});
