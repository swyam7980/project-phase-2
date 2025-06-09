# AIM
1. to make a web app which has both mobile and desktop version.
it is a User Based Discussion form.
2. It will have sections inside which users can make posts in topics 

# Website Pages & Implementation

## index.html
**Description:**
- The landing page for Yappr, introducing the platform and its community-driven discussion focus.
- Features a hero section, top channels carousel, featured communities, and a preview of trending topics.
- Includes a unified authentication modal for login/signup.
- Navigation links to explore topics, trending, and new posts.
- Footer with developer credits and copyright.

**Technologies/Implementation:**
- HTML, CSS (styles.css, loginstyle.css), and JavaScript for UI interactivity.
- Carousel and topic cards implemented with custom JS for smooth scrolling and user interaction.
- Theme switcher (light/dark mode) using localStorage and dynamic class toggling.
- Authentication modal handled via JavaScript (loginscript.js).

## populartopics.html
**Description:**
- Displays a grid of popular discussion topics with search, filter, and sort controls.
- Sidebar shows popular tags and categories for quick navigation.
- Each topic card is clickable and redirects to the main discussion interface (interface.html).
- Includes a theme switcher and a dynamically added Home button.

**Technologies/Implementation:**
- HTML, CSS (populartopics_styles.css), and JavaScript (populartopics_script.js).
- Topics are rendered dynamically from a JS data source.
- Search, filter, and sort are implemented client-side for instant feedback.
- Clicking a topic card uses JS to redirect to interface.html.
- Theme preference is saved in localStorage.

## interface.html
**Description:**
- The main discussion forum interface where users can view and post messages in different channels and topics.
- Sidebar for channel/category navigation, main area for posts, and a right sidebar for theme switch and online users.
- Users can create, upvote, downvote, and delete posts. Comments are displayed under each post.
- Popular channels and online users are shown for community engagement.

**Technologies/Implementation:**
- HTML, CSS (style.css), and JavaScript (inline script in interface.html).
- All forum logic is handled client-side using localStorage (no backend required).
- Dynamic rendering of posts, channels, and users.
- Theme switcher and user profile display.
- Responsive design for both desktop and mobile.
