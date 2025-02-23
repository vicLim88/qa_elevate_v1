# ✅ Use Microsoft's Playwright image (Includes all dependencies)
FROM mcr.microsoft.com/playwright:v1.50.1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Install Playwright browsers
RUN npx playwright install --with-deps

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Command to start the application
CMD ["npm", "run", "start"]
