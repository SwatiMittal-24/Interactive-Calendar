# Wall Calendar Planner

Bringing the timeless utility of a physical wall calendar to the modern digital workspace.

---

## 🔗 Demo Links

*   **Live Demo**: [View Live Project](https://example-demo-link.com) *(Update with your link)*
*   **Video Walkthrough**: [Watch Demo Video](https://youtube.com/example) *(Update with your link)*

---

## ✨ Features

*   **Analog Aesthetic, Digital Precision**: A handcrafted UI inspired by premium physical calendars, featuring rich seasonal themes and high-quality photography.
*   **Intuitive Range Selection**: Effortlessly select date ranges with a fluid click-and-drag-inspired interaction model, perfect for planning trips, projects, or goals.
*   **Integrated Note Management**: Contextual notes for specific dates or ranges, allowing you to bridge the gap between "when" and "what."
*   **Persistent Planner**: Automatic client-side persistence using `localStorage`. Your plans remain intact across sessions without requiring a backend.
*   **Dynamic Seasonal Themes**: 12 distinct, curated color palettes that transition automatically based on the month, providing a delightful and varied user experience.
*   **Premium Interactions**: Smooth CSS-driven animations (blur-in hero images, slide-up text) and frosted glass effects for a state-of-the-art feel.

---

## 🎨 UI/UX Highlights

*   **Wall Calendar Inspiration**: Designed to evoke the feeling of flipping through a physical planner, with a prominent "hero" section for each month.
*   **Responsiveness First**: A dual-layout strategy.
    *   **Desktop**: A panoramic "Wall View" that utilizes the full width of the screen with a dedicated notes side panel.
    *   **Mobile**: A condensed, scroll-optimized view that maintains luxury aesthetics on smaller screens.
*   **Focus on Usability**: Clean typography (Inter font) and intentional whitespace ensure that your plans are always the main focus.

---

## 🛠 Tech Stack

*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
*   **Language**: JavaScript / React 19
*   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & Vanilla CSS
*   **Date Utility**: [date-fns](https://date-fns.org/)
*   **State Management**: React Hooks (useState, useEffect)

---

## 🚀 Getting Started

Follow these steps to set up the project locally:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18.x or higher recommended).

### 2. Installation
```bash
git clone https://github.com/SwatiMittal-24/Interactive-Calendar.git
cd wall-calendar-planner/assgn
npm install
```

### 3. Run Locally
```bash
npm run dev
```
The application will be available at `http://localhost:3006`.

---

## 📁 Project Structure

```text
src/
├── app/            # Next.js App Router (Layouts and Pages)
├── components/     # Reusable UI Components
│   └── calendar/   # Core Calendar logic, Grid, and Detail panels
├── lib/            # Utility functions and configuration
│   ├── monthThemes.js  # Curated seasonal design tokens
│   ├── monthImages.js  # High-res photography assets
│   └── dateUtils.js    # Date processing helpers
└── styles/         # Global styles and Tailwind configuration
```

---

## 🧠 Key Implementation Details

### **Range Selection Logic**
The calendar uses a custom state machine to handle start/end date selection. It intelligently calculates the range highlights in real-time as the user hovers over the grid, providing immediate visual feedback.

### **State-Driven Theming**
Instead of static styles, the entire UI is derived from a `monthThemes` configuration. Changing a month triggers a global CSS variable update, seamlessly transitioning the "paper," "ink," and "accent" colors.

### **Optimized Rendering**
Utilizes React's latest features to ensure minimal re-renders during date selection. The `DetailPanel` and `CalendarGrid` are decoupled to allow independent updates.

---

*Show your support by giving this project a ⭐ if you like it!*
