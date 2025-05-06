import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);

  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  async function handleRegisterUser(event) {
    event.preventDefault();
    setFormLoading(true);

    try {
      const data = await registerService(signUpFormData);
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  }

  async function handleLoginUser(event) {
    event.preventDefault();

    setFormLoading(true);
    try {
      const data = await loginService(signInFormData);

      // Await the login service call

      // Check if the login was successful
      if (data.success) {
        // Store the access token in session storage
        sessionStorage.setItem(
          "accessToken",
          JSON.stringify(data.data.accessToken)
        );

        // Determine the user from the response
        const user = data.data.user || data.data.instructor;

        // Update authentication state
        setAuth({
          authenticate: true,
          user: user,
        });
      } else {
        // If login failed, reset authentication state
        setAuth({
          authenticate: false,
          user: null,
        });
      }
    } catch (err) {
      console.error(err);
      setAuth({ authenticate: false, user: null });
    } finally {
      setFormLoading(false);
    }
  }


  //check auth user
  async function checkAuthUser() {

    try {
      const data = await checkAuthService();
      if (data.success) {
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
        setLoading(false);
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (!error?.response?.data?.success) {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    }

  }

  function resetCredentials() {
    setAuth({
      authenticate: false,
      user: null,
    });
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
        resetCredentials,
        formLoading,
      }}
    >
      {loading ? <Skeleton /> : children}
    </AuthContext.Provider>
  );
}
