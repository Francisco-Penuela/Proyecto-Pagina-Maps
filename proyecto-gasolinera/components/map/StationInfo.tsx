import { Station } from "@/lib/firebaseConfig";
import { FaMapPin, FaTag, FaRoad, FaCheckCircle } from 'react-icons/fa';

interface StationInfoProps {
  station: Station | null;
  onStartRoute: () => void;
  isRouteReady: boolean;
  filter: 'nearest' | 'cheapest' | 'best_value';
  allStations: Station[];
}

const InfoBadge = ({ filter }: { filter: StationInfoProps['filter'] }) => {
  let text = '', icon = null, bgColor = '';
  switch (filter) {
    case 'best_value':
      text = 'Recomendado'; icon = <FaCheckCircle />; bgColor = 'bg-green-500'; break;
    case 'cheapest':
      text = 'El más barato'; icon = <FaTag />; bgColor = 'bg-blue-500'; break;
    case 'nearest':
      text = 'El más cercano'; icon = <FaRoad />; bgColor = 'bg-purple-500'; break;
  }
  return (
    <div className={`absolute -top-3 left-4 flex items-center gap-2 px-3 py-1 text-sm font-bold text-white ${bgColor} rounded-full shadow-lg`}>
      {icon}<span>{text}</span>
    </div>
  );
};

const StationInfo = ({ station, onStartRoute, isRouteReady, filter, allStations }: StationInfoProps) => {
  if (!station) return <div className="p-4 bg-white shadow-lg rounded-lg text-black">Selecciona una estación.</div>;

  let priceInsight = null;
  if (filter === 'cheapest' && allStations.length > 1) {
    const avgPrice = allStations.reduce((acc, s) => acc + s.price_per_liter, 0) / allStations.length;
    const difference = avgPrice - station.price_per_liter;
    if (difference > 0) {
      const percentage = (difference / avgPrice) * 100;
      priceInsight = <p className="text-xs text-green-600 font-semibold mt-1">Ahorras un {percentage.toFixed(0)}% vs el promedio</p>;
    }
  }

  return (
    <div className="relative pt-6 bg-white shadow-xl rounded-xl w-72 text-black animate-fade-in">
      <InfoBadge filter={filter} />
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-2">{station.name}</h2>
        <div className="space-y-3 text-gray-700">
          <div className="flex items-start gap-3"><FaMapPin className="text-gray-400 mt-1" size={16} /><span className="flex-1">{station.address || 'Dirección no disponible'}</span></div>
          <div className="flex items-center gap-3"><FaTag className="text-gray-400" size={16} /><span className="flex-1 font-semibold text-lg text-green-700">${station.price_per_liter.toLocaleString('es-CO', { minimumFractionDigits: 2 })} / litro</span></div>
          {priceInsight}
          {station.distance && (
            <div className="flex items-center gap-3"><FaRoad className="text-gray-400" size={16} /><span className="flex-1">{station.distance.toFixed(2)} km de distancia</span></div>
          )}
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-b-xl">
        <button onClick={onStartRoute} disabled={!isRouteReady} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md">
          {isRouteReady ? 'Iniciar Ruta' : 'Obteniendo ubicación...'}
        </button>
      </div>
    </div>
  );
};

export default StationInfo;