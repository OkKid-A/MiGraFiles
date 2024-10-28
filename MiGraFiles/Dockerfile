# Use a Node.js base image
FROM node:20 AS build

# Set the working directory in the container
WORKDIR /usr/local/app

# Copy the package.json and install dependencies
COPY ./ /usr/local/app/
RUN npm install
RUN npm run build
# Copy the built Angular files from the dist folder

FROM nginx:latest
WORKDIR /usr/local/apache2/htdocs
COPY --from=build /usr/local/app/dist/mi-gra-files/browser /usr/share/nginx/html
EXPOSE 80


