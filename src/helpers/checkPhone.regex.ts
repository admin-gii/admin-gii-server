export function checkPhone(phone: number) {
  const Phone = phone.toString();
  const regex = /^9989[012345789][0-9]{7}$/;
  return regex.test(Phone);
}
