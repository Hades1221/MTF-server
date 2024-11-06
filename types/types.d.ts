interface ApiResponse {
    isSuccessful: boolean;
    displayMessage: string | null;
    description: string | null;
    exception: string | null;
    timestamp: string | null;
    data?: object;
  }

 declare namespace NodeJS {
    interface ProcessEnv {
      PORT : string;
      DB_NAME: string;
      DB_USER_NAME:string;
      DB_PASSWORD :string;
    }
  }  