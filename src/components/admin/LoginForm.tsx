import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

interface LoginFormProps {
  onLogin: (password: string) => void;
  showError: boolean;
  errorMessage: string;
}

const LoginForm = ({ onLogin, showError, errorMessage }: LoginFormProps) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Lock" size={32} className="text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-slate-900 mb-6">
          Вход в админ-панель
        </h1>

        {showError && (
          <Alert className="mb-6 bg-red-50 border-red-200">
            <Icon name="AlertCircle" size={18} className="text-red-600" />
            <AlertDescription className="text-red-800 ml-2">
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full">
            Войти
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
