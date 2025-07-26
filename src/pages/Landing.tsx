// File: src/pages/Landing.tsx

import MainLayout from "@/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 py-24 text-center">
        <h2 className="text-6xl font-bold mb-4">
          Regulatory <span className="text-blue-600">AI</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mb-8">
          Accelerate compliance, documentation, and Design History File generation with our AI-powered platform.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Button className="text-base px-6 py-4" asChild>
            <Link to="/playground">Try Playground</Link>
          </Button>
          <Button variant="outline" className="text-base px-6 py-4" asChild>
            <Link to="/home">Go to Dashboard</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-16 text-muted-foreground">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">Smart Document Generation</h3>
            <p className="text-accent-foreground text-sm">
              Auto-generate DHF sections, validation reports, and summaries from real-time inputs.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">QMS Integration</h3>
            <p className="text-accent-foreground text-sm">
              Plug into your QMS modules (Process Validation, Complaints, etc.) seamlessly.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Compliant by Design</h3>
            <p className="text-accent-foreground text-sm">
              Built for EU MDR, US FDA, and Indian MDR regulatory frameworks.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20 text-center px-4">
        <h3 className="text-3xl font-bold mb-4">Ready to transform your compliance workflow?</h3>
        <p className="text-lg mb-6">
          Join now and start building your AI-powered regulatory process.
        </p>
        <Button variant="secondary" className="text-base px-6 py-3" asChild>
          <Link to="/device-form">Try out</Link>
        </Button>
      </section>
    </MainLayout>
  );
}
// This is the main landing page for the Regulatory AI application.
// It includes a hero section, features overview, and a call-to-action to try the device form.
// The layout is responsive and designed to highlight the platform's capabilities in regulatory compliance automation.