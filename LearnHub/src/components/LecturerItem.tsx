import { LecturerProps } from "./types";

const LecturerItem = ({ data }: LecturerProps) => {
  const { name, surname, email, _id } = data;

  return (
    <>
      <div>
        <h1>
          {name} {surname}
        </h1>
        <p>{email}</p>
        <p>{_id}</p>
      </div>
    </>
  );
};

export default LecturerItem;
