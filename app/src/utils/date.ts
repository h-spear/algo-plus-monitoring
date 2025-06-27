export const formatDateTime = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${formatDate(date)} ${hours}:${minutes}:${seconds}`;
};

export const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}. ${month}. ${day}`;
};

export const formatMonthDay = (date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}.${day}`;
};

export const getDateBefore = (date: Date, days: number): string => {
    date.setHours(0, 0, 0, 0);
    const pastDate = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
    const year = pastDate.getFullYear();
    const month = String(pastDate.getMonth() + 1).padStart(2, '0');
    const day = String(pastDate.getDate()).padStart(2, '0');
    return `${year}. ${month}. ${day}`;
};

export const formatDateToMonthDayYear = (dateStr: string): string => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
};
