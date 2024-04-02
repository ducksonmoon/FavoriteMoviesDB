import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../utils/authUtils";

type AuthAction = (email: string, password: string) => Promise<any>;

const useAuthFormHandler = (authAction: AuthAction) => {
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (
    email: string,
    password: string,
    successRedirect: string = "/"
  ) => {
    try {
      await authAction(email, password);
      toast({
        title: "Success",
        description: "Your action has been successfully completed.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate(successRedirect);
    } catch (error) {
      let errorMessage = "An unexpected error occurred";
      if (error instanceof Error && "code" in error) {
        errorMessage = getErrorMessage((error as { code: string }).code);
      }
      toast({
        title: "Failed",
        description: errorMessage,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return handleSubmit;
};

export default useAuthFormHandler;
