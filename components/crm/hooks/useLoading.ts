import { Spin } from "antd";
import { useState } from "react";

const useLoading = () => {
  let [isLoading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };
  const handleLoading = async (fetchAPI) => {
    await startLoading();
    try {
      await fetchAPI();
    } finally {
      await stopLoading();
    }
  };

  return {
    handleLoading,
    isLoading,
    startLoading,
    stopLoading,
  };
};

export default useLoading;
