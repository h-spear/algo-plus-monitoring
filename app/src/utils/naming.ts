export const snakeToCamel = (str: string): string => {
    return str.replace(/(_\w)/g, (match) => match[1].toUpperCase());
};

export const convertKeysToCamel = <T>(obj: any): T => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj))
        return obj.map((item) => convertKeysToCamel(item)) as unknown as T;
    return Object.keys(obj).reduce((acc: any, key) => {
        const camelKey = snakeToCamel(key);
        acc[camelKey] = convertKeysToCamel(obj[key]);
        return acc;
    }, {}) as T;
};
