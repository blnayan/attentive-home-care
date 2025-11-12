# Attentive Home Care

## Overview
Attentive Home Care is a modern, responsive website built to represent a professional home care business. It serves as an informational front page where potential clients can learn about available services, understand the company’s mission, and submit contact requests for care inquiries.

## Features
- Clean and accessible home page highlighting services and values  
- About section describing company background and care philosophy  
- Contact form for clients to request information or schedule consultations  
- Responsive layout for mobile, tablet, and desktop users  
- SEO-friendly structure and fast-loading design for better discoverability  

## Tech Stack
- **Framework:** Next.js (React) with TypeScript  
- **Styling:** CSS modules and modern responsive design principles  
- **Form Handling:** Integrated contact form (client-side submission)  
- **Deployment:** Vercel  

## Repository Structure
```
/app
/components
/public
/types
next.config.ts
tsconfig.json
package.json
```
- `/app` – Main pages and routes  
- `/components` – Reusable UI elements (e.g., navbar, footer, contact form)  
- `/public` – Static assets such as images and icons  
- `/types` – TypeScript definitions  

## Getting Started
1. Clone the repository  
   ```bash
   git clone https://github.com/blnayan/attentive-home-care.git
   cd attentive-home-care
   ```
2. Install dependencies  
   ```bash
   pnpm install
   ```
3. Run the development server  
   ```bash
   pnpm dev
   ```
   The site will be available at `http://localhost:3000`.

## Build and Deployment
- Build for production:  
  ```bash
  pnpm build
  ```
- Start the production server:  
  ```bash
  pnpm start
  ```
- Recommended deployment: Vercel for simple CI/CD integration.

## Purpose
The goal of this project is to provide a professional and easy-to-navigate web presence for a home care business. It focuses on clear presentation, trust-building visuals, and convenient client communication through the contact form.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
