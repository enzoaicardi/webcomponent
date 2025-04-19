export const toKebabCase = (string: string) =>
    string.replace(/([A-Z])/g, "-$1").toLowerCase();

export const toCamelCase = (string: string) =>
    string.replace(/-([a-z])/g, (_, $1) => $1.toUpperCase());
