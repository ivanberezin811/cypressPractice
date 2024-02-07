FROM cypress/base:latest

COPY . .

RUN npm install
RUN npm run e2e:run:cypress:dashboard