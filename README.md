# ATS RAG Frontend

This is the React frontend for the ATS RAG application, built using Vite and Tailwind CSS.

## Prerequisites

- Node.js (version 20 or higher recommended)
- Backend server running (optional if you just want to test the UI)

---

## Local Development (Vite Server)

For local development, the application runs on the Vite development server with Hot Module Replacement (HMR).

1. Install the required Node dependencies:
```bash
   npm install
```

2. Start the local Vite development server:
```bash
   npm run dev
```

3. To build the project locally for production preview, run:
```bash
   npm run build
```

---

## High Level Architecture

### 1. State Management
The core application flow is orchestrated by a central component that transitions the user through three distinct UI states: `UPLOAD`, `PROCESSING`, and `RESULTS`.

### 2. Data Collection (Upload State)
- The upload interface collects the user's resume via drag-and-drop or file selection and verifies it is a valid PDF.
- Users configure specific search preferences using dropdowns and text inputs for location, job type, workplace type, experience level, and posting date.
- Once submitted, these inputs are bundled and passed forward to trigger the backend scanning process.

### 3. Asynchronous Polling (Processing State)
- The frontend packages the PDF and search parameters into a `FormData` object and submits a POST request to `/api/resume/upload`.
- Upon receiving a `taskId` from the backend, the client initiates a network polling loop, sending a GET request to `/api/resume/status/${taskId}` every 15 seconds.
- During this waiting period, the UI cycles through an animated sequence of steps (e.g., "Parsing resume...", "Scraping live jobs...") to provide continuous visual feedback.
- Once the backend status changes from `PROCESSING` to a terminal state, the polling loop terminates and the final JSON job payload is extracted and passed to the results view.

### 4. Results Presentation (Results State)
- The results view dynamically renders a list of matched jobs based on the final payload, or a fallback message if no matches are found.
- Each job is displayed on a dedicated card detailing the job title, company name, the AI-generated reasoning for the match, and a direct application link.
- A custom SVG circular progress indicator renders the match score, dynamically applying colors based on the score threshold (green for scores over 85, orange for scores over 70, and a muted grey for the rest).
- Users can click a "Start Over" button to clear the data and reset the application to the initial upload state.

### 5. Styling and Layout
The frontend strictly uses Tailwind CSS for layout and relies on custom CSS variables to handle theming and color palettes. It leverages Lucide React for consistent iconography and modular Shadcn UI components for elements like buttons.