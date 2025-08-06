import { format, parse } from 'date-fns';
import { th } from 'date-fns/locale';

export const formattedTimeThai = (time: string) => {
    const date = parse(time, 'HH:mm', new Date()); // แปลง string เป็น Date object
    return format(date, 'HH:mm น.', { locale: th }); // แสดงผลแบบไทย
};
