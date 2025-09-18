# Zillow FSBO Property Scraper - Keyboard Maestro Macro

A sophisticated Keyboard Maestro macro that automatically scrapes For Sale By Owner (FSBO) properties from Zillow, extracting contact information, property details, and saving them to a CSV file.

## 🚨 Important Legal Notice

This tool is provided for educational and research purposes only. Users are responsible for:
- Complying with Zillow's Terms of Service
- Respecting website rate limits and robot.txt files
- Using scraped data ethically and legally
- Obtaining proper permissions before commercial use

**Use at your own risk. The authors are not responsible for any misuse or legal consequences.**

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Output Format](#output-format)
- [How It Works](#how-it-works)
- [Troubleshooting](#troubleshooting)
- [Customization](#customization)
- [Dependencies](#dependencies)
- [Limitations](#limitations)

## ✨ Features

- **Automated FSBO Property Detection**: Intelligently identifies and processes For Sale By Owner listings
- **Multi-Page Pagination**: Automatically navigates through multiple pages of search results
- **Smart Card Detection**: Filters out advertisements and irrelevant content
- **Phone Number Extraction**: Specifically targets FSBO listings with owner contact information
- **Human-like Behavior**: Randomized delays and natural browsing patterns to avoid detection
- **Comprehensive Logging**: Detailed logging system for monitoring and debugging
- **CSV Export**: Clean, formatted output ready for analysis or CRM import
- **Modal Handling**: Robust property detail modal detection and data extraction
- **Error Recovery**: Graceful handling of page load issues and missing elements

## 🔧 Prerequisites

### Required Software
- **macOS** (tested on macOS Sonoma and later)
- **Keyboard Maestro 11+** (available from Stairways Software)
- **Safari** (default macOS browser)

### Required Keyboard Maestro Macros
This macro depends on two logging helper macros that must be installed separately:

1. **LOG-INIT-FSBO** (`7F3C2A30-7C54-4C34-9B2B-LOG-INIT-FSBO`)
2. **LOG-LINE-FSBO** (`9B9A7AC2-0E1F-4D37-8E19-LOG-LINE-FSBO`)

These can be found in the `FSBO_Logging_Pack.kmmacros` file in this repository.

### System Permissions
- **Accessibility Access**: Keyboard Maestro needs accessibility permissions
- **Safari Automation**: Allow Keyboard Maestro to control Safari
- **File System Access**: Permission to write files to Desktop

## 📥 Installation

### Step 1: Install Dependencies
1. Install the logging macros first:
   ```bash
   # Double-click to import into Keyboard Maestro
   open "FSBO_Logging_Pack.kmmacros"
   ```

### Step 2: Import Main Macro
1. Double-click the macro file to import:
   ```bash
   open "Zillow_FSBO_Tool.kmmacros"
   ```

2. Or manually import in Keyboard Maestro:
   - Open Keyboard Maestro Editor
   - File → Import Macros...
   - Select `Zillow_FSBO_Tool.kmmacros`

### Step 3: Configure Permissions
1. **System Preferences → Security & Privacy → Privacy**
2. **Accessibility**: Add Keyboard Maestro Engine
3. **Automation**: Allow Keyboard Maestro to control Safari

### Step 4: Verify Installation
1. Open Keyboard Maestro Editor
2. Look for "Zillow FSBO Tool" macro
3. Check that all dependency macros are present and enabled

## ⚙️ Configuration

### Default Settings
- **Trigger**: `Cmd+Shift+Enter` (⌘⇧↩)
- **Output File**: `~/Desktop/zillow_fsbo_results.csv`
- **Target URL**: `https://www.zillow.com/ga/fsbo/`

### Customizing the Search Location
To scrape a different location, modify the URL in action `6009`:
```xml
<key>Argument</key><string>https://www.zillow.com/[STATE]/fsbo/</string>
```

Examples:
- Florida: `https://www.zillow.com/fl/fsbo/`
- California: `https://www.zillow.com/ca/fsbo/`
- Specific city: `https://www.zillow.com/atlanta-ga/fsbo/`

### Changing Output Location
Modify the file path in actions `6006` and `6209`:
```xml
<key>Destination</key><string>~/Desktop/your_custom_filename.csv</string>
```

### Adjusting Timing
The macro includes randomized delays for natural behavior:
- **Page load delays**: 6.0-9.0 seconds
- **Card processing**: 0.25-0.70 seconds
- **Modal interaction**: 3.5-5.5 seconds
- **Between cards**: 0.25-0.50 seconds

## 🚀 Usage

### Basic Operation
1. **Prepare Safari**: Close unnecessary tabs for best performance
2. **Start the Macro**: Press `Cmd+Shift+Enter` or run from Keyboard Maestro
3. **Monitor Progress**: Watch the Console.app for detailed logging
4. **Wait for Completion**: The macro will automatically stop when no more pages are found

### What Happens During Execution
1. **Initialization**: Creates CSV file with headers, starts logging
2. **Browser Setup**: Opens Safari and navigates to Zillow FSBO page
3. **Page Processing**: For each page:
   - Detects all property cards
   - Filters out advertisements
   - Clicks each property to open details
   - Extracts phone numbers and property info
   - Closes modal and moves to next property
4. **Pagination**: Automatically moves to next page if available
5. **Cleanup**: Stops system caffeination and logs completion

### Monitoring Progress
- **Console.app**: Filter for "Keyboard Maestro" to see detailed logs
- **CSV File**: Monitor `~/Desktop/zillow_fsbo_results.csv` for real-time results
- **Safari**: Watch the browser automation in action

## 📊 Output Format

The macro generates a CSV file with the following columns:

```csv
Phone,Price,Address,Beds,Baths,Sqft,YearBuilt,DaysOnZillow,Views,Saves
"(555) 123-4567","$299,000","123 Main St, Atlanta, GA 30309","","","","","","",""
"(404) 987-6543","$450,000","456 Oak Ave, Decatur, GA 30030","","","","","","",""
```

### Current Data Fields
- **Phone**: Owner contact number (primary target)
- **Price**: Property listing price
- **Address**: Full property address with ZIP code

### Placeholder Fields
The following fields are included in the CSV structure but not currently populated:
- Beds, Baths, Sqft, YearBuilt, DaysOnZillow, Views, Saves

## 🔍 How It Works

### Core Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Initialize    │ →  │  Process Pages   │ →  │    Cleanup      │
│  - Setup CSV    │    │  - Find Cards    │    │  - Kill Tasks   │
│  - Start Safari │    │  - Extract Data  │    │  - Final Log    │
│  - Begin Log    │    │  - Navigate Next │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### JavaScript Functions

#### 1. Card Discovery (`6103`)
```javascript
// Finds all property cards on the page
// Filters out advertisements and invalid listings
// Assigns index numbers for systematic processing
```

#### 2. Property Clicking (`6203`)
```javascript
// Intelligently clicks property cards to open details
// Handles multiple link selector strategies
// Includes fallback click mechanisms
```

#### 3. Modal Detection (`6204`)
```javascript
// Waits for property detail modal to fully load
// Validates presence of required data fields
// Ensures FSBO-specific content is available
```

#### 4. Data Extraction (`6207`)
```javascript
// Extracts phone numbers using regex patterns
// Captures property price and address
// Formats data for CSV output
```

#### 5. Pagination (`6107`)
```javascript
// Finds "next page" navigation elements
// Handles end-of-results detection
// Controls main processing loop
```

### Smart Detection Features

- **Ad Filtering**: Removes sponsored content and irrelevant listings
- **FSBO Validation**: Confirms "Listed by Property Owner" text presence
- **Phone Number Parsing**: Advanced regex for various phone formats
- **Address Normalization**: Standardizes address formatting
- **Price Extraction**: Handles multiple price display formats

## 🔧 Troubleshooting

### Common Issues

#### Macro Won't Start
- **Check Dependencies**: Ensure logging macros are installed
- **Verify Permissions**: Confirm Accessibility and Automation permissions
- **Safari State**: Close other tabs and windows

#### No Data Being Extracted
- **Check Zillow Layout**: Website changes may require selector updates
- **Verify Location**: Ensure the target URL has FSBO listings
- **Review Console Logs**: Look for JavaScript errors

#### Slow Performance
- **Reduce Delays**: Customize timing values (use caution)
- **Close Applications**: Free up system resources
- **Check Internet**: Ensure stable connection

#### CSV File Issues
- **File Permissions**: Verify write access to Desktop
- **File in Use**: Close CSV file in other applications
- **Path Errors**: Check file path formatting

### Debug Mode
Enable detailed logging by monitoring Console.app:
1. Open Console.app
2. Filter for "Keyboard Maestro"
3. Run the macro
4. Review detailed execution logs

### Recovery Procedures

#### Stuck Modal
If a property modal won't close:
1. Press `Escape` key manually
2. Refresh the page
3. Restart the macro

#### Page Load Timeout
If pages won't load:
1. Check internet connection
2. Clear Safari cache
3. Restart Safari

## 🎛️ Customization

### Modifying Selectors
Update JavaScript selectors if Zillow changes their HTML structure:

```javascript
// In action 6103 - Card Discovery
const container = 
  document.querySelector('ul.photo-cards') ||
  document.querySelector('[data-test="search-page-list-container"]');

// In action 6207 - Data Extraction
let address = pickText(modal, [
  '[data-testid="home-details-summary-headline"]',
  '.ds-address-container',
  'header h1',
  'h1'
]);
```

### Adding Data Fields
To extract additional property information:

1. **Modify the CSV header** (action `6006`)
2. **Update the extraction JavaScript** (action `6207`)
3. **Add new variables** for the extracted data

Example - Adding square footage:
```javascript
// In the data extraction function
let sqft = pickText(modal, [
  '[data-testid="bed-bath-sqft-fact-container"]',
  '.ds-bed-bath-living-area'
]);
// Add to CSV row construction
```

### Performance Tuning

#### Speed Up (Use Carefully)
```xml
<!-- Reduce delays -->
<key>Time</key><string>RANDOM(10,30)/100</string>  <!-- Faster -->
```

#### Slow Down (More Stealthy)
```xml
<!-- Increase delays -->
<key>Time</key><string>RANDOM(100,200)/100</string>  <!-- Slower -->
```

## 📦 Dependencies

### Keyboard Maestro Macros
- `LOG-INIT-FSBO` - Initialization logging
- `LOG-LINE-FSBO` - Runtime logging

### System Utilities
- `/usr/bin/caffeinate` - Prevents system sleep
- `/usr/bin/killall` - Process cleanup

### Browser Requirements
- Safari with JavaScript enabled
- No ad blockers that interfere with page structure
- Stable internet connection

## ⚠️ Limitations

### Technical Limitations
- **Safari Only**: Designed specifically for Safari browser
- **macOS Only**: Uses macOS-specific system calls
- **Single-threaded**: Processes one property at a time
- **No Headless Mode**: Requires visible browser interaction

### Data Limitations
- **FSBO Only**: Specifically targets owner-listed properties
- **Phone Numbers**: Primary focus, other data fields minimal
- **English Only**: Designed for US English Zillow interface
- **No Image Extraction**: Text data only

### Rate Limiting
- **Built-in Delays**: Randomized timing to appear human
- **No Parallel Processing**: Sequential property processing
- **Respectful Crawling**: Includes natural pauses

### Maintenance Requirements
- **Selector Updates**: May need updates if Zillow changes HTML
- **URL Monitoring**: Target URLs may change over time
- **Permission Renewal**: System permissions may need refresh

## 🔄 Updates and Maintenance

### Regular Maintenance
1. **Test Monthly**: Verify macro still works with current Zillow layout
2. **Update Selectors**: Modify JavaScript selectors as needed
3. **Check Dependencies**: Ensure all helper macros remain functional
4. **Review Output**: Validate data quality and completeness

### Version History
- **Current Version**: Readable, Randomized with While Loop
- **Key Features**: Enhanced logging, improved card detection, robust pagination
- **Previous Versions**: Available in repository history

## 📞 Support

### Getting Help
1. **Check Troubleshooting**: Review common issues above
2. **Console Logs**: Use Console.app for detailed debugging
3. **Test Dependencies**: Verify all required macros are working
4. **Simplify Setup**: Test with minimal Safari configuration

### Reporting Issues
When reporting problems, please include:
- macOS version
- Keyboard Maestro version
- Console.app error messages
- Steps to reproduce the issue
- Expected vs actual behavior

---

**Last Updated**: September 2025  
**Compatibility**: macOS Sonoma+, Keyboard Maestro 11+  
**License**: Educational/Research Use Only
