import { toast } from 'react-toastify';
// import { message as noti } from 'antd';

export function SuccessMessage(message: string) {
  toast.success(message, {
    autoClose: 1000,
  });
}

export function ErrorMessage(message: string | string[]) {
  if (typeof message === 'string') {
    toast.error(message, {
      autoClose: 4000,
    });
    // noti.error(message);
  } else if (Array.isArray(message)) {
    message.forEach((msg) => {
      toast.error(msg, {
        autoClose: 4000,
      });
      // noti.error(msg);
    });
  }
}
