const connections = new Set();
const UsersConnections = new Map();

function sendToAllClients(message) {
  connections.forEach((ws) => {
    ws.send(message);
  });
}

function sendToClient(id,message){
  const ws = UsersConnections.get(id);
  if (ws) {
    ws.send(message);
  }
}

function addConnection(id,ws) {
  connections.add(ws);
  UsersConnections.set(id, ws);
}

function removeConnection(id,ws) {
  connections.delete(ws);
  UsersConnections.delete(id);
}

module.exports = {
  sendToAllClients,
  addConnection,
  removeConnection,
  sendToClient
};
