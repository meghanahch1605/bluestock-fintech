# 🚀 **BlueStock Fintech – Job Portal System**

A full-stack job portal platform built for BlueStock Fintech assignment, supporting **Companies, Candidates, and Admin** workflows.

This system includes:

* 🔐 Authentication (JWT-based)
* 🏢 Company onboarding & job posting
* 👤 Candidate registration, resume upload & job applications
* 🛠 Admin approval dashboard
* ☁️ Cloudinary integration
* 🗄 PostgreSQL database
* 🌐 React Frontend

---

## 📌 **Table of Contents**

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Architecture](#architecture)
* [Folder Structure](#folder-structure)
* [API Documentation](#api-documentation)
* [Database Schema](#database-schema)
* [Environment Variables](#environment-variables)
* [Setup Instructions](#setup-instructions)
* [Deployment Links](#deployment-links)
* [Screenshots](#screenshots)
* [Author](#author)

---

# ✨ **Features**

### 👤 **Candidate Features**

* Register & Login
* Update profile
* Upload resume (Cloudinary)
* View all jobs
* Apply for jobs

### 🏢 **Company Features**

* Register & Login
* Update company profile (logo upload)
* Post jobs
* View all posted jobs
* View applicants

### 🛠 **Admin Features**

* Admin login
* Approve or reject companies
* View all candidates & companies
* View all jobs & applications

---

# 🧰 **Tech Stack**

### **Backend**

* Node.js
* Express.js
* PostgreSQL
* JWT Authentication
* Bcrypt (Password hashing)
* Multer (File Upload)
* Cloudinary SDK

### **Frontend**

* ReactJS
* Axios
* React Router
* Tailwind/Bootstrap (if used)

---

# 🏗 **Architecture**

```
Frontend (React)
      ↓ REST API calls
Backend (Node + Express)
      ↓ Queries
Database (PostgreSQL)
      ↓ Media upload
Cloudinary
```

---

# 📂 **Folder Structure**

```
backend/
│── src/
│   ├── config/
│   │   ├── db.js
│   │   ├── firebase.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
│── uploads/
│── package.json

frontend/
│── src/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   ├── index.js
│── package.json
```

---

# 📘 **API Documentation**

## 🔐 **Authentication**

### **Company**

| Method | Endpoint                | Description          |
| ------ | ----------------------- | -------------------- |
| POST   | `/api/company/register` | Register new company |
| POST   | `/api/company/login`    | Company login        |
| GET    | `/api/company/profile`  | Get company profile  |

### **Candidate**

| Method | Endpoint                  | Description                    |
| ------ | ------------------------- | ------------------------------ |
| POST   | `/api/candidate/register` | Register candidate             |
| POST   | `/api/candidate/login`    | Candidate login                |
| GET    | `/api/candidate/profile`  | Fetch candidate profile        |
| PUT    | `/api/candidate/update`   | Update profile + resume upload |

---

## 💼 **Jobs**

| Method | Endpoint         | Description                 |
| ------ | ---------------- | --------------------------- |
| POST   | `/api/jobs/post` | Post new job (company only) |
| GET    | `/api/jobs`      | Get all jobs                |
| GET    | `/api/jobs/:id`  | Get job details             |

---

## 📄 **Applications**

| Method | Endpoint                      | Description                      |
| ------ | ----------------------------- | -------------------------------- |
| POST   | `/api/apply/:jobId`           | Apply for job                    |
| GET    | `/api/applications/company`   | Company views applicants         |
| GET    | `/api/applications/candidate` | Candidate views own applications |

---

## 🛠 **Admin**

| Method | Endpoint                           | Description       |
| ------ | ---------------------------------- | ----------------- |
| POST   | `/api/admin/login`                 | Admin login       |
| GET    | `/api/admin/companies`             | Get all companies |
| PUT    | `/api/admin/companies/:id/approve` | Approve company   |
| PUT    | `/api/admin/companies/:id/reject`  | Reject company    |

---

# 🗄 **Database Schema**

### **Companies Table**

```
id (PK)
name
email
password
address
website
logo_url
status (pending/approved/rejected)
```

### **Candidates Table**

```
id (PK)
name
email
password
phone
skills
experience
resume_url
```

### **Jobs Table**

```
id (PK)
company_id (FK)
title
description
salary
location
job_type
```

### **Applications Table**

```
id (PK)
candidate_id (FK)
job_id (FK)
status (applied/selected/rejected)
applied_at
```

---

# 🔑 **Environment Variables**

Create a `.env` file:

```
# Server
PORT=5000
JWT_SECRET=your_secret_key

# Database
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=blue

# Cloudinary
CLOUD_NAME=xxxx
CLOUD_API_KEY=xxxx
CLOUD_API_SECRET=xxxx
```

---

# 🛠 **Setup Instructions**

## Backend

```
cd backend
npm install
npm start
```

## Frontend

```
cd frontend
npm install
npm start
```

---

# 🌍 **Deployment Links**

| Component     | Link                                                                                                 |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| Backend API   | [https://your-backend-url](https://your-backend-url)                                                 |
| Frontend Live | [https://your-frontend-url](https://your-frontend-url)                                               |
| GitHub Repo   | [https://github.com/yourname/bluestock-job-portal](https://github.com/yourname/bluestock-job-portal) |

---

# 🖼 **Screenshots**

<img width="948" height="412" alt="{49D44F70-007B-4E3A-A89C-51C2D54846BE}" src="https://github.com/user-attachments/assets/3c27cd36-d19b-4cb7-94f2-5811e469f18c" />
<img width="954" height="416" alt="{CA1E5445-5F75-471B-BF10-D70810286728}" src="https://github.com/user-attachments/assets/046fb99e-09aa-4ef9-a30d-03c4e651697c" />
<img width="958" height="409" alt="{D578BC2C-8727-4290-9747-9CEFEF6EA840}" src="https://github.com/user-attachments/assets/485a91d4-f9ee-4e3d-b764-674e9d40880e" />
<img width="945" height="413" alt="{9200B710-9A47-48E8-8CD2-39B4FB257486}" src="https://github.com/user-attachments/assets/8dc39ffa-f564-402c-bd25-cf1be8633a44" />
<img width="960" height="411" alt="{A19F6885-6670-43F3-BBFC-829A7AEBB21B}" src="https://github.com/user-attachments/assets/a0c45adc-bb0f-45a6-932d-13a154da470c" />
<img width="960" height="413" alt="{5A6FA2FF-B442-4AB4-8053-A68D0CE72E15}" src="https://github.com/user-attachments/assets/41e308e1-8904-48f4-bb0c-241e424791ff" />
# **browse jobs**
<img width="960" height="413" alt="{14D73624-17DC-47CA-8C06-37AED17D1496}" src="https://github.com/user-attachments/assets/98fee120-7ac2-44d7-ab7c-c0fffd231de4" />
<img width="960" height="417" alt="{5ED14604-2AD0-4E25-A1D6-B5A62BE37BB1}" src="https://github.com/user-attachments/assets/dba774a5-1b62-4d6a-b71f-89b99410ead7" />
<img width="956" height="414" alt="{B55640A3-DCFA-49F2-9BB4-3379810716E0}" src="https://github.com/user-attachments/assets/b4a5639b-5fd5-426e-88f0-b91bd55e7901" />
# **companies**
<img width="960" height="413" alt="{2D9C03FC-F2DA-41AA-BFA3-E6C8E4318BA6}" src="https://github.com/user-attachments/assets/5fb03f3e-d545-49d8-a7a3-9336935fd222" />
# **logins**
<img width="957" height="412" alt="{4D859AB1-0B6F-4AEA-ABF4-376230D78410}" src="https://github.com/user-attachments/assets/dfd87d18-6406-4e94-9418-34ce83ca6226" />
<img width="960" height="413" alt="{629CE60F-B51A-4D4B-83B6-97089FCDA349}" src="https://github.com/user-attachments/assets/c0ec3056-93d8-454a-b962-bfba589473b4" />
<img width="951" height="411" alt="{76F89DDF-9A73-492D-8F8C-1F09A7C39570}" src="https://github.com/user-attachments/assets/caa6f84d-b8e5-4ef1-8078-b8778acfcdc8" />
# **Register**
<img width="958" height="417" alt="{00DA3409-412F-4972-AD48-CD826286ADFB}" src="https://github.com/user-attachments/assets/b2d12ecb-d09d-4335-b935-f389c7a89713" />

<img width="960" height="415" alt="{7C6CA3E8-8E51-4241-81C3-FCF06E8D3C7F}" src="https://github.com/user-attachments/assets/dfe1e37d-5242-41df-b895-2e68b8dc2013" />
# **admin**
<img width="956" height="410" alt="{7313EB25-1FE2-4658-8EE7-56528D7603E9}" src="https://github.com/user-attachments/assets/b5c9fe94-13f7-4930-9eb5-c53b4bd387f8" />


# **API POSTMEN**
<img width="944" height="496" alt="{067CE6C4-892C-46E3-9953-00D43A25EAB7}" src="https://github.com/user-attachments/assets/338c42f8-0198-43e5-97f8-170fea9b6348" />
<img width="957" height="499" alt="{2DB6A6AF-A729-4067-9882-B3ADD191E2A5}" src="https://github.com/user-attachments/assets/c047851d-c7f6-438f-aa88-3538c0d829c7" />
<img width="960" height="496" alt="{80418FA0-5302-4402-A516-2BE675E975EA}" src="https://github.com/user-attachments/assets/0f8714d6-27b8-442a-80af-ab2a0889c2e9" />
<img width="950" height="499" alt="{A486ED5A-56DD-4C71-9261-ADB3DCEE5321}" src="https://github.com/user-attachments/assets/e157164c-b29a-464c-a762-2ce91fb9380b" />
<img width="956" height="503" alt="{570DF29D-0CA9-4E6C-8860-DE30342573BC}" src="https://github.com/user-attachments/assets/310fbe65-6b88-4bd7-af65-f676627aab87" />
<img width="960" height="499" alt="{50B4D6B4-A399-4B7F-A326-D4EAD0EE7C83}" src="https://github.com/user-attachments/assets/6ef0be7c-3a0a-4ae6-bdda-7b1cc5a90d9e" />
<img width="960" height="502" alt="{9082C618-7C48-4A9F-AB6D-08A4BD7807B9}" src="https://github.com/user-attachments/assets/dca05165-3a04-43cf-8de6-1583d092e8f1" />
<img width="960" height="500" alt="{1380B4B2-E4D8-4E3A-852F-BFE2919D3AA0}" src="https://github.com/user-attachments/assets/ac6dc14c-86fb-4d31-9b92-9f3047d7a657" />
<img width="960" height="504" alt="{CD06C1A9-1C81-4D44-A0A4-96C08655D0AA}" src="https://github.com/user-attachments/assets/8746467b-407c-43cb-a50b-a67b25cd0591" />
<img width="960" height="502" alt="{738C6E00-1E26-4DA6-AF35-90D91F4C4C80}" src="https://github.com/user-attachments/assets/e17524a8-6f9a-4041-a31d-3b5e8551ad9f" />
<img width="960" height="507" alt="{B8AC40DA-91E2-4AC8-A14B-A5C0513B57C2}" src="https://github.com/user-attachments/assets/8e2fc2ea-697d-4125-94ea-da0b2b3e475c" />
<img width="960" height="501" alt="{1CE777A0-185F-4D42-AA33-84DC73BFEC8C}" src="https://github.com/user-attachments/assets/fc594704-6c98-4348-8c3b-97e499a4fed5" />
<img width="960" height="500" alt="{9B6D7174-9FBA-4599-8E58-074868809447}" src="https://github.com/user-attachments/assets/42c5b243-1695-4f5c-9877-45b3d450e27b" />
<img width="960" height="506" alt="{F0913CA5-2FD8-47AA-9C1F-7A36AAD9E877}" src="https://github.com/user-attachments/assets/03aae82d-2751-4708-b0e9-e60fbd22bcf9" />
<img width="960" height="505" alt="{D2176746-A26E-4B65-86ED-CAEE07D588DA}" src="https://github.com/user-attachments/assets/1ec5f182-2562-44bc-a18e-3bf7a21bd098" />
<img width="960" height="501" alt="{9C9027A9-1CD6-485F-8FDA-D183F4CC88DD}" src="https://github.com/user-attachments/assets/9e46e744-406c-41df-a9a2-fc1f48f88858" />
<img width="960" height="507" alt="{99D2CC44-06D2-411F-BDE3-5ECAC80C870B}" src="https://github.com/user-attachments/assets/047400f6-2e1e-444a-9e62-c6b76660bc0a" />
<img width="960" height="509" alt="{C2E7F9E7-FAD9-40D8-BE57-38D4F680212C}" src="https://github.com/user-attachments/assets/1b625106-1296-455f-84d7-d2ee829f2aad" />
<img width="960" height="500" alt="{CAAE56DE-CBF4-4CD7-BBDF-E9ADF99644DF}" src="https://github.com/user-attachments/assets/d4f28216-e6a4-43e7-85ee-efda694b8a18" />
<img width="960" height="506" alt="{8D826C76-F261-49DC-8BC7-598A11247A4E}" src="https://github.com/user-attachments/assets/cd96057d-4fb7-4ad7-839f-5df5a7f701f5" />
<img width="960" height="493" alt="{82B76C3A-088E-47B4-941F-FFEC02879204}" src="https://github.com/user-attachments/assets/a7f7ac6d-1b4e-4d4a-ae2e-80cfea2c316d" />
<img width="957" height="498" alt="{DD7A5C6C-0977-4883-877D-D9D0F24D4067}" src="https://github.com/user-attachments/assets/76762a8a-d626-4a0a-af7b-78696de2abf4" />

---

# 👩‍💻 **Author**

**Meghana Harini**
BlueStock Fintech Internship Project

