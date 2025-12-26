import React from 'react';

interface Step {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
}

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

export const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="relative">
        {/* Progress Line Background */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-white/20 rounded-full mx-12" />

        {/* Progress Line Fill */}
        <div
          className="absolute top-6 left-0 h-1 rounded-full transition-all duration-500 ease-out mx-12"
          style={{
            width: `calc(${((currentStep) / (steps.length - 1)) * 100}% - 6rem)`,
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 0 10px rgba(102, 126, 234, 0.5)',
          }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isClickable = onStepClick && index < currentStep;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center"
              >
                {/* Step Circle */}
                <button
                  onClick={() => isClickable && onStepClick(index)}
                  disabled={!isClickable}
                  className={`
                    relative z-10 w-12 h-12 rounded-full flex items-center justify-center
                    transition-all duration-300 transform
                    ${isClickable ? 'cursor-pointer hover:scale-110' : 'cursor-default'}
                    ${isCompleted
                      ? 'text-white'
                      : isCurrent
                        ? 'text-white'
                        : 'bg-white/10 border-2 border-white/20 text-white/50'
                    }
                  `}
                  style={
                    isCompleted || isCurrent
                      ? {
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                        }
                      : {}
                  }
                >
                  {isCompleted ? <CheckIcon /> : step.icon}

                  {/* Pulse animation for current step */}
                  {isCurrent && (
                    <span
                      className="absolute inset-0 rounded-full animate-ping opacity-30"
                      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                    />
                  )}
                </button>

                {/* Step Label */}
                <span
                  className={`
                    mt-3 text-xs font-medium transition-colors duration-300
                    ${isCompleted || isCurrent ? 'text-white' : 'text-white/50'}
                  `}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Default step icons
export const TemplateIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
  </svg>
);

export const FormIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

export const PreviewIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);
