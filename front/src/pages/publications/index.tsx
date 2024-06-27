import React, { useState, useEffect } from 'react';
import { fetchAllPublications } from "@/api/client";
import { useAuth } from "@/context/auth/auth-provider";
import { PublicationsResponse } from "@/interface/types"; // Ensure you have this type defined
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { PaperPlaneIcon, Cross1Icon } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export default function Publications() {
    const { token } = useAuth(); // Assuming useAuth returns an object with a token
    const [publications, setPublications] = useState<PublicationsResponse | null>(null);

    useEffect(() => {
        const fetchPublications = async () => {
            if (token) {
                try {
                    const fetchedPublications = await fetchAllPublications(token);
                    setPublications(fetchedPublications);
                } catch (error) {
                    console.error("Failed to fetch publications:", error);
                }
            }
        };

        fetchPublications();
    }, [token]);

    function handleUpdate() {
        // Implement update logic here
    }

    return (
        <div className="grid grid-cols-4 gap-4 w-full mt-8">
            {publications ? (
                publications.data.map((publication) => (
                    <Card key={publication.id}>
                        <CardHeader>
                            <PaperPlaneIcon />
                            <CardTitle>{publication.attributes.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Add content here, e.g., publication abstract */}
                            <p>{publication.attributes.abstract}</p>
                        </CardContent>
                        <CardFooter>
                            {/* Footer content or actions for each publication */}
                            <Button variant="destructive" className="mr-2">
                                <Cross1Icon className="mr-2 h-4 w-4" /> Delete this publication
                            </Button>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button disabled variant="default">Update publication</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                        <DialogTitle>Update Publication</DialogTitle>
                                    <form onSubmit={handleUpdate}>
                                        <div className="flex flex-col gap-2 mt-2">
                                            <label>Abstract</label>
                                            <Input type="abstract" id="abstract" name="abstract" placeholder="abstract" className="col-span-3" style={{ height: '2.5rem' }} value={publication.attributes.abstract} />
                                        </div>
                                        <div className="flex flex-col gap-2 mt-2">
                                            <label>Description</label>
                                            <textarea id="description" name="description" placeholder="Project description" className="col-span-3 border border-black rounded-sm" style={{ height: '2.5rem' }} />
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" variant="outline" className="mt-4">Create project</Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </CardFooter>
                    </Card>
                ))
            ) : (
                <p>Loading publications...</p>
            )}
        </div>
    );
}