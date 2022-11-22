let env = {
  WEB_HOST: "hostname||ip",
  WEB_PORT: "3002",

  DB_PROT: "mongodb+srv://",
  DB_USER: "username:",
  DB_PASS: "password",
  DB_HOST: "@hostname||ip",
  DB_ARGS: "?retryWrites=true&w=majority",
  DB_NAME: "databasename"
}

module.exports = env;
