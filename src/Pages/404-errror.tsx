import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

function NotFoundError() {
  const navigate = useNavigate();
  return (
    <>
      <div className='container'>
        <Result
          status='404'
          title='404'
          subTitle='Sorry, the page you visited does not exist.'
          extra={
            <Button type='primary' onClick={() => navigate('/')}>
              Back Home
            </Button>
          }
        />
      </div>
    </>
  );
}

export default NotFoundError;
