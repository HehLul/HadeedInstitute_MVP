"use client";
import React, { useState } from "react";
import { addResource } from "@/lib/supabase";

export default function ResourceFormPopup({ isVisible, onClose }) {
  // State for resource type and form data
  const [resourceType, setResourceType] = useState("reflection");
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    url: "",
    tags: "",
    author: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle resource type selection
  const handleTypeChange = (e) => {
    setResourceType(e.target.value);
    // Reset form fields when type changes
    setFormData({
      title: "",
      body: "",
      url: "",
      tags: "",
      author: "",
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Prepare the resource object
      const resourceData = {
        title: formData.title,
        type: resourceType,
        body: formData.body,
        url: formData.url,
        author: formData.author,
        tags: formData.tags,
        description: resourceType === "link" ? formData.body : "",
      };

      // Submit to Supabase
      await addResource(resourceData);

      // Set success and reset form
      setSuccess(true);
      setFormData({
        title: "",
        body: "",
        url: "",
        tags: "",
        author: "",
      });

      // Close the form after a brief delay
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 1500);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Return null if not visible
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        {/* Popup Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-serif font-bold">Share a Resource</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-100 text-green-800 p-4 border-l-4 border-green-500">
            Resource successfully shared!
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-800 p-4 border-l-4 border-red-500">
            {error}
          </div>
        )}

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Resource Type Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-serif">
              Resource Type
            </label>
            <select
              value={resourceType}
              onChange={handleTypeChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="reflection">Reflection</option>
              <option value="video">Video</option>
              <option value="pdf">PDF</option>
              <option value="link">Website/Link</option>
              <option value="picture">Picture</option>
            </select>
          </div>

          {/* Common Title Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-serif">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter a title for your resource"
            />
          </div>

          {/* Conditional Fields Based on Resource Type */}
          {resourceType === "reflection" && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-serif">
                Your Reflection
              </label>
              <textarea
                name="body"
                value={formData.body}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded h-40"
                placeholder="Share your thoughts and reflections..."
              ></textarea>
            </div>
          )}

          {resourceType === "video" && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-serif">
                Video URL
              </label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter YouTube or video URL"
              />
            </div>
          )}

          {resourceType === "pdf" && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-serif">
                Upload PDF
              </label>
              <input
                type="file"
                accept=".pdf"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <p className="text-sm text-gray-500 mt-1">
                Note: File uploads require additional setup. For the MVP,
                consider using URL links instead.
              </p>
            </div>
          )}

          {resourceType === "link" && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-serif">
                Website URL
              </label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter website URL"
              />
              <div className="mt-4">
                <label className="block text-gray-700 mb-2 font-serif">
                  Description
                </label>
                <textarea
                  name="body"
                  value={formData.body}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded h-24"
                  placeholder="Describe this resource..."
                ></textarea>
              </div>
            </div>
          )}

          {resourceType === "picture" && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-serif">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <p className="text-sm text-gray-500 mt-1">
                Note: File uploads require additional setup. For the MVP,
                consider using URL links instead.
              </p>
              <div className="mt-4">
                <label className="block text-gray-700 mb-2 font-serif">
                  Image URL (alternative)
                </label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Or enter image URL"
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 mb-2 font-serif">
                  Caption
                </label>
                <textarea
                  name="body"
                  value={formData.body}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded h-24"
                  placeholder="Add a caption for this image..."
                ></textarea>
              </div>
            </div>
          )}

          {/* Tags Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-serif">Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter tags separated by commas"
            />
          </div>

          {/* Author Field */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-serif">
              Your Name
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your name (optional)"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-white border-2 border-black py-2 px-6 font-serif hover:scale-105 transition duration-300 ease-in-out disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Share Resource"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
