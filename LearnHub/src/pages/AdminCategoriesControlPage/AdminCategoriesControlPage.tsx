import { useAuth } from "../../components/AuthContext";
import CategoryForm from "../../components/CategoryForm";

const AdminCategoriesControlPage = () => {
  const { user } = useAuth();

  const allowedRoles = ["ADMIN"];

  if (!user || !allowedRoles.includes(user.role)) {
    return <p>This page can see only Admin</p>;
  }

  return (
    <>
      <CategoryForm />
    </>
  );
};

export default AdminCategoriesControlPage;
