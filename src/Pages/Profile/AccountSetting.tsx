import { useEffect, useState } from 'react';
import styles from './AccountSetting.module.css';
import { Button, Popconfirm } from 'antd';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { sessionUser, updateProfile } from '../../api/connection';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, SuccessMessage } from '../../utils/notify';
import { BACKEND_URL } from '../../constants/constants';
function AccountSetting() {
  type ProfileData = {
    full_name: string;
    address: string;
    phone_number: string;
    avatar: File | null;
  };
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData>({
    full_name: '',
    address: '',
    phone_number: '',
    avatar: null,
  });

  const handleChangeProfile = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    if (event.target.type === 'file') {
      const file = event.target.files && event.target.files[0];
      setProfileData({ ...profileData, [field]: file });
    } else {
      setProfileData({ ...profileData, [field]: event.target.value });
    }
  };

  //   Delete account on confirm
  function confirm(id: string) {
    console.log(id);
  }

  const session = localStorage.getItem('jwtToken');
  const { data: userInfo, isLoading } = useQuery('users', () =>
    sessionUser(session)
      .then((res) => {
        return res.data.data;
      })
      .catch((error) => {
        if (error) {
          localStorage.removeItem('jwtToken');
          navigate('/login');
        }
      })
  );

  // Update profileData when userInfo changes
  useEffect(() => {
    if (userInfo) {
      setProfileData({
        full_name: userInfo.full_name || '',
        address: userInfo.address || '',
        phone_number: userInfo.phone_number || '',
        avatar: null,
      });
    }
  }, [userInfo]);

  const updateUserProfile = useMutation(
    () => updateProfile(profileData, session),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
        SuccessMessage('Profile Updated Successfully.');
      },
      onError: (error: any) => {
        ErrorMessage(error.response.data.message);
      },
    }
  );

  const handleProfileUpdate = () => {
    updateUserProfile.mutate();
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div className={styles.account_settings}>
        <div className={styles.details}>
          <img
            className={styles.avatar}
            src={`${
              userInfo?.avatar
                ? BACKEND_URL + userInfo?.avatar
                : 'https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg'
            }`}
            alt=''
            height={200}
            width={200}
          />
          <h3 className={styles.userName}>{userInfo?.full_name}</h3>
          <p className={styles.email}>{userInfo?.email}</p>
          <Popconfirm
            title='Delete Account'
            description='Are you sure to delete this account?'
            onConfirm={() => confirm(userInfo?.id)}
            okText='Yes'
            cancelText='No'
          >
            <Button danger>Delete Account</Button>
          </Popconfirm>
        </div>
        <div className={styles.account_settings_form}>
          <h2 className={styles.account_settings_h2}>Update your Profile</h2>
          <label>
            Full Name <span>*</span>
          </label>
          <br />
          <input
            type='text'
            name='full_name'
            id='full_name'
            placeholder='John Doe'
            value={profileData.full_name}
            onChange={(e) => handleChangeProfile(e, 'full_name')}
            required
          />
          <br />

          <label>
            Avatar <span>*</span>
          </label>
          <br />
          <input
            type='file'
            name='avatar'
            id='avatar'
            onChange={(e) => handleChangeProfile(e, 'avatar')}
          />

          <label>
            Address <span>*</span>
          </label>
          <br />
          <input
            type='text'
            name='address'
            id='address'
            placeholder='address'
            value={profileData.address}
            onChange={(e) => handleChangeProfile(e, 'address')}
          />
          <br />

          <label>
            Contact / Phone <span>*</span>
          </label>
          <br />
          <input
            type='text'
            name='phone'
            id='phone'
            placeholder='+977 9800000000'
            value={profileData.phone_number}
            onChange={(e) => handleChangeProfile(e, 'phone_number')}
          />
          <br />

          <button
            className={styles.change}
            onClick={() => handleProfileUpdate()}
          >
            Update
          </button>
          <br />
        </div>
      </div>
    </>
  );
}

export default AccountSetting;
