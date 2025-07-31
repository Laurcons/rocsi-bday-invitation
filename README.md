# Rocsi Birthday

A React Router + Vite application for managing birthday invitations with Supabase authentication.

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 🔐 Supabase authentication
- 🎉 Invitation system with dynamic routes

## Supabase Setup

This application requires a Supabase project with the following configuration:

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Schema

You need to create an `invitations` table in your Supabase database with the following structure:

```sql
CREATE TABLE invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Getting Supabase Tokens

1. Go to [Supabase](https://supabase.com) and create a new project
2. Navigate to your project dashboard
3. Go to Settings > API
4. Copy the "Project URL" and "anon public" key
5. Add these to your `.env` file

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Routes

- `/` - Home page with welcome message
- `/i/:nickname/:code` - Invitation page that authenticates users and displays their nickname

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t rocsi-bday .

# Run the container
docker run -p 3000:3000 rocsi-bday
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router and Supabase.
