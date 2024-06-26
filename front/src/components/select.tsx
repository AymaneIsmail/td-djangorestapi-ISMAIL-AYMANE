import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { fetchAllResearchers } from "@/api/client";
import { useAuth } from "@/context/auth/auth-provider";

export function SelectManager({ onSelectionChange }) {
    const {token} = useAuth();
    if(!token) {
        return <div>Not authenticated</div>;
    }

    const {data: researchersData, isLoading, isError} = fetchAllResearchers(token);

    if(isLoading) {
        return <div>Loading...</div>;
    }

    if(isError) {
        return <div>Error</div>;
    }
    
    const handleChange = (value: string) => {
      onSelectionChange(value);
    };

    return (
        <Select onValueChange={handleChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a researcher" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Researchers</SelectLabel>
                    {researchersData && researchersData.data.map((researcher, index) => (
                        <SelectItem key={index} value={researcher.id}>{researcher.attributes.name}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
