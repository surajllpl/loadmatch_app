FROM node:20-alpine

# Set environment variables
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 5173

# Build the React application
RUN yarn build

# Set the command to run the development server by default
CMD ["yarn", "dev"]
