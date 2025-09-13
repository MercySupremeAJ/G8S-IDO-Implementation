# Test Cases - G8S University IDO Platform

**Version:** 1.0  
**Date:** December 2024  
**Project:** G8S University Initial DEX Offering (IDO) Platform  
**Test Environment:** Production (Vercel) + Sepolia Testnet  

---

## 1. Test Overview

### 1.1 Test Scope
This document outlines comprehensive test cases for the G8S University IDO Platform, covering all functional and non-functional requirements. The tests are designed to ensure the platform operates correctly in production with real smart contracts deployed on Sepolia testnet.

### 1.2 Test Environment
- **Frontend:** Vercel deployment
- **Blockchain:** Ethereum Sepolia Testnet
- **Network ID:** 11155111
- **Token Contract:** `0x8e90E7a1D70c38987B0bac7F2dbfDA41aD752AD7`
- **IDO Contract:** `0x98ad7104D652173Ca00BD89805625A15b950dbA9`
- **Treasury:** `0x3F9F3Ef80CC1A53ba77a00B5ee66262ED2FEa72D`

### 1.3 Test Categories
- **Functional Testing:** User interface and core functionality
- **Integration Testing:** Smart contract interactions
- **Performance Testing:** Load and response times
- **Security Testing:** Wallet and transaction security
- **Usability Testing:** User experience and accessibility

---

## 2. Landing Page Test Cases

### 2.1 Page Load and Display Tests

| Test ID | Test Case | Expected Result | Priority |
|---------|-----------|-----------------|----------|
| TC-001 | Verify landing page loads successfully | Page loads within 3 seconds with all elements visible | High |
| TC-002 | Verify hero section displays correctly | Hero section shows IDO progress (67.3%) and fundraising stats | High |
| TC-003 | Verify navigation menu functionality | All navigation links work and highlight current page | Medium |
| TC-004 | Verify responsive design on mobile | Page displays correctly on mobile devices (320px-768px) | High |
| TC-005 | Verify responsive design on tablet | Page displays correctly on tablet devices (768px-1024px) | Medium |
| TC-006 | Verify responsive design on desktop | Page displays correctly on desktop (1024px+) | Medium |

### 2.2 Content and Data Tests

| Test ID | Test Case | Expected Result | Priority |
|---------|-----------|-----------------|----------|
| TC-007 | Verify IDO progress display | Progress shows 67.3% with visual progress bar | High |
| TC-008 | Verify fundraising statistics | Shows "2,019 ETH Raised" and "3,000 ETH Goal" | High |
| TC-009 | Verify feature cards display | Three feature cards show Academic Excellence, Tokenized Learning, Future-Ready Skills | Medium |
| TC-010 | Verify call-to-action buttons | "Join IDO Now" and "View Whitepaper" buttons are clickable | High |
| TC-011 | Verify footer information | Footer displays copyright and links correctly | Low |

### 2.3 Interactive Elements Tests

| Test ID | Test Case | Expected Result | Priority |
|---------|-----------|-----------------|----------|
| TC-012 | Click "Join IDO Now" button | Redirects to dashboard page | High |
| TC-013 | Click "View Whitepaper" button | Opens whitepaper (if implemented) or shows placeholder | Medium |
| TC-014 | Click navigation links | All navigation links redirect to correct pages | Medium |
| TC-015 | Hover over interactive elements | Hover effects work correctly | Low |

---

## 3. Dashboard Page Test Cases

### 3.1 Page Load and Authentication Tests

| Test ID | Test Case | Expected Result | Priority |
|---------|-----------|-----------------|----------|
| TC-016 | Verify dashboard loads without wallet | Page loads with wallet connection prompt | High |
| TC-017 | Verify dashboard loads with wallet connected | Page loads with user data and purchase options | High |
| TC-018 | Verify wallet connection status | Wallet connection status displays correctly | High |
| TC-019 | Verify user data loading | User contribution and token allocation display correctly | High |
| TC-020 | Verify real-time metrics update | Live metrics update every 5 seconds | Medium |

### 3.2 IDO Progress Display Tests

| Test ID | Test Case | Expected Result | Priority |
|---------|-----------|-----------------|----------|
| TC-021 | Verify progress visualization | Circular progress bar shows 67.3% completion | High |
| TC-022 | Verify fundraising amounts | Shows "2,019 ETH" raised and "981 ETH" remaining | High |
| TC-023 | Verify soft cap status | Shows "Soft Cap: 1,500 ETH ✓ Reached" | Medium |
| TC-024 | Verify hard cap target | Shows "Hard Cap: 3,000 ETH Target" | Medium |
| TC-025 | Verify live badge | "Live" badge displays with green color and pulse animation | Low |

