import { UnixTimeToDatePipe } from './unix-time-to-date.pipe';

describe('UnixTimeToDatePipe', () => {
  let pipe: UnixTimeToDatePipe;

  beforeEach(() => {
    pipe = new UnixTimeToDatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform Unix time to Date object', () => {
    const unixTime = 1644998400;
    const result = pipe.transform(unixTime);
    expect(result instanceof Date).toBeTruthy();
    expect(result.getTime()).toEqual(unixTime * 1000); // Ensure the time is in milliseconds
  });
});