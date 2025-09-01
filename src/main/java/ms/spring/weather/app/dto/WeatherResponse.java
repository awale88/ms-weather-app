package ms.spring.weather.app.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class WeatherResponse {
    private Coord coord;
    private List<Weather> weather;
    private Main main;
    private Wind wind;
    private System sys;
    private Integer id;
    private Integer timezone;
    private String name;
    private Integer cod;

    @Data
    public static class Coord{
        private Double lon;
        private Double lat;
    }

    @Data
    public static class Weather{
        private String main;
        private String description;
        private String icon;
    }

    @Data
    public static class Main{
        private Double temp;
        @JsonProperty("feels_like")
        private Double feelsLike;
        private Integer pressure;
        private Integer humidity;
        @JsonProperty("sea_level")
        private Integer seaLevel;
    }

    @Data
    public static class Wind{
        private Double speed;
    }

    @Data
    public static class System{
        private Integer type;
        private Integer id;
        private String country;
        private Long sunrise;
        private Long sunset;
    }
}
