// Global variables
let quotesData = [];
let comparisonRateVisible = true;
let brokerageVisible = true;
let baseRateVisible = true;
let weeklyVisible = false;
let fortnightlyVisible = false;

function getLoanInputs() {
    const principal = parseFloat(document.getElementById('principal').value) || 0;
    const lenderFee = document.getElementById('lenderFeeFinanced').value === 'financed' ? 
        (parseFloat(document.getElementById('lenderFee').value) || 0) : 0;
    const originationFee = document.getElementById('originationFeeFinanced').value === 'financed' ? 
        (parseFloat(document.getElementById('originationFee').value) || 0) : 0;
    const monthlyFee = parseFloat(document.getElementById('monthlyFee').value) || 0;
    const annualRate = (parseFloat(document.getElementById('annualRate').value) || 0) / 100;
    const months = parseInt(document.getElementById('months').value) || 0;
    const repaymentType = document.getElementById('repaymentType').value;
    
    // Handle residual value (percentage or dollar)
    let residualValue = parseFloat(document.getElementById('residualValue').value) || 0;
    if (document.getElementById('residualType').value === 'percent') {
        residualValue = principal * (residualValue / 100);
    }
    
    // Handle brokerage (percentage or dollar) - base on principal + financed fees
    const baseAmountForBrokerage = principal + lenderFee + originationFee;
    let brokerage = parseFloat(document.getElementById('brokerage').value) || 0;
    if (document.getElementById('brokerageType').value === 'percent') {
        brokerage = baseAmountForBrokerage * (brokerage / 100);
    }

    return {
        principal: principal + brokerage + lenderFee + originationFee,
        originalPrincipal: principal,
        lenderFee: lenderFee,
        lenderFeeOriginal: parseFloat(document.getElementById('lenderFee').value) || 0,
        originationFee: originationFee,
        originationFeeOriginal: parseFloat(document.getElementById('originationFee').value) || 0,
        monthlyFee: monthlyFee,
        annualRate: annualRate,
        monthlyRate: annualRate / 12,
        months: months,
        repaymentType: repaymentType,
        residualValue: residualValue,
        brokerage: brokerage,
        lenderFeeFinanced: document.getElementById('lenderFeeFinanced').value === 'financed',
        originationFeeFinanced: document.getElementById('originationFeeFinanced').value,
        brokerageOriginal: parseFloat(document.getElementById('brokerage').value) || 0,
        brokerageType: document.getElementById('brokerageType').value,
        residualOriginal: parseFloat(document.getElementById('residualValue').value) || 0,
        residualType: document.getElementById('residualType').value,
        assetDescription: document.getElementById('assetDescription').value || ''
    };
}

function updateResidualCalculation() {
    const residualType = document.getElementById('residualType').value;
    const principal = parseFloat(document.getElementById('principal').value) || 0;
    const residualValue = parseFloat(document.getElementById('residualValue').value) || 0;
    const residualDisplay = document.getElementById('residualDisplay');
    
    if (residualValue === 0) {
        residualDisplay.textContent = '';
        return;
    }
    
    if (residualType === 'dollar') {
        // Show percentage equivalent
        const percentage = ((residualValue / principal) * 100).toFixed(2);
        residualDisplay.textContent = `(${percentage}% of finance amount)`;
    } else {
        // Show dollar equivalent
        const dollarAmount = (principal * residualValue / 100).toFixed(2);
        residualDisplay.textContent = `(${parseFloat(dollarAmount).toLocaleString('en-AU')} dollar amount)`;
    }
}

function updateBrokerageCalculation() {
    const brokerageType = document.getElementById('brokerageType').value;
    const principal = parseFloat(document.getElementById('principal').value) || 0;
    const lenderFee = document.getElementById('lenderFeeFinanced').value === 'financed' ? 
        (parseFloat(document.getElementById('lenderFee').value) || 0) : 0;
    const originationFee = document.getElementById('originationFeeFinanced').value === 'financed' ? 
        (parseFloat(document.getElementById('originationFee').value) || 0) : 0;
    const brokerageValue = parseFloat(document.getElementById('brokerage').value) || 0;
    const brokerageDisplay = document.getElementById('brokerageDisplay');
    
    if (brokerageValue === 0) {
        brokerageDisplay.textContent = '';
        return;
    }
    
    // Calculate base amount for percentage (principal + financed fees)
    const baseAmount = principal + lenderFee + originationFee;
    
    if (brokerageType === 'dollar') {
        // Show percentage equivalent
        const percentage = ((brokerageValue / baseAmount) * 100).toFixed(2);
        brokerageDisplay.textContent = `(${percentage}% of financed amount)`;
    } else {
        // Show dollar equivalent
        const dollarAmount = (baseAmount * brokerageValue / 100).toFixed(2);
        brokerageDisplay.textContent = `(${parseFloat(dollarAmount).toLocaleString('en-AU')} dollar amount)`;
    }
}

function calculateLoan() {
    const data = getLoanInputs();
    const results = performLoanCalculations(data);
    
    // Update display
    document.getElementById('monthlyPaymentResult').textContent = `${results.printedAmount.toFixed(2)}`;
    document.getElementById('totalAmountResult').textContent = `${results.totalAmount.toFixed(2)}`;
    document.getElementById('residualResult').textContent = `${data.residualValue.toFixed(2)}`;
    document.getElementById('baseRateResult').textContent = `${(data.annualRate * 100).toFixed(2)}%`;
    document.getElementById('effectiveRateResult').textContent = `${results.effectiveRate.toFixed(2)}%`;
    document.getElementById('brokerageResultDisplay').textContent = `${data.brokerage.toFixed(2)}`;
    
    // Update percentage displays
    updateResidualCalculation();
    updateBrokerageCalculation();
    
    // Generate amortisation schedule
    generateAmortisationSchedule(data, results);
} 