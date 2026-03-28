import { useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../../lib/supabase';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export function LoginModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

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
        <LogoImg src="/images/LOGOADA.png" alt="Academia de Arte Musical" />
        <Title>Academia de Arte Musical</Title>
        <CatalogTag>Catálogo Musical</CatalogTag>
        <Subtitle>ACCESO USUARIOS</Subtitle>
        

        <Input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <PasswordWrapper>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
<EyeButton onClick={() => setShowPassword(!showPassword)}>
  {showPassword ? <FiEyeOff size={18} color="#aaaaaa" /> : <FiEye size={18} color="#aaaaaa" />}
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
  background: linear-gradient(135deg, #1a3a0f 0%, #2d5a1b 40%, #4D7F39 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 40px 32px;
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const LogoImg = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 50%;
`;

const Title = styled.h2`
  color: #1a1a1a;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  margin: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const Subtitle = styled.p`
  color: #67A943;
  font-size: 12px;
  letter-spacing: 2px;
  margin: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid rgba(103, 169, 67, 0.4);
  background: #f9f9f9;
  color: #1a1a1a;
  font-size: 15px;
  outline: none;
  box-sizing: border-box;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

  &::placeholder {
    color: #aaaaaa;
  }

  &:focus {
    border-color: #67A943;
    background: #ffffff;
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
  color: #e53e3e;
  font-size: 13px;
  margin: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
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
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

  &:disabled {
    opacity: 0.6;
  }

  &:active {
    background: #4D7F39;
  }
`;

const CatalogTag = styled.p`
  color: #4D7F39;
  font-size: 13px;
  font-weight: 600;
  margin: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;