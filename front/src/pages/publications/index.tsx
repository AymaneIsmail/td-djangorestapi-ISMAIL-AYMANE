import React, { useState, useEffect } from 'react';
import { fetchAllPublications } from "@/api/client";
import { useAuth } from "@/context/auth/auth-provider";
import { PublicationsResponse } from "@/interface/types"; // Ensure you have this type defined

export default function Publications() {
    const { token } = useAuth(); // Assuming useAuth returns an object with a token
    const [publications, setPublications] = useState<PublicationsResponse | null>(null);

    useEffect(() => {
        const fetchPublications = async () => {
            if (token) {
                try {
                    const fetchedPublications = await fetchAllPublications(token);
                    console.log
                    setPublications(fetchedPublications);
                } catch (error) {
                    console.error("Failed to fetch publications:", error);
                }
            }
        };

        fetchPublications();
    }, [token]);
    console.log(publications)
    return (
        <div className="flex flex-col items-start">
            <div className="mb-4">
                {/* ModalForm or other components can go here */}
            </div>
            <div className="grid grid-cols-4 gap-4 w-full mt-8">
                {publications ? (
                    publications.data.map((publication) => (
                        <div key={publication.id}>
                            {/* Replace this div with your CardProject or a similar component to display publication details */}
                            <p>{publication.attributes.title}</p>
                        </div>
                    ))
                ) : (
                    <p>Loading publications...</p>
                )}
            </div>
        </div>
    );
}