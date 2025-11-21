// User Dashboard - Notifications
// User notification messages and alerts

export interface UserNotification {
  id: number;
  text: string;
  time: string;
  type: 'warning' | 'success' | 'info' | 'error';
}

const notificationsData: UserNotification[] = [
  {
    id: 1,
    text: 'Kelembaban tanah rendah - Irigasi otomatis aktif',
    time: '5 menit lalu',
    type: 'warning'
  },
  {
    id: 2,
    text: 'Suhu optimal tercapai',
    time: '1 jam lalu',
    type: 'success'
  },
  {
    id: 3,
    text: 'Sistem irigasi berjalan normal',
    time: '2 jam lalu',
    type: 'info'
  },
  {
    id: 4,
    text: 'Data sensor berhasil disinkronkan',
    time: '3 jam lalu',
    type: 'success'
  }
];

/**
 * Fetches user notifications
 * @param delay - Simulated network delay in milliseconds
 * @returns Promise<UserNotification[]>
 */
export async function fetchUserNotifications(delay: number = 300): Promise<UserNotification[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(notificationsData), delay);
  });
}

export { notificationsData as default };
