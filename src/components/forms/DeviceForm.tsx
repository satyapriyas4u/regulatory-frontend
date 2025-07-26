// src/pages/DeviceForm.tsx

import { useForm, FormProvider } from "react-hook-form";
import { FormSection } from "@/components/FormSection";
import { Button } from "@/components/ui/button";

export default function DeviceForm() {
  const methods = useForm();

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    // Call AI backend here
  };

  return (
    <main className="flex-1 bg-gradient-to-r from-sky-100 via-indigo-100 to-blue-100 dark:from-gray-800 dark:via-slate-900 dark:to-gray-800 py-8 px-2">
      <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-800 shadow-lg rounded-lg p-6 border border-gray-200 dark:border-zinc-700">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
          DEVICE INFORMATION
        </h2>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-10">
            <FormSection name="deviceType" label="Device Type" minLength={5} />
            <FormSection name="intendedPurpose" label="Intended Purpose" minLength={30} />

          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full max-w-2xl text-base font-semibold bg-blue-600 hover:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-700 text-white"
            >
              Submit
            </Button>
            </div>
            {/* <FormSection name="regulatoryFramework" label="Regulatory Framework" minLength={10} />
            <FormSection name="complianceRequirements" label="Compliance Requirements" minLength={30} />
            <FormSection name="additionalNotes" label="Additional Notes" minLength={20} /> */}

          </form>
        </FormProvider>
      </div>
    </main>
  );
}
