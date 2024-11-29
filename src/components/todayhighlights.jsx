import React from 'react';
import AirIcon from "@mui/icons-material/Air";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import HighlightBox from "../../src/components/Highlightbox";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CompressIcon from '@mui/icons-material/Compress';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import './TodayHighlights.css'; // Import the new CSS file

const TodayHighlights = ({ weatherData, airQualityData }) => {
  const { main, wind, visibility, sys } = weatherData;
  const airQualityIndex = airQualityData?.main?.aqi;
  const { co, no, no2, o3 } = airQualityData?.components || {};

  const renderAirQualityDescription = (aqi) => {
    switch (aqi) {
      case 1:
        return "Good";
      case 2:
        return "Fair";
      case 3:
        return "Moderate";
      case 4:
        return "Poor";
      case 5:
        return "Very Poor";
      default:
        return "Unknown";
    }
  };

  const highlights = [
    { title: "Humidity", value: `${main.humidity}%`, Icon: InvertColorsIcon },
    { title: "Pressure", value: `${main.pressure} hPa`, Icon: CompressIcon },
    { title: "Visibility", value: `${visibility / 1000} km`, Icon: VisibilityIcon },
    { title: "Feels Like", value: `${main.feels_like}°C`, Icon: DeviceThermostatIcon },
  ];

  return (
    <div className="today-highlights-container">
      <div className="highlight-header">Today's Highlights</div>
      <div className="highlight-sections">
        <div className="air-quality-section">
          <div className="air-quality-header">
            <p>Air Quality Index</p>
            <div className="air-quality-label">
              {renderAirQualityDescription(airQualityIndex)}
            </div>
          </div>
          <div>
            <AirIcon style={{ fontSize: "35px" }} />
            <div className="pollutant-grid">
              <div>
                <p style={{ fontWeight: "bold" }}>CO</p>
                <p>{co} µg/m³</p>
              </div>
              <div>
                <p style={{ fontWeight: "bold" }}>NO</p>
                <p>{no} µg/m³</p>
              </div>
              <div>
                <p style={{ fontWeight: "bold" }}>NO₂</p>
                <p>{no2} µg/m³</p>
              </div>
              <div>
                <p style={{ fontWeight: "bold" }}>O₃</p>
                <p>{o3} µg/m³</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sunrise-sunset-section">
          <div style={{ fontSize: "22px" }}>
            <p>Sunrise And Sunset</p>
            <div className="sunrise-sunset-icons">
              <div>
                <WbSunnyIcon style={{ fontSize: "40px", marginLeft: '30px' }} />
                <p className="sunrise-sunset-time">{new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
              </div>
              <div>
                <NightsStayIcon style={{ fontSize: "40px", marginRight: '35px' }} />
                <p className="sunrise-sunset-time">{new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="highlight-boxes">
        {highlights.map((highlight, index) => (
          <HighlightBox key={index} title={highlight.title} value={highlight.value} Icon={highlight.Icon} />
        ))}
      </div>
    </div>
  );
};

export default TodayHighlights;
