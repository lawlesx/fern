# 🌿 Fern — Multilingual Voice Expense Tracker

**Fern** is a voice-first financial assistant that turns natural spoken audio into structured expense logs in seconds. Speak your expenses in **English, Hindi, Bengali, Marathi, or code-switched dialects (Hinglish or other)**, and Fern will transcribe, translate, and categorize them automatically.

### 🚀 Tech Stack

- **Framework:** Next.js (App Router) + Bun
- **AI Model:** Google Gemini Flash via Vercel AI SDK
- **Database:** Turso DB (libSQL)
- **ORM:** Drizzle ORM
- **Validation:** Zod
- **Styling:** Tailwind CSS

### ✨ Key Features

- 🎙️ **Native Audio Processing:** Passes WebM audio streams directly to Gemini Flash for low-latency JSON extraction.
- 🌐 **Multilingual Support:** Handles English, Hindi, Bengali, Marathi, Hinglish, and conversational slang effortlessly.
- ⚡ **Edge DB:** Powered by Turso for instant, low-latency database read/writes in AWS AP South (Mumbai).
- 🛡️ **Type-Safe Pipeline:** End-to-end type safety from Zod extraction schemas down to Drizzle database tables.

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Bun](https://bun.sh/) (v1.0+)
- [Turso CLI](https://docs.turso.tech/cli/installation) (Optional, but recommended for database management)

---

## 🔑 Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file in the root directory.

```env
# 1. Google Gemini API Key (Required for Voice-to-JSON extraction)
# Get this from: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_api_key_here"

# 2. Turso Database Credentials (Required for data storage)
# Get this by running: turso db show --url <your-db-name>
TURSO_DATABASE_URL="libsql://your-database-name-here.turso.io"

# Get this by running: turso db tokens create <your-db-name>
TURSO_AUTH_TOKEN="your_turso_auth_token_here"
```

## 🚀 Running Locally

Follow these steps to get the project up and running on your local machine using Bun.

1. Clone the repository and install dependencies:

```bash
git clone [https://github.com/yourusername/fern.git](https://github.com/yourusername/fern.git)
cd fern
bun install
```

## 2. Set up the Database Schema:

Once your .env.local file is populated with your Turso credentials, push the Drizzle schema directly to your live database.

```bash
bun db:push
```

## 3. Start the Development Server:

```bash
bun dev
```

The application will now be running at http://localhost:3000.

🗄️ Database Management (Drizzle Studio)
You can easily view, edit, and manage your live Turso data locally using Drizzle Studio.

While your development server is running, open a new terminal tab and run:

```bash
bun db:studio
```

This will launch a local database UI at https://local.drizzle.studio.
