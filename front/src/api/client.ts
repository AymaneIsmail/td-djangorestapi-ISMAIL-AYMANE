import { PublicationAttributes, PublicationRequest, PublicationsResponse, ResearchProjectAttributes, ResearchProjectRequest, ResearchProjectsResponse, ResearchersResponse } from "@/interface/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const URL = "http://127.0.0.1:8000/api/v1/";

type CreateProjectMutationArgs = {
  data: ResearchProjectAttributes;
  token: string;
};

export const fetchAllProjects = (token: string) => {
  return useQuery<ResearchProjectsResponse>({
    queryKey: ["project"],
    queryFn: async () => {
      const response = await axios.get<ResearchProjectsResponse>(
        URL + 'project/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
      );
      return response.data;
    },
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient(); 

  return useMutation({
    mutationFn: async ({ data, token }: CreateProjectMutationArgs) => {
      const requestData: ResearchProjectRequest = {
        data: {
          type: "ResearchProject",
          attributes: data,
        },
      };
      console.log(requestData);
      const response = await fetch(URL + 'project/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/vnd.api+json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
};

export const deleteProject = (token: string, id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`${URL}project/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
};




///////////////////////////////////
// Publications
///////////////////////////////////

export const fetchAllPublications = async (token: string): Promise<PublicationsResponse> => {
  const response = await fetch(URL + 'publications/', {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

// Create a new publication
export const createPublication = async (data: PublicationAttributes, token: string): Promise<void> => {
  const requestData: PublicationRequest = {
    data: {
      type: "Publication",
      attributes: data,
    },
  };

  const response = await fetch(URL + 'publications/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

// Delete a publication
export const deletePublication = async (token: string, id: number): Promise<void> => {
  const response = await fetch(`${URL}publications/${id}/`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};



///////////////////////////////////
// Researchers
///////////////////////////////////

  export const fetchAllResearchers = (token: string) => {
    return useQuery<ResearchersResponse>({
      queryKey: ["researchers"],
      queryFn: async () => {
        const response = await axios.get<ResearchersResponse>(
          URL + 'researchers/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
        );
        return response.data;
      },
    });
  };

  // Assuming the URL constant and other necessary imports are defined elsewhere in the file

// Define or import these interfaces from their respective modules
interface ResearcherAttributes {
  name: string;
  specialty: string;
  projects: any[]; // Consider specifying a more detailed type for projects if available
}

interface ResearcherData {
  type: string;
  attributes: ResearcherAttributes;
}

interface ResearcherRequest {
  data: ResearcherData;
}

interface CreateResearcherMutationArgs {
  data: ResearcherAttributes;
  token: string;
}

// URL constant for the API endpoint, assuming it's defined elsewhere or replace it with the actual URL string

export const useCreateResearcher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, token }: CreateResearcherMutationArgs) => {
      const requestData: ResearcherRequest = {
        data: {
          type: "Researcher",
          attributes: data,
        },
      };

      console.log(requestData); // For debugging purposes, consider removing in production

      const response = await fetch(URL + 'researchers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/vnd.api+json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        // It's helpful to provide more detailed error information if possible
        const errorBody = await response.text();
        throw new Error(`Network response was not ok: ${errorBody}`);
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate queries to refresh the data after a successful mutation
      queryClient.invalidateQueries({ queryKey: ["researchers"] });
    },
  });
};


export const useDeleteResearcher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ researcherId, token }: { researcherId: string; token: string }) => {
      const response = await fetch(`${URL}researchers/${researcherId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/vnd.api+json',
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json(); 
    },
  });
};