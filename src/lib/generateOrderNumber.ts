export const generateOrderNumber = () => {
    const randomNumber = Math.floor(10000 + Math.random() * 90000); // สุ่มเลข 5 หลัก
    return `ord-${randomNumber}`;
};
