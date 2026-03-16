import * as signalR from '@microsoft/signalr'

//Render Connection: https://kauriboard.onrender.com/hub/notifications
//Local Connection:  http://localhost:5017/hub/notifications

const connection = new signalR.HubConnectionBuilder().withUrl('https://kauriboard.onrender.com/hub/notifications', 
    { accessTokenFactory: () => localStorage.getItem('token') ?? ''})
    .withAutomaticReconnect()
    .build()

export async function startConnection(): Promise<void> {
  if (connection.state === signalR.HubConnectionState.Connected) {
    return;
  }

  try {
    console.log("Starting SignalR connection...");
    await connection.start();
    console.log("SignalR connected");
  } catch (err) {
    console.error("SignalR connection failed:", err);

    await new Promise(resolve => setTimeout(resolve, 2000));
    return startConnection(); // retry
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

export function onCommentPosted(method: string, callback: (...args : unknown[]) => void) {
    connection.on(method, callback)
}

export async function broadcastCommentPosted(method: string, payload: unknown) {
  if (connection.state !== signalR.HubConnectionState.Connected) {
    console.warn("SignalR not connected yet, waiting...")
    await startConnection()
  }

  return connection.invoke(method, payload)
}

export function onCommentDeleted(method: string, callback: (...args : unknown[]) => void) {
    connection.on(method, callback)
}

export async function broadcastCommentDeleted(method: string, payload: unknown) {
  if (connection.state !== signalR.HubConnectionState.Connected) {
    console.warn("SignalR not connected yet, waiting...")
    await startConnection()
  }

  return connection.invoke(method, payload)
}