import { ResearchProjectAttributes, ResearchProjectRequest, ResearchProjectsResponse, ResearchersResponse } from "@/interface/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const URL = "http://127.0.0.1:8000/api/v1/";

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


type CreateProjectMutationArgs = {
  data: ResearchProjectAttributes;
  token: string;
};

export const useCreateProject = () => {
  const queryClient = useQueryClient(); // Use the query client

  return useMutation({
    mutationFn: async ({ data, token }: CreateProjectMutationArgs) => {
      const requestData: ResearchProjectRequest = {
        data: {
          type: "ResearchProject",
          attributes: data,
        },
      };

      const response = await fetch(URL + 'project/', {
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
    },
    onSuccess: () => {
      // Invalidate and refetch queries with the "project" queryKey
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