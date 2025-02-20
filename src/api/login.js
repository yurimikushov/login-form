export const login = (email, password) => {
  return new Promise((resolve) => {
    console.log("Singing in...", { email, password });
    setTimeout(() => {
      resolve({ success: true, json: () => Promise.resolve({ errors: [] }) });
    }, 1000);
  });
};
