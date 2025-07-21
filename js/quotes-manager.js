function formatPaymentString(monthlyPayment, monthlyFee, weeklyVisible, fortnightlyVisible) {
    const weekly = monthlyPayment / (52/12);
    const fortnightly = monthlyPayment / (26/12);
    let paymentParts = [];
    paymentParts.push(`$ ${monthlyPayment.toFixed(2)}`);
    if (fortnightlyVisible) {
        paymentParts.push(`$${fortnightly.toFixed(2)} (fortnightly)`);
    }
    if (weeklyVisible) {
        paymentParts.push(`$${weekly.toFixed(2)} (weekly)`);
    }
    const paymentString = paymentParts.join(' OR ');
    const feeString = monthlyFee > 0 
        ? ` (incl. $${monthlyFee.toFixed(2)} monthly fee)`
        : ' (no monthly fees)';
    return paymentString + feeString;
}

function addQuoteToLog() {
    const data = getLoanInputs();
    const results = performLoanCalculations(data);
    
    const quote = {
        date: new Date().toLocaleDateString('en-AU'),
        financeAmount: data.originalPrincipal,
        asset: data.assetDescription,
        term: `${data.months} months`,
        payment: formatPaymentString(results.printedAmount, data.monthlyFee, weeklyVisible, fortnightlyVisible),
        type: data.repaymentType.charAt(0).toUpperCase() + data.repaymentType.slice(1),
        residual: data.residualValue > 0 
            ? `$${data.residualValue.toLocaleString('en-AU', {minimumFractionDigits: 2})} (${((data.residualValue/data.originalPrincipal)*100).toFixed(0)}%)`
            : 'NIL',
        baseRate: `${(data.annualRate * 100).toFixed(2)}%`,
        comparisonRate: `${results.effectiveRate.toFixed(2)}%`,
        lenderFee: `$ ${data.lenderFeeOriginal.toFixed(0)}${data.lenderFeeFinanced ? '' : ' (payable at settlement)'}`,
        originationFee: data.originationFeeFinanced === 'waived' ? '$ waived' : `$ ${data.originationFeeOriginal.toFixed(0)}${data.originationFeeFinanced === 'upfront' ? ' (payable at settlement)' : ''}`,
        monthlyFee: `$${data.monthlyFee.toFixed(2)}`,
        commissions: data.brokerageType === 'percent' 
            ? `$ ${data.brokerage.toLocaleString('en-AU', {minimumFractionDigits: 0})} (${data.brokerageOriginal}%)`
            : `$ ${data.brokerage.toLocaleString('en-AU', {minimumFractionDigits: 0})}`,
        totalAmount: `$${results.totalAmount.toFixed(2)}`,
        notes: '',
        id: Date.now()
    };
    
    quotesData.push(quote);
    updateQuotesTable();
    updateEmailQuoteDisplay();
}

