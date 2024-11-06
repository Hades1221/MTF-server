
export interface ApiResponse<T = any> {
    isSuccessful: boolean;
    displayMessage: string | null;
    description: string | null;
    exception: string | null;
    timestamp: Date | null;
    data: T;
}

export const createApiResponse = <T>(
    isSuccessful: boolean,
    data: T = {} as T,
    displayMessage: string | null = null,
    description: string | null = null,
    exception: string | null = null
): ApiResponse<T> => {
    return {
        isSuccessful,
        displayMessage,
        description,
        exception,
        timestamp: new Date(),
        data,
    };
};