# Stage 1: Install dependencies and build the application
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Create the production image from the standalone output
FROM node:18-alpine AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
# Optionally, set a default port, Next.js uses 3000 by default
# ENV PORT=3000

# Copy the standalone output from the builder stage
COPY --from=builder /app/.next/standalone ./
# Copy the public and static assets
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
# The server.js file in the standalone output is the entry point
CMD ["node", "server.js"]
