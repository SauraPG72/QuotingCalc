function generateAmortisationSchedule(data, results) {
    const tbody = document.getElementById('amortisationBody');
    tbody.innerHTML = '';
    
    if (data.repaymentType === "arrears") {
        let outstanding = data.principal;
        for (let i = 1; i <= data.months; i++) {
            let interest = outstanding * data.monthlyRate;
            let principalPaid = results.monthlyPayment - interest;
            outstanding -= principalPaid;
            let total = results.monthlyPayment + data.monthlyFee;
            
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${i}</td>
                <td>$${principalPaid.toFixed(2)}</td>
                <td>$${interest.toFixed(2)}</td>
                <td>$${data.monthlyFee.toFixed(2)}</td>
                <td>$${total.toFixed(2)}</td>
                <td>$${Math.max(0, outstanding).toFixed(2)}</td>
            `;
        }
        if (data.residualValue > 0) {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${data.months + 1}</td>
                <td>$${data.residualValue.toFixed(2)}</td>
                <td>$0.00</td>
                <td>$0.00</td>
                <td>$${data.residualValue.toFixed(2)}</td>
                <td>$0.00</td>
            `;
        }
    } else if (data.repaymentType === "advance") {
        let outstanding = data.principal;
        // First payment - no interest
        let interest = 0;
        let principalPaid = results.monthlyPayment;
        outstanding -= principalPaid;
        let total = results.monthlyPayment + data.monthlyFee;
        
        let row = tbody.insertRow();
        row.innerHTML = `
            <td>1</td>
            <td>$${principalPaid.toFixed(2)}</td>
            <td>$${interest.toFixed(2)}</td>
            <td>$${data.monthlyFee.toFixed(2)}</td>
            <td>$${total.toFixed(2)}</td>
            <td>$${outstanding.toFixed(2)}</td>
        `;
        
        // Subsequent payments
        for (let i = 2; i <= data.months; i++) {
            interest = outstanding * data.monthlyRate;
            principalPaid = results.monthlyPayment - interest;
            outstanding -= principalPaid;
            total = results.monthlyPayment + data.monthlyFee;
            
            row = tbody.insertRow();
            row.innerHTML = `
                <td>${i}</td>
                <td>$${principalPaid.toFixed(2)}</td>
                <td>$${interest.toFixed(2)}</td>
                <td>$${data.monthlyFee.toFixed(2)}</td>
                <td>$${total.toFixed(2)}</td>
                <td>$${Math.max(0, outstanding).toFixed(2)}</td>
            `;
        }
        if (data.residualValue > 0) {
            row = tbody.insertRow();
            row.innerHTML = `
                <td>${data.months + 1}</td>
                <td>$${data.residualValue.toFixed(2)}</td>
                <td>$0.00</td>
                <td>$0.00</td>
                <td>$${data.residualValue.toFixed(2)}</td>
                <td>$0.00</td>
            `;
        }
    }
} 