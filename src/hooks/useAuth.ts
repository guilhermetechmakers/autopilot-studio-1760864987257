import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// Mock user data
const mockUser = {
  id: '1',
  email: 'john@company.com',
  full_name: 'John Doe',
  avatar_url: '/avatars/01.png',
  company: 'TechCorp Inc.',
  role: 'admin',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-02-10T00:00:00Z'
};

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  company?: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface SignUpInput {
  email: string;
  password: string;
  full_name: string;
  company?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Query keys
export const authKeys = {
  user: ['auth', 'user'] as const,
};

// Get current user
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.user,
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('No auth token');
      }
      return mockUser;
    },
    retry: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
    enabled: !!localStorage.getItem('auth_token'),
  });
};

// Sign in mutation
export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: SignInInput) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication
      if (credentials.email === 'john@company.com' && credentials.password === 'password') {
        const token = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('auth_token', token);
        
        return {
          user: mockUser,
          token
        };
      } else {
        throw new Error('Invalid credentials');
      }
    },
    onSuccess: (data) => {
      // Update the user in the cache
      queryClient.setQueryData(authKeys.user, data.user);
      
      toast.success('Signed in successfully!');
    },
    onError: (error: any) => {
      toast.error(`Sign in failed: ${error.message}`);
    },
  });
};

// Sign up mutation
export const useSignUp = () => {
  return useMutation({
    mutationFn: async (credentials: SignUpInput) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const token = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('auth_token', token);
      
      const newUser: User = {
        id: Date.now().toString(),
        email: credentials.email,
        full_name: credentials.full_name,
        company: credentials.company,
        role: 'user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      return {
        user: newUser,
        token
      };
    },
    onSuccess: () => {
      toast.success('Account created! Please check your email to verify your account.');
    },
    onError: (error: any) => {
      toast.error(`Sign up failed: ${error.message}`);
    },
  });
};

// Sign out mutation
export const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      localStorage.removeItem('auth_token');
    },
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      
      toast.success('Signed out successfully!');
    },
    onError: (error: any) => {
      toast.error(`Sign out failed: ${error.message}`);
    },
  });
};

// Password reset mutation
export const usePasswordReset = () => {
  return useMutation({
    mutationFn: async (_email: string) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { message: 'Password reset email sent' };
    },
    onSuccess: () => {
      toast.success('Password reset email sent! Check your inbox.');
    },
    onError: (error: any) => {
      toast.error(`Password reset failed: ${error.message}`);
    },
  });
};