# Use an official OpenJDK runtime as a parent image
FROM maven:3.9.9-amazoncorretto-21 AS build
# Copy the project files into the container

# Set the working directory
WORKDIR /home/okkid-a/Documents/Archivos/GraFiles/MiGraFilesAPI
COPY . .
# Compile the project
RUN mvn clean package

FROM tomcat:10.1.12-jdk21-openjdk
COPY --from=build /home/okkid-a/Documents/Archivos/GraFiles/MiGraFilesAPI/target/MiGraFilesAPI-1.0-SNAPSHOT.war /usr/local/tomcat/webapps/
# Expose the port the web server is running on
EXPOSE 8080

# Run the application
CMD ["catalina.sh", "run"]

