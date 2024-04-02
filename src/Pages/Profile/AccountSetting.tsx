import styles from './AccountSetting.module.css';
function AccountSetting() {
  return (
    <>
      <div className={styles.accountsettings}>
        <h1 className={styles.mainhead1}>Personal Information</h1>
        <div className={styles.form}>
          <div className={styles.form_group}>
            <label htmlFor='name'>
              Full Name <span>*</span>
            </label>
            <input type='text' name='name' id='name' />
          </div>
          <div className={styles.form_group}>
            <label htmlFor='phone'>
              Phone / Mobile <span>*</span>
            </label>
            <input type='text' name='phone' id='phone' />
          </div>
          <div className={styles.form_group}>
            <label htmlFor='email'>
              Email <span>*</span>
            </label>
            <input type='text' name='email' id='email' />
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountSetting;
