import * as signalR from '@microsoft/signalr'

//Render Connection: https://kauriboard.onrender.com/hub/notifications
//Local Connection:  http://localhost:5017/hub/notifications

const connection = new signalR.HubConnectionBuilder().withUrl('https://kauriboard.onrender.com/hub/notifications', 
    { accessTokenFactory: () => localStorage.getItem('token') ?? ''})
    .withAutomaticReconnect()
    .build()

export async function startConnection(): Promise<void> {
  if (connection.state === signalR.HubConnectionState.Connected) {
    return
  }

  try {
    await connection.start()
    console.log("SignalR connected")
  } catch (err) {
    console.error("SignalR connection failed:", err)

    return new Promise(resolve => {
      setTimeout(async () => {
        await startConnection()
        resolve()
      }, 3000)
    })
  }
}

export function onTaskUpdated(method: string, callback: (...args : unknown[]) => void) {
    connection.on(method, callback)
}

export async function broadcastTaskUpdate(method: string, payload: unknown) {
  if (connection.state !== signalR.HubConnectionState.Connected) {
    console.warn("SignalR not connected yet, waiting...")
    await startConnection()
  }

  return connection.invoke(method, payload)
}

export function onTaskPosted(method: string, callback: (...args : unknown[]) => void) {
    connection.on(method, callback)
}

export async function broadcastTaskPosted(method: string, payload: unknown) {
  if (connection.state !== signalR.HubConnectionState.Connected) {
    console.warn("SignalR not connected yet, waiting...")
    await startConnection()
  }

  return connection.invoke(method, payload)
}