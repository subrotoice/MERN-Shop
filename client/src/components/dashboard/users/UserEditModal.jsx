import React from "react"

const UserEditModal = ({
  isOpen,
  onClose,
  user,
  setUser,
  onUpdate
}) => {
  if (!isOpen) return null

  return (
    <dialog id="edit_product_modal" className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit User</h3>
        <div className="form-control mb-4">
          <label className="label">Name</label>
          <input
            type="text"
            value={user.name}
            onChange={e =>
              setUser(prev =>
                prev ? { ...prev, name: e.target.value } : null
              )
            }
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
            type="number"
            value={user.phone}
            onChange={e =>
                setUser(prev =>
                  prev ? { ...prev, phone: e.target.value } : null
                )
              }
            className="input input-bordered"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">Address</label>
          <textarea
            value={user.address}
            onChange={(e) =>
                setUser((prev) =>
                prev ? { ...prev, address: e.target.value } : null
              )
            }
            className="textarea textarea-bordered"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">Photo URL</label>
          <input
            type="text"
            value={user.photoURL}
            onChange={(e) =>
                setUser((prev) =>
                prev ? { ...prev, photoURL: e.target.value } : null
              )
            }
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
  )
}

export default UserEditModal
