export default (dateTime: string | undefined) => {
  if (!dateTime) {
    return;
  }

  return new Date(dateTime).toLocaleTimeString().slice(0, 5);
};
