import { Modal } from 'antd';
import { useState } from 'react';
import AuthForm from '../Auth/AuthForm';
import { useNavigate } from 'react-router-dom';

function PopupModal() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');

  const handleCancel = () => {
    navigate('/');
  };

  const toggleMode = (mode: string) => {
    setMode(mode);
  };
  return (
    <>
      <Modal
        open={true}
        onCancel={handleCancel}
        footer={null}
        className='modalStyle'
      >
        <AuthForm mode={mode} toggleMode={toggleMode} />
      </Modal>
    </>
  );
}

export default PopupModal;
