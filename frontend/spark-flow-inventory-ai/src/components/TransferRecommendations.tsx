// components/TransferRecommendations.tsx

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Package, AlertTriangle, TrendingUp, Zap, MapPin, IndianRupee } from 'lucide-react';

interface TransferRecommendation {
  SKU: string;
  From: string;
  To: string;
  Quantity: number;
  Transport_Cost: number;
  Reason: string;
  Estimated_Savings: number;
  Avoided_Loss: number;
  Net_Saving: number;
}

interface TransferRecommendationsProps {
  transferData: TransferRecommendation[];
}



const getPriority = (reason: string) => {
  if (reason.includes('Overstock')) return 'High';
  if (reason.includes('Trend') || reason.includes('Demand')) return 'Medium';
  return 'Low';
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Low':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getReasonIcon = (reason: string) => {
  if (reason.includes('Overstock')) return <Package className="h-4 w-4 text-blue-600" />;
  if (reason.includes('Trend')) return <TrendingUp className="h-4 w-4 text-green-600" />;
  if (reason.includes('Demand')) return <Zap className="h-4 w-4 text-orange-600" />;
  return <AlertTriangle className="h-4 w-4 text-purple-600" />;
};



const TransferRecommendations = ({ transferData }: TransferRecommendationsProps) => {
  const [totalSavings, setTotalSavings] = useState<number>(0);

  useEffect(() => {
    const total = transferData.reduce((sum, t) => sum + (t.Estimated_Savings || 0), 0);
    setTotalSavings(total);
  }, [transferData]);

  console.log('Transfer Data:', transferData) ;

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ArrowRight className="h-5 w-5 text-green-600" />
            <CardTitle className="text-xl font-bold text-gray-900">
              Transfer Recommendations
            </CardTitle>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {transferData.length} Active
          </Badge>
        </div>
        <p className="text-gray-600 mt-2 flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-blue-500" />
          <span>AI-generated recommendations to optimize inventory distribution across India</span>
        </p>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {transferData.map((transfer, index) => {
            const priority = getPriority(transfer.Reason);
            return (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 bg-gradient-to-r from-white to-gray-50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 flex items-center space-x-2">
                      <Package className="h-4 w-4 text-blue-600" />
                      <span>{transfer.SKU}</span>
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      {getReasonIcon(transfer.Reason)}
                      <span>{transfer.Reason}</span>
                    </div>
                  </div>
                  <Badge className={`${getPriorityColor(priority)} font-medium`}>
                    {priority}
                  </Badge>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{transfer.From}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{transfer.To}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 flex items-center space-x-1">
                      <Package className="h-3 w-3" />
                      <span>Quantity to Transfer:</span>
                    </span>
                    <div className="font-bold text-gray-900 text-lg">
                      {(transfer.Quantity ?? 0).toLocaleString()} units
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 flex items-center space-x-1">
                      <IndianRupee className="h-3 w-3" />
                      <span>Estimated Savings:</span>
                    </span>
                    <div className="font-bold text-green-600 text-lg">
                      ₹{transfer.Estimated_Savings?.toLocaleString() ?? 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span>Total Estimated Savings</span>
              </h4>
              <p className="text-sm text-gray-600">All recommended transfers</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600 flex items-center">
                <IndianRupee className="h-5 w-5" />
                <span>{totalSavings.toLocaleString()}</span>
              </div>
              <div className="text-sm text-gray-600">Potential savings</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransferRecommendations;
