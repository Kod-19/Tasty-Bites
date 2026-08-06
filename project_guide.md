# Tasty Bites — ReactJS + Firebase Project Guide

**Client:** Thelma Obenewa Dawson  
**Brand:** Tasty Bites  
**Agency / Developer:** KD Studios  
**Project Type:** Portfolio & Online Culinary Platform  
**Target Timeline:** 1 Month  
**Budget Tier:** Standard Business Site  
**Design Style:** Luxury & Clean (Inspired by *softtouchcuisine.com*)  

---

## 1. Executive Project Summary

**Tasty Bites** is an elite, high-end culinary brand providing premium catering, private dining, and bespoke gastronomic experiences. The objective of this project is to build a responsive, visually stunning web application using **ReactJS** and **Firebase**.

### Primary Objectives
- **Luxury Showcase:** Provide customers with an immersive visual experience displaying detailed menu items, prices, high-resolution food photography, and culinary video clips.
- **Interactive Booking System:** Allow clients to make reservations/table bookings or catering requests directly with integrated deposit/payment processing.
- **Seamless Communication:** Instant contact forms, WhatsApp integration, and social media connectivity.
- **Mobile-First Experience:** Highlight mobile ordering/app features alongside full responsiveness across all device breakpoints.

---

## 2. Tech Stack & Required Dependencies

