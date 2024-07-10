type Birthday = {
  day: string;
  month: string;
  year: string;
};

export const ReturnAge = (dob: Birthday): number => {
  const today = new Date();
  const birthDate = new Date(`${dob.year}-${dob.month}-${dob.day}`);
  let age = today.getFullYear() - parseInt(dob.year);
  const month = today.getMonth() - parseInt(dob.month) - 1;
  if (month < 0 || (month === 0 && today.getDate() < parseInt(dob.day))) {
    age--;
  }
  return age;
};

export const returnDob = (age: number) => {
  if (age === undefined) return undefined;
  const today = new Date();
  const birthDate = new Date(
    today.getFullYear() - age,
    today.getMonth(),
    today.getDate()
  );
  return birthDate;
};
