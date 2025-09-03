# School HUB - School Management System

## Project Overview
School HUB is a web-based school management system built with Next.js and React. It allows users to add, view, and manage schools with details such as name, address, city, state, contact number, email, and an image. The application uses a MySQL database to store school data and provides a responsive and user-friendly interface.

## Features
- Add new schools with validation on input fields.
- View a list of all schools with images and details.
- Delete schools from the list.
- Image upload functionality for each school.
- Responsive design for desktop and mobile devices.
- User authentication pages for admin and user sign-in/sign-up (placeholders in the app structure).
- Uses Next.js app router and API routes for backend functionality.

## Technologies Used
- Next.js 13 with App Router
- React 18
- React Hook Form for form handling
- Yup for form validation
- MySQL with mysql2 for database connectivity
- Multer for handling image uploads
- Tailwind CSS for styling
- TypeScript for type safety (partially)

## Installation Instructions

### Prerequisites
- Node.js (v16 or higher recommended)
- npm (comes with Node.js)
- MySQL server installed and running

### Setup Steps

1. Clone the repository or copy the project files to your local machine.

2. Navigate to the project directory:
   ```bash
   cd school-app
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Setup the MySQL database:
   - Open your MySQL client and run the SQL script located at `setup.sql` to create the database and the `schools` table.
   ```sql
   CREATE DATABASE IF NOT EXISTS school_db;
   USE school_db;
   CREATE TABLE IF NOT EXISTS schools (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name TEXT,
     address TEXT,
     city TEXT,
     state TEXT,
     contact VARCHAR(20),
     image TEXT,
     email_id VARCHAR(255)
   );
   ```

5. Update the database connection details in `lib/db.js` if necessary (default user: root, password: Password@123#, database: school_db).

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage
- Use the "Add School" page to add new schools with all required details.
- View the list of schools on the "Show Schools" page.
- Click on a school to view detailed information and delete if needed.

## Testing
- The project currently does not include automated tests.
- Manual testing is recommended by navigating through the pages, submitting forms, and verifying database updates.

## Future Improvements
- Add user authentication and authorization.
- Implement automated tests.
- Enhance UI/UX with more features and better responsiveness.
- Add pagination and search functionality for schools.

## License
This project is open source and free to use.

---

If you have any questions or need assistance, feel free to reach out.
