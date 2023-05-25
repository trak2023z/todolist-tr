import { apiSlice } from "../api/apiSlice";
import { useDispatch } from "react-redux";
import {
  useSignInMutation,
  useSignUpMutation,
  useLogOutMutation,
} from "../reducers/authApiSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const [signIn] = useSignInMutation();
  const [signUp] = useSignUpMutation();
  const [logOut] = useLogOutMutation();

  const handleSiginIn = async (formData) => {
    try {
      const data = await signIn(formData);
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const handleSignUp = async (formData) => {
    try {
      const data = await signUp(formData);
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      dispatch(apiSlice.util.resetApiState());
    } catch (e) {
      console.log(e);
    }
  };

  return {
    handleSignUp,
    handleSiginIn,
    handleLogOut,
  };
};
