import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query';
import { Toaster, toast } from 'sonner';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Agents } from './pages/Agents/Agents';
import { Transactions } from './pages/Transactions/Transactions';
import { Rules } from './pages/Rules/Rules';
import { Settings } from './pages/Settings/Settings';
import { Profile } from './pages/Profile/Profile';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';

// Create a globally accessible TanStack Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes cache
    },
  },
  queryCache: new QueryCache({
    onError: (error: any, query: any) => {
      // Global error handler for all READ queries
      if (query.meta?.errorMessage) {
        toast.error(query.meta.errorMessage as string);
      } else if (!query.state.data) {
        // Only toast if we don't have existing cached data (to avoid noisy sync errors)
        toast.error(`Sync Error: ${error.message || 'Check terminal logs.'}`);
      }
    },
  }),
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      // Global success handler for WRITE mutations
      if (mutation.options.meta?.successMessage) {
        toast.success(mutation.options.meta.successMessage as string);
      }
    },
    onError: (error: any, _variables, _context, mutation) => {
      // Global error handler for all WRITE mutations (Create, Update, Delete)
      const message = mutation.options.meta?.errorMessage || error.message || 'Operation failed.';
      toast.error(message as string);
    },
  }),
});

const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return null; // Avoid redirecting while checking session
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster 
        theme="dark" 
        position="top-right" 
        expand={false} 
        richColors 
        toastOptions={{
          style: {
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
          },
        }}
      />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            } />
            
            <Route path="/register" element={
              <PublicOnlyRoute>
                <Register />
              </PublicOnlyRoute>
            } />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="agents" element={<Agents />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="rules" element={<Rules />} />
                <Route path="settings" element={<Settings />} />
                <Route path="profile" element={<Profile />} />
                <Route path="*" element={
                  <div style={{color: '#0f172a', padding: '40px', fontSize: '20px', fontWeight: 600}}>
                    ⚙️ Feature set for this route is coming soon.
                  </div>
                } />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
