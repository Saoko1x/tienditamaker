"use client";
import { Breadcrumbs } from "@/components/breadcrumbs";
import HeadingDashboard from "@/components/dashboard/heading-dashboard";
import DashboardComponent from "@/components/dashboard/dashboard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/user-context";

export default function Dashboard() {
  const breadcrumbItems = [{ title: "dashboard", link: "/dashboard" }];
  const { user, loading } = useUser();
  const router = useRouter();
  const [sessionChecked, setSessionChecked] = useState(false);

  // Efecto para manejar la carga inicial y verificación de sesión
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Si ya no está cargando y tenemos información del usuario
        if (!loading && user) {
          if (user.isPaidUser === "free") {
            router.push("/upgrade");
            return;
          }
          setSessionChecked(true);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        router.push("/api/auth/signin"); // Redirige al login en caso de error
      }
    };

    checkSession();
  }, [loading, user, router]);

  // Estados de carga y validación
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg font-medium">Cargando...</p>
          <p className="text-sm text-gray-500">Por favor espere</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario, redirigir al login
  if (!user) {
    router.push("/upgrade");
    return null;
  }

  // Si la sesión no ha sido verificada aún, mostrar loading
  if (!sessionChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg font-medium">Verificando sesión...</p>
          <p className="text-sm text-gray-500">Por favor espere</p>
        </div>
      </div>
    );
  }

  // Renderizado principal del dashboard
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <Breadcrumbs items={breadcrumbItems} />
      <HeadingDashboard />
      <DashboardComponent />
    </div>
  );
}
