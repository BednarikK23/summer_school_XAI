# PB138 Winary-Project

## Description
The app allows small winemakers to offer their wines for sale. The wines have descriptions, compositions, attributions, etc. The winemaker can specify times when the wines can be picked up/purchased, which can be irregular or according to a filled calendar. The user can filter winemakers by region, wine type, and opening hours. The app also allows for the creation of "tours" to be held in specific areas and times where winemakers can sign up with their samples.

## Features
- Wine listings with detailed descriptions
- Filter wines and winemakers by region, type, and opening hours
- Create and manage tours for wine sampling
- Admin dashboard for user and winery management
- Integration with e-commerce platforms
- Personalized services for winemakers

## Technologies Used

### Backend
- Node.js
- Express.js
- Prisma ORM
- Redis
- Docker
- Passport for authentication
- Zod for validation
- Swagger for API documentation

### Frontend
- React.js
- Vite for build tooling
- TypeScript
- Material-UI for styling
- React Router for navigation
- Axios for HTTP requests
- React Hook Form for form handling
- Tanstack React Query for data fetching and state management
- Emotion for CSS-in-JS styling
- Lucide-react for icons
- Jotai for state management

### Dev Tools
- ESLint for linting
- Prettier for code formatting
- Nodemon for development
- Concurrently for running multiple commands

## Installation Instructions

1. Fork the repository.
2. Install npm and npx if not already installed.
3. Run `npm i` in the root directory and in the `frontend` and `backend` subdirectories.
4. In backend, run `./database.sh` script to create running container for BE.
5. For development, run `npm run devInit`.
6. For production, run `npm run prod`.

## Usage Instructions

1. Clone the repository.
2. Follow the installation instructions to set up the project.
3. Navigate to the project directory.
4. Run `npm run devInit` to launch the backend and frontend servers.
5. Open your browser and go to `http://localhost:5173` to view the application.
6. Use the admin dashboard to manage users, winemakers, and tours.

## Contributing Guidelines

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## Contact Information
For support or questions, you can reach us through our social media channels or via email at winery-page@email.com.


