import { useState, useEffect } from "react";

interface ContentData {
  _id?: string;
  section: string;
  title: string;
  subtitle: string;
  description: string;
  content: any;
}

export function useContent(section: string) {
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/content/${section}`);
      const data = await response.json();

      if (data.success) {
        setContent(data.data);
      } else {
        // If no content found, return null (will use default content)
        setContent(null);
      }
    } catch (err) {
      console.error(`Error fetching ${section} content:`, err);
      setError(err instanceof Error ? err.message : "Failed to fetch content");
      setContent(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [section]);

  return { content, loading, error, refetch: fetchContent };
}
