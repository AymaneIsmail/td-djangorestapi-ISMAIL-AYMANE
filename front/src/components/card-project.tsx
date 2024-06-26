// CardProject.tsx
import { BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/utils/css";
import { ResearchProject } from "@/interface/types";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useAuth } from "@/context/auth/auth-provider";
import { deleteProject as deleteProjectApi, fetchAllResearchers } from "@/api/client"; 

interface CardProjectProps extends React.ComponentProps<typeof Card> {
    project: ResearchProject;
    
}

export function CardProject({ className, project, ...props }: CardProjectProps) {
    const { token } = useAuth();
    // const {researchers} = useFormContext();
    if (!token) {
        return window.location.href = '/login';
    }

    const deleteProjectMutation = deleteProjectApi(token, parseInt(project.id)); 
    const { data: researcher, isLoading, isError } = fetchAllResearchers(token);

    const handleDelete = async () => {
        deleteProjectMutation.mutate();
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    if(!researcher) return null;

    const researchers = new Map(researcher.data.map((researcher) => [researcher.id, researcher.attributes.name]));

    return (
        <Card className={cn("w-[380px]", className)} {...props}>
            <CardHeader>
                <BellRing />
                <CardTitle>{project.relationships.project_manager.data.id}</CardTitle>
                <div className="flex items-center justify-start gap-2">
                    <CardDescription>{project.attributes.description}</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="grid gap-4">
                    <h3 className="text-lg font-bold">Led by : {researchers.get(project.relationships.project_manager.data.id)}</h3>
                <div>
                    <p className="text-sm text-muted-foreground italic">started on {project.attributes.start_date}</p>
                    <p className="text-sm text-muted-foreground italic">ended on {project.attributes.end_date}</p>
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="destructive" className="mt-4" onClick={handleDelete}>
                    <Cross1Icon className="mr-2 h-4 w-4" /> Delete this project
                </Button>
            </CardFooter>
        </Card>
    );
}