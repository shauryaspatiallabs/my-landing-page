import { useEffect, useRef } from "react";

const CodeRain = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const codeSnippets = [
      'import arcpy',
      'ee.Initialize()',
      'SELECT * FROM spatial_data',
      'gdf = gpd.read_file()',
      'ST_Distance(geom1, geom2)',
      'map.addLayer()',
      'projection: EPSG:4326',
      'buffer(distance=1000)',
      'intersects(geometry)',
      'geoprocessing.clip()',
      'from osgeo import gdal',
      'raster = ee.Image()',
      'geometry.within(bounds)',
      'CREATE INDEX ON spatial_table',
      'leaflet.map("map")',
    ];

    const createCodeElement = () => {
      const code = document.createElement('div');
      code.className = 'code-rain animate-code-rain';
      code.style.left = Math.random() * 100 + 'vw';
      code.style.animationDuration = (Math.random() * 10 + 10) + 's';
      code.style.animationDelay = Math.random() * 5 + 's';
      code.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      
      container.appendChild(code);
      
      setTimeout(() => {
        if (code.parentNode) {
          code.parentNode.removeChild(code);
        }
      }, 25000);
    };

    // Create initial code elements
    for (let i = 0; i < 15; i++) {
      setTimeout(createCodeElement, i * 1000);
    }

    // Continue creating elements
    const interval = setInterval(createCodeElement, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ overflow: 'hidden' }}
    />
  );
};

export default CodeRain;
