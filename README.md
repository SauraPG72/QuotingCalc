# Swyft Finance Loan Calculator

A professional loan calculation tool with comprehensive features for financial calculations, quote management, and amortisation schedules.

## File Structure

The application has been split into multiple files for better organization and maintainability:

```
├── index.html              # Main HTML file
├── styles.css              # All CSS styles
├── js/
│   ├── loan-calculator.js  # Core loan calculator logic and global variables
│   ├── calculations.js     # Loan calculation functions and effective rate calculations
│   ├── quotes-manager.js   # Quote management, display, and clipboard functionality
│   ├── amortisation.js     # Amortisation schedule generation
│   └── ui-controller.js    # UI toggle functions and event listeners
└── README.md               # This file
```

## Features

- **Loan Calculations**: Calculate monthly payments, total amounts, and effective rates
- **Multiple Fee Types**: Support for lender fees, origination fees, and monthly fees
- **Residual Values**: Support for both dollar and percentage-based residual values
- **Commission Calculations**: Support for both dollar and percentage-based commissions
- **Repayment Types**: Support for both arrears and advance payment types
- **Quote Management**: Add quotes to a log, edit notes, and delete quotes
- **Email-Ready Quotes**: Generate formatted quotes ready for email copying
- **Amortisation Schedules**: Detailed payment breakdowns
- **Toggle Controls**: Show/hide base rates, comparison rates, and commissions
- **Responsive Design**: Works on desktop and mobile devices

## Usage

1. Open `index.html` in a web browser
2. Enter loan parameters in the left panel
3. Click "Calculate Loan" to see results
4. Use "Add Quote to Log" to save calculations
5. Copy quotes to clipboard for email use
6. View detailed amortisation schedules

## Technical Details

- **Pure HTML/CSS/JavaScript**: No external dependencies
- **Modular Architecture**: Separated concerns across multiple files
- **Real-time Calculations**: Updates as you type
- **Professional Styling**: Modern, responsive design
- **Cross-browser Compatible**: Works in all modern browsers

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This tool is designed for professional financial use by Swyft Finance. 
