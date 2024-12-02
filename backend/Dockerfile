# Usar una imagen base de OpenJDK 17
FROM openjdk:17-jdk-slim

# Copiar el archivo JAR de la aplicación
COPY target/backend-0.0.1-SNAPSHOT.jar backend.jar

# Exponer el puerto 8080 para la aplicación
EXPOSE 8080

# Ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "/backend.jar"]
