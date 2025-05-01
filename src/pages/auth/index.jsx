import CommonForm from "@/components/common-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInFormControls, signUpFormControls } from "@/config";
import { AuthContext } from "@/context/auth-context";
import { ThemeContext } from "@/context/theme-context";
import { GraduationCap, Moon, Sun } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    handleRegisterUser,
    handleLoginUser,
  } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  function handleTabChange(value) {
    setActiveTab(value);
  }

  function checkIfSignInFormIsValid() {
    return (
      signInFormData &&
      signInFormData.userEmail !== "" &&
      signInFormData.password !== ""
    );
  }

  function checkIfSignUpFormIsValid() {
    return (
      signUpFormData &&
      signUpFormData.userFullName !== "" &&
      signUpFormData.userName !== "" &&
      signUpFormData.userEmail !== "" &&
      signUpFormData.password !== "" &&
      signUpFormData.confirmPassword !== "" &&
      signUpFormData.userPhoneNumber !== "" &&
      signUpFormData.userDateOfBirth !== "" &&
      signUpFormData.userGender !== "" &&
      signUpFormData.userInterests.length > 0 &&
      signUpFormData.userAddress.country !== "" &&
      signUpFormData.userAddress.state !== "" &&
      signUpFormData.userAddress.city !== "" &&
      signUpFormData.userAddress.street !== ""
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-200 dark:border-gray-800 sticky top-0 left-0 w-full bg-white dark:bg-gray-900 z-50">
        <Link to={"/"} className="flex items-center justify-center">
          <GraduationCap className="h-8 w-8 mr-4 text-indigo-600 dark:text-indigo-400" />
          <span className="font-extrabold text-xl">InnoLearn</span>
        </Link>

        <button
          onClick={toggleTheme}
          className="ml-auto flex items-center space-x-2 p-2 rounded-md bg-gray-200 dark:bg-gray-700"
        >
          {theme === "light" ? (
            <Moon className="text-yellow-500 w-5 h-5" />
          ) : (
            <Sun className="text-orange-400 w-5 h-5" />
          )}
        </button>
      </header>

      {/* Tabs & Forms */}
      <div className="flex items-center justify-center flex-1">
        <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-full max-w-md"
        >
          {/* Tab Switcher */}
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800 border dark:border-gray-700">
            <TabsTrigger value="signin" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* Sign In Card */}
          <TabsContent value="signin">
            <Card className="p-6 space-y-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl dark:text-white">Sign in to your account</CardTitle>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signInFormControls}
                  buttonText="Sign In"
                  formData={signInFormData}
                  setFormData={setSignInFormData}
                  isButtonDisabled={!checkIfSignInFormIsValid()}
                  handleSubmit={handleLoginUser}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sign Up Card */}
          <TabsContent value="signup">
            <Card className="p-6 space-y-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl dark:text-white">Create a new account</CardTitle>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                  Enter your details to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 max-h-[300px] overflow-y-auto border rounded pt-4 border-gray-200 dark:border-gray-700">
                <CommonForm
                  formControls={signUpFormControls}
                  buttonText="Sign Up"
                  formData={signUpFormData}
                  setFormData={setSignUpFormData}
                  isButtonDisabled={!checkIfSignUpFormIsValid()}
                  handleSubmit={handleRegisterUser}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthPage;
