package ms.spring.weather.app.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "weather.api")
@Data
public class WeatherAppConfig {

    private String key;
    private String url;
    private String ipLookupUrl;
}
