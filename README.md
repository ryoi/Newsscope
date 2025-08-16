# 📰 NewsScope Pro - AI-Powered News Intelligence Platform

> **Transform how you consume news with AI-powered fact-checking, political bias analysis, and intelligent insights.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge)](https://newsscope-pro-ai-pow-szo6.bolt.host)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 🌟 Overview

NewsScope Pro is a cutting-edge news aggregation platform that leverages artificial intelligence to provide users with comprehensive news analysis, fact-checking, and bias detection. Built with modern web technologies, it offers a premium news consumption experience with three distinct subscription tiers.

### 🎯 Key Features

- **🤖 AI-Powered Analysis**: Advanced fact-checking and credibility scoring
- **⚖️ Political Bias Detection**: Identify and understand news source perspectives
- **📊 Advanced Analytics**: Enterprise-grade insights and reporting
- **🕒 Timeline Tracking**: Follow story development over time
- **🔍 Smart Filtering**: Advanced search and categorization
- **📱 Responsive Design**: Seamless experience across all devices
- **🌙 Dark Mode**: Eye-friendly reading experience

## 🚀 Live Demo

Experience NewsScope Pro in action: **[https://newsscope-pro-ai-pow-szo6.bolt.host](https://newsscope-pro-ai-pow-szo6.bolt.host)**

## 📋 Table of Contents

- [Features by Subscription Tier](#-features-by-subscription-tier)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Key Components](#-key-components)
- [AI Analysis Features](#-ai-analysis-features)
- [Subscription Tiers](#-subscription-tiers)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)

## 💎 Features by Subscription Tier

### 🆓 **Basic Tier** (Free)
- ✅ Access to 50 articles per day
- ✅ Basic news aggregation from multiple sources
- ✅ Simple search functionality
- ✅ Mobile app access
- ✅ Category-based filtering
- ✅ Bookmark articles
- ❌ AI fact-checking
- ❌ Political bias analysis
- ❌ Advanced filtering

### 🔥 **Pro Tier** ($12.99/month)
- ✅ **Everything in Basic**, plus:
- ✅ **Unlimited article access**
- ✅ **AI-powered fact checking** with confidence scores
- ✅ **Political bias analysis** and reasoning
- ✅ **Source credibility assessment**
- ✅ **Advanced filtering options** (bias, fact-check status, credibility)
- ✅ **Enhanced AI insights** with detailed analysis
- ✅ **Priority customer support**
- ❌ Timeline tracking
- ❌ Analytics dashboard

### 🏢 **Enterprise Tier** ($29.99/month)
- ✅ **Everything in Pro**, plus:
- ✅ **Timeline tracking** for story development
- ✅ **Advanced analytics dashboard** with insights
- ✅ **Historical context analysis**
- ✅ **Reading pattern analytics**
- ✅ **Political bias distribution reports**
- ✅ **Source credibility analytics**
- ✅ **Trending topics analysis**
- ✅ **Custom news alerts**
- ✅ **API access** for integration
- ✅ **Team collaboration features**

## 🛠 Technology Stack

### Frontend
- **React 18.3.1** - Modern UI library with hooks
- **TypeScript 5.5.3** - Type-safe development
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Vite 5.4.2** - Fast build tool and dev server
- **Lucide React** - Beautiful icon library

### Development Tools
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### Key Libraries
- **React Hooks** - State management and side effects
- **Custom Hooks** - Reusable logic for news data, themes, subscriptions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/newsscope-pro.git
   cd newsscope-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # Main navigation header
│   ├── Navigation.tsx   # Tab navigation
│   ├── NewsFeed.tsx     # Article feed display
│   ├── NewsCard.tsx     # Individual article cards
│   ├── FilterSidebar.tsx # Advanced filtering
│   ├── FactCheckModal.tsx # AI analysis modal
│   ├── SubscriptionModal.tsx # Pricing modal
│   ├── TimelineView.tsx # Enterprise timeline
│   └── AnalyticsView.tsx # Enterprise analytics
├── hooks/               # Custom React hooks
│   ├── useNewsData.ts   # News filtering logic
│   ├── useSubscription.ts # Subscription management
│   └── useTheme.ts      # Dark/light mode
├── data/                # Mock data and types
│   ├── mockNews.ts      # Sample articles
│   └── subscriptionTiers.ts # Pricing tiers
├── types/               # TypeScript definitions
│   └── index.ts         # Core interfaces
└── App.tsx              # Main application component
```

## 🧩 Key Components

### 📰 **NewsCard Component**
- Displays article information with rich metadata
- Shows AI analysis for Pro/Enterprise users
- Includes upgrade prompts for Basic users
- Handles bookmarking and sharing functionality

### 🔍 **FilterSidebar Component**
- Category and source filtering (all tiers)
- Political bias filtering (Pro+ only)
- Fact-check status filtering (Pro+ only)
- Credibility score filtering (Pro+ only)

### 🤖 **FactCheckModal Component**
- Comprehensive AI analysis display
- Fact verification with confidence scores
- Political bias analysis with reasoning
- Source credibility assessment
- Upgrade prompts for Basic users

### 📊 **AnalyticsView Component** (Enterprise)
- Political bias distribution charts
- Source credibility analytics
- Trending topics analysis
- Reading pattern insights
- Interactive data visualization

### 🕒 **TimelineView Component** (Enterprise)
- Story development tracking
- Historical context analysis
- Significance indicators
- Multi-perspective coverage

## 🤖 AI Analysis Features

### Fact-Checking Engine
- **Verification Status**: Verified, Partially Verified, Disputed, False, Pending
- **Confidence Scoring**: 0-100% accuracy assessment
- **Source Cross-referencing**: Multiple source validation
- **Real-time Analysis**: Instant fact verification

### Political Bias Detection
- **Orientation Analysis**: Left, Center-Left, Center, Center-Right, Right
- **Confidence Metrics**: Statistical bias assessment
- **Reasoning Engine**: Detailed explanation of bias determination
- **Historical Context**: Source bias tracking over time

### Credibility Assessment
- **Source Reputation**: Publisher credibility scoring
- **Author Expertise**: Writer background analysis
- **Factual Accuracy**: Historical accuracy tracking
- **Editorial Standards**: Publication quality metrics

## 💰 Subscription Tiers

| Feature | Basic | Pro | Enterprise |
|---------|-------|-----|------------|
| **Articles/Day** | 50 | Unlimited | Unlimited |
| **AI Fact-Checking** | ❌ | ✅ | ✅ |
| **Bias Analysis** | ❌ | ✅ | ✅ |
| **Advanced Filters** | ❌ | ✅ | ✅ |
| **Timeline Tracking** | ❌ | ❌ | ✅ |
| **Analytics Dashboard** | ❌ | ❌ | ✅ |
| **API Access** | ❌ | ❌ | ✅ |
| **Priority Support** | ❌ | ✅ | ✅ |

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Type Checking
npx tsc --noEmit     # Check TypeScript types
```

### Environment Setup

The application uses mock data for demonstration purposes. In a production environment, you would:

1. **Connect to a real news API** (NewsAPI, Guardian API, etc.)
2. **Implement actual AI services** for fact-checking and bias analysis
3. **Add user authentication** and subscription management
4. **Set up a backend** for data persistence
5. **Configure payment processing** (Stripe, PayPal, etc.)

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Comprehensive linting rules
- **Prettier**: Code formatting (recommended)
- **Component Architecture**: Modular, reusable components
- **Custom Hooks**: Separation of concerns and reusability

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#3B82F6 to #8B5CF6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Pro**: Orange (#EA580C)
- **Enterprise**: Purple (#7C3AED)

### Typography
- **Headings**: Inter font family, bold weights
- **Body**: Inter font family, regular weight
- **Code**: Monospace font family

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible Layouts**: CSS Grid and Flexbox

## 🤝 Contributing

We welcome contributions to NewsScope Pro! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style and conventions
- Add TypeScript types for all new code
- Include tests for new functionality
- Update documentation as needed
- Ensure responsive design compatibility

### Areas for Contribution
- 🔌 **API Integration**: Connect to real news sources
- 🤖 **AI Enhancement**: Improve analysis algorithms
- 🎨 **UI/UX**: Design improvements and animations
- 📱 **Mobile**: Enhanced mobile experience
- 🔒 **Security**: Authentication and data protection
- 📊 **Analytics**: Advanced reporting features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide** - For the beautiful icon library
- **Vite** - For the fast build tool
- **TypeScript** - For type safety and developer experience

## 📞 Support

- **Documentation**: [GitHub Wiki](https://github.com/your-username/newsscope-pro/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-username/newsscope-pro/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/newsscope-pro/discussions)

---

<div align="center">

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

[Live Demo](https://newsscope-pro-ai-pow-szo6.bolt.host) • [Report Bug](https://github.com/your-username/newsscope-pro/issues) • [Request Feature](https://github.com/your-username/newsscope-pro/issues)

</div>