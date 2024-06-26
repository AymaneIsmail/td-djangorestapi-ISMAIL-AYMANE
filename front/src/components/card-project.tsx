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
import { deleteProject as deleteProjectApi } from "@/api/client"; 
import { useFormContext } from "@/context/form/form-provider";

interface CardProjectProps extends React.ComponentProps<typeof Card> {
    project: ResearchProject;
    
}

export function CardProject({ className, project, ...props }: CardProjectProps) {
    const { token } = useAuth();
    const {researchers} = useFormContext();
    if (!token) {
        return <div>Not authenticated</div>;
    }

    const deleteProjectMutation = deleteProjectApi(token, parseInt(project.id)); 
  
    if (!token) {
        return <div>Not authenticated</div>;
    }

    const handleDelete = async () => {
        deleteProjectMutation.mutate();
    };

    if(!researchers) return null;
    console.log(project,)
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