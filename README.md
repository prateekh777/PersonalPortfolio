# Personal Portfolio

This is a personal portfolio website with a React frontend and Express backend.

## Deployment Strategy

Due to size limitations with Vercel serverless functions (300MB limit), we've split the deployment into two parts:

### Frontend Deployment (Vercel)
The frontend is deployed on Vercel as a static site.

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically deploy your frontend
4. Set the environment variable `VITE_API_URL` to point to your backend API

### Backend Deployment (Separate)
The backend API needs to be deployed separately. Here are some options:

#### Option 1: Deploy Backend to Railway
1. Create a new project on [Railway](https://railway.app/)
2. Connect your GitHub repository
3. Set the following environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: production
   - `FRONTEND_URL`: Your Vercel frontend URL (for CORS)
4. Set the start command to: `npm run start:api`

#### Option 2: Deploy Backend to Render
1. Create a new Web Service on [Render](https://render.com/)
2. Connect your GitHub repository
3. Set the build command to: `npm install`
4. Set the start command to: `npm run start:api`
5. Add the environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: production
   - `FRONTEND_URL`: Your Vercel frontend URL (for CORS)

#### Option 3: Deploy Backend to Heroku
1. Create a new app on [Heroku](https://heroku.com/)
2. Connect your GitHub repository
3. Set the following environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: production
   - `FRONTEND_URL`: Your Vercel frontend URL (for CORS)
4. The Procfile is already set up for Heroku deployment

## Project Structure

```
├── client/           # Frontend React code
├── server/           # Backend Express API
│   └── api/          # API routes
├── shared/           # Shared types and utilities
├── public/           # Static assets
├── .env.example      # Example environment variables
├── package.json      # Project dependencies and scripts
├── server.js         # Standalone server for API deployment
├── vercel.json       # Vercel configuration
└── README.md         # Project documentation
```

## Available Scripts

- `npm run dev`: Run the development server
- `npm run build`: Build both frontend and backend
- `npm run build:frontend`: Build only the frontend
- `npm run build:api`: Build only the API
- `npm run start`: Start the production server
- `npm run start:api`: Start only the API server

## Local Development
1. Copy `.env.example` to `.env` and fill in your MongoDB connection string
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. The app will be available at http://localhost:3000

## MongoDB Setup
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database user
4. Get your connection string
5. Add your connection string to the `.env` file

## Troubleshooting

### API Connection Issues
- Make sure your `VITE_API_URL` is set correctly in your Vercel environment
- Check that CORS is properly configured on your backend
- Verify that your MongoDB connection string is correct

### Deployment Issues
- If you encounter size limit issues on Vercel, make sure you're using the split deployment approach
- Check that your environment variables are set correctly
- Verify that your build and start commands are correct 