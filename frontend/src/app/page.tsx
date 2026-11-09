"use client";

import {useEffect, useState} from "react";

interface BackendStatus {
  status: string;
  application:string;
  version: string;
}

export default function Home(){
  const [backend,setBackend] = useState<BackendStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


useEffect(() => {
  async function checkBackend() {
    try{
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/health`);

      if(!response.ok){
        throw new Error("Backend request failed");
      }

      const data: BackendStatus = await response.json();
      setBackend(data);
    } catch {
      setError("Could not connect to the backend.")
    } finally {
      setLoading(false)
    }
  }
  checkBackend();
},[])

return (
    <main className="min-h-screen bg-customBg p-8 text-mainText">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight">
          InsightFlow AI
        </h1>

        <p className="mt-2 text-mutedText">
          Enterprise Document Intelligence Platform
        </p>

        <section className="mt-10 rounded-xl border border-mutedText/15 bg-surface p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-mainText">
            System Status
          </h2>

          {loading && (
            <p className="mt-4 text-mutedText animate-pulse">
              Checking backend connection...
            </p>
          )}

          {error && (
            <p className="mt-4 text-red-600 font-medium">{error}</p>
          )}

          {backend && (
            <div className="mt-4 space-y-2 border-t border-mutedText/10 pt-4">
              <p className="font-medium text-success flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-success inline-block"></span>
                Backend connected successfully
              </p>
              <p className="text-mutedText">Application: <span className="text-mainText font-medium">{backend.application}</span></p>
              <p className="text-mutedText">Status: <span className="text-mainText font-medium">{backend.status}</span></p>
              <p className="text-mutedText">Version: <span className="text-mainText font-medium">{backend.version}</span></p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}