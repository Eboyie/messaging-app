// Function to format chat time
export const chatTime = (dateString) => {
  const date = new Date(dateString);
  const hours = padTo2Digits(date.getHours());
  const minutes = padTo2Digits(date.getMinutes());
  return `${hours}:${minutes}`;
};

// Function to pad a number to 2 digits
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}
