# QuotingCalc - Professional Loan Calculator

A comprehensive web-based loan calculation tool designed for finance professionals to generate accurate loan quotes and amortization schedules.

## Features

- **Advanced Loan Calculations**: Support for principal, interest, fees, and residual values
- **Flexible Fee Structure**: Handle lender fees, origination fees, and monthly fees with financing options
- **Multiple Repayment Frequencies**: Monthly, weekly, and fortnightly payment options
- **Commission Management**: Track and display brokerage commissions
- **Quote Management**: Save, organize, and export loan quotes
- **Email-Ready Output**: Generate copy-paste ready quotes for client communication
- **Amortization Schedules**: Detailed payment breakdowns
- **Comparison Rate Calculations**: Accurate effective rate calculations

## File Structure & Code Flow

### Core Files

#### `index.html`
- **Purpose**: Main application interface and layout
- **Key Components**:
  - Input form for loan parameters
  - Results display section
  - Email quote section
  - Quotes log table
  - Amortization schedule table
- **Layout**: Responsive design with sections for input, results, and data management

#### `styles.css`
- **Purpose**: Application styling and responsive design
- **Features**: Modern UI with professional color scheme, responsive tables, and intuitive layout

### JavaScript Architecture

The application follows a modular JavaScript architecture with clear separation of concerns:

#### `js/loan-calculator.js`
- **Purpose**: Core loan calculation engine and data management
- **Key Functions**:
  - `getLoanInputs()`: Collects and validates all user inputs
  - `updateResidualCalculation()`: Handles residual value calculations (dollar/percentage)
  - `updateBrokerageCalculation()`: Manages commission calculations
  - Global state management for visibility toggles
- **Data Flow**: Central hub for input processing and validation

#### `js/calculations.js`
- **Purpose**: Mathematical calculations and loan formulas
- **Key Functions**:
  - `performLoanCalculations()`: Main calculation engine
  - Payment calculations for different frequencies
  - Effective rate calculations
  - Total cost calculations
- **Algorithms**: Implements standard financial formulas for loan calculations

#### `js/quotes-manager.js`
- **Purpose**: Quote storage, management, and display
- **Key Functions**:
  - `addQuoteToLog()`: Saves new quotes with all parameters
  - `formatPaymentString()`: Formats payment display with weekly/fortnightly options
  - `updateQuotesTable()`: Refreshes the quotes log display
  - `updateEmailQuoteDisplay()`: Generates email-ready quote format
  - `copyQuoteToClipboard()`: Enables easy quote copying
- **Data Persistence**: Manages quotes array and handles quote lifecycle

#### `js/amortisation.js`
- **Purpose**: Generates detailed payment schedules
- **Key Functions**:
  - `generateAmortisationSchedule()`: Creates payment-by-payment breakdown
  - Handles different payment types (arrears/advance)
  - Calculates principal, interest, and balance for each payment
- **Output**: Detailed table showing payment progression over loan term

#### `js/ui-controller.js`
- **Purpose**: User interface interactions and state management
- **Key Functions**:
  - Toggle functions for display options (base rate, comparison rate, commissions)
  - Weekly/fortnightly payment toggles
  - Auto-calculation triggers on input changes
  - Event listeners for real-time updates
- **State Management**: Controls visibility of various UI elements

## Code Flow

### 1. Application Initialization
```
index.html loads → CSS styles applied → JavaScript files loaded → DOM ready event → Initial calculation triggered
```

### 2. User Input Processing
```
User enters data → Input event listeners trigger → getLoanInputs() collects data → Validation and formatting → Auto-calculation triggered
```

### 3. Calculation Flow
```
Input data → performLoanCalculations() → Payment calculations → Effective rate calculations → Results displayed → Amortization schedule generated
```

### 4. Quote Management Flow
```
User clicks "Add Quote to Log" → Quote data collected → Stored in quotesData array → updateQuotesTable() → updateEmailQuoteDisplay() → Quote available for copying
```

### 5. Toggle Functionality
```
User toggles checkbox → Toggle function updates global state → updateQuotesTable() → updateEmailQuoteDisplay() → UI reflects changes immediately
```

## Key Features Explained

### Payment Frequency Toggles
- **Weekly Toggle**: Adds weekly payment option to quotes (monthly payment ÷ 52/12)
- **Fortnightly Toggle**: Adds fortnightly payment option to quotes (monthly payment ÷ 26/12)
- **Real-time Updates**: Changes immediately reflect in both quotes table and email-ready section

### Fee Management
- **Lender Fee**: Can be financed or payable at settlement
- **Origination Fee**: Can be waived, financed, or payable at settlement
- **Monthly Fee**: Ongoing fee added to each payment
- **Commission**: Can be dollar amount or percentage of financed amount

### Quote Export
- **Email-Ready Format**: Structured tables ready for copy-paste into emails
- **Grouped Display**: Quotes grouped by finance amount and asset
- **Clipboard Integration**: One-click copying of formatted quotes

### Amortization Schedule
- **Payment-by-Payment Breakdown**: Shows principal, interest, fees, and balance
- **Payment Type Support**: Handles both arrears and advance payment types
- **Scrollable Display**: Large schedules remain manageable

## Usage Instructions

### Basic Loan Calculation
1. Enter the principal amount
2. Add asset description
3. Configure fees (lender, origination, monthly)
4. Set interest rate and term
5. Choose repayment type (arrears/advance)
6. Add residual value if applicable
7. Set commission amount
8. Click "Calculate Loan"

### Managing Quotes
1. After calculation, click "Add Quote to Log"
2. Toggle weekly/fortnightly options as needed
3. Use "Copy Quote to Clipboard" for email-ready format
4. Add notes to quotes for reference
5. Delete individual quotes or clear all

### Display Options
- **Toggle Base Rate**: Show/hide base interest rate
- **Toggle Comparison Rate**: Show/hide effective comparison rate
- **Toggle Commissions**: Show/hide commission information
- **Weekly/Fortnightly**: Add alternative payment frequencies to quotes

## Technical Notes

### Browser Compatibility
- Modern browsers with ES6+ support
- Responsive design for desktop and mobile
- No external dependencies required

### Data Storage
- Quotes stored in browser memory (localStorage could be added for persistence)
- No server-side storage required
- All calculations performed client-side

### Performance
- Real-time calculations on input changes
- Efficient quote management with array operations
- Responsive UI with minimal lag

## Future Enhancements

- Local storage for quote persistence
- Export to PDF functionality
- Additional payment frequencies (quarterly, annually)
- Multiple currency support
- Advanced fee structures
- Quote templates and branding options 
