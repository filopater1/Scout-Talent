# Frontend & Backend API Requirements — Full Documentation

---

## Table of Contents

* [Applicant Dashboard](https://claude.ai/chat/4fa67492-cdea-4b1c-918c-34e6eb9c3441#applicant-dashboard)
* [Applicant Profile](https://claude.ai/chat/4fa67492-cdea-4b1c-918c-34e6eb9c3441#applicant-profile)
* [Jobs Flow](https://claude.ai/chat/4fa67492-cdea-4b1c-918c-34e6eb9c3441#jobs-flow)
* [Recruiter Dashboard](https://claude.ai/chat/4fa67492-cdea-4b1c-918c-34e6eb9c3441#recruiter-dashboard)
* [Candidate Evaluation](https://claude.ai/chat/4fa67492-cdea-4b1c-918c-34e6eb9c3441#candidate-evaluation)
* [My Job Posts](https://claude.ai/chat/4fa67492-cdea-4b1c-918c-34e6eb9c3441#my-job-posts)
* [Recruiter Profile](https://claude.ai/chat/4fa67492-cdea-4b1c-918c-34e6eb9c3441#recruiter-profile)

---

# Applicant Dashboard

## Overview

The **Applicant Dashboard** displays the following to the authenticated user:

* Basic personal information
* Profile completion percentage
* Application statistics
* List of submitted job applications
* Access to scheduled interviews

---

## Required APIs

### 1. Get Applicant Profile

**Purpose:** Retrieve the user's basic data for display in the header and welcome section.

```
GET /api/applicant/profile
```

**Response:**

```json
{
  "id": "string",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@email.com",
  "avatarUrl": "string"
}
```

---

### 2. Get Profile Completion

**Purpose:** Retrieve the profile completion percentage and section statuses.

```
GET /api/applicant/profile-completion
```

**Response:**

```json
{
  "completion": 75,
  "sections": {
    "basicInfo": true,
    "experience": true,
    "skillsAssessment": false
  }
}
```

**Notes:**

* `completion` ranges from `0` to `100`
* `sections` values are used to render the completion checklist in the UI

---

### 3. Get Dashboard Statistics

**Purpose:** Populate the statistics cards on the dashboard.

```
GET /api/applicant/dashboard-stats
```

**Response:**

```json
{
  "totalApplications": 12,
  "inReview": 5,
  "interviews": 3,
  "averageMatchScore": 87
}
```

---

### 4. Get My Applications

**Purpose:** Retrieve the list of job applications submitted by the authenticated user.

```
GET /api/applicant/applications
```

**Query Parameters:**

| Parameter    | Type       | Required | Description            |
| ------------ | ---------- | -------- | ---------------------- |
| `page`     | `number` | No       | Page number            |
| `pageSize` | `number` | No       | Number of items / page |
| `status`   | `string` | No       | Filter by status       |

**Response:**

```json
{
  "items": [
    {
      "id": "string",
      "position": "Senior Software Engineer",
      "company": "TechCorp",
      "status": "Interview",
      "appliedDate": "2026-01-10",
      "matchScore": 92,
      "location": "Remote",
      "nextAction": "Interview on Jan 20"
    }
  ],
  "total": 12,
  "page": 1
}
```

---

### 5. Get Interview Link

**Purpose:** Retrieve the meeting URL to power the **Join Interview** button.

```
GET /api/applicant/interviews/{applicationId}
```

**Response:**

```json
{
  "meetingUrl": "https://zoom.us/..."
}
```

---

# Applicant Profile

## Overview

The **Applicant Profile** page allows the authenticated user to:

* View their profile completion status
* Edit basic personal information
* Manage work experiences (add, update, delete)
* Add and remove skills
* Improve their AI matching score

---

## Required APIs

### 1. Get Applicant Profile (Full)

**Purpose:** Load all profile data in a single request upon page load.

```
GET /api/applicant/profile
```

**Response:**

```json
{
  "id": "string",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@email.com",
  "phone": "+15551234567",
  "location": "San Francisco, CA",
  "linkedinUrl": "https://linkedin.com/in/johndoe",
  "completion": 75,
  "completionSections": {
    "basicInfo": true,
    "workExperience": true,
    "skills": false
  },
  "skills": ["React", "TypeScript"],
  "experiences": [
    {
      "id": "exp_1",
      "title": "Senior Frontend Developer",
      "company": "Google",
      "startDate": "2021-01-01",
      "endDate": null,
      "description": "Working on scalable React applications."
    }
  ]
}
```

---

### Basic Information

#### 2. Update Basic Information

```
PUT /api/applicant/profile/basic-info
```

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+15551234567",
  "location": "San Francisco, CA",
  "linkedinUrl": "https://linkedin.com/in/johndoe"
}
```

**Notes:**

* `email` is **read-only** and must not be included in the request body
* Response returns the updated profile object or `204 No Content`

---

### Work Experience

#### 3. Add Experience

```
POST /api/applicant/experiences
```

**Request Body:**

```json
{
  "title": "Senior Frontend Developer",
  "company": "Google",
  "startDate": "2021-01-01",
  "endDate": null,
  "description": "Working on scalable React applications."
}
```

---

#### 4. Update Experience

```
PUT /api/applicant/experiences/{experienceId}
```

**Request Body:** Same schema as Add Experience.

---

#### 5. Delete Experience

```
DELETE /api/applicant/experiences/{experienceId}
```

---

### Skills

#### 6. Add Skill

```
POST /api/applicant/skills
```

**Request Body:**

```json
{
  "name": "React"
}
```

---

#### 7. Remove Skill

```
DELETE /api/applicant/skills/{skillName}
```

> **Note:** Confirm with the Backend team whether the skill is identified by `name` or `id` in the delete endpoint.

---

## Profile Completion Logic

The **Backend** is solely responsible for calculating and returning the completion percentage. The Frontend only renders the value received from the API.

**Suggested Weights:**

| Section    | Weight |
| ---------- | ------ |
| Basic Info | 30%    |
| Experience | 40%    |
| Skills     | 30%    |

---

# Jobs Flow

## Pages Flow

```
Job List → Job Details → Job Application → Applicant Dashboard
```

---

## 1. Jobs List Page

### Objective

* Display all available job listings
* Support server-side search
* Navigate to job detail pages
* Initiate the application process

---

### Required API — Get Jobs List

```
GET /api/jobs
```

**Query Parameters:**

| Parameter    | Type       | Required | Description                         |
| ------------ | ---------- | -------- | ----------------------------------- |
| `search`   | `string` | No       | Search by job title or company name |
| `page`     | `number` | No       | Page number                         |
| `pageSize` | `number` | No       | Number of items per page            |
| `location` | `string` | No       | *(Future)*                        |
| `type`     | `string` | No       | *(Future)*                        |

**Response:**

```json
{
  "items": [
    {
      "id": 1,
      "title": "Senior Software Engineer",
      "company": "TechCorp Inc.",
      "location": "Remote",
      "salaryMin": 120000,
      "salaryMax": 180000,
      "type": "Full-time",
      "status": "Actively Hiring"
    }
  ],
  "page": 1,
  "totalPages": 5,
  "totalCount": 50
}
```

**Frontend Notes:**

* Search must be **server-side** — no client-side filtering
* Pagination is **mandatory**
* `status` values are enums defined and returned by the Backend

---

## 2. Job Details Page

### Objective

Display the full details of a single job listing and allow the user to initiate an application.

---

### Required API — Get Job Details

```
GET /api/jobs/{jobId}
```

**Response:**

```json
{
  "id": 1,
  "title": "Senior Software Engineer",
  "company": "TechCorp Inc.",
  "location": "Remote",
  "salaryMin": 120000,
  "salaryMax": 180000,
  "type": "Full-time",
  "status": "Actively Hiring",
  "description": "...",
  "skills": ["React", "Node.js"],
  "responsibilities": ["..."],
  "requirements": ["..."],
  "postedAt": "2026-01-10",
  "isApplied": false
}
```

**Important — `isApplied` Field:**

The Frontend uses this flag to determine whether the user has previously applied for this job, which directly affects the UI:

| Value                | Expected UI Behavior                          |
| -------------------- | --------------------------------------------- |
| `isApplied: false` | **Apply Now**button is active           |
| `isApplied: true`  | **Applied**button is disabled or hidden |

---

## 3. Job Application Page

> **This is the most critical page in the entire flow.**

The page is divided into **4 sequential steps:**

---

### Step 1 — Job Preview

* **No API required**
* Relies entirely on data already fetched from **Job Details**
* Purpose: Display a job summary before the user proceeds with the application

---

### Step 2 — Personal Information

#### API 1 — Get Profile (Prefill)

Retrieve user data to pre-populate the application form:

```
GET /api/applicant/profile
```

> For the full response schema, refer to the [Applicant Profile](https://claude.ai/chat/4fa67492-cdea-4b1c-918c-34e6eb9c3441#applicant-profile) section.

---

#### API 2 — Update Profile During Application *(Optional but Recommended)*

If the user updates their information during the application process, persist the changes:

```
PUT /api/applicant/profile/basic-info
```

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+15551234567",
  "location": "San Francisco, CA",
  "linkedinUrl": "https://linkedin.com/in/johndoe"
}
```

> This improves UX by eliminating the need for the user to separately visit and update their profile.

---

### Step 3 — Upload CV

#### Required API — Upload CV

```
POST /api/files/upload-cv
Content-Type: multipart/form-data
```

**Response:**

```json
{
  "fileId": "cv_123",
  "fileName": "john_cv.pdf",
  "url": "..."
}
```

**Validation Rules:**

| Rule                  | Details                                                                 |
| --------------------- | ----------------------------------------------------------------------- |
| Maximum file size     | **10 MB**                                                         |
| Allowed formats       | `.pdf`,`.doc`,`.docx`                                             |
| Response must include | `fileId`— required by the Submit Application step (not just `url`) |

---

### Step 4 — Submit Application *(Critical)*

#### Required API — Submit Application

```
POST /api/job-applications
```

**Request Body:**

```json
{
  "jobId": 1,
  "cvFileId": "cv_123",
  "coverLetter": "optional text"
}
```

**Response:**

```json
{
  "applicationId": "app_456",
  "status": "Submitted"
}
```

**Post-Submission Behavior:**

* Redirect the user to the **Applicant Dashboard**
* `applicationId` may be stored temporarily if a confirmation step is required

---

## Full Flow Summary

```
1. Jobs List
   └── GET /api/jobs

2. Job Details
   └── GET /api/jobs/{jobId}
       └── Check isApplied → show / disable Apply button

3. Job Application
   ├── Step 1: Job Preview         No API — reuse Job Details data
   ├── Step 2: Personal Info       GET /api/applicant/profile
   │                               PUT /api/applicant/profile/basic-info (optional)
   ├── Step 3: Upload CV           POST /api/files/upload-cv
   └── Step 4: Submit              POST /api/job-applications

4. Redirect → Applicant Dashboard
```

---

# Recruiter Dashboard

## Overview

The Recruiter Dashboard relies on the following core capabilities:

* Candidate listing with server-side filtering
* Dashboard KPI statistics
* Candidate detail retrieval
* Candidate status updates (Kanban workflow)
* Pagination and sorting support
* Bearer token authorization

---

## Authorization

All endpoints require authentication:

```
Authorization: Bearer <token>
```

---

## 1. Get Candidates List

```
GET /api/recruiter/candidates
```

**Query Parameters:**

| Parameter    | Type       | Required | Description                     |
| ------------ | ---------- | -------- | ------------------------------- |
| `search`   | `string` | No       | Search by candidate name        |
| `status`   | `string` | No       | Filter by candidate status      |
| `minScore` | `number` | No       | Minimum AI score                |
| `skill`    | `string` | No       | Filter by skill                 |
| `page`     | `number` | No       | Page number (default: 1)        |
| `pageSize` | `number` | No       | Items per page (default: 20)    |
| `sortBy`   | `string` | No       | Field to sort by                |
| `sortDir`  | `string` | No       | Sort direction:`asc`/`desc` |

**Example Request:**

```
GET /api/recruiter/candidates?search=alex&status=Interview&minScore=80&skill=react&page=1&pageSize=20
```

**Response:**

```json
{
  "items": [
    {
      "id": 1,
      "name": "Alex Johnson",
      "position": "Senior Software Engineer",
      "aiScore": 95,
      "skills": ["React", "Node.js", "AWS"],
      "appliedDate": "2026-01-10",
      "avatar": "AJ",
      "status": "New"
    }
  ],
  "totalCount": 47,
  "page": 1,
  "pageSize": 20
}
```

**Candidate Status Enum — Required:**

The Backend must return **exactly** these values:

```ts
type CandidateStatus =
  | "New"
  | "Screening"
  | "Interview"
  | "Offer"
  | "Hired";
```

> Any deviation will break the Kanban board.

---

## 2. Get Dashboard Statistics

```
GET /api/recruiter/dashboard-stats
```

**Response:**

```json
{
  "activeJobs": 8,
  "totalCandidates": 47,
  "avgTimeToHireDays": 18,
  "offersSent": 12,
  "hired": 9,
  "acceptanceRate": 75
}
```

---

## 3. Get Candidate Details

Used when navigating to a candidate's evaluation page.

```
GET /api/recruiter/candidates/{id}
```

**Response:**

```json
{
  "id": 1,
  "name": "Alex Johnson",
  "email": "alex@example.com",
  "phone": "+1 555 123 4567",
  "position": "Senior Software Engineer",
  "aiScore": 95,
  "skills": ["React", "Node.js"],
  "experience": [],
  "education": [],
  "cvUrl": "https://...",
  "status": "Interview"
}
```

---

# Candidate Evaluation

## Overview

The Candidate Evaluation page is one of the most critical screens in the recruiter workflow. It requires:

* Full candidate profile
* AI evaluation results
* Skills analysis (explicit and implicit)
* Fairness and bias metrics
* Action endpoints (schedule interview, reject, etc.)

---

## Authorization

All endpoints require:

```
Authorization: Bearer <token>
```

---

## 1. Get Candidate Evaluation

**Purpose:** Return all data needed to render the evaluation page in a single request. This approach is recommended to avoid multiple sequential API calls.

```
GET /api/recruiter/candidates/{id}/evaluation
```

**Response:**

```json
{
  "id": 1,
  "name": "Alex Johnson",
  "email": "alex.johnson@email.com",
  "phone": "+1 555 987 6543",
  "location": "San Francisco, CA",
  "position": "Senior Software Engineer",
  "avatar": "AJ",
  "appliedDaysAgo": 2,
  "status": "Under Review",
  "aiScore": 95,
  "matchLevel": "Excellent Match",
  "quickStats": {
    "yearsOfExperience": 7,
    "previousCompanies": 4,
    "educationDegree": "BS Computer Science",
    "educationUniversity": "Stanford University"
  },
  "scoreBreakdown": [
    { "label": "Technical Skills", "score": 96 },
    { "label": "Experience Match", "score": 94 },
    { "label": "Education", "score": 95 },
    { "label": "Cultural Fit", "score": 92 }
  ],
  "semanticMatching": {
    "strongSkills": ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL", "Docker", "Git", "Agile"],
    "partialSkills": ["Kubernetes", "GraphQL"]
  },
  "skillsRadar": [
    { "skill": "React", "candidate": 95, "required": 90 },
    { "skill": "Node.js", "candidate": 92, "required": 85 },
    { "skill": "TypeScript", "candidate": 90, "required": 80 },
    { "skill": "AWS", "candidate": 85, "required": 75 },
    { "skill": "System Design", "candidate": 88, "required": 80 },
    { "skill": "Leadership", "candidate": 82, "required": 70 }
  ],
  "explicitSkills": ["React", "Node.js", "TypeScript", "Python", "AWS", "Docker"],
  "implicitSkills": ["System Design", "Team Leadership", "Problem Solving", "Communication"],
  "fairness": {
    "biasDetected": false,
    "metrics": [
      { "name": "Gender Bias Check", "status": "Pass" },
      { "name": "Age Bias Check", "status": "Pass" },
      { "name": "Name Bias Check", "status": "Pass" },
      { "name": "Location Bias Check", "status": "Pass" }
    ],
    "transparencyNote": "Evaluated purely on technical and experience factors."
  }
}
```

**Candidate Status Enum — Required:**

```ts
type CandidateStatus =
  | "Under Review"
  | "Interview Scheduled"
  | "Assessment Sent"
  | "Rejected"
  | "Hired";
```

> Must match the Frontend exactly.

---

## 2. Schedule Interview

```
POST /api/recruiter/candidates/{id}/schedule-interview
```

**Request Body:**

```json
{
  "interviewType": "Technical Interview",
  "scheduledAt": "2026-02-25T14:00:00Z"
}
```

**Response:** `200 OK`

**Expected Backend Behavior:**

* Create an interview record
* Send a notification email to the candidate
* Update candidate status to `"Interview Scheduled"`

---

## 3. Reject Candidate

```
POST /api/recruiter/candidates/{id}/reject
```

**Request Body:**

```json
{
  "reason": "Skill mismatch",
  "notes": "Optional internal feedback"
}
```

**Response:** `200 OK`

**Expected Backend Behavior:**

* Update candidate status to `"Rejected"`
* Store the rejection reason
* Optionally notify the candidate

---

## 4. Schedule Call *(Optional but Recommended)*

```
POST /api/recruiter/candidates/{id}/schedule-call
```

**Request Body:**

```json
{
  "scheduledAt": "2026-02-23T12:00:00Z",
  "notes": "Intro call"
}
```

---

## 5. Send Assessment *(Future-Ready)*

```
POST /api/recruiter/candidates/{id}/send-assessment
```

**Request Body:**

```json
{
  "assessmentId": "frontend-react-test"
}
```

---

# My Job Posts

## Overview

The **My Job Posts** page allows the recruiter to view, create, update, and delete their job listings.

> The Frontend currently performs local state CRUD. Production requires real API integration.

---

## Authorization

All endpoints require:

```
Authorization: Bearer <token>
```

---

## 1. Get My Jobs

**Purpose:** Retrieve all job posts created by the authenticated recruiter.

```
GET /api/recruiter/jobs
```

**Response:**

```json
[
  {
    "id": 1,
    "title": "Senior Software Engineer",
    "company": "TechCorp Inc.",
    "location": "Remote",
    "salary": "$120k - $180k",
    "type": "Full-time",
    "status": "Actively Hiring",
    "description": "Job description...",
    "skills": ["React", "Node.js", "TypeScript"],
    "responsibilities": ["Design scalable web apps"],
    "requirements": ["5+ years experience"],
    "createdAt": "2026-02-20T10:00:00Z"
  }
]
```

---

## 2. Create Job

```
POST /api/recruiter/jobs
```

**Request Body:**

```json
{
  "title": "Senior Software Engineer",
  "company": "TechCorp Inc.",
  "location": "Remote",
  "salary": "$120k - $180k",
  "type": "Full-time",
  "status": "Actively Hiring",
  "description": "Job description...",
  "skills": ["React", "Node.js"],
  "responsibilities": ["Design scalable web apps"],
  "requirements": ["5+ years experience"]
}
```

**Response:**

```json
{
  "id": 15,
  "message": "Job created successfully"
}
```

---

## 3. Update Job

```
PUT /api/recruiter/jobs/{jobId}
```

**Request Body:** Same schema as Create Job.

**Expected Backend Behavior:**

* Only the owning recruiter may update the record
* Preserve the original job `id`
* Update timestamps accordingly

**Response:**

```json
{
  "message": "Job updated successfully"
}
```

---

## 4. Delete Job

```
DELETE /api/recruiter/jobs/{jobId}
```

**Expected Backend Behavior:**

* Soft delete is recommended
* Only the owning recruiter may delete the record

**Response:**

```json
{
  "message": "Job deleted successfully"
}
```

---

## 5. Get Job Details

Used when the recruiter clicks the **View Details** button.

Frontend navigates to:

```ts
navigate(`/jobs/${job.id}`)
```

```
GET /api/jobs/{jobId}
```

> This endpoint may be public or recruiter-scoped, depending on system design.

**Response:**

```json
{
  "id": 1,
  "title": "Senior Software Engineer",
  "company": "TechCorp Inc.",
  "location": "Remote",
  "salary": "$120k - $180k",
  "type": "Full-time",
  "status": "Actively Hiring",
  "description": "Full job description...",
  "skills": ["React", "Node.js"],
  "responsibilities": ["Design scalable web apps"],
  "requirements": ["5+ years experience"],
  "createdAt": "2026-02-20T10:00:00Z"
}
```

**Job Status Enum — Required:**

```ts
type JobStatus =
  | "Actively Hiring"
  | "Paused"
  | "Closed"
  | "Draft";
```

> Must match the Frontend exactly.

---

# Recruiter Profile

## Overview

The **Recruiter Profile** page allows the authenticated recruiter to:

* View and edit their profile information
* View hiring statistics (jobs posted, interviews, hires, etc.)
* Access AI-based insights
* Manage notification preferences

> The Frontend currently renders local state. Production requires real API integration.

---

## Authorization

All endpoints require:

```
Authorization: Bearer <token>
```

---

## 1. Get Recruiter Profile

**Purpose:** Retrieve the authenticated recruiter's profile, statistics, and specializations.

```
GET /api/recruiter/profile
```

**Response:**

```json
{
  "id": 1,
  "name": "Sarah Chen",
  "title": "Senior Technical Recruiter",
  "company": "TechCorp Inc.",
  "email": "sarah.chen@techcorp.com",
  "phone": "+1 (555) 123-4567",
  "location": "San Francisco, CA",
  "joined": "March 2022",
  "bio": "Experienced recruiter specializing in AI, backend engineering, and scalable systems hiring.",
  "stats": {
    "totalJobs": 24,
    "activeJobs": 6,
    "candidatesReviewed": 312,
    "interviews": 58,
    "hires": 18
  },
  "specializations": [
    "Frontend Engineers",
    "Backend Engineers",
    "AI/ML Engineers",
    "DevOps"
  ],
  "notifications": {
    "emailOnApply": true,
    "weeklyReport": false
  }
}
```

---

## 2. Update Recruiter Profile

```
PUT /api/recruiter/profile
```

**Request Body:**

```json
{
  "name": "Sarah Chen",
  "title": "Senior Technical Recruiter",
  "company": "TechCorp Inc.",
  "email": "sarah.chen@techcorp.com",
  "phone": "+1 (555) 123-4567",
  "location": "San Francisco, CA",
  "bio": "Updated bio here...",
  "specializations": ["Frontend Engineers", "AI/ML Engineers"],
  "notifications": {
    "emailOnApply": true,
    "weeklyReport": true
  }
}
```

**Response:**

```json
{
  "message": "Profile updated successfully"
}
```

---

## 3. Get AI Insight

**Purpose:** Retrieve AI-generated insights such as hiring performance and average time-to-hire.

```
GET /api/recruiter/ai-insight
```

**Response:**

```json
{
  "averageHiringTimeImprovement": "15%",
  "topHiredRoles": ["Backend Engineers"],
  "recommendations": "Focus on sourcing more frontend engineers"
}
```

---

# 🔐 Authentication API Contract

Base URL:

```
/api/v1/auth
```

---

# 1️⃣ Login API

## Endpoint

```
POST /api/v1/auth/login
```

## Description

Authenticate user based on email, password, and role.

---

## Request Body

```json
{
  "email": "string",
  "password": "string",
  "role": "applicant | recruiter | hr",
  "rememberMe": "boolean"
}
```

---

## Fields Definition

| Field      | Type    | Required | Nullable | Notes                                   |
| ---------- | ------- | -------- | -------- | --------------------------------------- |
| email      | string  | ✅ Yes   | ❌ No    | Must be valid email format              |
| password   | string  | ✅ Yes   | ❌ No    | Min 6 characters                        |
| role       | string  | ✅ Yes   | ❌ No    | Enum:`applicant`,`recruiter`,`hr` |
| rememberMe | boolean | ❌ No    | ❌ No    | Default: false                          |

---

## Success Response (200)

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "jwt-token",
    "refreshToken": "refresh-token",
    "user": {
      "id": "uuid",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "applicant"
    }
  }
}
```

---

## Error Responses

### 401 – Invalid Credentials

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

---

# 2️⃣ Register (Sign Up) API

## Endpoint

```
POST /api/v1/auth/register
```

## Description

Create a new user account based on selected role.

---

## Request Body

```json
{
  "fullName": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string",
  "phone": "string",
  "role": "applicant | recruiter | hr",
  "jobTitle": "string",
  "location": "string",
  "linkedinUrl": "string",
  "companyName": "string"
}
```

---

# 🧠 Field Rules (Important)

## ✅ Required For ALL Roles

| Field           | Type   | Required | Nullable | Notes                      |
| --------------- | ------ | -------- | -------- | -------------------------- |
| fullName        | string | ✅ Yes   | ❌ No    | Min 3 characters           |
| email           | string | ✅ Yes   | ❌ No    | Unique, valid format       |
| password        | string | ✅ Yes   | ❌ No    | Min 6 characters           |
| confirmPassword | string | ✅ Yes   | ❌ No    | Must match password        |
| phone           | string | ✅ Yes   | ❌ No    | Valid phone format         |
| role            | enum   | ✅ Yes   | ❌ No    | applicant / recruiter / hr |
| jobTitle        | string | ✅ Yes   | ❌ No    | Required for all roles     |
| location        | string | ✅ Yes   | ❌ No    | Required for all roles     |

---

## 🟢 Required Only For Applicant

| Field       | Required | Nullable |
| ----------- | -------- | -------- |
| linkedinUrl | ❌ No    | ✅ Yes   |

* Optional
* Can be null
* If provided → must be valid URL

---

## 🟣 Required For Recruiter & HR

| Field       | Required | Nullable |
| ----------- | -------- | -------- |
| companyName | ✅ Yes   | ❌ No    |

---

# 🔍 Validation Logic

### Password Rules

* Minimum 6 characters
* Must match confirmPassword

### Email Rules

* Must be unique in database

### Role-Based Validation

Pseudo logic:

```ts
if (role === "applicant") {
  companyName = null
}

if (role === "recruiter" || role === "hr") {
  linkedinUrl = null
  companyName is required
}
```

---

# ✅ Success Response (201)

```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "id": "uuid",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "applicant"
  }
}
```

---

# ❌ Possible Error Responses

### 400 – Validation Error

```json
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "email": "Email already exists",
    "password": "Password must be at least 6 characters"
  }
}
```

---

# 🧩 Database Nullable Summary

### In Database Schema

| Field       | Nullable                                         |
| ----------- | ------------------------------------------------ |
| linkedinUrl | ✅ Yes                                           |
| companyName | ✅ Yes (but required for recruiter/hr logically) |
| phone       | ❌ No                                            |
| jobTitle    | ❌ No                                            |
| location    | ❌ No                                            |

---

# 🎯 Clean Professional Version Summary

### Required Always

* fullName
* email
* password
* confirmPassword
* phone
* role
* jobTitle
* location

### Required Only For Recruiter/HR

* companyName

### Optional

* linkedinUrl (Applicant only)
