import css from './ProfilePage.module.css';
import Link from 'next/link';
import { getMe } from '@/lib/api/serverApi';

// Додайте на сторінку профілю усі небхідні meta-теги.
//Для коректної роботи з віддаленими зображеннями у Next.js (аватар профілю) потрібно в next.config.ts
// додати розділ images з масивом remotePatterns, який обов’язково містить hostname: 'ac.goit.global'.

const Profile = async () => {
  const user = await getMe();

  return (
    <main className={css.mainContent}>
            <div className={css.profileCard}>
                <div className={css.header}>
                    <h1 className={css.formTitle}>Profile Page</h1>
                    <Link href="/profile/edit" className={css.editProfileButton}>
                        Edit Profile
                    </Link>
                </div>
                <div className={css.avatarWrapper}>
                    <img
                        src="Avatar"
                        alt="User Avatar"
                        width={120}
                        height={120}
                        className={css.avatar}
                    />
                </div>
                <div className={css.profileInfo}>
                    <p>
                        Name: {user.username}
                    </p>
                    <p>
                        Email: {user.email}
                    </p>
                </div>
            </div>
        </main>
  );
};

export default Profile;
