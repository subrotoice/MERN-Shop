import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa6";
import { LuPencilLine } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import ShowCategoryModal from "../../components/dashboard/categories/ShowCategoryModal";
import useCategories from "../../hooks/useCategories";
import { Category } from "../../components/ProductsComponent";
import CreateCategoryModal from "../../components/dashboard/categories/CreateCategoryModal";
import EditCategoryModal from "../../components/dashboard/categories/EditCategoryModal";

const AdminCategories: React.FC = () => {
  const fetchedCategories = useCategories();
  const [categories, setCategories] = useState<Category[]>([]);
  const [updatedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    setCategories(fetchedCategories);
  }, [fetchedCategories]);

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedCategory(null);
    setIsModalOpen(false);
  };

  const handleUpdate = async (updatedCategory: Category) => {
    if (updatedCategory) {
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat._id === updatedCategory._id ? updatedCategory : cat
        )
      );
      try {
        await axios.put(
          `http://localhost:5000/api/categories/${updatedCategory._id}`,
          updatedCategory
        );
        setIsModalOpen(false);
        toast.success("Category Updated", {
          duration: 3000,
          position: "top-right",
        });
      } catch (error) {
        console.error("Error updating category:", error);
      }
    }
  };

  const handleDelete = async (category: Category) => {
    const isConfirm = confirm(`Are you sure to delete ${category.name}?`);
    if (isConfirm) {
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat._id !== category._id)
      );
      toast.error("Category Deleted", {
        duration: 3000,
        position: "top-right",
      });
      try {
        await axios.delete(
          `http://localhost:5000/api/categories/${category._id}`
        );
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const handleViewClick = (category: Category) => {
    setSelectedCategory(category);
    setIsShowModalOpen(true);
  };

  const handleShowModalClose = () => {
    setSelectedCategory(null);
    setIsShowModalOpen(false);
  };

  const handleCreateModalOpen = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
  };

  const handleCategoryCreated = (newCategory: Category) => {
    toast.success("Category Created", {
      duration: 3000,
      position: "top-right",
    });
    setCategories([newCategory, ...categories]);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleCreateModalOpen}
          >
            Add Category
          </button>
        </div>
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <div className="flex gap-2">
                    <button onClick={() => handleViewClick(category)}>
                      <FaEye className="h-6 w-6" />
                    </button>
                    <button onClick={() => handleEditClick(category)}>
                      <LuPencilLine className="h-6 w-6" />
                    </button>
                    <button onClick={() => handleDelete(category)}>
                      <MdDeleteForever className="h-6 w-6 text-red-700" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {isModalOpen && updatedCategory && (
        <EditCategoryModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          category={updatedCategory}
          setCategory={setSelectedCategory}
          onUpdate={handleUpdate}
        />
      )}

      {isShowModalOpen && updatedCategory && (
        <ShowCategoryModal
          isOpen={isShowModalOpen}
          onClose={handleShowModalClose}
          category={updatedCategory}
        />
      )}

      {isCreateModalOpen && (
        <CreateCategoryModal
          isOpen={isCreateModalOpen}
          onClose={handleCreateModalClose}
          onCategoryCreated={handleCategoryCreated}
        />
      )}
    </div>
  );
};

export default AdminCategories;
