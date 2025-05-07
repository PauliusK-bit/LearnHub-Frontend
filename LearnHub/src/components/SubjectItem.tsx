import { Link } from "react-router";
import { SubjectProps } from "./types";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #4f46e5;
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e0e7ff;
    color: #3730a3;
  }
`;

const SubjectItem = ({ data }: SubjectProps) => {
  const { name, description, _id } = data;

  return (
    <>
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="list-row">
          <div>
            <StyledLink className="styled-link" to={`/subjects/${_id}`}>
              {name}
            </StyledLink>
            <div className="text-xs uppercase font-semibold opacity-60">
              {description}
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};

export default SubjectItem;
