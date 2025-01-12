# **FinTrack**

The financial advisor system is a cutting-edge platform designed to provide users with personalized financial insights and guidance. By integrating multiple banking APIs and leveraging the Account Aggregator (AA) framework, it securely aggregates user financial data across various institutions. The system offers a user-friendly interface with advanced data visualization tools, including interactive charts and downloadable reports. It also utilizes multimodal LLMs to deliver personalized advice via both text and voice, enhancing user interaction. The platform ensures data privacy and security through data encryption and role-based access control (RBAC). Additionally, it offers gamified learning modules to improve financial literacy, making it a comprehensive tool for managing personal finance.

## Live Demo


## Key Features

### 1. User Onboarding
- **Data Collection**: Collect user details, including PAN, financial documents, properties, and loans.
- **Account Aggregation**: Integrate with Setu API and leading Indian bank APIs (ICICI, HDFC, Yes Bank) for seamless account linking.
- **Consent Management**: Adhere to DPDP and IT Act guidelines with explicit user consent for data processing.

### 2. Financial Data Integration
- **Data Sources**: Support for CSV, XML, and JSON file uploads.
- **Validation**: Ensure file integrity by validating formats and rejecting invalid structures.
- **Aggregation**: Leverage the Account Aggregator framework for a unified financial view.

### 3. Visualization and Reporting
- **Interactive Charts**: Pie charts, bar graphs, and line charts for collateral distribution, loan status, and transaction patterns.
- **Custom Reports**: Generate and download detailed financial reports in PDF format.

### 4. AI-Powered Recommendations
- **Loan Suggestions**: Tailored loan options based on income, existing loans, and market trends.
- **Investment Opportunities**: Personalized micro-investment suggestions.
- **Real-Time Notifications**: Alerts for interest rate changes, due dates, and new financial products.

### 5. Gamified Learning Platform
- **Customized Modules**: Financial education tailored to user profiles.
- **Interactive Games**: Scenario-based games to teach savings, budgeting, and investment.
- **Progress Tracking**: Milestone-based progression for financial literacy levels.

### 6. Security and Compliance
- **Data Encryption**: PAN and sensitive data encrypted in storage and transit.
- **RBI Compliance**: Adherence to RBI guidelines for bank integrations.
- **User Consent**: Securely store user consent records for transparency.

### 7. AI Chatbot with Multimodal LLMs
- **Conversational AI**: Voice and text interactions in regional languages.
- **Tailored Guidance**: Context-aware responses for financial planning.
- **Complex Scenarios**: Handle multi-loan, diversified investment, and goal-setting scenarios.

### 8. Microfinance System Integration
- **Loan Management**: Simplify micro-loans and subsidy processes.
- **Repayment Tracking**: Notifications for loan repayment schedules.
- **Goal Setting**: Tools for setting and monitoring financial goals.

---

## Technology Stack

### Frontend
- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit

### Backend
- **Framework**: FastAPI and Flask
- **Database**: MongoDB
- **Authentication**: JWT-based secure SSR authentication with role-based access control

### AI Integration
- **LLM**: OpenAI GPT-4 fine-tuned for financial scenarios
- **NLP**: Multimodal agents for voice and text-based interaction
- **TTS**: Text-to-Speech technologies for regional language support

### APIs
- **Banking APIs**: Setu API, ICICI Bank, Yes Bank, HDFC Bank
- **Account Aggregator**: RBI-compliant data aggregation framework
- **Market Data**: Real-time APIs for interest rates, stock prices, and financial insights

---

## Use Cases

1. **Personal Financial Management**
   - Link and manage multiple bank accounts with real-time data.
   - Receive personalized investment and loan recommendations.

2. **Financial Education**
   - Learn savings, budgeting, and investment through gamified modules.
   - Progress through levels to achieve financial literacy milestones.

3. **Microfinance Empowerment**
   - Access and manage micro-loans and subsidies.
   - Track loan repayments and receive timely notifications.

4. **Small Business Support**
   - Analyze cash flow and manage finances for small businesses.
   - Access insights and credit opportunities tailored to business needs.

5. **Secure Financial Planning**
   - Upload financial documents for AI-driven analysis and guidance.
   - Generate custom reports for informed decision-making.

---

## Future Enhancements
- **Blockchain Integration**: Add transparency and security to financial data handling.
- **Voice-Only Interface**: Expand accessibility for low-literacy users.
- **Advanced AI Models**: Incorporate next-gen LLM advancements for enhanced personalization.

---
## Installation Steps

**1. Clone the repository:**

```bash
git clone https://github.com/techySPHINX/FinTrack.git
cd finance-gpt
```

**2. Install dependencies:**

```bash
npm install
```

**3. Set up the database:**

Ensure you have [MongoDB](https://www.mongodb.com/) installed and running on your system, or use a cloud-hosted MongoDB service like [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database). Create a new Cluster, select a free plan, and copy the connection string, this will be required in the next step.

**4. Set up environment variables:**

Create a `.env.local` file in the root directory and add the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

**5. Run the development server:**

```bash
npm run dev
```

**6. Open your browser and navigate to `http://localhost:3000`**


## How to use the application

1. Register for a new account or log in
2. Complete the onboarding process to set up your financial profile
3. Explore the financial snapshot dashboard
4. Set financial goals and receive AI-powered strategies
5. Use the chatbot for financial guidance


## Contributing

We love contributions! Here's how you can help make FinanceGPT even better:

1. Fork the project (`gh repo fork https://github.com/techySPHINX/FinTrack.git`)
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/techySPHINX/FinTrack/blob/main/LICENSE) file for details.


## Contact
Please open an issue in the GitHub repository for any queries or support.
