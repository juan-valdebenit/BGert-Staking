import React, { useState, useEffect, useMemo, useCallback } from "react";
import { injected, walletConnect } from "../wallet/connectors";
import { useWeb3React } from "@web3-react/core";

export const MetaMaskContext = React.createContext(null);

export const MetaMaskProvider = ({ children }) => {
  const { activate, account, library, active, deactivate, chainId } =
    useWeb3React();

  const [isActive, setIsActive] = useState(false);
  const [walletModal, setWalletModal] = useState(false);
  const [shouldDisable, setShouldDisable] = useState(false); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      var providerType = await sessionStorage.getItem("providerType");
      var isConnected = await sessionStorage.getItem("isConnected");
      if (isConnected) {
        connect(providerType).then((val) => {
          setIsLoading(false);
        });
      }
    }
    fetchData();
  }, []);

  const handleIsActive = useCallback(() => {
    setIsActive(active);
  }, [active]);

  const handleWalletModal = async (state) => {
    setWalletModal(state);
  };

  useEffect(() => {
    handleIsActive();
  }, [handleIsActive]);

  const connect = async (providerType) => {
    setShouldDisable(true);
    try {
      if (providerType === "metaMask") {
        await activate(injected).then(() => {
          setShouldDisable(false);
          sessionStorage.setItem("providerType", "metaMask");
          sessionStorage.setItem("isConnected", true);
        });
      } else if (providerType === "walletConnect") {
        await activate(walletConnect).then(() => {
          setShouldDisable(false);
          sessionStorage.setItem("providerType", "walletConnect");
          sessionStorage.setItem("isConnected", true);
        });
      } else {
      }
      setWalletModal(false);
    } catch (error) {
    }
  };

  const disconnect = async () => {
    try {
      await deactivate();
      sessionStorage.removeItem("isConnected");
      sessionStorage.removeItem("providerType");
    } catch (error) {
    }
  };

  const values = useMemo(
    () => ({
      isActive,
      account,
      isLoading,
      walletModal,
      handleWalletModal,
      connect,
      disconnect,
      library,
      chainId,
      shouldDisable,
    }),
    [isActive, isLoading, shouldDisable, account, walletModal, chainId]
  );

  return (
    <MetaMaskContext.Provider value={values}>
      {children}
    </MetaMaskContext.Provider>
  );
};

export default function useMetaMask() {
  const context = React.useContext(MetaMaskContext);

  if (context === undefined) {
    throw new Error(
      "useMetaMask hook must be used with a MetaMaskProvider component"
    );
  }

  return context;
}
