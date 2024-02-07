const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demowebshop.tricentis.com',
    projectId: process.env.PROJECT_ID,
    retries: 0
  },
});
