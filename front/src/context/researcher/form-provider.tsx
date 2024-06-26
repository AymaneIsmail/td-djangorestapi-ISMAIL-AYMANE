import { fetchAllResearchers } from '@/api/client';
import React, { createContext, useContext, useState } from 'react';
import { useAuth } from '../auth/auth-provider';

interface FormContextProps {
    children: React.ReactNode; // Explicitly type 'children' as React.ReactNode
}

// Define the shape of the context
interface FormContextType {
    researcherId: string[] | null;
    researchers: Map<string, string> | null;
}


export const FormContext = createContext<FormContextType | undefined>(undefined);

export function useFormContext() {
    const context = useContext(FormContext);
    if (context === undefined) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
}

export function FormProvider({ children }: FormContextProps) {
    const { token } = useAuth();
    if (!token) {
        return <div>Not authenticated</div>;
    }

    const { data: researcher, isLoading, isError } = fetchAllResearchers(token);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    if (!researcher) {
        return <div>No data</div>;
    }
    const researchers = new Map(researcher.data.map((researcher) => [researcher.id, researcher.attributes.name]));

    const researcherId = researcher.data.map((researcher) => researcher.id);



    return <FormContext.Provider value={{ researcherId, researchers }}>{children}</FormContext.Provider>;
};