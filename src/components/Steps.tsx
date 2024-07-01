import React from "react";

interface StepsProps {
  stepNames: string[];
  stepsContent: React.ReactNode[];
  activeStep: number;
}

function Steps({ stepNames, stepsContent, activeStep }: StepsProps) {
  return (
    <div>
      <div className="flex justify-between">
        {stepNames.map((stepName, index) => {
          return (
            <div
              className={`flex flex-col gap-2 ${
                index !== stepNames.length - 1 && "w-full"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`h-8 w-8 rounded-full  flex justify-center items-center
                 ${
                   activeStep >= index
                     ? "bg-black text-white"
                     : "bg-gray-500 text-gray-200"
                 }
                
                `}
                >
                  {index + 1}
                </div>

                {activeStep > index && index !== stepNames.length - 1 && (
                  <div className="h-1 w-full bg-black"></div>
                )}

                {activeStep <= index && index !== stepNames.length - 1 && (
                  <div className="h-1 w-full bg-gray-200"></div>
                )}
              </div>
              <h1 className="text-sm">{stepName}</h1>
            </div>
          );
        })}
      </div>

      <div className="mt-5">{stepsContent[activeStep]}</div>
    </div>
  );
}

export default Steps;