# Firestore Security Rules for Contact Forms

## Quick Fix: Update Your Firestore Rules

You need to update your Firestore security rules to allow form submissions. Here's how:

### Step 1: Go to Firestore Rules

1. In [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **pavepath-design-efd5b**
3. Click **"Firestore Database"** in the left sidebar
4. Click the **"Rules"** tab at the top

### Step 2: Replace the Rules

Copy and paste these rules into the Rules editor:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Allow writes to callRequests collection
    match /callRequests/{requestId} {
      allow create: if request.resource.data.keys().hasAll([
        'name', 'email', 'firm', 'role', 'type', 'createdAt', 'status'
      ]) && 
      request.resource.data.type == 'call' &&
      request.resource.data.status == 'new';
      allow read: if false; // Only allow reads through admin SDK
      allow update: if false; // Only allow updates through admin SDK
      allow delete: if false; // Only allow deletes through admin SDK
    }
    
    // Allow writes to redlineRequests collection
    match /redlineRequests/{requestId} {
      allow create: if request.resource.data.keys().hasAll([
        'name', 'email', 'deadline', 'description', 'type', 'createdAt', 'status'
      ]) && 
      request.resource.data.type == 'redline' &&
      request.resource.data.status == 'new';
      allow read: if false; // Only allow reads through admin SDK
      allow update: if false; // Only allow updates through admin SDK
      allow delete: if false; // Only allow deletes through admin SDK
    }
    
    // Deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Step 3: Publish the Rules

1. Click **"Publish"** button at the top
2. Wait a few seconds for the rules to deploy

### Step 4: Test Again

Go back to your website and try submitting a form again. It should work now!

---

## What These Rules Do

✅ **Allow**: Anyone can CREATE new documents in `callRequests` and `redlineRequests` collections  
✅ **Validate**: Ensures required fields are present and have correct values  
❌ **Deny**: Prevents reading, updating, or deleting (only you can do this through Firebase Console or Admin SDK)

## Alternative: Test Mode (Development Only)

If you want to test quickly during development, you can temporarily use test mode rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 12, 31);
    }
  }
}
```

⚠️ **WARNING**: These rules allow anyone to read/write ANY data. Only use for development/testing. Switch back to the secure rules above before going to production!

---

## Production-Ready Rules

The rules above are secure for production because they:
- Only allow creating new documents (not reading/updating/deleting)
- Validate that required fields are present
- Ensure type and status fields have correct values
- Prevent unauthorized access to other collections

