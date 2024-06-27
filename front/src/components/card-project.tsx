import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming React Router is used for navigation
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
import { deleteProject as deleteProjectApi, fetchAllResearchers, useUpdateProject } from "@/api/client";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { SelectManager } from "./select";

interface CardProjectProps extends React.ComponentProps<typeof Card> {
    project: ResearchProject;
}

export function CardProject({ className, project, ...props }: CardProjectProps) {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState("");
    const [description, setDescription] = useState(project.attributes.description);
    const [title, setTitle] = useState(project.attributes.title);
    const updateProject = useUpdateProject();
    const deleteProject = deleteProjectApi();
    
    if (!token) {
        return null;
    }

    const { data: researcher, isLoading, isError } = fetchAllResearchers(token);

   
    const handleDelete = async () => {
        deleteProject.mutate({ token: token, id: parseInt(project.id) });    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        console.log(selectedValue)
        const data = {
            description,
            title,
            start_date: new Date().toISOString().slice(0, 10),
            end_date: new Date().toISOString().slice(0, 10),
            project_manager: selectedValue
            // Add other fields as necessary
        };
        updateProject.mutate({ id: project.id, data, token });
    };

    function handleSelectChange(value: string) {
        setSelectedValue(value);
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;
    if (!researcher) return null;

    const researchers = new Map(researcher.data.map((r) => [r.id, r.attributes.name]));

    return (
        <Card className={cn("w-[380px]", className)} {...props}>
            <CardHeader>
                <BellRing />
                <CardTitle>{project.attributes.title}</CardTitle>
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
            <CardFooter className="felx items-center justify-center gap-1   ">
                <Button variant="destructive" className="" onClick={handleDelete}>
                    <Cross1Icon className="mr-2 h-4 w-4" /> Delete this project
                </Button>


                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="default">Update project</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogTitle>Update Publication</DialogTitle>
                        <form onSubmit={handleUpdate}>
                            <div className="flex flex-col gap-2 mt-2">
                                <label>Title</label>
                                <Input type="text" id="title" name="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                            <div className="flex flex-col gap-2 mt-2">
                                <label>Description</label>
                                <textarea className="border border-black rounded" id="description" name="description" placeholder="Project description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                            <div className="flex flex-col gap-2 mt-2">
                                <label>Researchers</label>
                                <SelectManager onSelectionChange={handleSelectChange} />
                                </div>
                            <DialogFooter>
                                <Button type="submit" variant="outline" className="mt-4">Update project</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>


            </CardFooter>
        </Card>
    );
}