import styled from 'styled-components';

const PRECIO_POR_CANCION = 5;

export function PaywallModal({ type = 'single', songCount = 1, context = '', action = 'descargar', onClose }) {
  const totalPrice = songCount * PRECIO_POR_CANCION;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={e => e.stopPropagation()}>
        <Icon>🎵</Icon>
        <Title>
          {action === 'descargar' ? 'Descargar' : 'Imprimir'} Material
        </Title>
        <Context>{context}</Context>
        <Price>${totalPrice} MXN</Price>
        {songCount > 1 && (
          <Detail>{songCount} canciones × $5 MXN</Detail>
        )}
        <Message>
          Acude a recepción para completar tu compra.
        </Message>
        <CTA>📍 Academia de Arte Musical — Recepción</CTA>
        <CloseButton onClick={onClose}>Cerrar</CloseButton>
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
  background: rgba(103, 169, 67, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(103, 169, 67, 0.3);
  border-radius: 16px;
  padding: 40px 32px;
  width: 90%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
`;

const Icon = styled.div`
  font-size: 48px;
`;

const Title = styled.h2`
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
`;

const Context = styled.p`
  color: #87BB88;
  font-size: 14px;
  margin: 0;
`;

const Price = styled.div`
  color: #7EBB41;
  font-size: 42px;
  font-weight: 800;
  margin: 8px 0;
`;

const Detail = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  margin: -8px 0 0;
`;

const Message = styled.p`
  color: #ffffff;
  font-size: 15px;
  margin: 8px 0 0;
`;

const CTA = styled.div`
  background: rgba(103, 169, 67, 0.2);
  border: 1px solid rgba(103, 169, 67, 0.3);
  border-radius: 8px;
  padding: 12px 20px;
  color: #87BB88;
  font-size: 13px;
  width: 100%;
  box-sizing: border-box;
`;

const CloseButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #67A943;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 8px;
  min-height: 44px;

  &:active {
    background: #4D7F39;
  }
`;