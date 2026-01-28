import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { DemoSettings, SeasonId, ScoreWeights, InventoryItem, DemoScenario } from '../types';
import { generateDemoInventory, updateInventoryItem, sellItem } from '../data/inventory';
import { DEFAULT_WEIGHTS } from '../utils/recommendationEngine';

interface DemoContextType {
  settings: DemoSettings;
  inventory: Map<number, InventoryItem>;
  
  // 時間操作
  setSimulatedHour: (hour: number | null) => void;
  
  // 季節操作
  setSimulatedSeason: (season: SeasonId | null) => void;
  
  // 在庫操作
  setInventoryQuantity: (productCode: number, quantity: number) => void;
  simulateSale: (productCode: number) => void;
  resetInventory: () => void;
  
  // スコアウェイト操作
  setScoreWeights: (weights: ScoreWeights) => void;
  resetWeights: () => void;
  
  // シナリオ
  startScenario: (scenario: DemoScenario) => void;
  stopScenario: () => void;
}

const DemoContext = createContext<DemoContextType | null>(null);

const initialSettings: DemoSettings = {
  simulatedHour: null,
  simulatedSeason: null,
  scoreWeights: DEFAULT_WEIGHTS,
  isAutoPlayEnabled: false,
  autoPlaySpeed: 2000,
  currentScenario: null
};

export function DemoProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<DemoSettings>(initialSettings);
  const [inventory, setInventory] = useState(() => generateDemoInventory());

  const setSimulatedHour = useCallback((hour: number | null) => {
    setSettings(s => ({ ...s, simulatedHour: hour }));
  }, []);

  const setSimulatedSeason = useCallback((season: SeasonId | null) => {
    setSettings(s => ({ ...s, simulatedSeason: season }));
  }, []);

  const setInventoryQuantity = useCallback((productCode: number, quantity: number) => {
    setInventory(inv => updateInventoryItem(inv, productCode, quantity));
  }, []);

  const simulateSale = useCallback((productCode: number) => {
    setInventory(inv => sellItem(inv, productCode));
  }, []);

  const resetInventory = useCallback(() => {
    setInventory(generateDemoInventory());
  }, []);

  const setScoreWeights = useCallback((weights: ScoreWeights) => {
    setSettings(s => ({ ...s, scoreWeights: weights }));
  }, []);

  const resetWeights = useCallback(() => {
    setSettings(s => ({ ...s, scoreWeights: DEFAULT_WEIGHTS }));
  }, []);

  const startScenario = useCallback((scenario: DemoScenario) => {
    setSettings(s => ({ ...s, currentScenario: scenario, isAutoPlayEnabled: true }));
  }, []);

  const stopScenario = useCallback(() => {
    setSettings(s => ({ ...s, currentScenario: null, isAutoPlayEnabled: false }));
  }, []);

  return (
    <DemoContext.Provider value={{
      settings, inventory,
      setSimulatedHour, setSimulatedSeason,
      setInventoryQuantity, simulateSale, resetInventory,
      setScoreWeights, resetWeights,
      startScenario, stopScenario
    }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemoContext() {
  const context = useContext(DemoContext);
  if (!context) throw new Error('useDemoContext must be used within DemoProvider');
  return context;
}
