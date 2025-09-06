package ms.spring.weather.app.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import ms.spring.weather.app.dto.ApiResponse;
import ms.spring.weather.app.dto.WeatherResponse;
import ms.spring.weather.app.service.WeatherService;

@RestController
@RequestMapping("/api/weather")
@RequiredArgsConstructor
public class WeatherController {

    private final WeatherService weatherService;

    @GetMapping("/city/{cityName}")
    public ResponseEntity<ApiResponse<WeatherResponse>> getWeatherByCity(@PathVariable String cityName) {
        try {
            WeatherResponse weather = weatherService.getWeatherByCity(cityName);
            return ResponseEntity.ok(ApiResponse.success(weather));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(
                            "Could not find wether for city: " + cityName + e.getMessage()
                    ));
        }
    }

    @GetMapping("/location")
    public ResponseEntity<ApiResponse<WeatherResponse>> getWeatherForCurrentLocation(HttpServletRequest request) {
        try {
            Map<String, Object> locationInfo = weatherService.getLocationByIp();
            String city = (String) locationInfo.get("city");
            Double latitude = (Double) locationInfo.get("latitude");
            Double longitude = (Double) locationInfo.get("longitude");

            WeatherResponse weather = weatherService.getWeatherByCoords(latitude, longitude);
            weather.setName(city);
            return ResponseEntity.ok(ApiResponse.success(weather));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Could not determine your location or fetch weather." + e.getMessage()));
        }
    }

    @GetMapping("/coordinates")
    public ResponseEntity<ApiResponse<WeatherResponse>> getWeatherByCoordinates(
            @RequestParam Double lat,
            @RequestParam Double lon) {
        try {
            WeatherResponse weather = weatherService.getWeatherByCoords(lat, lon);
            return ResponseEntity.ok(ApiResponse.success(weather));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Could not find weather for the provided coordinates. " + e.getMessage()));
        }
    }
}
