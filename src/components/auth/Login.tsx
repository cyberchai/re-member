'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { initiateGoogleSignIn } from '@/firebase/non-blocking-login';
import { useAuth } from '@/firebase/provider';
import { Chrome } from 'lucide-react';

export function Login() {
  const auth = useAuth();
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Sign in with your Google account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Button variant="outline" className="w-full" onClick={() => initiateGoogleSignIn(auth)}>
            <Chrome className="mr-2 h-4 w-4" />
            Sign in with Google
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
