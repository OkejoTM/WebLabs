import React from "react";
import { useRouter } from "next/navigation";
import { ApiService } from "@/data/apiService";

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthWrapper: React.FC<P> = (props) => {
    const router = useRouter();

    React.useEffect(() => {
      const token = ApiService.getToken(); // Получение токена (JWT)
      if (!token) {
        router.replace("/login"); // Перенаправление на страницу логина
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
};

export default withAuth;
