# 🌤️ Weather Dashboard API

A robust, feature-rich Spring Boot REST API for retrieving current weather data and forecasts. This project demonstrates modern backend development practices including external API integration, caching, resilience patterns, and clean architecture.

![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.5-brightgreen.svg)
![Java](https://img.shields.io/badge/Java-17-blue.svg)
![Maven](https://img.shields.io/badge/Maven-3.6+-orange.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## ✨ Features

- **Current Weather Data** - Get real-time weather information for any city worldwide
- **Location-Based Weather** - Automatically detect user location via IP address
- **Smart Caching** - Configurable caffeine caching to reduce API calls and improve performance
- **RESTful API Design** - Clean, intuitive endpoints with consistent response format
- **Comprehensive Error Handling** - Graceful degradation and meaningful error messages
- **API Documentation** - Interactive Swagger/OpenAPI documentation
- **Resilience Patterns** - Circuit breaker implementation for fault tolerance

## 🚀 Quick Start

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- Lombok
- Github Caffeine
- Swagger Open API
- [OpenWeatherMap API Key](https://openweathermap.org/api)
- [Swagger-UI](http://localhost:8080/swagger-ui.html)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/awale88/ms-weather-app.git
cd ms-weather-app
mvn clean install
mvn spring-boot:run
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

### Contact

- LinkdedIn: 🔗https://www.linkedin.com/in/nayan-awale-933038241
- Author: awale88
