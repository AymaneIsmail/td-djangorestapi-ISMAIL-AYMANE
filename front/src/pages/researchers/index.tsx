import React, { useState, useEffect } from 'react';
import { fetchAllResearchers } from "@/api/client"; 
import { CardResearcher } from "@/components/card-researcher"; 
import { useAuth } from "@/context/auth/auth-provider";
import { DataTableSearchers } from '@/components/data-table-researchers';

export default function Researchers() {
    const { token } = useAuth(); 

    if(!token) {
        return null;
    }

    const {data: researchers, isLoading, error} = fetchAllResearchers(token);

    if(isLoading) {
        return <p>Loading researchers...</p>
    }

    if(error || !researchers) {
        return <p>Error fetching researchers</p>
    }


    return (
        <div className="flex flex-col items-start">
           <DataTableSearchers />
        </div>
    );
}