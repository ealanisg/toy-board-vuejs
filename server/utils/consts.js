'use strict'

const configs = {
  TOKEN_EXP_SECONDS: process.env.TOKEN_EXP_SECONDS || "1d",
  AUTH_SECRET: process.env.AUTH_SECRET
}

/* istanbul ignore next */
const getEndpoint = () => {
  if (process.env.AWS_EXECUTION_ENV) {
    return undefined;
  } else if (process.env.DYNAMODB_ENDPOINT) {
    return `http://${process.env.DYNAMODB_ENDPOINT}`;
  } else {
    return "http://localhost:4000";
  }
};
/* istanbul ignore next */
const getRegion = () => {
  if (process.env.AWS_EXECUTION_ENV) {
    return undefined;
  } else if (process.env.AWS_REGION) {
    return process.env.AWS_REGION;
  } else if (process.env.AWS_DEFAULT_REGION) {
    return process.env.AWS_DEFAULT_REGION;
  } else {
    return "localhost";
  }
};

const getTableName = (tableName) => {
  if (process.env[tableName]) {
    return process.env[tableName];
  } else {
    return 'toyProject-board-local';
  }
}

module.exports = {
  getEndpoint,
  getRegion,
  getTableName,
  configs
}