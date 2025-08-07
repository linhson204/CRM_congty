import { useState, useEffect } from "react";
import { FacebookAccount } from "../types";

export const useFacebookAccounts = (userID: string | null) => {
  const [facebookAccounts, setFacebookAccounts] = useState<FacebookAccount[]>(
    []
  );
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(false);
  const [accountsError, setAccountsError] = useState<string | null>(null);

  const fetchFacebookAccounts = async (userId: string) => {
    setIsLoadingAccounts(true);
    setAccountsError(null);

    try {
      const response = await fetch(
        `/api/toolFacebook/dang-bai/facebook-accounts?userID=${userId}`
      );
      const result = await response.json();

      if (result.success && result.data) {
        console.log(
          `✅ Loaded ${result.data.length} Facebook accounts for user ${userId}`
        );
        setFacebookAccounts(result.data);
        return result.data;
      } else {
        throw new Error(result.message || "Failed to fetch Facebook accounts");
      }
    } catch (error) {
      console.error("❌ Error fetching Facebook accounts:", error);
      setAccountsError(
        error instanceof Error ? error.message : "Unknown error"
      );

      // Fallback to default account
      const defaultAccount: FacebookAccount = {
        userNameFb: "Default Account",
        userLinkFb: "https://facebook.com/default",
        facebookId: "B00000000",
        username: "default@email.com",
        password: "default123",
      };
      setFacebookAccounts([defaultAccount]);
      return [defaultAccount];
    } finally {
      setIsLoadingAccounts(false);
    }
  };

  useEffect(() => {
    if (userID) {
      fetchFacebookAccounts(userID);
    }
  }, [userID]);

  const refreshAccounts = () => {
    if (userID) {
      return fetchFacebookAccounts(userID);
    }
    return Promise.resolve([]);
  };

  return {
    facebookAccounts,
    isLoadingAccounts,
    accountsError,
    refreshAccounts,
    setFacebookAccounts,
  };
};
