function toggleBaseRate() {
    baseRateVisible = !baseRateVisible;
    document.getElementById('baseRateRow').style.display = baseRateVisible ? 'flex' : 'none';
    document.getElementById('baseRateToggle').classList.toggle('active', baseRateVisible);
    updateQuotesTable();
    updateEmailQuoteDisplay();
}

function toggleComparisonRate() {
    comparisonRateVisible = !comparisonRateVisible;
    document.getElementById('effectiveRateRow').style.display = comparisonRateVisible ? 'flex' : 'none';
    document.getElementById('comparisonRateToggle').classList.toggle('active', comparisonRateVisible);
    updateQuotesTable();
    updateEmailQuoteDisplay();
}

function toggleBrokerage() {
    brokerageVisible = !brokerageVisible;
    document.getElementById('brokerageRow').style.display = brokerageVisible ? 'flex' : 'none';
    document.getElementById('brokerageToggleSwitch').classList.toggle('active', brokerageVisible);
    updateQuotesTable();
    updateEmailQuoteDisplay();
}

function toggleTotalHiring() {
    totalHiringVisible = !totalHiringVisible;
    document.getElementById('totalHiringToggle').classList.toggle('active', totalHiringVisible);
    updateQuotesTable();
    updateEmailQuoteDisplay();
}

function updatePaymentFrequency() {
    monthlyVisible = document.getElementById('freqMonthly').checked;
    fortnightlyVisible = document.getElementById('freqFortnightly').checked;
    weeklyVisible = document.getElementById('freqWeekly').checked;

    // Ensure at least one is selected
    if (!monthlyVisible && !fortnightlyVisible && !weeklyVisible) {
        document.getElementById('freqMonthly').checked = true;
        monthlyVisible = true;
    }

    updateQuotesTable();
    updateEmailQuoteDisplay();
}

function syncToggleSwitches() {
    // Sync toggle switches with state
    document.getElementById('baseRateToggle').classList.toggle('active', baseRateVisible);
    document.getElementById('comparisonRateToggle').classList.toggle('active', comparisonRateVisible);
    document.getElementById('brokerageToggleSwitch').classList.toggle('active', brokerageVisible);
    document.getElementById('totalHiringToggle').classList.toggle('active', totalHiringVisible);

    // Sync frequency checkboxes
    document.getElementById('freqMonthly').checked = monthlyVisible;
    document.getElementById('freqFortnightly').checked = fortnightlyVisible;
    document.getElementById('freqWeekly').checked = weeklyVisible;
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