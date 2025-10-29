import { Alert, AlertType } from '@/components/ui/Alert';
import React, { createContext, ReactNode, useCallback, useState } from 'react';

interface AlertConfig {
  type: AlertType;
  title: string;
  message: string;
  duration?: number;
}

interface AlertContextValue {
  showAlert: (config: AlertConfig) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

interface AlertProviderProps {
  children: ReactNode;
}

export function AlertProvider({ children }: AlertProviderProps) {
  const [alertConfig, setAlertConfig] = useState<AlertConfig | null>(null);
  const [visible, setVisible] = useState(false);

  const showAlert = useCallback((config: AlertConfig) => {
    setAlertConfig(config);
    setVisible(true);
  }, []);

  const hideAlert = useCallback(() => {
    setVisible(false);
    // Clear the config after animation completes
    setTimeout(() => {
      setAlertConfig(null);
    }, 300); // Match the fade-out animation duration
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {alertConfig && (
        <Alert
          type={alertConfig.type}
          title={alertConfig.title}
          message={alertConfig.message}
          visible={visible}
          onDismiss={hideAlert}
          duration={alertConfig.duration}
        />
      )}
    </AlertContext.Provider>
  );
}

export function useAlert(): AlertContextValue {
  const context = React.useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}
