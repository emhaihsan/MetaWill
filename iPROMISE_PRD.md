# iPROMISE: Product Requirement Document

## Project Overview

**Project Name:** iPROMISE  
**Platform Type:** Web3 Commitment Platform  
**Hackathon:** Electroneum Hackathon  
**Date:** March 6, 2025

## Executive Summary

iPROMISE is a decentralized platform built on blockchain technology that enables users to create and fulfill personal commitments with financial accountability. Users stake Ethereum as collateral for their promises, which is either returned upon successful completion or donated to charity if the commitment is not fulfilled. The platform leverages smart contracts to ensure transparency and trustless verification through a validator system.

## Problem Statement

People often struggle to follow through on personal commitments and goals. Traditional methods lack accountability mechanisms that are both effective and transparent. Current solutions either rely on trust-based systems or centralized authorities, which can be manipulated or compromised.

## Solution

iPROMISE provides a decentralized commitment platform where users can:
1. Create public commitments with financial stakes
2. Set their own deadlines
3. Assign trusted validators
4. Receive verification of completion
5. Automatically handle the financial consequences of success or failure

The platform uses blockchain technology to ensure transparency, immutability, and trustless execution of the commitment process.

## Target Users

- Individuals seeking accountability for personal goals
- Communities wanting to encourage commitment fulfillment
- Organizations implementing transparent commitment systems
- Web3 enthusiasts interested in practical blockchain applications

## Key Features & Requirements

### 1. Wallet-Based Authentication
- **Description:** Users must connect their Ethereum wallet to access the platform
- **Requirements:**
  - Integration with RainbowKit for wallet connection
  - Support for multiple wallet providers
  - Secure authentication flow
  - Wallet address used as unique user identifier

### 2. Commitment Creation
- **Description:** Users can create detailed commitments with financial stakes
- **Requirements:**
  - Form for commitment description
  - ETH amount selection for stake
  - Calendar interface for deadline selection
  - Validator address input field
  - Confirmation screen showing gas fees and total cost
  - Smart contract deployment upon confirmation

### 3. Validator Selection
- **Description:** Users must designate one external address as their commitment validator
- **Requirements:**
  - Address validation to ensure it's a valid Ethereum address
  - Option to include validator name/description for reference
  - Notification system to alert selected validator
  - Clear explanation of validator responsibilities

### 4. Financial Staking Mechanism
- **Description:** Users lock ETH as collateral for their commitment
- **Requirements:**
  - Minimum and maximum stake limits
  - Clear display of staked amount
  - Secure smart contract for holding funds
  - Transaction confirmation and receipt

### 5. Commitment Validation Process
- **Description:** Two-party verification system for commitment completion
- **Requirements:**
  - User self-reporting interface (success/failure)
  - Validator verification interface
  - Consensus mechanism between user and validator
  - Dispute resolution process (if needed)

### 6. Outcome Processing
- **Description:** Automatic handling of funds based on commitment outcome
- **Requirements:**
  - Success scenario: Return of staked ETH to user
  - Failure scenario: Transfer of staked ETH to donation address
  - Transaction confirmation and receipts
  - History of outcomes in user dashboard

### 7. User Dashboard
- **Description:** Central interface for managing commitments
- **Requirements:**
  - Active commitments display
  - Past commitments history
  - Validation requests section
  - Financial summary (staked, returned, donated)
  - Profile management

### 8. Donation Mechanism
- **Description:** System for handling failed commitment stakes
- **Requirements:**
  - Predefined donation address(es)
  - Transparent donation tracking
  - Receipt generation for donations
  - Impact reporting (if applicable)

## Technical Requirements

### Smart Contracts
- Solidity-based contracts for:
  - Commitment creation and management
  - Fund staking and escrow
  - Validation logic
  - Automated fund distribution

### Frontend
- React-based web application
- RainbowKit integration for wallet connection
- Responsive design for mobile and desktop
- User-friendly interfaces for all core functions

### Backend/Blockchain
- Ethereum blockchain integration
- IPFS for storing commitment details (if needed)
- Event listeners for smart contract events
- Gas optimization for cost-effective transactions

## User Flows

### 1. User Registration/Login
1. User visits iPROMISE platform
2. Clicks "Connect Wallet"
3. Selects wallet provider through RainbowKit
4. Approves connection request
5. Wallet address is authenticated and user enters platform

### 2. Creating a Commitment
1. User navigates to "New Commitment" section
2. Enters commitment details and description
3. Sets deadline date
4. Specifies ETH amount to stake
5. Enters validator's Ethereum address
6. Reviews commitment details
7. Confirms and signs transaction
8. Receives confirmation of commitment creation

### 3. Validation Process
1. Validator receives notification of validation request
2. Validator monitors user's progress
3. When deadline approaches:
   - User reports completion status (success/failure)
   - Validator confirms or disputes user's claim
4. System processes outcome based on consensus

### 4. Commitment Resolution
1. If both user and validator confirm success:
   - Smart contract returns staked ETH to user
   - Commitment marked as successfully completed
2. If either user or validator reports failure:
   - Smart contract transfers staked ETH to donation address
   - Commitment marked as failed
3. User receives notification of outcome
4. Transaction details recorded in history

## Success Metrics

- Number of active users
- Total commitments created
- Commitment success rate
- Average stake amount
- Total donations generated
- User retention rate
- Platform engagement metrics

## Future Enhancements (Post-Hackathon)

- Multi-validator support for complex commitments
- Social features (commitment sharing, public profiles)
- Achievement badges and gamification elements
- Integration with additional blockchains
- Mobile application
- API for third-party integrations
- DAO governance for platform decisions
- Token-based incentives for validators

## Implementation Timeline (Hackathon Focus)

### Phase 1: Core Development
- Smart contract development and testing
- Basic frontend with wallet connection
- Commitment creation flow

### Phase 2: Validation System
- Validator notification and interface
- Consensus mechanism implementation
- Fund distribution logic

### Phase 3: User Experience
- Dashboard development
- History and tracking features
- UI/UX refinement

### Phase 4: Testing & Deployment
- Comprehensive testing
- Deployment to testnet
- Documentation completion
- Hackathon submission preparation

## Conclusion

iPROMISE represents a novel application of blockchain technology to solve the universal challenge of commitment fulfillment. By creating financial incentives and a transparent validation system, the platform encourages users to follow through on their promises while generating positive social impact through its donation mechanism.
