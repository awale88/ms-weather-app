package ms.spring.weather.app.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ms.spring.weather.app.config.WeatherAppConfig;
import ms.spring.weather.app.dto.WeatherResponse;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class WeatherService {

    private final RestTemplate restTemplate;
    private final WeatherAppConfig weatherAppConfig;

    @Cacheable(value = "weather", key = "#city")
    public WeatherResponse getWeatherByCity(String city) {
        log.info("Fetching weather from API for city: {}", city);
        String url = UriComponentsBuilder.fromHttpUrl(weatherAppConfig.getUrl() + "/weather")
                .queryParam("q", city)
                .queryParam("appid", weatherAppConfig.getKey())
                .queryParam("units", "metric")
                .toUriString();
        return restTemplate.getForObject(url, WeatherResponse.class);
    }

    public Map<String, Object> getLocationByIp() {
        String url = weatherAppConfig.getIpLookupUrl();
        return restTemplate.getForObject(url, HashMap.class);
    }

    @Cacheable(value = "weather", key = "#lat + '_' + #lon")
    public WeatherResponse getWeatherByCoords(Double lat, Double lon) {
        log.info("Fetching weather from API for coords: {}, {}", lat, lon);
        String url = UriComponentsBuilder.fromHttpUrl(weatherAppConfig.getUrl() + "/weather")
                .queryParam("lat", lat)
                .queryParam("lon", lon)
                .queryParam("appid", weatherAppConfig.getKey())
                .queryParam("units", "metrics")
                .toUriString();
        return restTemplate.getForObject(url, WeatherResponse.class);
    }
}
