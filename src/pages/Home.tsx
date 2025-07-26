//File: src/pages/Home.tsx

import React from 'react';
import MainLayout from "@/layout/MainLayout";

const Home: React.FC = () => {
  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page</h1>
        <p className="text-lg text-muted-foreground">
          This is the home page of our application. Here you can find various features and functionalities.
        </p>
        {/* Add more content or components as needed */}
      </div>
    </MainLayout>
  );
};

export default Home;