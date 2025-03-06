import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { 
  sectionsData, 
  projectsData, 
  caseStudiesData, 
  aiWorksData, 
  interestsData 
} from "../data/mockData";

// Mock API request function that simulates API calls but returns mock data
export async function mockApiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Create a mock response that mimics a fetch response but with our mock data
  const mockResponse = (responseData: any) => {
    return {
      ok: true,
      status: 200,
      statusText: "OK",
      json: async () => responseData,
      text: async () => JSON.stringify(responseData)
    } as Response;
  };

  // Simulate a small delay to mimic network latency (optional)
  await new Promise(resolve => setTimeout(resolve, 100));

  // Handle GET requests
  if (method === "GET") {
    // Handle different API endpoints
    if (url.startsWith("/api/sections/")) {
      const sectionType = url.split("/").pop();
      return mockResponse(sectionsData[sectionType || "home"] || []);
    } else if (url === "/api/projects") {
      return mockResponse(projectsData);
    } else if (url === "/api/case-studies") {
      return mockResponse(caseStudiesData);
    } else if (url === "/api/ai-works") {
      return mockResponse(aiWorksData);
    } else if (url === "/api/interests") {
      return mockResponse(interestsData);
    }
  }

  // Handle mutations (POST, PUT, DELETE)
  // For a frontend-only app, we'll just return success for these operations
  // In a real app, we would update our mock data here
  return mockResponse({ success: true });
}

// Mock query function for React Query
export const getMockQueryFn: <T>() => QueryFunction<T> =
  () =>
  async ({ queryKey }) => {
    const endpoint = queryKey[0] as string;
    
    // Mock API responses based on the endpoint
    if (endpoint.startsWith("/api/sections/")) {
      const sectionType = endpoint.split("/").pop();
      return sectionsData[sectionType || "home"] || [];
    } else if (endpoint === "/api/projects") {
      return projectsData;
    } else if (endpoint === "/api/case-studies") {
      return caseStudiesData;
    } else if (endpoint === "/api/ai-works") {
      return aiWorksData;
    } else if (endpoint === "/api/interests") {
      return interestsData;
    }
    
    // Default empty response if endpoint not recognized
    return [];
  };

// Create a mock query client
export const mockQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getMockQueryFn(),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});