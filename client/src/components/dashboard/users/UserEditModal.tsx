import React, { FC, ChangeEvent } from "react";

interface User {
  _id: string;
  firebaseUid: string;
  name: string;
  email: string;
  profilePic: string;
  createdAt: string;
  roles: string[];
  photoURL?: string;
  address?: string;
  phone?: string;
}

interface UserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  onUpdate: () => void;
}

const UserEditModal: FC<UserEditModalProps> = ({
  isOpen,
  onClose,
  user,
  setUser,
  onUpdate
}) => {
  if (!isOpen) return null;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof User
  ) => {
    setUser(prev =>
      prev ? { ...prev, [field]: e.target.value } : null
    );
  };

  return (
    <dialog id="edit_product_modal" className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit User</h3>
        <div className="form-control mb-4">
          <label className="label">Name</label>
          <input
            type="text"
            value={user.name}
            onChange={e => handleInputChange(e, "name")}
            className="input input-bordered"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="input input-bordered"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">Phone</label>
          <input
            type="tel"
            value={user.phone || ""}
            onChange={e => handleInputChange(e, "phone")}
            className="input input-bordered"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">Address</label>
          <textarea
            value={user.address || ""}
            onChange={e => handleInputChange(e, "address")}
            className="textarea textarea-bordered"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">Photo URL</label>
          <input
            type="text"
            value={user.photoURL || ""}
            onChange={e => handleInputChange(e, "photoURL")}
            className="input input-bordered"
          />
        </div>

        <div className="modal-action">
          <button onClick={onUpdate} className="btn btn-primary">
            Update
          </button>
          <button onClick={onClose} className="btn">
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default UserEditModal;
