const authService = {
    setToken: (token: string): void => {
        localStorage.setItem("token", token);
    },

    deleteToken: (): void => {
        localStorage.removeItem("token");
    },

    getAccessToken: (): string | null => localStorage.getItem("token")
}

export { authService }