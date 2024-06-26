import { fetchAllProjects } from "@/api/client";
import { CardProject } from "@/components/card-project";
import { ModalForm } from "@/components/modal-form";
import { useAuth } from "@/context/auth/auth-provider";

export default function Dashboard() {
    const { token } = useAuth();

    if (!token) {
        return;
    }

    const { data: projectsData, isLoading, isError } = fetchAllProjects(token);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <div className="flex flex-col items-start">
            <div className="mb-4">
                <ModalForm />
            </div>
            <div className="grid grid-cols-4 gap-4 w-full mt-8">
                {projectsData && projectsData.data.length > 0 ? (
                    projectsData.data.map((project, index) => (
                        <CardProject key={index} project={project} />
                    ))
                ) : (
                    <h2 className="text-xl italic text-gray-600">Currently, there are no projects available. Feel free to create a new one!</h2>)}
            </div>
        </div>
    );
}