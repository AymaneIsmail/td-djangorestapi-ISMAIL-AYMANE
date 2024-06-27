import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { ResearchersResponse } from "@/interface/types";
  import { Button } from "./ui/button";
  import { CroissantIcon } from "lucide-react";
  import { useAuth } from "@/context/auth/auth-provider";
  import { useMutation, useQueryClient } from "@tanstack/react-query";
  import { useState } from "react";
  
  const URL = "http://127.0.0.1:8000/api/v1/";
  
  const useDeleteResearcher = () => {
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
  
        // Return empty response if there's no content
        if (response.status === 204) {
          return {};
        }
  
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["researchers"] });
      },
    });
  };
  
  export function DataTableSearchers({ data }: ResearchersResponse) {
    const { token } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const deleteResearcherMutation = useDeleteResearcher();
  
    if (!token) {
      return <div>Not authenticated</div>;
    }
  
    async function handleDelete(researcherId: string) {
      try {
        await deleteResearcherMutation.mutateAsync({ researcherId, token });
      } catch (error) {
        setError('Failed to delete researcher');
        console.error('Failed to delete researcher:', error);
      }
    }
  
    return (
      <>
        {error && <p>Error: {error}</p>}
        <Table>
          <TableCaption>A list of all our brilliant researchers</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Speciality</TableHead>
              <TableHead>Projects</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((researcher) => (
              <TableRow key={researcher.id}>
                <TableCell>{researcher.id}</TableCell>
                <TableCell className="font-medium">{researcher.attributes.name}</TableCell>
                <TableCell>{researcher.attributes.specialty}</TableCell>
                <TableCell>
                  {Array.isArray(researcher.relationships.projects.data) && researcher.relationships.projects.data.length > 0 ? (
                    researcher.relationships.projects.data.map((project: { type: string; id: string }) => (
                      <p key={project.id}>{project.id}</p>
                    ))
                  ) : (
                    <p>No Data</p>
                  )}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(researcher.id)}>
                    <CroissantIcon /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  }
  