let weeklyVisible = false;
let fortnightlyVisible = false;

function toggleBaseRate() {
    baseRateVisible = !baseRateVisible;
    document.getElementById('baseRateRow').style.display = baseRateVisible ? 'flex' : 'none';
    updateQuotesTable();
    updateEmailQuoteDisplay();
}

function toggleComparisonRate() {
    comparisonRateVisible = !comparisonRateVisible;
    document.getElementById('effectiveRateRow').style.display = comparisonRateVisible ? 'flex' : 'none';
    updateQuotesTable();
    updateEmailQuoteDisplay();
}

function toggleBrokerage() {
    brokerageVisible = !brokerageVisible;
    document.getElementById('brokerageRow').style.display = brokerageVisible ? 'flex' : 'none';
    updateQuotesTable();
    updateEmailQuoteDisplay();
}

function toggleWeeklyRepayments() {
    weeklyVisible = !weeklyVisible;
    updateQuotesTable();
    updateEmailQuoteDisplay();
}

function toggleFortnightlyRepayments() {
    fortnightlyVisible = !fortnightlyVisible;
    updateQuotesTable();
    updateEmailQuoteDisplay();
}

// Auto-calculate when inputs change
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input:not(#assetDescription), select');
    inputs.forEach(input => {
        input.addEventListener('change', function() {
            calculateLoan();
        });
        input.addEventListener('input', function() {
            // Update displays without full recalculation for percentage displays
            if (input.id === 'residualValue' || input.id === 'residualType') {
                updateResidualCalculation();
            }
            if (input.id === 'brokerage' || input.id === 'brokerageType' || input.id === 'principal' || input.id === 'lenderFee' || input.id === 'originationFee' || input.id === 'lenderFeeFinanced' || input.id === 'originationFeeFinanced') {
                updateBrokerageCalculation();
            }
        });
    });
    
    // Initial calculation
    calculateLoan();
}); 