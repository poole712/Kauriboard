using Microsoft.AspNetCore.SignalR;

namespace SignalWebpack.Hubs;

public class NotificationHub : Hub
{
    public async Task TaskUpdated(object payload) =>
        await Clients.All.SendAsync("TaskUpdated", payload);

    public async Task TaskPosted(object payload) =>
        await Clients.All.SendAsync("TaskPosted", payload);  
}