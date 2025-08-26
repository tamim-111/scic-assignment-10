# 🚗 Car Rental System (Next.js)

A full-featured **Car Rental web application** built with **Next.js 15 (App Router)**.  
Users can explore, list, and book cars with **real-time availability updates, secure authentication, and a seamless user experience** across all devices.  

---

## 🔗 Live Website
[🌐 Visit the Website](https://scic-assignment-10-two.vercel.app/availableCars)  

---

## 🧩 Project Structure
This project consists of two parts:  
- **Client (Next.js App)** → Car rental frontend built with Next.js App Router  
- **Server (Node.js + Express + MongoDB)** → REST API for authentication, bookings, and car management  

- **Client Repository**: [Car Rental Client (Next.js)](https://github.com/tamim-111/scic-assignment-10)  

---

## 🚀 Key Features  

### 🌍 Public Features
- 🏠 **Home Page** → Animated banner, recent listings, and special offers  
- 🚘 **Available Cars Page** → Search (model, brand, location), sort (price/date), toggle grid/list view  
- 📄 **Car Details Page** → Full car info, features, availability, and booking option  


### 🧑‍💼 Private User Features
- **Add Car** → Authenticated users can list cars with full details  
- **My Cars** → View, update, and delete cars with modal forms and confirmations  
- **My Bookings** → Manage bookings (modify/cancel) with confirmation dialogs  

---

## 📚 Tech Stack  

### Frontend (Next.js App)
- **Next.js 15 (App Router)**  
- **Tailwind CSS + DaisyUI**  
- **NextAuth.js** for authentication  
- **SweetAlert2 + React Hot Toast** for UI feedback  

---

## 📱 Responsiveness
- Mobile-first UI using **Tailwind CSS grid & flex utilities**  
- Optimized layouts for **mobile, tablet, and desktop**  

---

## 📂 Folder Structure (Next.js Client)

```bash
📦 car-rental-client
 ┣ 📂 app
 ┃ ┣ 📂 api              # API routes (Next.js App Router)
 ┃ ┣ 📂 dashboard        # Protected dashboard (My Cars, My Bookings, etc.)
 ┃ ┣ 📂 cars             # Cars listing and details pages
 ┃ ┣ 📜 layout.js        # Root layout
 ┃ ┣ 📜 page.js          # Landing page
 ┣ 📂 components         # Reusable UI components
 ┣ 📂 lib                # DB connection, auth utilities
 ┣ 📂 styles             # Global styles
 ┣ 📜 .env.local         # Environment variables
 ┣ 📜 next.config.js     # Next.js config
 ┗ 📜 package.json


## Installation & Setup
```bash
// Clone the repo
https://github.com/tamim-111/scic-assignment-10


// Install Dependencies
npm i

// Setup Environment Variables
MONGODB_URI
NEXTAUTH_SECRET=

// Run Development Servers
npm run dev