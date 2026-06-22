# 📄 README.md for Devfolio AI

Create a new file in the root of your project folder called `README.md` and paste the following content:

```markdown
# 🚀 Devfolio AI

### Build Your Resume & Portfolio Website in Minutes

Devfolio AI is a production-ready SaaS platform that allows users to build professional, ATS-friendly resumes and stunning portfolio websites from a single source of data.

Whether you're a fresher or an experienced professional, Devfolio AI helps you create, customize, and export your resume and portfolio with ease.

🔗 **Live Demo:** (Coming soon)  
📦 **Repository:** [https://github.com/akshataj70/devfolio-ai](https://github.com/akshataj70/devfolio-ai)

---

## ✨ Key Features

### 📄 Resume Builder
- **Manual Creation** – Fill forms step-by-step.
- **PDF Upload & Auto-Extraction** – Upload your existing resume PDF and let AI extract your data.
- **6 Professional Templates** – Modern, Minimal, Professional, Creative, Classic, Executive.
- **Live A4 Preview** – See changes in real-time as you type.
- **ATS Score Panel** – Get a compatibility score with actionable improvement tips.
- **PDF Download** – Download ATS-friendly, multi-page PDFs.
- **Section Reorder** – Drag & drop to arrange sections.
- **Auto-Save** – Drafts are saved locally every 2 seconds.

### 🌐 Portfolio Builder
- **Generate Portfolio** – Instantly create a portfolio from your resume data.
- **4 Unique Themes** – Developer, Minimal, Creative, Professional.
- **Live Preview** – See your portfolio in a browser mockup.
- **Export HTML** – Download your portfolio as a complete, shareable HTML file.
- **Customizable Sections** – Toggle sections on/off.

### 🔐 Authentication & Database
- **User Registration & Login** – Secure JWT-based authentication.
- **Cloud Database** – Save resumes and portfolios to MongoDB.
- **User Settings** – Profile, change password, and delete account.

### 🎨 Design & UX
- **Full Dark Mode** – Seamless light/dark theme switching.
- **Smooth Animations** – Powered by Framer Motion.
- **Fully Responsive** – Works on desktop, tablet, and mobile.

---

## 🛠️ Tech Stack

### Frontend
- **React 18** + **Vite**
- **Tailwind CSS** – Styling
- **Framer Motion** – Animations
- **Zustand** – State Management
- **React Router DOM** – Routing
- **@react-pdf/renderer**, **html2canvas**, **jsPDF** – PDF generation
- **pdfjs-dist** – PDF parsing

### Backend
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose** – Database
- **JWT** + **bcryptjs** – Authentication
- **OpenAI API** – AI Summary generation

---

## 📂 Project Structure

```text
devfolio-ai/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Resume.js
│   │   └── Portfolio.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── resumeRoutes.js
│   │   └── portfolioRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── landing/
│   │   │   ├── builder/
│   │   │   ├── portfolio/
│   │   │   └── dashboard/
│   │   ├── pages/
│   │   ├── stores/
│   │   └── services/
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- **Node.js** (v18 or later)
- **MongoDB** (local or Atlas)
- **Git**

### 1. Clone the repository
```bash
git clone https://github.com/akshataj70/devfolio-ai.git
cd devfolio-ai
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/devfolio
JWT_SECRET=your_super_secret_jwt_key
OPENAI_API_KEY=your_openai_api_key (optional)
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Open the App
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000

---



---



---

## 👩‍💻 Author

**Akshata Jondhale**  
📧 akshatajondhale@gmail.com  
🔗 [GitHub](https://github.com/akshataj70)

---



---

## 🙏 Acknowledgments

- Built as a final year / internship project to demonstrate SaaS architecture and full-stack development skills.
--


```

---


---


---
