const loggerMock = {
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
    log: jest.fn(),
    add: jest.fn()
  };
  
export function mockWinston() {

    jest.mock('winston', () => ({
        format: {
            colorize: jest.fn(),
            combine: jest.fn(),
            label: jest.fn(),
            timestamp: jest.fn(),
            printf: jest.fn(),
            json: jest.fn(),
            simple: jest.fn()
        },
        createLogger: jest.fn().mockReturnValue(loggerMock),
        transports: {
            File: jest.fn(),
            Console: jest.fn()
        }
    }));

}
