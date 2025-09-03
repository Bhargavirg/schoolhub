# TODO List for Fixing Client-Side Exception on Deployed App

## Completed Steps
- [x] Update lib/db.js to use environment variables for database connection
- [x] Add logging to API route for debugging POST requests
- [x] Add error handling to showSchools page for better user feedback
- [x] Wrap image upload in try-catch to continue without image if upload fails

## Remaining Steps
- [ ] Set environment variables on Vercel (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
- [ ] Test the application locally to ensure database connection works
- [ ] Deploy the updated code to Vercel
- [ ] Test the deployed app on schoolhub-three.vercel.app
- [ ] Verify that showSchools loads without errors
- [ ] Verify that addSchool works (may add without image if upload fails on Vercel)
- [ ] If issues persist, check Vercel function logs for API errors
- [ ] Consider implementing cloud storage for images (e.g., Vercel Blob or Cloudinary) for proper image upload on Vercel

## Notes
- Image upload may fail on Vercel due to file system restrictions; added fallback to add school without image
- Ensure database is accessible from Vercel's IP ranges if using a cloud database
- If using PlanetScale or similar, update connection string accordingly
