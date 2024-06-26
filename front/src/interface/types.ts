export type ProjectManager = {
  id: number;
  name: string;
  specialty: string;
  projects: any[]; // Consider specifying a more detailed type instead of any if the structure of projects is known
};
  
export type ResearchProject = {
  type: "ResearchProject";
  id: string;
  attributes: {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
  };
  relationships: {
    project_manager: {
      data: {
        type: "Researcher";
        id: string;
      };
    };
  };
};
  
  export type ResearchProjectsResponse = {
    data: ResearchProject[];
  };

  export interface ResearcherAttributes {
    name: string;
    specialty: string;
  }
  
  export interface ProjectMeta {
    count: number;
  }
  
  export interface ProjectRelationships {
    data: any[]; // Assuming no specific structure for project data here, adjust as necessary
    meta: ProjectMeta;
  }
  
  interface Researcher {
    type: string;
    id: string;
    attributes: ResearcherAttributes;
    relationships: {
      projects: ProjectRelationships;
    };
  }
  
  export interface ResearchersResponse {
    data: Researcher[];
  }

  export type ResearchProjectAttributes = {
    title: string;
    description: string;
    start_date: string; // Format YYYY-MM-DD
    end_date: string;   // Format YYYY-MM-DD
    project_manager: number;
  };
  
  export type ResearchProjectRequest = {
    data: {
      type: "ResearchProject";
      attributes: ResearchProjectAttributes;
    };
  };