import React from 'react';
import Icon from './icons/Icon';

export interface FlowStep {
  icon: string;
  title: string;
  description: string;
}

interface SolutionFlowProps {
  steps: FlowStep[];
}

const SolutionFlow: React.FC<SolutionFlowProps> = ({ steps }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {steps.map((step, idx) => (
        <div key={idx} className="text-center bg-blue-50 p-6 rounded-lg shadow-sm">
          <Icon src={step.icon} alt={step.title} size="lg" className="mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-2 text-accent">{step.title}</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">{step.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SolutionFlow; 