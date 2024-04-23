# Use an official Node.js runtime as the base image
FROM node:20-alpine 

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json ./

# Install dependencies
RUN npm install

# # Copy the rest of the application code
COPY . .


# Expose the port that the Next.js application runs on (if needed)
EXPOSE 3000

RUN npm run build

COPY ./ ./.next

# Run the development server using `npm run dev`
CMD ["yarn","dev"]

#docker build -t frontend .
#docker run -p 3000:3000 frontend
