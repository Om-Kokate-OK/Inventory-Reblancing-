import { useEffect, useState } from "react";
import { fetchDemandForecast } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, MapPin, Package, AlertCircle } from "lucide-react";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <div className="flex items-center space-x-2 mb-2">
          <MapPin className="h-4 w-4 text-blue-600" />
          <p className="font-semibold text-gray-900">{`Zone: ${label}`}</p>
        </div>
        <p className="text-blue-600 flex items-center space-x-1">
          <Package className="h-3 w-3" />
          <span>{`Current Stock: ${payload[0].value} units`}</span>
        </p>
        <p className="text-green-600 flex items-center space-x-1">
          <TrendingUp className="h-3 w-3" />
          <span>{`Forecasted Demand: ${payload[1].value} units`}</span>
        </p>
      </div>
    );
  }
  return null;
};

const DemandForecastSection = () => {
  const [demandData, setDemandData] = useState([]);

  useEffect(() => {
  fetchDemandForecast()
    .then((data) => {
      const formatted = data.map((d: any) => ({
        zone: d.Zone,
        currentStock: d.Current_Stock || 0,
        forecastedDemand: d.Forecast_Quantity,
        sku: d.SKU,
      }));
      setDemandData(formatted);
    })
    .catch(console.error);
}, []);

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-xl font-bold text-gray-900">
              Demand Forecast Analysis
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <AlertCircle className="h-4 w-4" />
            <span>Next 30 days</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={demandData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="zone" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="currentStock" fill="#3b82f6" name="Current Stock" radius={[4, 4, 0, 0]} />
              <Bar dataKey="forecastedDemand" fill="#10b981" name="Forecasted Demand" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemandForecastSection;
