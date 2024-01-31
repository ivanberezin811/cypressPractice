const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://the-internet.herokuapp.com',
    projectId: process.env.PROJECT_ID,
    retries: 0
  },
});
