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

  async function handleRegisterUser(event) {
    event.preventDefault();
    const data = await registerService(signUpFormData);
  }
  async function handleLoginUser(event) {
    event.preventDefault();
  
    // Await the login service call
    const data = await loginService(signInFormData);
    console.log("hello");
  
    // Check if the login was successful
    if (data.success) {
      console.log("hello");
  
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
  
    // Log the authentication state for debugging
    console.log(auth, "auth");
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

  console.log(auth, "gf");

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
      }}
    >
      {loading ? <Skeleton /> : children}
    </AuthContext.Provider>
  );
}
