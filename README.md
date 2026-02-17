# JotLoom

A note-taking web app with voice-to-text capabilities. Built with Nuxt 3, Vuetify, and a custom NestJS backend.

## Features

- Voice-to-text note creation using Web Speech API
- Email/password authentication
- Google OAuth login
- Real-time note editing with search
- Responsive design
- Secure JWT authentication

## Tech Stack

- **Nuxt 3** - Vue framework
- **Vuetify 3** - Material Design components
- **Tailwind CSS** - Styling
- **Pinia** - State management
- **AOS** - Scroll animations
- **Custom Backend** - NestJS + PostgreSQL (see `/Jotloom-backend`)

## Prerequisites

- Node.js 18 or higher
- Running backend server (see backend README)

## Installation

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

The app runs on `http://localhost:9000`

## Backend Setup

This frontend requires the JotLoom backend to be running. Check the backend folder for setup instructions.

**Quick backend start:**
```bash
cd ../Jotloom-backend
npm install
# Configure .env file
npm run start:dev
```

Backend runs on `http://localhost:3000`

## Configuration

The app uses environment variables for configuration. Create a `.env` file:

```bash
# Copy the example file
cp .env.example .env
```

**Environment Variables:**

- `NUXT_PUBLIC_API_URL` - Backend API URL (default: `http://localhost:3000`)

For production, set the environment variable:
```bash
NUXT_PUBLIC_API_URL=https://your-api-url.com
```

Or configure it in your hosting platform's environment settings.

## Project Structure

```
composables/
  ├── useApi.ts         # API client
  ├── useAuthApi.ts     # Auth methods
  └── useNotesApi.ts    # Notes CRUD
pages/
  ├── index.vue         # Landing page
  ├── auth/             # Login/signup
  └── dashboard/        # Notes dashboard
components/
  ├── Auth/             # Auth forms
  ├── Dashboard/        # Notes UI
  └── Nav/              # Navigation
```

## Available Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run generate # Generate static site
```

## Authentication Flow

1. User signs up or logs in (email or Google)
2. Backend returns JWT token
3. Token stored in localStorage
4. Token sent with all API requests

Protected routes use the auth middleware to verify tokens.

## Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

## License

MIT

## Contact

Created by [joshfransix@gmail.com](mailto:joshfransix@gmail.com)