### 3.3 User Data Display Tests

| Test ID | Test Case | Expected Result | Priority |
|---------|-----------|-----------------|----------|
| TC-026 | Verify user contribution display | Shows user's ETH contribution amount | High |
| TC-027 | Verify token allocation display | Shows G8S tokens allocated to user | High |
| TC-028 | Verify vesting schedule | Shows vesting start date and schedule | Medium |
| TC-029 | Verify user ranking | Shows user's rank among contributors | Medium |
| TC-030 | Verify allocation breakdown | Shows initial (20%) and vested (80%) allocation | Medium |

### 3.4 Tab Navigation Tests

| Test ID | Test Case | Expected Result | Priority |
|---------|-----------|-----------------|----------|
| TC-031 | Click Overview tab | Overview tab content displays correctly | Medium |
| TC-032 | Click Transactions tab | Transaction history displays correctly | Medium |
| TC-033 | Click Analytics tab | Analytics charts and data display correctly | Medium |
| TC-034 | Verify tab switching | Tab switching works smoothly without page reload | Medium |

---

## 4. Purchase Modal Test Cases

### 4.1 Modal Opening and Display Tests

| Test ID | Test Case | Expected Result | Priority |
|---------|-----------|-----------------|----------|
| TC-035 | Click "Buy Tokens" button | Purchase modal opens with step 1 (Enter Amount) | High |
| TC-036 | Verify modal without wallet connection | Modal shows "Connect Wallet First" state | High |
| TC-037 | Verify modal with wallet connected | Modal shows "Buy Tokens" button enabled | High |
| TC-038 | Verify step indicator | Step indicator shows current step (1-4) | Medium |
| TC-039 | Verify modal responsiveness | Modal displays correctly on mobile devices | High |

### 4.2 Step 1 - Amount Entry Tests

| Test ID | Test Case | Expected Result | Priority |
|---------|-----------|-----------------|----------|
| TC-040 | Enter valid ETH amount | Amount input accepts decimal values | High |
| TC-041 | Enter 0.001 ETH (minimum) | Minimum amount accepted and Continue button enabled | High |
| TC-042 | Enter 10 ETH (maximum) | Maximum amount accepted and Continue button enabled | High |
| TC-043 | Enter amount below minimum | Continue button disabled with validation message | High |
| TC-044 | Enter amount above maximum | Continue button disabled with validation message | High |
| TC-045 | Verify token calculation | Shows correct G8S tokens (1 ETH = 1,000,000 G8S) | High |
| TC-046 | Verify gas fee estimation | Shows estimated gas fee (0.005 ETH) | Medium |
| TC-047 | Enter invalid characters | Input rejects non-numeric characters | Medium |

### 4.3 Step 2 - Review Tests

| Test ID | Test Case | Expected Result | Priority |
|---------|-----------|-----------------|----------|
| TC-048 | Verify purchase summary | Shows ETH amount, G8S tokens, gas fee, and total cost | High |
| TC-049 | Click Back button | Returns to Step 1 with amount preserved | Medium |
| TC-050 | Click Confirm button | Proceeds to Step 3 (Processing) | High |
| TC-051 | Verify total cost calculation | Total cost = ETH amount + gas fee | High |

### 4.4 Step 3 - Processing Tests

| Test ID | Test Case | Expected Result | Priority |
|---------|-----------|-----------------|----------|
| TC-052 | Click "Confirm Purchase" | Transaction processing begins | High |
| TC-053 | Verify processing state | Shows loading spinner and "Processing Transaction" message | High |
| TC-054 | Verify transaction success | Proceeds to Step 4 (Success) with transaction hash | High |
| TC-055 | Verify transaction failure | Shows error message and allows retry | High |
| TC-056 | Verify transaction timeout | Handles timeout gracefully with error message | Medium |

### 4.5 Step 4 - Success Tests

| Test ID | Test Case | Expected Result | Priority |
|---------|-----------|-----------------|----------|
| TC-057 | Verify success message | Shows "Purchase Successful!" with checkmark icon | High |
| TC-058 | Verify token amount display | Shows correct number of G8S tokens purchased | High |
| TC-059 | Verify Etherscan link | Etherscan link opens in new tab with correct transaction hash | Medium |
| TC-060 | Close modal and reopen | Modal resets to Step 1 for new purchase | Medium |

---

## 5. Wallet Integration Test Cases

### 5.1 Wallet Connection Tests

