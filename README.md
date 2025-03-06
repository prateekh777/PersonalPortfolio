# Personal Portfolio Website

A modern, responsive personal portfolio website built with React, Tailwind CSS, and Express. Designed to showcase projects, skills, and contact information with a clean, professional interface.

## Features

- 🎨 Modern UI with Tailwind CSS and shadcn/ui components
- 📱 Fully responsive design for all device sizes
- 🖥️ Showcase portfolio projects with detailed information
- 📊 Dynamic expertise page with role-based content management
- 📧 Contact form with email integration via SendGrid
- 🌐 Optimized for performance and SEO
- 🚀 Ready for deployment to Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- SendGrid account for email functionality (optional for local development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   SENDGRID_API_KEY=your_sendgrid_api_key
   CONTACT_FROM_EMAIL=your_verified_sender_email
   CONTACT_TO_EMAIL=your_recipient_email
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:5000](http://localhost:5000).

## Project Structure

```
portfolio-website/
├── api/                   # Vercel serverless API functions
├── client/                # React frontend 
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions and services
│   │   ├── pages/         # Application pages
│   │   └── types/         # TypeScript type definitions
├── data-export/           # Static JSON data files
├── scripts/               # Utility scripts
├── server/                # Express server for local development
└── shared/                # Shared code between frontend and backend
```

## Data Management

The application uses static JSON files for data storage, making it perfect for serverless deployments:

- `data-export/projects.json`: Portfolio projects data
- `data-export/interests.json`: Personal interests data
- `data-export/ai-works.json`: AI-related work data

To update the content, modify these JSON files directly.

## Deployment

This project is optimized for deployment to Vercel. See [README-DEPLOYMENT.md](README-DEPLOYMENT.md) for detailed deployment instructions.

## Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the project for production
- `npm run start`: Start the production server
- `npm run test:email`: Test email functionality with SendGrid
- `npm run test:health`: Test API health endpoints

## License

[MIT License](LICENSE)

## Acknowledgements

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Express](https://expressjs.com/)
- [SendGrid](https://sendgrid.com/)
- [Vercel](https://vercel.com/)