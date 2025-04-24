import { FC } from "react";
import ResetPassswordForm from "./components/ResetPassswordForm";

interface ResetPasswordPageProps {
  token: string;
}
const ResetPasswordPage: FC<ResetPasswordPageProps> = ({ token }) => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ResetPassswordForm token={token} />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
