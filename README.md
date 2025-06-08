# Portfolio Admin Dashboard

A comprehensive admin dashboard for managing your portfolio website.

## Features

- **Authentication System**: Secure login/logout, password reset, and session management
- **Dashboard Layout**: Responsive design with sidebar navigation and customizable widgets
- **Content Management**: Manage projects, experience, education, skills, and blog posts
- **Message Management**: View and respond to contact form submissions
- **Analytics**: Track visitor statistics, page views, and referral sources
- **Settings**: Customize themes, update profile information, and manage notifications

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB database (either local or Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/portfolio-dashboard.git
   cd portfolio-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Database Setup:
   The application is configured to work with both local MongoDB and MongoDB Atlas:

   - **Local MongoDB**: Make sure MongoDB is running locally on port 27017
   - **MongoDB Atlas**: The connection string is already configured

4. Test the database connection:

   ```bash
   npm run test-db
   ```

   This will test both local and Atlas connections and show which ones are working.

5. Initialize the admin user:

   ```bash
   npm run init-admin
   ```

   This will create an admin user with the following credentials:

   - Username: balshaer
   - Password: 12345678

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Access the dashboard:
   Navigate to `http://localhost:4000/auth/login` and log in with the admin credentials.

## Deployment

### Deploying to Render

1. Make sure you have a Render account and have set up a web service.

2. Update the deployment URL in `scripts/deploy.js` if needed.

3. Deploy the application:
   ```bash
   npm run deploy
   ```

## Usage

### Authentication

- **Login**: Navigate to `/auth/login` and enter your credentials.
- **Logout**: Click the logout button in the sidebar or user dropdown.
- **Reset Password**: Click "Forgot password?" on the login page.

### Dashboard

- **Overview**: View statistics and recent activity on the main dashboard.
- **Projects**: Manage your portfolio projects.
- **Experience**: Update your work history.
- **Education**: Manage your educational background.
- **Messages**: View and respond to contact form submissions.
- **Analytics**: Track visitor statistics and page views.
- **Settings**: Customize the dashboard and update your profile.

## Customization

### Themes

The dashboard supports both light and dark themes. You can switch between themes in the settings page or by clicking the theme toggle in the header.

### Adding New Features

To add new features to the dashboard:

1. Create a new page in the `src/app/dashboard` directory.
2. Add a new route to the sidebar navigation in `src/components/dashboard/sidebar.tsx`.
3. Create any necessary API routes in `src/app/api`.
4. Add any required database models in `src/lib/models`.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Chart.js](https://www.chartjs.org/)
- [Radix UI](https://www.radix-ui.com/)
