# Firebase Integration Setup Guide

This guide will help you set up Firebase for your contact form submissions.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard to create your project

## Step 2: Enable Firestore Database

1. In your Firebase project, go to **Firestore Database** in the left sidebar
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development) or **"Start in production mode"** (for production)
4. Select a location for your database
5. Click **"Enable"**

## Step 3: Get Your Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **"Your apps"** section
3. Click the **Web icon** (`</>`) to add a web app
4. Register your app with a nickname (e.g., "PavePath Website")
5. Copy the Firebase configuration object

## Step 4: Set Up Environment Variables

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add the following environment variables with your Firebase config values:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Important:** 
- Replace all placeholder values with your actual Firebase configuration values
- Never commit your `.env` file to version control (it should already be in `.gitignore`)
- For production deployments (like Vercel), add these environment variables in your hosting platform's settings

## Step 5: Set Up Firestore Security Rules (Production)

For production, update your Firestore security rules to only allow writes from authenticated users or with proper validation. Example rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow writes to contact form collections
    match /callRequests/{document=**} {
      allow create: if request.resource.data.keys().hasAll(['name', 'email', 'firm', 'role', 'type', 'createdAt']);
      allow read: if false; // Only allow reads through admin SDK
    }
    match /redlineRequests/{document=**} {
      allow create: if request.resource.data.keys().hasAll(['name', 'email', 'deadline', 'description', 'type', 'createdAt']);
      allow read: if false; // Only allow reads through admin SDK
    }
  }
}
```

## Step 6: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to the contact form on your website
3. Fill out and submit a form
4. Check your Firestore database in Firebase Console to verify the submission was saved

## Collections Created

The integration creates two Firestore collections:

- **`callRequests`**: Stores "Book a Call" form submissions
- **`redlineRequests`**: Stores "Submit Redline Task" form submissions

Each document includes:
- All form field data
- `type`: Either "call" or "redline"
- `createdAt`: Server timestamp
- `status`: "new" (default status for tracking)

## Troubleshooting

### Error: "Firebase: Error (auth/configuration-not-found)"
- Make sure your `.env` file exists and contains all required variables
- Restart your development server after adding environment variables
- Verify that variable names start with `VITE_` (required for Vite)

### Error: "Missing or insufficient permissions"
- Check your Firestore security rules
- For development, you can temporarily use test mode rules that allow all reads/writes

### Forms not submitting
- Check the browser console for errors
- Verify your Firebase configuration values are correct
- Ensure Firestore is enabled in your Firebase project

## Production Deployment

When deploying to production (e.g., Vercel):

1. Go to your hosting platform's environment variables settings
2. Add all the Firebase environment variables
3. Redeploy your application

The environment variables will be automatically used in your production build.

