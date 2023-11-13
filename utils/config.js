const port = process.env.PORT || 3001

// --- MongoDB config ---
const mongo_base_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;

const mongo_url = `mongodb+srv://${mongo_user}:${mongo_password}@${mongo_base_url}/neoxartdb?retryWrites=true&w=majority`

// --- neo4j config ---
// later

// jason web token secret
const jwtsecret = process.env.JWTSECRET

module.exports = {
  port,
  mongo_base_url,
  mongo_url,
  jwtsecret
}