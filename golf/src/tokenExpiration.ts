const MAX_TIMEOUT_DELAY = 24 * 60 * 60 * 1000;

export const scheduleTokenExpiration = (
    expiresAt: number,
    onExpire: () => void
) => {
    const delay = expiresAt - Date.now();
    if (delay > MAX_TIMEOUT_DELAY) {
        return;
    }

    const timeout = setTimeout(onExpire, Math.max(0, delay));
    return () => clearTimeout(timeout);
};
