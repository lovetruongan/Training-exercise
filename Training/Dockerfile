FROM maven:3.9.8-amazoncorretto-21 AS build

WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean install -DskipTests

FROM openjdk:21-jdk-slim

WORKDIR /app
COPY --from=build /app/target/Training-0.0.1-SNAPSHOT.jar ./Training.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "Training.jar"]