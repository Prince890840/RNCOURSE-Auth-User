import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../utils/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

const SignupScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  const signupHandler = async ({ email, password }) => {
    console.log(email, password);
    try {
      setIsAuthenticating(true);
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not create user. Please check your input and try again later."
      );
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message={"Creating user..."} />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
};

export default SignupScreen;
