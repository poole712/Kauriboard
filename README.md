# KauriBoard
https://kauriboard.vercel.app/

**Project Description:** KauriBoard is a project planning tool. KauriBoard fulfills all project teams needs by offering them a place for planning and collaboration with live updates and interactions. 

**Features:**
- Real‑time task updates using SignalR
- Drag‑and‑drop task management
- Google OAuth + JWT authentication
- Multi‑project support
- Invite system with email verification (Resend)
- Live collaboration between multiple users
- Responsive UI built with Tailwind
- Persistent storage using PostgreSQL (Supabase)
- Deployed frontend + backend on Vercel/Render

**Stack:**
- Frontend:
  - React (Vite)
  - Typescript
  - React Query
  - React Router
  - Bootstrap

- Backend:
  - .NET 8 Web API
  - Entity Framework Core
  - PostgresSQL (Supabase)
  - JWT authentication
  - SignalR
 
- Infrastructure
  - Render (Backend)
  - Vercel (Frontend)
  - Supbase (Postgres Database)
    
   (functioning but not in use (throttled))
  - Azure App Service (API) 
  - Azure SQL
 
**Using the app:**
1. Go to link (https://kauriboard.vercel.app/)
2. Login with Google or App (JWT authentication).
3. Create a project, click manage on it.
4. Create tasks and drag them into appropriate status box.

**Running Locally:**<br>
<table>
  <th>Backend </th>
<th>Frontend</th>
  <tr>
    <td>

- cd backend
- dotnet restore
- dotnet ef database update
- dotnet run

    </td>
    <td>

- cd frontend
- npm install
- npm run dev

    </td>
  </tr>
</table>

**Environment Variables**
Backend
- JWT_KEY
- JWT_ISSUER
- JWT_AUDIENCE
- CONNECTION_STRING
- RESEND_API_KEY
  
Frontend
- VITE_API_URL
- VITE_GOOGLE_CLIENT_ID

**Contact:**
fpoole666@gmail.com

**Roadmap:** 
March: Deploy KauriBoard version 1.0.

