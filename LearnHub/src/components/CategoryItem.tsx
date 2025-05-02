import { CategoryProps } from "./types";

const CategoryItem = ({ data }: CategoryProps) => {
  const { name, description } = data;

  return (
    <>
      <div>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </>
  );
};

export default CategoryItem;
