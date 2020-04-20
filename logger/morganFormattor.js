const morgan = require("morgan");

let APPLICATION_NAME = "";
// morgan token to initialize correlation id
morgan.token("correlationId", req => {
  let correlationId = req.headers["x-correlation-id"];
  if (!correlationId) {
    correlationId = req.x_correlation_id;
  }
  return correlationId;
});

morgan.token("appName", () => APPLICATION_NAME);

/**
 * cherrywork Format
 */
const MORGAN_FORMAT = `correlationId: :correlationId, appName: :appName, remote_addr: :remote-addr, remote_user: :remote-user, date: :date[clf], method: :method, url: :url, http_version: :http-version, status: :status, result_length: :res[content-length], referrer: :referrer, user_agent: :user-agent, response_time: :response-time ms`;
morgan.format("mssql-node", MORGAN_FORMAT);

module.exports = function(applicationName) {
  APPLICATION_NAME = applicationName;
  return "mssql-node";
};
