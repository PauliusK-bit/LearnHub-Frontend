import { Link } from "react-router";
import { useAuth } from "../../components/AuthContext";
import styled from "styled-components";

const TableWrapper = styled.div`
  overflow-x: auto;
  padding: 1rem;
  background-color: #1f2937;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  color: #fff;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #374151;
  padding: 0.75rem 1rem;
  text-align: left;
`;

const Tr = styled.tr`
  &:hover {
    background-color: #4b5563;
  }
`;

const Td = styled.td`
  padding: 0.75rem 1rem;
  text-align: center;
`;

const StyledLink = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  border-radius: 4px;
  color: #fff;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    background-color: #2563eb;
  }
`;

const AdminPage: React.FC = () => {
  const { user } = useAuth();

  if (!user || user.role !== "ADMIN") {
    return <div>This page can see only ADMIN</div>;
  }
  return (
    <>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Administration Page</Th>
            </tr>
          </thead>
          <tbody>
            <Tr>
              <Td>
                <StyledLink to="/lecturers-control">
                  Manage Lecturers
                </StyledLink>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <StyledLink to="/students-control">Manage Students</StyledLink>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <StyledLink to="/categories-control">
                  Manage Categories
                </StyledLink>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <StyledLink to="/subjects-control">Manage Subjects</StyledLink>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <StyledLink to="/events-control">Manage Events</StyledLink>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <StyledLink to="/videos">Manage Subject Lessons</StyledLink>
              </Td>
            </Tr>
          </tbody>
        </Table>
      </TableWrapper>
    </>
  );
};

export default AdminPage;
