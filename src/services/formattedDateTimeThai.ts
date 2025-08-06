import { format } from 'date-fns';
import { th } from 'date-fns/locale';

export const formattedDateTimeThai = (time: string) => {
    const date = new Date(time); // ✅ แปลง ISO string เป็น Date
    return format(date, 'HH:mm น.', { locale: th });
};
