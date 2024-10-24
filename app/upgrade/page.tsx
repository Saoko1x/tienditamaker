import PricingSection from "@/components/pricing";
import React from "react";

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center justify-center -mb-10 mt-8">
        ¡actualiza tu cuenta para disfrutar de todas las funcionalidades!
      </h1>
      <PricingSection />
    </div>
  );
}