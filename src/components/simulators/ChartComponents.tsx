'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale
} from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale
);

// Interface para dados de custo
interface CostData {
  name: string;
  usd: number;
  brl: number;
  percentage: number;
}

// Interface para dados de timeline
interface TimelineData {
  day: number;
  cost: number;
  confidence: number;
  factors: string[];
}

// Interface para dados de comparação de modais
interface ModalComparisonData {
  modal: string;
  cost: number;
  time: number;
  carbon: number;
  reliability: number;
}

// Componente de gráfico de linha para predição de custos
interface CostPredictionChartProps {
  data: TimelineData[];
  title?: string;
  height?: number;
}

export function CostPredictionChart({ data, title = "Predição de Custos", height = 300 }: CostPredictionChartProps) {
  const chartData = {
    labels: data.map(item => `Dia ${item.day}`),
    datasets: [
      {
        label: 'Custo (USD)',
        data: data.map(item => item.cost),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y'
      },
      {
        label: 'Confiança (%)',
        data: data.map(item => item.confidence * 100),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: false,
        tension: 0.4,
        yAxisID: 'y1'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const
        }
      },
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          afterBody: function(context: any) {
            const dataIndex = context[0].dataIndex;
            const factors = data[dataIndex]?.factors || [];
            if (factors.length > 0) {
              return ['Fatores:', ...factors];
            }
            return [];
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Dias'
        }
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Custo (USD)'
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Confiança (%)'
        },
        grid: {
          drawOnChartArea: false,
        },
        min: 0,
        max: 100
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    }
  };

  return (
    <div style={{ height }}>
      <Line data={chartData} options={options} />
    </div>
  );
}

// Componente de gráfico de barras para breakdown de custos
interface CostBreakdownChartProps {
  data: CostData[];
  title?: string;
  height?: number;
}

export function CostBreakdownChart({ data, title = "Breakdown de Custos", height = 300 }: CostBreakdownChartProps) {
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: 'Custo (USD)',
        data: data.map(item => item.usd),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)'
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
          'rgb(139, 92, 246)',
          'rgb(236, 72, 153)'
        ],
        borderWidth: 2,
        borderRadius: 4,
        borderSkipped: false
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const
        }
      },
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const dataIndex = context.dataIndex;
            const item = data[dataIndex];
            return [
              `${item.name}: $${item.usd.toFixed(2)}`,
              `R$ ${item.brl.toFixed(2)}`,
              `${item.percentage.toFixed(1)}% do total`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Custo (USD)'
        }
      }
    }
  };

  return (
    <div style={{ height }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}

// Componente de gráfico de rosca para distribuição de custos
interface CostDistributionChartProps {
  data: CostData[];
  title?: string;
  height?: number;
}

export function CostDistributionChart({ data, title = "Distribuição de Custos", height = 300 }: CostDistributionChartProps) {
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.usd),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)'
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
          'rgb(139, 92, 246)',
          'rgb(236, 72, 153)'
        ],
        borderWidth: 2,
        hoverOffset: 4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const
        }
      },
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const dataIndex = context.dataIndex;
            const item = data[dataIndex];
            const total = data.reduce((sum, d) => sum + d.usd, 0);
            const percentage = ((item.usd / total) * 100).toFixed(1);
            return [
              `${item.name}: $${item.usd.toFixed(2)}`,
              `${percentage}% do total`
            ];
          }
        }
      }
    }
  };

  return (
    <div style={{ height }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
}

// Componente de gráfico radar para comparação de modais
interface ModalComparisonChartProps {
  data: ModalComparisonData[];
  title?: string;
  height?: number;
}

export function ModalComparisonChart({ data, title = "Comparação de Modais", height = 400 }: ModalComparisonChartProps) {
  const chartData = {
    labels: ['Custo', 'Tempo', 'Carbono', 'Confiabilidade'],
    datasets: data.map((item, index) => ({
      label: item.modal,
      data: [
        (1 / item.cost) * 100, // Inverte o custo para melhor visualização
        (1 / item.time) * 100, // Inverte o tempo para melhor visualização
        (1 / item.carbon) * 100, // Inverte o carbono para melhor visualização
        item.reliability * 100
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(16, 185, 129)',
        'rgb(245, 158, 11)',
        'rgb(239, 68, 68)',
        'rgb(139, 92, 246)'
      ][index % 5],
      backgroundColor: [
        'rgba(59, 130, 246, 0.2)',
        'rgba(16, 185, 129, 0.2)',
        'rgba(245, 158, 11, 0.2)',
        'rgba(239, 68, 68, 0.2)',
        'rgba(139, 92, 246, 0.2)'
      ][index % 5],
      borderWidth: 2,
      pointBackgroundColor: [
        'rgb(59, 130, 246)',
        'rgb(16, 185, 129)',
        'rgb(245, 158, 11)',
        'rgb(239, 68, 68)',
        'rgb(139, 92, 246)'
      ][index % 5],
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: [
        'rgb(59, 130, 246)',
        'rgb(16, 185, 129)',
        'rgb(245, 158, 11)',
        'rgb(239, 68, 68)',
        'rgb(139, 92, 246)'
      ][index % 5]
    }))
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const
        }
      },
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const modal = data[context.datasetIndex];
            const label = context.label;
            const value = context.parsed;
            
            switch(label) {
              case 'Custo':
                return `${modal.modal}: $${modal.cost.toFixed(2)} (Score: ${value.toFixed(1)})`;
              case 'Tempo':
                return `${modal.modal}: ${modal.time} dias (Score: ${value.toFixed(1)})`;
              case 'Carbono':
                return `${modal.modal}: ${modal.carbon} kg CO2 (Score: ${value.toFixed(1)})`;
              case 'Confiabilidade':
                return `${modal.modal}: ${(modal.reliability * 100).toFixed(0)}% (Score: ${value.toFixed(1)})`;
              default:
                return `${modal.modal}: ${value.toFixed(1)}`;
            }
          }
        }
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20
        }
      }
    }
  };

  return (
    <div style={{ height }}>
      <Radar data={chartData} options={options} />
    </div>
  );
}

// Componente de gráfico de linha para timeline de transporte
interface TransportTimelineChartProps {
  data: Array<{
    day: number;
    event: string;
    status: 'completed' | 'pending' | 'delayed';
    cost: number;
  }>;
  title?: string;
  height?: number;
}

export function TransportTimelineChart({ data, title = "Timeline de Transporte", height = 300 }: TransportTimelineChartProps) {
  const chartData = {
    labels: data.map(item => `Dia ${item.day}`),
    datasets: [
      {
        label: 'Custo Acumulado (USD)',
        data: data.map((item, index) => {
          return data.slice(0, index + 1).reduce((sum, d) => sum + d.cost, 0);
        }),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const
        }
      },
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          afterBody: function(context: any) {
            const dataIndex = context[0].dataIndex;
            const item = data[dataIndex];
            return [
              `Evento: ${item.event}`,
              `Status: ${item.status}`,
              `Custo do dia: $${item.cost.toFixed(2)}`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Dias'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Custo Acumulado (USD)'
        }
      }
    }
  };

  return (
    <div style={{ height }}>
      <Line data={chartData} options={options} />
    </div>
  );
}

// Wrapper para gráficos com estilo consistente
interface ChartWrapperProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function ChartWrapper({ children, title, className = "" }: ChartWrapperProps) {
  return (
    <div className={`glass p-6 rounded-2xl shadow-gold card-hover ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-100 mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
} 