### Core Technologies
- **Frontend Framework:** ReactJS (bootstrapped with [Vite](https://vitejs.dev/) for optimal build speed and performance)
- **Backend / BaaS:** Firebase (Authentication, Cloud Firestore, Cloud Storage, Hosting, Cloud Functions)
- **Styling:** Tailwind CSS + Framer Motion for sleek micro-interactions and transitions
- **Payment Gateway:** Stripe (`@stripe/react-stripe-js`) for secure online transactions/booking deposits

---

### Package Installation Commands

Execute the following commands in your terminal to initialize the project and install all required packages.

#### Step 1: Initialize Project with Vite
```bash
npm create vite@latest tasty-bites -- --template react
cd tasty-bites
npm install
```

#### Step 2: Install Core Dependencies
```bash
npm install firebase react-router-dom lucide-react framer-motion react-hook-form zod @hookform/resolvers react-hot-toast
```

#### Step 3: Install UI Helpers & Payment Libraries
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js clsx tailwind-merge react-datepicker yet-another-react-lightbox
```

#### Step 4: Install & Configure Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

### Package Breakdown & Purpose

| Package Name | Purpose / Use Case |
| :--- | :--- |
| `firebase` | Firebase SDK for Firestore database, Auth, Storage, and Hosting setup |
| `react-router-dom` | Client-side routing across multi-page layout |
| `lucide-react` | Clean, modern iconography suitable for luxury UI |
| `framer-motion` | Smooth scroll animations, modal reveals, and page transitions |
| `react-hook-form` | High-performance, lightweight form state management |
| `zod` + `@hookform/resolvers` | Schema validation for contact form and booking fields |
| `react-hot-toast` | Elegant toast notifications for form submissions and payment status |
| `@stripe/stripe-js` & `@stripe/react-stripe-js` | Secure online payments for booking deposits or menu orders |
| `react-datepicker` | Sleek date & time selector for the booking calendar |
| `yet-another-react-lightbox` | High-resolution image/video gallery modal lightbox |
| `clsx` & `tailwind-merge` | Utility functions for dynamic Tailwind class merging |

---

## 3. Project Architecture & Folder Structure

```
tasty-bites/
├── public/
│   ├── favicon.ico
│   └── images/
├── src/
│   ├── assets/
│   │   ├── logo.svg
│   │   ├── hero-bg.jpg
│   │   └── app-mockup.png
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── SectionHeading.jsx
│   │   ├── home/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── MenuPreview.jsx
│   │   │   ├── StorySnippet.jsx
│   │   │   ├── AppPromo.jsx
│   │   │   └── Testimonials.jsx
│   │   ├── menu/
│   │   │   ├── CategoryFilter.jsx
│   │   │   ├── MenuItemCard.jsx
│   │   │   └── ItemDetailModal.jsx
│   │   ├── booking/
│   │   │   ├── BookingForm.jsx
│   │   │   ├── PaymentStep.jsx
│   │   │   └── ConfirmationModal.jsx
│   │   └── gallery/
│   │       ├── PhotoGrid.jsx
│   │       └── VideoPlayer.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── firebase/
│   │   ├── config.js
│   │   ├── firestore.js
│   │   └── storage.js
│   ├── hooks/
│   │   ├── useFirestore.js
│   │   └── useScrollPosition.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── MenuPortfolio.jsx
│   │   ├── Booking.jsx
│   │   ├── Gallery.jsx
│   │   ├── Contact.jsx
│   │   └── FAQ.jsx
│   ├── styles/
│   │   └── globals.css
│   ├── utils/
│   │   ├── formatCurrency.js
│   │   └── constants.js
│   ├── App.jsx
│   └── main.jsx
├── firebase.json
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 4. UI/UX Design System (Luxury & Clean Aesthetic)

To achieve the luxury feel inspired by *softtouchcuisine.com*, the application uses a dark luxury baseline with rich gold and cream accents, high-contrast typography, and spacious layouts.

### Color Palette

| Token | Color Code | Usage |
| :--- | :--- | :--- |
| **Primary Base (Dark)** | `#0D0D0D` (Rich Black) | Main body background, headers |
| **Secondary Dark** | `#1A1A1A` (Charcoal) | Card surfaces, section backgrounds |
| **Accent Gold** | `#C5A059` (Brushed Gold) | Primary CTA buttons, highlight borders, active links |
| **Hover Gold** | `#D4AF37` (Metallic Gold) | Button hover states, key text accents |
| **Light Background** | `#FAF7F2` (Cream Linen) | Light sections, modal content, contrast areas |
| **Text Primary** | `#F5F5F5` (Off-white) | Main headings and paragraph text on dark backgrounds |
| **Text Secondary** | `#A3A3A3` (Muted Grey) | Subtitles, meta info, captions |

### Typography Guidelines
- **Headings (Serif):** `'Playfair Display'`, `'Cormorant Garamond'`, or `'Cinzel'` for elegant, high-end titles.
- **Body Text (Sans-serif):** `'Plus Jakarta Sans'` or `'Inter'` for crisp legibility across mobile and desktop devices.

---

## 5. Firebase Configuration & Data Schema

### 5.1 Firebase Initialization (`src/firebase/config.js`)

```javascript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
```

### 5.2 Database Collections Schema (Cloud Firestore)

#### Collection: `menu_items`
```json
{
  "id": "item_001",
  "name": "Pan-Seared Truffle Duck Breast",
  "category": "Main Courses",
  "price": 45.00,
  "currency": "GBP",
  "description": "Served with caramelized shallot puree, roasted root vegetables, and a red wine jus.",
  "image": "https://firebasestorage.googleapis.com/...",
  "dietary": ["Gluten-Free", "Chef Special"],
  "featured": true,
  "createdAt": "2026-08-01T10:00:00Z"
}
```

#### Collection: `bookings`
```json
{
  "id": "book_992",
  "clientName": "Thelma Dawson",
  "email": "dawsonthelma2@gmail.com",
  "phone": "+447300487808",
  "serviceType": "Private Dining",
  "guests": 6,
  "date": "2026-09-15",
  "time": "19:30",
  "specialNotes": "Anniversary dinner, gluten intolerance for 1 guest.",
  "paymentStatus": "Deposit Paid",
  "depositAmount": 100.00,
  "createdAt": "2026-08-06T14:00:00Z"
}
```

#### Collection: `contacts`
```json
{
  "id": "msg_104",
  "name": "John Smith",
  "email": "john@example.com",
  "subject": "Corporate Event Inquiry",
  "message": "Looking for private catering for 30 executives on Oct 12.",
  "status": "Unread",
  "createdAt": "2026-08-06T14:05:00Z"
}
```

---

## 6. Detailed Page Structure & Features

### 1. Home Page (`/`)
- **Hero Banner:** Full-screen visual header with video background or high-res slideshow, luxury typography tagline ("Elevated Gastronomy Delivered"), and dual CTAs ("Explore Menu", "Reserve Experience").
- **Brand Story Snippet:** Clean typography section introducing the vision of Tasty Bites.
- **Featured Menu Carousel:** Horizontal slider featuring top dishes with prices, images, and order/book buttons.
- **Services Overview:** Grid highlighting Private Dining, Luxury Catering, and Event Hosting.
- **Mobile App Promo Banner:** Showcase of upcoming/existing Tasty Bites mobile ordering screens with download links.
- **Testimonials & Press:** Elegant client reviews and quote slider.

### 2. About Us (`/about`)
- **Our Story:** The origin story of Tasty Bites and founder vision.
- **Culinary Philosophy:** Craftsmanship, organic ingredient sourcing, artistic plating.
- **Meet the Chef:** Profile highlighting experience, expertise, and signature techniques.
- **Kitchen / Behind the Scenes Showcase:** Photo grid showing the team in action.

### 3. Services (`/services`)
- **Service Cards:**
  1. *Private Chef Experience* (In-home fine dining)
  2. *Bespoke Event Catering* (Weddings, corporate, private celebrations)
  3. *Meal Prep & Gourmet Delivery* (Custom luxury weekly prep)
  4. *Cocktail & Beverage Pairing* (Sommelier service)
- **Interactive Service Calculator / Inquiry Trigger:** Button leading to dynamic booking page.

### 4. Menu & Portfolio (`/menu`)
- **Category Filter:** All, Starters, Main Courses, Signature Desserts, Artisan Cocktails.
- **Dish Cards:**
  - High-res photo with subtle hover zoom effect
  - Dish title & ingredients description
  - Clear price display (£ / $)
  - Dietary tags (Vegan, GF, Halal, Chef's Choice)
- **Modal Lightbox View:** Clicking a dish opens a detailed modal with full ingredient breakdown, wine pairing recommendations, and custom ordering options.

### 5. Booking System (`/booking`)
- **Multi-Step Booking Wizard:**
  - *Step 1: Event Details* (Select Service, Guests count, Date & Time using `react-datepicker`).
  - *Step 2: Guest Details* (Name, Email, Phone, Dietary requirements).
  - *Step 3: Reservation Deposit* (Integrated Stripe payment element for booking commitment fee).
  - *Step 4: Real-time Confirmation* (Instant Firestore document creation + confirmation email trigger via Firebase Extensions or Functions).

### 6. Photo & Video Gallery (`/gallery`)
- **Filterable Media Grid:** Photos and short video clips showcasing live events, plated dishes, and ambiance.
- **Interactive Lightbox:** Implemented using `yet-another-react-lightbox` supporting swipe gestures and fullscreen video playback.

### 7. Contact Page (`/contact`)
- **Interactive Contact Form:** Name, Email, Phone, Inquiry Type, Message.
- **Direct Communication Links:**
  - Phone: `+447300487808`
  - Email: `dawsonthelma2@gmail.com`
  - Quick WhatsApp Chat button redirecting to `https://wa.me/447300487808`.
- **Operating Hours & Location Map.**

### 8. FAQ Page (`/faq`)
- **Accordion UI:**
  - Booking & Deposit cancellation policies
  - Dietary adjustments and allergy handling
  - Minimum guest count for private catering
  - Service radius and travel details

---

## 7. Step-by-Step Implementation Roadmap (4-Week Schedule)

```
[ Week 1 ] Setup, Architecture & UI Foundations
├── Setup React + Vite + Tailwind CSS project
├── Configure Firebase Auth & Cloud Firestore
├── Build Reusable UI Components (Navbar, Footer, Buttons, Modals)
└── Implement Layout & React Router setup

[ Week 2 ] Core Pages & Menu Portfolio
├── Develop Home Page with Framer Motion animations
├── Build About Us & Services Pages
├── Create Menu Portfolio with Firestore integration
└── Build Image/Video Gallery with Lightbox

[ Week 3 ] Booking System & Payment Gateway
├── Develop Multi-step Booking Form
├── Integrate Stripe Payment Element
├── Setup Firestore auto-saving for bookings & contact messages
└── Implement Toast Notifications & Error Handling

[ Week 4 ] Optimization, SEO & Deployment
├── Mobile App Promo Section & Screen Displays
├── Mobile Responsiveness & Performance Audit
├── Basic SEO (React Helmet / OpenGraph tags)
└── Deploy to Firebase Hosting & Deliver to Client
```

---

## 8. Deployment & Firebase Hosting Instructions

### Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

### Step 2: Login & Initialize Firebase
```bash
firebase login
firebase init hosting
```
- Select your project (`tasty-bites`).
- Set public directory to **`dist`**.
- Configure as a single-page app: **Yes**.
- Set up automatic builds and deploys with GitHub: **Optional**.

### Step 3: Build & Deploy
```bash
npm run build
firebase deploy --only hosting
```

---

## 9. Next Steps for KD Studios Team

1. **Client Content Collection:** Gather high-resolution images of dishes, video clips, and finalized menu pricing from Thelma Dawson.
2. **Stripe Account Setup:** Obtain Stripe Publishable Key and Secret Key for online booking deposit processing.
3. **Environment Configuration:** Create a `.env.local` file containing all Firebase and Stripe API keys before starting development.
