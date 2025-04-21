import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);
export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("name must not be empty"),
  email: Yup.string().email("invalid email").required("email is required"),
  password: Yup.string()
    .required()
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .minSymbols(1),
});
