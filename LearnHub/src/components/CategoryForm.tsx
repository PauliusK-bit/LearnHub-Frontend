import { useEffect, useState } from "react";
import { Category } from "./types";
import axios from "axios";
import { API_URL } from "../config/config";

const CategoryForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/categories`);
        setCategories(data);

        if (selectedCategoryId) {
          const selectedCategory: Category | undefined = data.find(
            (category: Category) => category._id === selectedCategoryId
          );
          if (selectedCategoryId) {
            setName(selectedCategory?.name || "");
            setDescription(selectedCategory?.description || "");
          } else {
            setName("");
            setDescription("");
          }
        } else {
          setName("");
          setDescription("");
        }
      } catch (error) {
        console.error("Klaida gaunant kategorijas:", error);
      }
    };

    fetchCategories();
  }, [selectedCategoryId]);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (selectedCategoryId) {
        const updatedCategory: Category = {
          _id: selectedCategoryId,
          name,
          description,
        };

        const { data } = await axios.put(
          `${API_URL}/categories/${selectedCategoryId}`,
          updatedCategory
        );
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category._id === selectedCategoryId ? updatedCategory : category
          )
        );
      } else {
        const newCategory: Category = {
          name,
          description,
        };

        const { data } = await axios.post(`${API_URL}/categories`, newCategory);

        setCategories((prevCategories) => [...prevCategories, data]);
      }

      setName("");
      setDescription("");

      setSelectedCategoryId(null);
    } catch (error) {
      console.log("Category was not created/updated", error);
    }
  };

  const deleteHandler = async (categoryId: string) => {
    try {
      await axios.delete(`${API_URL}/categories/${categoryId}`);

      setSelectedCategoryId(null);
      setName("");

      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== categoryId)
      );
    } catch (error) {
      console.error("Klaida trinant studentą:", error);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="name">Name:</label>
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {selectedCategoryId ? "Update Category" : "Add Category"}
        </button>
      </form>

      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            <span>{category.name}</span>
            <button
              type="button"
              onClick={() => setSelectedCategoryId(category._id)}
            >
              Edit
            </button>
            <button type="button" onClick={() => deleteHandler(category._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CategoryForm;
