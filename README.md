# User Management App

A **React + Redux** application for managing users, with **pagination, sorting, searching, and modal functionality**. Built with **Next.js (App Router)** and **Tailwind CSS** for styling.

## Features

**User Listing**: Fetch and display users from an API.
**Search**: Search users by name or email.
**Sorting**: Sort users by name, email, or username.
**Pagination**: Navigate through user pages with Previous & Next buttons.
**Modal View**: Click on a user to view details in a modal.
**Error Handling**: Gracefully handle API errors.
**Optimized Fetching**: Uses a single API call per page with smart data handling.

##  Tech Stack

**React** (with hooks)
**Next.js** (`use client`)
**Redux Toolkit** (State Management)
**Tailwind CSS** (Modern Styling)
**JSONPlaceholder API** (Mock Data)

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/behnam-nbt/behnam-nabat-saeid-jalilibashashi-task.git
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Start the development server**

```bash
npm run dev
```

4. **Open the app**
Visit http://localhost:3000 in your browser.

##  API Reference

**Users Endpoint**

```bash
GET https://jsonplaceholder.typicode.com/users?_limit=5&_page={page}
```

## Usage Guide

**Searching**
- Type in the search bar to filter users by name or email.

**Sorting**
- Click "Next" or "Previous" buttons to navigate between pages.
- If no more data is available, the Next button will be disabled.

**User Modal**
- Click on a user row to open a modal with more details.


 Made with ❤️ by Behnam Nabati