| Test ID | Test Case | Expected Result | Priority |
|---------|-----------|-----------------|----------|
| TC-061 | Click "Connect Wallet" button | MetaMask connection prompt appears | High |
| TC-062 | Approve wallet connection | Wallet connects and address displays | High |
| TC-063 | Reject wallet connection | Connection rejected gracefully | Medium |
| TC-064 | Verify wallet address display | Connected wallet address shows correctly | High |
| TC-065 | Verify wallet balance display | ETH balance shows correctly | Medium |
| TC-066 | Disconnect wallet | Wallet disconnects and connection prompt reappears | Medium |

### 5.2 Network Validation Tests

| Test ID | Test Case | Expected Result | Priority |
|---------|-----------|-----------------|----------|
| TC-067 | Verify Sepolia network | Platform detects and validates Sepolia network | High |
| TC-068 | Switch to wrong network | Shows network switch prompt to Sepolia | High |
| TC-069 | Verify network switching | Network switches to Sepolia successfully | Medium |
| TC-070 | Verify network validation | Platform validates correct network before transactions | High |

---

## 6. Smart Contract Integration Test Cases

### 6.1 Contract Interaction Tests

| Test ID | Test Case | Expected Result | Priority |
|---------|-----------|-----------------|----------|
| TC-071 | Verify token contract connection | Token contract connects successfully | High |
| TC-072 | Verify IDO contract connection | IDO contract connects successfully | High |
| TC-073 | Verify contract data loading | Contract data (balance, price, etc.) loads correctly | High |
| TC-074 | Verify transaction execution | Token purchase transaction executes successfully | High |
| TC-075 | Verify transaction confirmation | Transaction confirms and updates user data | High |

### 6.2 Data Synchronization Tests

| Test ID | Test Case | Expected Result | Priority |
|---------|-----------|-----------------|----------|
| TC-076 | Verify real-time balance updates | User balance updates after successful purchase | High |
| TC-077 | Verify IDO progress updates | IDO progress updates after new contributions | Medium |
| TC-078 | Verify metrics refresh | Live metrics refresh every 5 seconds | Medium |
| TC-079 | Verify data consistency | All displayed data matches contract state | High |

---

## 7. Admin Page Test Cases

### 7.1 Admin Access and Display Tests

| Test ID | Test Case | Expected Result | Priority |
|---------|-----------|-----------------|----------|
| TC-080 | Verify admin page loads | Admin page loads with monitoring interface | Medium |
| TC-081 | Verify live monitoring badge | "Live Monitoring" badge displays with pulse animation | Low |
| TC-082 | Verify admin stats display | Admin statistics display correctly | Medium |
| TC-083 | Verify transaction feed | Live transaction feed displays recent transactions | Medium |
| TC-084 | Verify analytics charts | Analytics charts render correctly | Medium |

### 7.2 Admin Functionality Tests

| Test ID | Test Case | Expected Result | Priority |
|---------|-----------|-----------------|----------|
| TC-085 | Click "Export Data" button | Data export functionality works (if implemented) | Low |
| TC-086 | Click "Generate Report" button | Report generation works (if implemented) | Low |
| TC-087 | Verify user management | User management interface displays correctly | Medium |
| TC-088 | Verify contribution analytics | Contribution analytics display correctly | Medium |

---

## 8. Performance Test Cases

### 8.1 Load Time Tests

| Test ID | Test Case | Expected Result | Priority |
|---------|-----------|-----------------|----------|
| TC-089 | Measure landing page load time | Page loads within 3 seconds | High |
| TC-090 | Measure dashboard load time | Dashboard loads within 3 seconds | High |
| TC-091 | Measure admin page load time | Admin page loads within 3 seconds | Medium |
| TC-092 | Measure modal open time | Purchase modal opens within 1 second | Medium |

### 8.2 Real-time Update Tests

| Test ID | Test Case | Expected Result | Priority |
|---------|-----------|-----------------|----------|
| TC-093 | Verify metrics update frequency | Metrics update every 5 seconds | Medium |
| TC-094 | Verify progress bar updates | Progress bar updates smoothly | Medium |
| TC-095 | Verify live activity updates | Recent activity updates in real-time | Low |

---

## 9. Security Test Cases

### 9.1 Input Validation Tests

| Test ID | Test Case | Expected Result | Priority |
|---------|-----------|-----------------|----------|
| TC-096 | Test XSS prevention | Malicious scripts are prevented from execution | High |
| TC-097 | Test SQL injection prevention | SQL injection attempts are blocked | High |
| TC-098 | Test input sanitization | User inputs are properly sanitized | High |
| TC-099 | Test amount validation | Only valid numeric amounts are accepted | High |

### 9.2 Transaction Security Tests

