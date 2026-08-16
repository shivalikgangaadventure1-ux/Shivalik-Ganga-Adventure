import { Droplets, Sun, Sunrise, Sunset, Thermometer, Wind } from "lucide-react";
import { COMPANY } from "@/constants/config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface WeatherData {
  temperature: number;
  precipitationProbability: number;
  windSpeed: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
}

async function getWeather(): Promise<WeatherData | null> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${COMPANY.geo.latitude}&longitude=${COMPANY.geo.longitude}&current=temperature_2m,precipitation_probability,wind_speed_10m,uv_index&daily=sunrise,sunset&timezone=Asia%2FKolkata`;
    const res = await fetch(url, { next: { revalidate: 1800 } });
    if (!res.ok) return null;

    const data = await res.json();
    return {
      temperature: Math.round(data.current.temperature_2m),
      precipitationProbability: data.current.precipitation_probability,
      windSpeed: Math.round(data.current.wind_speed_10m),
      uvIndex: Math.round(data.current.uv_index),
      sunrise: data.daily.sunrise[0],
      sunset: data.daily.sunset[0],
    };
  } catch {
    return null;
  }
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
}

function bestTimeToRaft(uvIndex: number, precipitationProbability: number) {
  if (precipitationProbability >= 60) return "Check conditions before heading out today";
  if (uvIndex >= 8) return "Early morning or late afternoon, to avoid peak sun";
  return "Any time today looks good for rafting";
}

export async function WeatherWidget() {
  const weather = await getWeather();

  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Right Now in Rishikesh" title="Today's River Weather" />

        <div className="mx-auto min-h-[180px] max-w-4xl rounded-2xl border border-border bg-light p-6 sm:p-8">
          {weather ? (
            <>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-5">
                <div className="flex flex-col items-center gap-2 text-center">
                  <Thermometer size={22} className="text-primary" aria-hidden="true" />
                  <span className="font-heading text-xl font-bold text-heading">{weather.temperature}°C</span>
                  <span className="text-xs text-muted">Temperature</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <Droplets size={22} className="text-primary" aria-hidden="true" />
                  <span className="font-heading text-xl font-bold text-heading">
                    {weather.precipitationProbability}%
                  </span>
                  <span className="text-xs text-muted">Rain Chance</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <Wind size={22} className="text-primary" aria-hidden="true" />
                  <span className="font-heading text-xl font-bold text-heading">{weather.windSpeed} km/h</span>
                  <span className="text-xs text-muted">Wind Speed</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <Sun size={22} className="text-primary" aria-hidden="true" />
                  <span className="font-heading text-xl font-bold text-heading">{weather.uvIndex}</span>
                  <span className="text-xs text-muted">UV Index</span>
                </div>
                <div className="col-span-2 flex items-center justify-center gap-4 sm:col-span-1 sm:flex-col sm:gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-muted">
                    <Sunrise size={16} className="text-primary" aria-hidden="true" />
                    {formatTime(weather.sunrise)}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted">
                    <Sunset size={16} className="text-primary" aria-hidden="true" />
                    {formatTime(weather.sunset)}
                  </div>
                </div>
              </div>
              <p className="mt-6 text-center text-sm font-semibold text-heading">
                Best time to raft today: {bestTimeToRaft(weather.uvIndex, weather.precipitationProbability)}
              </p>
            </>
          ) : (
            <p className="flex h-full items-center justify-center text-center text-sm text-muted">
              Live weather is temporarily unavailable. Check back soon, or ask us directly.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
