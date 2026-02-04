import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export default function AdminLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-logout on component mount
    logout();
    // Redirect to login page after a short delay to show logout message
    const timer = setTimeout(() => {
      navigate('/admin/login', { replace: true });
    }, 1000);

    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 gradient-primary rounded-2xl">
              <svg className="h-8 w-8 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                PulsePoint Admin
              </h1>
              <p className="text-sm text-muted-foreground">Administrative Panel</p>
            </div>
          </div>
        </div>

        <div className="glass-card border-none shadow-soft p-8 text-center rounded-xl">
          <div className="mb-6">
            <svg className="h-16 w-16 mx-auto text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <h2 className="text-2xl font-display font-bold mb-2">Logging Out</h2>
            <p className="text-muted-foreground">You have been successfully logged out</p>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/admin/login')}
              className="w-full gradient-primary text-primary-foreground shadow-glow-primary hover:shadow-elevated hover:scale-[1.02] transition-all duration-300"
            >
              Login
            </Button>
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-muted-foreground">
          <p>For administrative use only</p>
        </div>
      </div>
    </div>
  );
}