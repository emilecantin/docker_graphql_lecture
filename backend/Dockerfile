# Use an official Python runtime as a parent image
FROM node:10-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN npm install

# Make port 80 available to the world outside this container
EXPOSE 4000

# Define environment variable
# ENV NAME World

# Run app.py when the container launches
CMD ["node", "index.js"]
