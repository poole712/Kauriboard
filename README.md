# KauriBoard
**Due to free hosting infrastructure some loading may take some time.**
https://kauriboard.vercel.app/

**Project Description:** KauriBoard is a project planning tool. KauriBoard fulfills all project teams needs by offering them a place for planning and collaboration with live updates and interactions. 

**Features:**
- Real‑time task updates using SignalR
- Drag‑and‑drop task management
- Google OAuth + JWT authentication
- Multi‑project support
- Invite system with email verification (Resend)
- Live collaboration between multiple users
- Responsive UI built with Bootstrap
- Persistent storage using PostgreSQL (Supabase)
- Deployed frontend + backend on Vercel/Render

**Stack:**
<table>
  <tr>
    <th>Backend</th>
    <th>Frontend</th>
    <th>Infrastructure</th>
  </tr>
  <tr>
    <td>
      <ul>
        <li>.NET 8 Web API/li>
        <li>Entity Framework Core</li>
        <li>PostgresSQL</li>
        <li>JWT authentication</li>
        <li>SignalR</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>React (Vite)</li>
        <li>Typescript</li>
        <li>React Query</li>
        <li>React Router</li>
        <li>Bootstrap</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Render (Backend)</li>
        <li>Vercel (Frontend)</li>
        <li>Supbase (Postgres Database)</li>
        <li>Google OAuth (Login)</li>
        <li>Bootstrap</li>
      </ul>
    </td>
  </tr>
</table>
    
Azure functionality was implemented but moved to Render + Supabase because of insufficient uptimes. 
 
**Using the app:**
1. Go to link (https://kauriboard.vercel.app/)
2. Login with Google or App (JWT authentication).
3. Create a project, click manage on it.
4. Create tasks and drag them into appropriate status box.

**Running Locally:**<br>
<table>
  <tr>
    <th>Backend</th>
    <th>Frontend</th>
  </tr>
  <tr>
    <td>
      <ul>
        <li>cd backend</li>
        <li>dotnet restore</li>
        <li>dotnet ef database update</li>
        <li>dotnet run</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>cd frontend</li>
        <li>npm install</li>
        <li>npm run dev</li>
      </ul>
    </td>
  </tr>
</table>

**Environment Variables**<br>
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

