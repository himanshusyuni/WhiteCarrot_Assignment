# Google OAuth Integration with React

This project demonstrates how to integrate Google OAuth into a React application using the `@react-oauth/google` package. The setup includes retrieving calendar events via Google Calendar API and securing sensitive information like the client ID.

---

## Setup Instructions

### Prerequisites

- Node.js installed on your system.
- A Google Cloud Platform (GCP) project with OAuth 2.0 credentials set up.
  - Ensure the credentials have the following scope:
    ```
    https://www.googleapis.com/auth/calendar.readonly
    ```

### Clone the Repository

```bash
git clone https://github.com/himanshusyuni/WhiteCarrot_Assignment
cd WhiteCarrot_Assignment/googleCalendar
```

### Install Dependencies

```bash
npm install
```

### Create a Google OAuth Client ID

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Navigate to **APIs & Services > Credentials**.
3. Click **Create Credentials** and select **OAuth 2.0 Client IDs**.
4. Configure the consent screen and generate the credentials.
5. Copy the **Client ID**.

### Configure Environment Variables

1. Create a `.env` file in the root directory of the project:

   ```bash
   touch .env
   ```

2. Add the following line to the `.env` file:

   ```
   VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
   ```

   Replace `YOUR_GOOGLE_CLIENT_ID` with the actual Client ID.

3. Ensure `.env` is included in `.gitignore` to prevent it from being committed:
   ```
   .env
   ```

### Start the Development Server

```bash
npm run dev
```

---

## Features

- Secure OAuth 2.0 integration with Google.
- Display Google Calendar events in a table.
- Filter events by date.
- Responsive design using Tailwind CSS.

---

## Run the Application

```bash
npm run dev
```

---

