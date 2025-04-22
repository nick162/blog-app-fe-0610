import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);
export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("invalid email").required("email is required"),
  password: Yup.string()
    .required()
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .minSymbols(1),
});
