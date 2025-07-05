import { useEffect, useState } from 'react';
import DemandForecastSection from '@/components/DemandForecastSection';
import TransferRecommendations from '@/components/TransferRecommendations';
import ExportSection from '@/components/ExportSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Package, ArrowRightLeft, MapPin, Users, BarChart3 } from 'lucide-react';
import { fetchDemandForecast, fetchTransferRecommendations } from '@/lib/api';

const Index = () => {
  const [forecastData, setForecastData] = useState([]);
  const [transferData, setTransferData] = useState([]);

  // Fetch Demand Forecast
  useEffect(() => {
    fetchDemandForecast()
      .then((data) => {
        const formatted = data.map((d: any) => ({
          Zone: d.Zone,
          SKU: d.SKU,
          Current_Stock: d.Current_Stock || 0,
          Forecast_Quantity: d.Forecast_Quantity || 0,
        }));
        setForecastData(formatted);
      })
      .catch(console.error);
  }, []);

  // Fetch Transfer Recommendations
  useEffect(() => {
    fetchTransferRecommendations()
      .then((data) => {
        const formatted = data.map((d: any) => ({
          SKU: d.SKU,
          From: d.From,
          To: d.To,
          Quantity: d.Quantity,
          Reason: d.Reason,
          Priority: d.Priority || 'Medium',
          Net_Saving: d.Net_Saving || 0,
          Estimated_Savings: d.Estimated_Savings || 0,
        }));
        setTransferData(formatted);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Package className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
                  <span>AI Inventory Rebalancing Dashboard</span>
                  <MapPin className="h-6 w-6 text-blue-600" />
                </h1>
                <p className="text-gray-600 mt-1 flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Walmart Sparkathon 2025 - India Operations</span>
                </p>
              </div>
            </div>
            <ExportSection forecastData={forecastData} transferData={transferData} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Your cards here */}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="xl:col-span-2">
            <DemandForecastSection />
          </div>
          <div className="xl:col-span-2">
            <TransferRecommendations transferData={transferData}/>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
