# Use an official JDK runtime as a parent image
FROM eclipse-temurin:21-jdk AS build

# Set working directory
WORKDIR /app

# Copy Maven wrapper & project files
COPY server/pom.xml .
COPY server/mvnw .
COPY server/.mvn .mvn

# Download dependencies (helps with caching)
RUN ./mvnw dependency:go-offline

# Copy source code
COPY server/src ./src

# Package the application
RUN ./mvnw clean package -DskipTests

# ------------------ Final Stage ------------------
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy the packaged JAR from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
