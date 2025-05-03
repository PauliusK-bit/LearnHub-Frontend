import { StudentProps } from "./types";

const StudentItem = ({ data }: StudentProps) => {
  const { name, email } = data;

  return (
    <>
      <h3>{name}</h3>
      <h5>{email}</h5>
    </>
  );
};

export default StudentItem;
