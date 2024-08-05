FROM node:20-alpine

WORKDIR /loadmatch_panel_server
COPY package*.json ./
RUN npm install
COPY . .
# Ensure the exposed port matches the one used in docker-compose.yml
EXPOSE 8088 

CMD ["npm", "run", "start"]