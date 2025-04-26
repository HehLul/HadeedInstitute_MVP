"use client";
import React from "react";
import Link from "next/link";

export default function ResourceCard({ resource, index }) {
  // Apply varying sizes only on desktop/tablet
  const isWide = index % 7 === 0 || index % 5 === 0;
  const isTall = index % 8 === 0;

  // Use responsive classes - uniform on mobile, varied on desktop
  const colSpan = isWide ? "col-span-1 md:col-span-2" : "col-span-1";
  const rowSpan = isTall ? "row-span-1 md:row-span-2" : "row-span-1";

  // Generate a deterministic border style
  const borderWidth = index % 3 === 0 ? "border-2" : "border";

  // Format date
  const formattedDate = new Date(resource.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  // Generate tag styles
  const getTagStyle = () => {
    return "bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full";
  };

  // Determine icon based on resource type
  const getResourceIcon = () => {
    switch (resource.resource_type) {
      case "reflection":
        return "💭";
      case "video":
        return "🎬";
      case "pdf":
        return "📄";
      case "link":
        return "🔗";
      case "picture":
        return "📷";
      default:
        return "📌";
    }
  };

  // Generate a subtle background color based on resource type
  const getBgColor = () => {
    switch (resource.resource_type) {
      //   case "reflection":
      //     return "bg-green-50";
      //   case "video":
      //     return "bg-blue-50";
      //   case "pdf":
      //     return "bg-yellow-50";
      //   case "link":
      //     return "bg-purple-50";
      //   case "picture":
      //     return "bg-pink-50";
      default:
        return "bg-white";
    }
  };

  return (
    <div
      className={`${colSpan} ${rowSpan} ${getBgColor()} p-5 ${borderWidth} border-black hover:shadow-lg transition-all duration-300 hover:scale-[1.01] font-serif relative rounded-sm`}
    >
      <div className="absolute top-3 right-3 text-lg">{getResourceIcon()}</div>

      <h3 className="text-xl font-bold mb-2 pr-8">{resource.title}</h3>

      <div className="text-sm text-gray-500 mb-3">
        {resource.author ? `By ${resource.author}` : "Anonymous"} •{" "}
        {formattedDate}
      </div>

      {resource.resource_type === "reflection" && (
        <p className="text-gray-700 mb-4 line-clamp-3">{resource.body}</p>
      )}

      {resource.resource_type === "video" && resource.url && (
        <div className="mb-4">
          <Link
            href={resource.url}
            target="_blank"
            className="text-green-700 hover:underline"
          >
            Watch Video →
          </Link>
        </div>
      )}

      {resource.resource_type === "link" && resource.url && (
        <div className="mb-4">
          <Link
            href={resource.url}
            target="_blank"
            className="text-green-700 hover:underline"
          >
            Visit Link →
          </Link>
          {resource.body && (
            <p className="text-gray-700 mt-2 line-clamp-2">{resource.body}</p>
          )}
        </div>
      )}

      {resource.tags && resource.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {resource.tags.map((tag, index) => (
            <span key={index} className={getTagStyle()}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
