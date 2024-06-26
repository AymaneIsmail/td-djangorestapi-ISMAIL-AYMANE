import { fetchAllResearchers, useCreateResearcher, useDeleteResearcher } from "@/api/client";
import { useAuth } from "@/context/auth/auth-provider";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DataTableSearchers } from "@/components/data-table-researchers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function Researchers() {
    const createResearcher = useCreateResearcher();
    const { token } = useAuth();
    const { data: researchers, isLoading, error } = fetchAllResearchers(token);

    if (!token) {
        return 'No token found';
    }


    if (isLoading) {
        return <p>Loading researchers...</p>;
    }

    if (error || !researchers) {
        return <p>Error fetching researchers</p>;
    }

    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const nameElement = e.currentTarget.elements.namedItem('name') as HTMLInputElement;
        const specialtyElement = e.currentTarget.elements.namedItem('specialty') as HTMLInputElement;

        if (!nameElement || !specialtyElement) {
            return;
        }

        const name = nameElement.value;
        const specialty = specialtyElement.value;

        const data = {
            name,
            specialty,
            projects: []
        };

        createResearcher.mutate({ data, token });
    };

    return (
        <div className="flex flex-col items-start">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="default">Create new researcher</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <div> {/* Add a wrapping div here */}
                        <DialogHeader>
                            <DialogTitle>Create new researcher</DialogTitle>
                            <DialogDescription>
                                Fill in the details below to create a new researcher.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-2 mt-2">
                                <label>Name</label>
                                <Input type="text" id="name" name="name" placeholder="Researcher name" className="col-span-3" style={{ height: '2.5rem' }} />
                            </div>
                            <div className="flex flex-col gap-2 mt-2">
                                <label>speciality</label>
                                <Input type="text" id="specialty" name="specialty" placeholder="Researcher specialty" className="col-span-3" style={{ height: '2.5rem' }} />
                            </div>
                            {/* Add other fields as necessary */}
                            <DialogFooter>
                                <Button type="submit" variant="outline" className="mt-4">Create researcher</Button>
                            </DialogFooter>
                        </form>
                    </div> {/* Closing the wrapping div */}
                </DialogContent>
            </Dialog>
            <DataTableSearchers data={researchers.data} />
        </div>
    );
}