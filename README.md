# Related Models

AI & LLM Comparison Platform with ModelMix - Compare AI models side-by-side.

## Overview

Related Models is a comprehensive platform for AI/LLM comparison, insights, and resources. The flagship feature **ModelMix** allows users to send one prompt to multiple AI models and compare responses side by side.

## Features

- **ModelMix** - Compare AI model responses side-by-side
- **Model Directory** - Browse 100+ AI models with detailed specifications
- **Blog & Resources** - Tutorials, comparisons, and AI news
- **Developer Tools** - API documentation and code examples

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (New York style)
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── modelmix/          # ModelMix comparison tool
│   ├── blog/              # Blog articles
│   ├── resources/         # Developer resources
│   ├── models/            # Model directory
│   └── about/             # About page
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Header, Footer, Logo
│   └── modelmix/          # ModelMix-specific components
└── lib/                   # Utilities
```

## Color Palette

The design uses a blue/cyan/teal gradient theme with logo accent colors:

- **Primary Blue**: `#3B82F6` (217, 91%, 60%)
- **Accent Cyan**: `#00D4D4` (187, 100%, 42%)
- **Logo Orange**: `#F97316`
- **Logo Green**: `#22C55E`
- **Logo Purple**: `#8B5CF6`

## Deployment

This project is configured for Vercel deployment. Simply connect your GitHub repository to Vercel for automatic deployments.

## License

MIT
