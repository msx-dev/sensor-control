import { createContext, ReactNode, useContext, useState } from "react";

const SensorDataContext = createContext<
  | {
      lastPressureHistory: number[];
      lastHumidityHistory: number[];
      setLastPressureHistory: (history: number[]) => void;
      setLastHumidityHistory: (history: number[]) => void;
    }
  | undefined
>(undefined);

export const SensorDataProvider = ({ children }: { children: ReactNode }) => {
  const [lastPressureHistory, setLastPressureHistory] = useState<number[]>([]);
  const [lastHumidityHistory, setLastHumidityHistory] = useState<number[]>([]);

  return (
    <SensorDataContext.Provider
      value={{
        lastPressureHistory,
        lastHumidityHistory,
        setLastPressureHistory,
        setLastHumidityHistory,
      }}
    >
      {children}
    </SensorDataContext.Provider>
  );
};

export const useSensorDataContext = () => {
  const context = useContext(SensorDataContext);
  if (!context) {
    throw new Error(
      "useSensorDataContext must be used within a SensorDataProvider"
    );
  }
  return context;
};
