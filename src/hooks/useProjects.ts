import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// Mock data for demonstration
const mockProjects = [
  {
    id: '1',
    name: 'E-commerce Platform',
    client: 'TechCorp Inc.',
    status: 'In Progress',
    progress: 75,
    budget: 25000,
    deadline: '2024-02-15',
    priority: 'high',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-02-10T00:00:00Z'
  },
  {
    id: '2',
    name: 'Mobile App Redesign',
    client: 'StartupXYZ',
    status: 'Review',
    progress: 90,
    budget: 15000,
    deadline: '2024-02-10',
    priority: 'medium',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-02-08T00:00:00Z'
  },
  {
    id: '3',
    name: 'AI Integration',
    client: 'DataFlow Ltd.',
    status: 'Planning',
    progress: 25,
    budget: 35000,
    deadline: '2024-03-01',
    priority: 'low',
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-05T00:00:00Z'
  }
];

export interface Project {
  id: string;
  name: string;
  client: string;
  status: string;
  progress: number;
  budget: number;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  created_at: string;
  updated_at: string;
}

export interface CreateProjectInput {
  name: string;
  client: string;
  budget: number;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
}

export interface UpdateProjectInput {
  name?: string;
  client?: string;
  status?: string;
  progress?: number;
  budget?: number;
  deadline?: string;
  priority?: 'high' | 'medium' | 'low';
}

// Query keys
export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (filters: string) => [...projectKeys.lists(), { filters }] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
};

// Get all projects
export const useProjects = () => {
  return useQuery({
    queryKey: projectKeys.lists(),
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockProjects;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Get project by ID
export const useProject = (id: string) => {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const project = mockProjects.find(p => p.id === id);
      if (!project) {
        throw new Error('Project not found');
      }
      return project;
    },
    enabled: !!id,
  });
};

// Create project mutation
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (project: CreateProjectInput) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newProject: Project = {
        id: Date.now().toString(),
        ...project,
        status: 'Planning',
        progress: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return newProject;
    },
    onSuccess: (newProject) => {
      // Invalidate and refetch projects list
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      
      // Add the new project to the cache
      queryClient.setQueryData(projectKeys.detail(newProject.id), newProject);
      
      toast.success('Project created successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to create project: ${error.message}`);
    },
  });
};

// Update project mutation
export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: UpdateProjectInput }) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const existingProject = mockProjects.find(p => p.id === id);
      if (!existingProject) {
        throw new Error('Project not found');
      }
      const updatedProject = {
        ...existingProject,
        ...updates,
        updated_at: new Date().toISOString(),
      };
      return updatedProject;
    },
    onSuccess: (updatedProject) => {
      // Update the project in the cache
      queryClient.setQueryData(projectKeys.detail(updatedProject.id), updatedProject);
      
      // Invalidate projects list to ensure consistency
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      
      toast.success('Project updated successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to update project: ${error.message}`);
    },
  });
};

// Delete project mutation
export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const project = mockProjects.find(p => p.id === id);
      if (!project) {
        throw new Error('Project not found');
      }
      return id;
    },
    onSuccess: (deletedId) => {
      // Remove the project from the cache
      queryClient.removeQueries({ queryKey: projectKeys.detail(deletedId) });
      
      // Invalidate projects list
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      
      toast.success('Project deleted successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to delete project: ${error.message}`);
    },
  });
};