| Test ID | Test Case | Expected Result | Priority |
|---------|-----------|-----------------|----------|
| TC-100 | Verify transaction validation | Transactions are validated before execution | High |
| TC-101 | Verify gas limit protection | Gas limits prevent excessive gas usage | Medium |
| TC-102 | Verify balance checks | Sufficient balance checks before transactions | High |
| TC-103 | Verify contract interaction security | Contract interactions are secure | High |

---

## 10. Usability Test Cases

### 10.1 User Experience Tests

| Test ID | Test Case | Expected Result | Priority |
|---------|-----------|-----------------|----------|
| TC-104 | Test purchase flow intuitiveness | Purchase flow is easy to follow | High |
| TC-105 | Test error message clarity | Error messages are clear and helpful | Medium |
| TC-106 | Test loading state feedback | Loading states provide clear feedback | Medium |
| TC-107 | Test success confirmation | Success states are clearly communicated | Medium |

### 10.2 Accessibility Tests

| Test ID | Test Case | Expected Result | Priority |
|---------|-----------|-----------------|----------|
| TC-108 | Test keyboard navigation | All functions accessible via keyboard | Medium |
| TC-109 | Test screen reader compatibility | Screen readers can read all content | Low |
| TC-110 | Test color contrast | Text has sufficient color contrast | Low |
| TC-111 | Test focus indicators | Focus indicators are visible | Low |

---

## 11. Cross-Browser Test Cases

### 11.1 Browser Compatibility Tests

| Test ID | Test Case | Expected Result | Priority |
|---------|-----------|-----------------|----------|
| TC-112 | Test Chrome browser | Platform works correctly in Chrome | High |
| TC-113 | Test Firefox browser | Platform works correctly in Firefox | High |
| TC-114 | Test Safari browser | Platform works correctly in Safari | Medium |
| TC-115 | Test Edge browser | Platform works correctly in Edge | Medium |

---

## 12. Mobile Device Test Cases

### 12.1 Mobile Responsiveness Tests

| Test ID | Test Case | Expected Result | Priority |
|---------|-----------|-----------------|----------|
| TC-116 | Test iPhone compatibility | Platform works on iPhone devices | High |
| TC-117 | Test Android compatibility | Platform works on Android devices | High |
| TC-118 | Test tablet compatibility | Platform works on tablet devices | Medium |
| TC-119 | Test mobile wallet integration | Mobile wallet integration works | High |

---

## 13. Test Execution Summary

### 13.1 Test Results Tracking
- **Total Test Cases:** 119
- **High Priority:** 67 test cases
- **Medium Priority:** 38 test cases
- **Low Priority:** 14 test cases

### 13.2 Test Environment Setup
1. **Prerequisites:**
   - MetaMask wallet installed
   - Sepolia testnet configured
   - Test ETH available for transactions
   - Stable internet connection

2. **Test Data:**
   - Test wallet addresses with Sepolia ETH
   - Various contribution amounts (0.001 ETH to 10 ETH)
   - Expected transaction hashes for verification

### 13.3 Test Execution Schedule
- **Phase 1:** Critical functionality (TC-001 to TC-075) - 2 days
- **Phase 2:** Integration and performance (TC-076 to TC-095) - 1 day
- **Phase 3:** Security and usability (TC-096 to TC-119) - 1 day

---

## 14. Defect Reporting

### 14.1 Defect Severity Levels
- **Critical:** System crashes, data loss, security vulnerabilities
- **High:** Core functionality failures, transaction errors
- **Medium:** UI issues, performance problems
- **Low:** Minor UI inconsistencies, accessibility issues

### 14.2 Defect Report Template
```
Defect ID: DEF-XXX
Title: [Brief description]
Severity: [Critical/High/Medium/Low]
Priority: [P1/P2/P3/P4]
Environment: Production (Vercel + Sepolia)
Steps to Reproduce:
1. [Step 1]
2. [Step 2]
3. [Step 3]
Expected Result: [What should happen]
Actual Result: [What actually happens]
Screenshots: [If applicable]
```

---

## 15. Test Completion Criteria

### 15.1 Pass/Fail Criteria
- **Pass:** All critical and high priority test cases pass
- **Fail:** Any critical test case fails or >5% high priority failures

### 15.2 Sign-off Requirements
- All critical test cases executed and passed
- All high priority test cases executed and passed
- Performance benchmarks met
- Security tests completed
- Cross-browser compatibility verified

---

**Document Prepared By:** AI Assistant  
**Test Environment:** Production (Vercel) + Sepolia Testnet  
**Last Updated:** December 2024  
**Status:** ✅ Ready for Execution
