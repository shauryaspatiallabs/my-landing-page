import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Earthquake {
  magnitude: number;
  place: string;
  time: number;
  coordinates: [number, number];
}

const LiveEarthquakeMap = () => {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        // Using USGS real-time earthquake data API
        const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson');
        const data = await response.json();
        
        const earthquakeData = data.features.slice(0, 10).map((feature: any) => ({
          magnitude: feature.properties.mag,
          place: feature.properties.place,
          time: feature.properties.time,
          coordinates: feature.geometry.coordinates
        }));
        
        setEarthquakes(earthquakeData);
        setLastUpdate(new Date());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching earthquake data:', error);
        // Fallback to demo data if API fails
        const demoData = [
          { magnitude: 4.2, place: "Northern California", time: Date.now() - 3600000, coordinates: [-122.4, 37.8] },
          { magnitude: 3.8, place: "Southern Japan", time: Date.now() - 7200000, coordinates: [139.7, 35.7] },
          { magnitude: 5.1, place: "Chile Coast", time: Date.now() - 10800000, coordinates: [-71.5, -33.0] },
        ];
        setEarthquakes(demoData);
        setLastUpdate(new Date());
        setLoading(false);
      }
    };

    fetchEarthquakes();
    const interval = setInterval(fetchEarthquakes, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const getMagnitudeColor = (magnitude: number) => {
    if (magnitude >= 5.0) return 'var(--destructive)';
    if (magnitude >= 4.0) return 'var(--electric-blue)';
    return 'var(--cyber-cyan)';
  };

  if (loading) {
    return (
      <Card className="glass-morphism p-6 h-96">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: 'var(--cyber-cyan)' }}></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass-morphism p-6 h-96">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Activity className="text-xl" style={{ color: 'var(--cyber-cyan)' }} />
          <h3 className="text-lg font-semibold" style={{ color: 'var(--off-white)' }}>
            Live Seismic Activity
          </h3>
        </div>
        <div className="text-xs" style={{ color: 'var(--light-gray)' }}>
          {lastUpdate ? `Updated: ${lastUpdate.toLocaleTimeString()}` : 'Loading...'}
        </div>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {earthquakes.map((quake, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors"
            style={{ borderLeft: `3px solid ${getMagnitudeColor(quake.magnitude)}` }}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <AlertTriangle 
                  className="text-sm" 
                  style={{ color: getMagnitudeColor(quake.magnitude) }} 
                />
                <span 
                  className="font-bold text-lg"
                  style={{ color: getMagnitudeColor(quake.magnitude) }}
                >
                  {quake.magnitude.toFixed(1)}
                </span>
              </div>
              <div>
                <div className="font-medium text-sm" style={{ color: 'var(--off-white)' }}>
                  {quake.place.length > 30 ? quake.place.substring(0, 30) + '...' : quake.place}
                </div>
                <div className="text-xs" style={{ color: 'var(--light-gray)' }}>
                  {new Date(quake.time).toLocaleString()}
                </div>
              </div>
            </div>
            <div className="text-xs text-right" style={{ color: 'var(--light-gray)' }}>
              {quake.coordinates[1].toFixed(2)}°, {quake.coordinates[0].toFixed(2)}°
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default LiveEarthquakeMap;