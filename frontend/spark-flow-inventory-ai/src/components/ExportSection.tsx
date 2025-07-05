import { Button } from '@/components/ui/button';
import { Download, FileText, TrendingUp, ArrowRightLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type ExportSectionProps = {
  forecastData: {
    Zone: string;
    SKU: string;
    Current_Stock: number;
    Forecast_Quantity: number;
  }[];
  transferData: {
    SKU: string;
    From: string;
    To: string;
    Quantity: number;
    Reason: string;
    Priority?: string;
    Net_Saving: number;
  }[];
};

const ExportSection = ({ forecastData, transferData }: ExportSectionProps) => {
  const { toast } = useToast();

  const exportAsCSV = (data: string[][], filename: string) => {
    const csvContent = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: `${filename} has been downloaded as CSV.`,
    });
  };

  const exportForecastData = () => {
    const csvData = [
      ['Zone', 'SKU', 'Current Stock', 'Forecasted Demand', 'Variance'],
      ...forecastData.map(item => [
        item.Zone,
        item.SKU,
        item.Current_Stock.toString(),
        item.Forecast_Quantity.toString(),
        (item.Forecast_Quantity - item.Current_Stock).toString(),
      ])
    ];

    exportAsCSV(csvData, 'demand_forecast_india.csv');
  };

  const exportTransferData = () => {
    const csvData = [
      ['SKU', 'From Zone', 'To Zone', 'Quantity', 'Reason', 'Priority', 'Net Savings (INR)'],
      ...transferData.map(item => [
        item.SKU,
        item.From,
        item.To,
        item.Quantity.toString(),
        item.Reason,
        item.Priority || 'Medium',
        `₹${item.Net_Saving.toFixed(2)}`
      ])
    ];

    exportAsCSV(csvData, 'transfer_recommendations_india.csv');
  };

  return (
    <div className="flex space-x-3">
      <Button
        onClick={exportForecastData}
        variant="outline"
        className="flex items-center space-x-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
      >
        <TrendingUp className="h-4 w-4" />
        <Download className="h-4 w-4" />
        <span>Forecast CSV</span>
      </Button>
      <Button
        onClick={exportTransferData}
        variant="outline"
        className="flex items-center space-x-2 hover:bg-green-50 hover:border-green-300 transition-colors"
      >
        <ArrowRightLeft className="h-4 w-4" />
        <FileText className="h-4 w-4" />
        <span>Transfers CSV</span>
      </Button>
    </div>
  );
};

export default ExportSection;
