import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Add a resource to the database
 * @param {Object} resource - Resource data
 * @returns {Promise} - Supabase response
 */
export async function addResource(resource) {
  const { data, error } = await supabase.from("resources").insert([
    {
      title: resource.title,
      description: resource.description || "",
      body: resource.body || "",
      resource_type: resource.type,
      url: resource.url || "",
      author: resource.author || "Anonymous",
      tags: Array.isArray(resource.tags)
        ? resource.tags
        : typeof resource.tags === "string"
        ? resource.tags.split(",").map((tag) => tag.trim())
        : [],
    },
  ]);

  if (error) throw error;
  return data;
}

/**
 * Get resources from the database
 * @param {string} type - Optional filter by resource type
 * @param {number} limit - Optional limit of records to return
 * @returns {Promise} - Supabase response
 */
export async function getResources(type = null, limit = 100) {
  let query = supabase
    .from("resources")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (type) {
    query = query.eq("resource_type", type);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

/**
 * Get a single resource by ID
 * @param {string} id - Resource ID
 * @returns {Promise} - Supabase response
 */
export async function getResourceById(id) {
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}
