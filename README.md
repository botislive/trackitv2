# 💰 TrackIt – Personal Finance Tracker

TrackIt is a modern personal finance tracking web application built using **React + Jotai** for state management, with local storage persistence and deployed live on Vercel.

👉 **Live Demo:** [https://trackitv2-chi.vercel.app/](https://trackitv2-chi.vercel.app/)

This project was built to practice real-world state management without Redux Toolkit, focusing on scalable and clean architecture using Jotai atoms.

---

# 🚀 Features

### ✅ Expense Management

* Add new expenses
* Delete expenses
* Categorize expenses
* Real-time updates

### ✅ Smart Calculations

* Total expenses
* Category-based filtering
* Derived state using Jotai atoms

### ✅ Local Storage Persistence

* Data saved automatically
* No backend required
* Works offline

### ✅ Clean Architecture

* Separate atoms folder
* Reusable components
* Scalable project structure

### ✅ Deployment

* Fully deployed on Vercel
* Production-ready build

---

# 🧠 Why This Project

This project was built to:

* Learn real-world state management using Jotai
* Replace Redux Toolkit with simpler atomic state
* Understand derived atoms and writable atoms
* Practice scalable React architecture
* Build a real deployable project

---

# 🛠️ Tech Stack

* React (Vite)
* Jotai (State Management)
* NanoID (Unique IDs)
* LocalStorage Persistence
* Vercel Deployment

---


---

# ⚡ How It Works

### 1️⃣ State Management

All global state is handled using Jotai atoms:

* expensesAtom → Stores all expenses
* addExpenseAtom → Adds new expense
* deleteExpenseAtom → Removes expense
* derived atoms → Calculate totals and filters

This removes boilerplate compared to Redux.

---

### 2️⃣ Local Storage

Using atomWithStorage, expenses are automatically saved in browser storage so data persists after refresh.

---

### 3️⃣ Derived State

Totals and filtered expenses are calculated automatically using derived atoms instead of manual logic in components.

---

# 📦 Installation

Clone the repo and run locally:

```
git clone https://github.com/botislive/trackitv2
cd trackitv2
bun install
bun run dev
```

---

# 🌍 Deployment

The app is deployed using Vercel.

Steps used:

1. Push project to GitHub
2. Import repo into Vercel
3. Deploy with default settings

---

# 📚 What I Learned

* Real-world Jotai state management
* Writable atoms and derived atoms
* Local storage persistence
* React project structuring
* Debugging complex state issues
* Deploying apps to Vercel

---

# 🔥 Future Improvements

* Add income tracking
* Monthly reports and charts
* Dark mode toggle
* Authentication
* Backend with Supabase or Firebase
* Mobile responsive UI

---

# 🤝 Connect With Me

If you liked this project or want to collaborate, feel free to connect with me on LinkedIn or GitHub.

---

# ⭐ Show Your Support

If you found this helpful, please ⭐ the repository!

Happy Building 🚀
