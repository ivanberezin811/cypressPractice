FROM cypress/base:12

COPY ./cypress ./cypress
COPY ./cypress.config.js ./cypress.config.js
COPY ./package-lock.json ./package-lock.json
COPY ./package.json ./package.json
