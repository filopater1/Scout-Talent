import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  BrainCircuit,
  ShieldCheck,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function VerifyPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("Verifying your account...");

  useEffect(() => {
    const verifyAccount = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid or missing verification token.");
        return;
      }

      try {
        // 🔥 هنا تحط API الحقيقي
        // await verifyEmail({ token })

        // Demo
        await new Promise((res) => setTimeout(res, 1500));

        setStatus("success");
        setMessage("Your account has been successfully verified!");
      } catch (err) {
        setStatus("error");
        setMessage("Verification failed or link expired.");
      }
    };

    verifyAccount();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BrainCircuit className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-gray-900">
              Hakeem
            </span>
          </div>
          <p className="text-gray-600">Email Verification</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 ">
              {status === "loading" && (
                <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
              )}
              {status === "success" && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
              {status === "error" && (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
              Account Verification
            </CardTitle>

            <CardDescription>{message}</CardDescription>
          </CardHeader>

          {status !== "loading" && status !== "error" && (
            <CardContent>
              <Button className="w-full" onClick={() => navigate("/auth")}>
                Go to Login
              </Button>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
