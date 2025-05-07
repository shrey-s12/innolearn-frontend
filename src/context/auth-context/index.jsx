import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services";
import { createContext, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast"

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

      if (data.success) {
        toast({
          title: "Registration Successful 🎉",
          description: "You can now log in with your credentials.",
        });
      } else {
        toast({
          title: "Registration Failed ❌",
          description: data.message || "Please try again.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong 😓",
        description: err.response?.data?.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setFormLoading(false);
    }
  }

  async function handleLoginUser(event) {
    event.preventDefault();
    setFormLoading(true);

    try {
      const data = await loginService(signInFormData);

      if (data.success) {
        sessionStorage.setItem(
          "accessToken",
          JSON.stringify(data.data.accessToken)
        );

        const user = data.data.user || data.data.instructor;

        setAuth({
          authenticate: true,
          user: user,
        });

        toast({
          title: "Welcome Back 👋",
          description: `Logged in as ${user.userName || user.instructorName}.`,
        });
      } else {
        setAuth({ authenticate: false, user: null });

        toast({
          title: "Login Failed ❌",
          description: data.message || "Invalid credentials.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error(err);
      setAuth({ authenticate: false, user: null });

      toast({
        title: "Something went wrong 😓",
        description: err.response?.data?.message || "Please try again later.",
        variant: "destructive",
      });
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
