"use client";
import React, { useEffect, useState } from "react";
import { getResources } from "@/lib/supabase";
import ResourceCard from "./ResourceCard";

export default function ResourceList() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const data = await getResources();
        setResources(data || []);
      } catch (err) {
        console.error("Error fetching resources:", err);
        setError("Failed to load resources");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) {
    return (
      <div className="w-full text-center py-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-800 border-r-transparent"></div>
        <p className="mt-2 text-gray-600">Loading resources...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-8 text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  if (resources.length === 0) {
    return (
      <div className="w-full text-center py-8 text-gray-600">
        <p>No resources yet. Be the first to share!</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
}
