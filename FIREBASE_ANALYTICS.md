# Firebase Analytics Usage

## What is Firebase Analytics?

Firebase Analytics is Google's free analytics solution that helps you understand how users interact with your website. It provides insights into:

- **Page Views**: Which pages users visit
- **User Behavior**: How users navigate your site
- **Custom Events**: Track specific actions (form submissions, button clicks, etc.)
- **User Demographics**: Geographic location, device types, etc.
- **Conversion Tracking**: Measure how well your site converts visitors to customers

## How It's Integrated in Your Project

### 1. **Automatic Page View Tracking**
Every time a user navigates to a different page, Firebase Analytics automatically tracks it. This is handled by the `usePageTracking` hook in `src/hooks/useAnalytics.ts`.

**What gets tracked:**
- Page path (e.g., `/`, `/blog`, `/blog/some-article`)
- Page title
- Timestamp

### 2. **Form Submission Tracking**
When users submit contact forms, we track:
- Form type (`call_request` or `redline_request`)
- Number of drafting support options selected (for call requests)
- Timestamp

This helps you understand:
- Which form is more popular
- Conversion rates
- User engagement

### 3. **Where to View Analytics Data**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `pavepath-design-efd5b`
3. Click on **Analytics** in the left sidebar
4. View:
   - **Dashboard**: Overview of key metrics
   - **Events**: All tracked events (page views, form submissions)
   - **User Properties**: Demographics and user segments
   - **Funnels**: User journey through your site

## Custom Events You Can Track

You can track additional events anywhere in your code:

```typescript
import { trackEvent } from '@/hooks/useAnalytics';

// Track a button click
trackEvent('button_click', {
  button_name: 'Get Started',
  location: 'hero_section'
});

// Track a download
trackEvent('file_download', {
  file_name: 'brochure.pdf',
  file_type: 'pdf'
});

// Track a video play
trackEvent('video_play', {
  video_title: 'Company Overview',
  video_duration: 120
});
```

## Current Configuration

Your Firebase Analytics is configured with:
- **Measurement ID**: `G-RSEYH2HN7C`
- **Project**: `pavepath-design-efd5b`
- **Auto-tracking**: Page views on route changes
- **Custom events**: Form submissions

## Privacy & GDPR Compliance

Firebase Analytics respects user privacy:
- No personally identifiable information (PII) is collected
- IP addresses are anonymized
- Users can opt-out via browser settings
- Complies with GDPR, CCPA, and other privacy regulations

## Benefits for Your Business

1. **Understand User Behavior**: See which pages are most popular
2. **Track Conversions**: Measure how many visitors submit forms
3. **Optimize Content**: Identify which blog posts or pages drive engagement
4. **Improve UX**: Find pages with high bounce rates
5. **Measure Marketing**: Track which traffic sources convert best

## Viewing Your Data

After deploying your site, you'll start seeing data in Firebase Console within 24-48 hours. The more traffic you have, the more insights you'll get!

**Pro Tip**: Connect Firebase Analytics to Google Analytics 4 for even more detailed reporting and insights.

