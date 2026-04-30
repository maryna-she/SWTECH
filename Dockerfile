FROM eclipse-temurin:21-jre
COPY target/*.jar /opt/app/app.jar
ENTRYPOINT ["java", "-jar", "/opt/app/app.jar"]