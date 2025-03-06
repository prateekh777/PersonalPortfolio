# Portfolio Website

A sophisticated personal portfolio website with an advanced visual frame-based content management system, enabling dynamic and responsive layout design through interactive, customizable content frames.

## Technologies Used

- React frontend with drag-and-drop frame editor
- Express backend
- Tailwind CSS for styling
- React DnD for interactive frame positioning
- Framer Motion for animations
- Wouter for lightweight routing
- Responsive design with adaptive content scaling
- Dynamic expertise page with role-based content management
- Enhanced contact form with message confirmation and spam prevention
- Video content management with error handling

## Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file based on `.env.example` and fill in your environment variables.

3. Start the development server:
   ```
   npm run dev
   ```

4. The application will be available at [http://localhost:5000](http://localhost:5000)

## Building for Production

To build the application for production:

```
npm run build
```

To start the production server:

```
npm run start
```

## Deploying to Vercel

This project is configured for deployment on Vercel. To deploy:

1. Create a Vercel account at [vercel.com](https://vercel.com)

2. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

3. Log in to Vercel:
   ```
   vercel login
   ```

4. Deploy to Vercel:
   ```
   vercel
   ```

### Environment Variables on Vercel

Make sure to set up all required environment variables in the Vercel dashboard:

1. Go to your project settings in the Vercel dashboard
2. Navigate to the "Environment Variables" section
3. Add all the variables from your `.env.example` file

### Database Setup on Vercel

If you're using a PostgreSQL database:

1. Create a PostgreSQL database on your preferred provider
2. Add the database connection string to your Vercel environment variables as `DATABASE_URL`

## Project Structure

- `/client` - React frontend application
- `/server` - Express backend
- `/api` - Vercel serverless functions
- `/shared` - Shared code between frontend and backend
- `/public` - Static assets

## License

MIT