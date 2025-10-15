'use client';

import {Login} from '@/components/auth/Login';
import MainLayout from '@/components/layouts/MainLayout';

export default function LoginPage() {
  return (
    <MainLayout>
      <div className="container mx-auto flex h-[calc(100vh-8rem)] flex-col items-center justify-center">
        <Login />
      </div>
    </MainLayout>
  );
}
