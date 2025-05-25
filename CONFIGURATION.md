# Application Configuration

This document outlines all the hardcoded configuration values used in the application instead of environment variables.

## Database Configuration

### MongoDB Atlas Connection
- **Location**: `src/lib/mongodb.js`
- **Connection String**: `mongodb+srv://alshaercontact:12345678Samtax@cluster0.k44ex3a.mongodb.net/alshaer?retryWrites=true&w=majority`
- **Local Fallback**: `mongodb://127.0.0.1:27017/alshaer`

## Authentication Configuration

### JWT Secret
- **Location**: `src/lib/auth.js`
- **Secret Key**: `alshaer-portfolio-admin-dashboard-secret-key-2024`
- **Token Expiration**: 24 hours

## AI Integration Configuration

### Google Gemini API
- **Location**: `src/lib/gemini.js`
- **API Key**: `AIzaSyCU6wEazb7dvTZnVV9BtaFk39sg52d4-IQ`
- **Model**: `gemini-1.5-flash`

## Application URLs

### Production Domain
- **Primary**: `https://alshaer.onrender.com`
- **Alternative**: `https://www.alshaer.onrender.com`

### Development
- **Local**: `http://localhost:4000`
- **Network**: `http://0.0.0.0:4000`

## Security Configuration

### OTP Codes
- **Account Deletion**: `2132` (hardcoded in `src/app/api/auth/delete-account/route.js`)
- **Password Reset**: Uses generated tokens

### Cookie Settings
- **Name**: `auth-token`
- **Max Age**: 7 days (604800 seconds)
- **HTTP Only**: false (for debugging)
- **Secure**: false (for local development)
- **Same Site**: lax

## Database Credentials

### MongoDB Atlas
- **Username**: `alshaercontact`
- **Password**: `12345678Samtax`
- **Cluster**: `cluster0.k44ex3a.mongodb.net`
- **Database**: `alshaer`

### Local MongoDB
- **Host**: `127.0.0.1`
- **Port**: `27017`
- **Database**: `alshaer`

## Deployment Configuration

### Render.com
- **Service Type**: web
- **Runtime**: node
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Health Check**: `/api/health`
- **Auto Deploy**: enabled
- **Plan**: free

## Features Configuration

### Dashboard Features
- **Profile Management**: CRUD operations
- **Content Management**: Hero and footer editing
- **Social Links**: Dynamic icon selection
- **Projects**: Database-driven with image uploads
- **Experience**: Timeline with company details
- **Education**: Academic background management
- **Recommendations**: Testimonials management
- **Analytics**: Charts and statistics
- **AI Enhancement**: Text improvement using Gemini

### Website Features
- **Dynamic Content**: All sections fetch from database
- **Responsive Design**: Mobile-first approach
- **SEO Optimization**: Meta tags and sitemap
- **Performance**: Static generation where possible
- **Accessibility**: ARIA labels and semantic HTML

## Notes

- All configuration values are hardcoded as const values instead of using environment variables
- The application automatically falls back from Atlas to local MongoDB if connection fails
- JWT tokens are signed with a consistent secret key for session management
- Google Gemini API is used for AI-powered text enhancement features
- The application is optimized for deployment on Render.com platform
