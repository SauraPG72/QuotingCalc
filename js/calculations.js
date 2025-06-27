function performLoanCalculations(data) {
    let monthlyPayment = (data.principal * data.monthlyRate * Math.pow(1 + data.monthlyRate, data.months) - data.residualValue * data.monthlyRate) / (Math.pow(1 + data.monthlyRate, data.months) - 1);
    
    let printedAmount, totalAmount, effectiveRate, adjustedPrincipal;
    adjustedPrincipal = data.principal - data.brokerage;
    
    if (data.repaymentType === "advance") {
        let monthlyPaymentAdjusted = monthlyPayment / (1 + data.monthlyRate);
        printedAmount = monthlyPaymentAdjusted + data.monthlyFee;
        totalAmount = ((monthlyPaymentAdjusted + data.monthlyFee) * data.months) + data.residualValue;
        effectiveRate = calculateEffectiveRateAdvances(adjustedPrincipal, data.months, monthlyPaymentAdjusted, data.residualValue);
        monthlyPayment = monthlyPaymentAdjusted;
    } else {
        printedAmount = monthlyPayment + data.monthlyFee;
        totalAmount = ((monthlyPayment + data.monthlyFee) * data.months) + data.residualValue;
        effectiveRate = calculateEffectiveRateArrears(adjustedPrincipal, data.months, monthlyPayment, data.residualValue);
    }
    
    return {
        monthlyPayment: monthlyPayment,
        printedAmount: printedAmount,
        totalAmount: totalAmount,
        effectiveRate: effectiveRate,
        adjustedPrincipal: adjustedPrincipal,
        principal: data.principal
    };
}

function calculateEffectiveRateArrears(principal, months, monthlyPayment, residualValue) {
    let low = 0;
    let high = 1;
    let precision = 0.0000001;
    let guessRate;
    
    while (high - low > precision) {
        guessRate = (low + high) / 2;
        let calculatedPayment = (principal * guessRate * Math.pow(1 + guessRate, months) - residualValue * guessRate) / (Math.pow(1 + guessRate, months) - 1);
        if (calculatedPayment > monthlyPayment) {
            high = guessRate;
        } else {
            low = guessRate;
        }
    }
    return guessRate * 12 * 100;
}

function calculateEffectiveRateAdvances(principal, months, monthlyPayment, residualValue) {
    let low = 0;
    let high = 1;
    let precision = 0.0000001;
    let guessRate;
    
    while (high - low > precision) {
        guessRate = (low + high) / 2;
        let calculatedPayment = ((principal * guessRate * Math.pow(1 + guessRate, months) - residualValue * guessRate) / (Math.pow(1 + guessRate, months) - 1)) / (1 + guessRate);
        if (calculatedPayment > monthlyPayment) {
            high = guessRate;
        } else {
            low = guessRate;
        }
    }
    return guessRate * 12 * 100;
} 