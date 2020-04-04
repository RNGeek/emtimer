const cbQueue: FrameRequestCallback[] = [];

export function enableAnimationFrameMock() {
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
    const rafId = cbQueue.length;
    cbQueue.unshift(cb);
    return rafId;
  });
  jest.spyOn(window, 'cancelAnimationFrame').mockImplementation((rafId) => {
    cbQueue.splice(rafId, 1);
  });
}

export function disableAnimationFrameMock() {
  jest.spyOn(window, 'requestAnimationFrame').mockRestore();
  jest.spyOn(window, 'cancelAnimationFrame').mockRestore();
}

export function advanceAnimationFrame() {
  cbQueue.forEach((cb) => cb(Date.now()));
  cbQueue.length = 0;
}
