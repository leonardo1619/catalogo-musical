import { useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../../lib/supabase';

export function LoginModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('Usuario o contraseña incorrectos');
    }
    setLoading(false);
  };

  return (
    <Overlay>
      <Modal>
        <Logo>🎵</Logo>
        <Title>Academia de Arte Musical</Title>
        <Subtitle>ACCESO USUARIOS</Subtitle>

        <Input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <PasswordWrapper>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <EyeButton onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? '🙈' : '👁️'}
          </EyeButton>
        </PasswordWrapper>

        {error && <ErrorMsg>{error}</ErrorMsg>}

        <LoginButton onClick={handleLogin} disabled={loading}>
          {loading ? 'Entrando...' : 'ENTRAR'}
        </LoginButton>
      </Modal>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: rgba(103, 169, 67, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(103, 169, 67, 0.3);
  border-radius: 16px;
  padding: 40px 32px;
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Logo = styled.div`
  font-size: 48px;
`;

const Title = styled.h2`
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  margin: 0;
`;

const Subtitle = styled.p`
  color: #87BB88;
  font-size: 13px;
  letter-spacing: 2px;
  margin: 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid rgba(103, 169, 67, 0.4);
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  font-size: 15px;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  &:focus {
    border-color: #67A943;
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const EyeButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 4px;
`;

const ErrorMsg = styled.p`
  color: #ff6b6b;
  font-size: 13px;
  margin: 0;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #67A943;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  margin-top: 8px;
  min-height: 44px;

  &:disabled {
    opacity: 0.6;
  }

  &:active {
    background: #4D7F39;
  }
`;