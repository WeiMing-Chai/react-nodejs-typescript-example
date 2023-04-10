export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APPLICATION_ID: string;
      DB_USER: string;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}