function updateQuotesTable() {
    const tbody = document.getElementById('quotesBody');
    tbody.innerHTML = '';
    
    quotesData.forEach(quote => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${quote.date}</td>
            <td>$${quote.financeAmount.toLocaleString('en-AU')}</td>
            <td>${quote.asset}</td>
            <td>${quote.term}</td>
            <td>${quote.payment}</td>
            <td>${quote.type}</td>
            <td>${quote.residual}</td>
            <td class="${baseRateVisible ? '' : 'hidden'}">${quote.baseRate}</td>
            <td class="${comparisonRateVisible ? '' : 'hidden'}">${quote.comparisonRate}</td>
            <td>${quote.lenderFee}</td>
            <td>${quote.originationFee}</td>
            <td>${quote.monthlyFee}</td>
            <td class="${brokerageVisible ? '' : 'hidden'}">${quote.commissions}</td>
            <td>${quote.totalAmount}</td>
            <td><input type="text" placeholder="Notes..." style="border:none;background:transparent;width:100%;font-size:11px;" onchange="updateQuoteNotes(${quote.id}, this.value)"></td>
            <td><button class="btn btn-danger" style="padding:3px 6px;font-size:11px;" onclick="deleteQuote(${quote.id})">Delete</button></td>
        `;
    });
}

function updateEmailQuoteDisplay() {
    const container = document.getElementById('emailQuoteContainer');
    container.innerHTML = '';
    
    if (quotesData.length === 0) {
        container.innerHTML = '<p>No quotes added yet. Add quotes from the calculation results above.</p>';
        return;
    }
    
    // Group quotes by finance amount and asset
    const groupedQuotes = {};
    quotesData.forEach(quote => {
        const key = `${quote.financeAmount}-${quote.asset}`;
        if (!groupedQuotes[key]) {
            groupedQuotes[key] = {
                financeAmount: quote.financeAmount,
                asset: quote.asset,
                quotes: []
            };
        }
        groupedQuotes[key].quotes.push(quote);
    });
    
    // Create sections for each finance amount/asset combination
    Object.values(groupedQuotes).forEach(group => {
        // Header table
        const headerDiv = document.createElement('div');
        headerDiv.innerHTML = `
            <table class="email-quote-table">
                <tr>
                    <td class="label-col" style="font-weight: bold;">Finance Amount</td>
                    <td class="value-col" style="font-weight: bold;">$ ${group.financeAmount.toLocaleString('en-AU', {minimumFractionDigits: 2})}</td>
                </tr>
                <tr>
                    <td class="label-col" style="font-weight: bold;">Asset</td>
                    <td class="value-col" style="font-weight: bold;">${group.asset}</td>
                </tr>
            </table>
        `;
        container.appendChild(headerDiv);
        
        // Quote options for this finance amount/asset
        group.quotes.forEach(quote => {
            const quoteDiv = document.createElement('div');
            quoteDiv.innerHTML = `
                <table class="email-quote-table" style="margin-top: 10px;">
                    <tr>
                        <td class="label-col">Term</td>
                        <td class="value-col">${quote.term}</td>
                    </tr>
                    <tr>
                        <td class="label-col">Repayments</td>
                        <td class="value-col">${quote.payment}</td>
                    </tr>
                    <tr>
                        <td class="label-col">Residual</td>
                        <td class="value-col">${quote.residual}</td>
                    </tr>
                </table>
                <div class="email-additional-info">
                    <p><strong>Lender Fee:</strong> ${quote.lenderFee}</p>
                    <p><strong>Origination Fee:</strong> ${quote.originationFee}</p>
                    <p class="${comparisonRateVisible ? '' : 'hidden'}"><strong>Comparison rate:</strong> ${quote.comparisonRate}</p>
                    <p class="${baseRateVisible ? '' : 'hidden'}"><strong>Base rate:</strong> ${quote.baseRate}</p>
                    <p class="${brokerageVisible ? '' : 'hidden'}"><strong>Commissions:</strong> ${quote.commissions}</p>
                </div>
            `;
            container.appendChild(quoteDiv);
        });
    });
}

function copyQuoteToClipboard() {
    const quoteContainer = document.getElementById('emailQuoteContainer');
    const range = document.createRange();
    range.selectNode(quoteContainer);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    
    try {
        document.execCommand('copy');
        alert('Quote copied to clipboard! You can now paste it into your email.');
    } catch (err) {
        alert('Unable to copy to clipboard. Please manually select and copy the quote.');
    }
    
    window.getSelection().removeAllRanges();
}

function updateQuoteNotes(id, notes) {
    const quote = quotesData.find(q => q.id === id);
    if (quote) {
        quote.notes = notes;
    }
}

function deleteQuote(id) {
    quotesData = quotesData.filter(q => q.id !== id);
    updateQuotesTable();
    updateEmailQuoteDisplay();
}

function clearQuotesLog() {
    if (confirm('Are you sure you want to clear all quotes from the log?')) {
        quotesData = [];
        updateQuotesTable();
        updateEmailQuoteDisplay();
    }
} 