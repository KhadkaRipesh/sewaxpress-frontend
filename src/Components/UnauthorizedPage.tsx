import { Result } from 'antd';

function UnauthorizedPage() {
  return (
    <>
      <div className='container'>
        <Result
          status='403'
          title='403'
          subTitle='Sorry, you are not authorized to access this page.'
        />
      </div>
    </>
  );
}

export default UnauthorizedPage;
