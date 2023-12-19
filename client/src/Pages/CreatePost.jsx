import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    picture: "",
    title: "",
    description: "",
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = async (e) => {
    if (files) {
      setUploading(true);
      setImageUploadError(false);
      const imageToUpload = files[0];
      const imageUrl = await storeImage(imageToUpload);
      if (!imageUrl) {
        setError("Image upload failed (2 MB max per image)");
        setLoading(false);
        return;
      }
      setFormData({
        ...formData,
        picture: imageUrl,
      });
      setLoading(false)
      setUploading(false)
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      picture: "",
    });
    setLoading(false)
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.picture)
        return setError("You must upload at least one image");

      setLoading(true);
      setError(false);

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          picture: formData.picture,
        }),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/post/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="p-3 container ">
      <h1 className="text-3xl text-muted font-semibold text-center my-7">
        Write a post
      </h1>
      <form onSubmit={handleSubmit} className="row gap-3 m-auto py-5">
        <div className="col-md-6 gap-3 d-flex flex-column m-auto">
          <input
            type="text"
            placeholder="Title"
            className="form-control rounded"
            id="title"
            maxLength="62"
            minLength="5"
            required
            onChange={handleChange}
            value={formData.title}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="form-control rounded"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
        
          <div className="row p-3 gap-3">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="form-control rounded"
              type="file"
              id="images"
              accept="image/*"
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="btn btn-success rounded"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
        <div className="col-md-6 m-auto">
         
          <p className="text-danger text-sm">
            {imageUploadError && imageUploadError}
          </p>

          {formData.picture !== "" && (
            <div className="border p-3 d-flex  gap-3 justify-content-between align-items-center">
              <img
                src={formData.picture}
                alt="listing image"
                className="w-50 object-fit rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage()}
                className="btn btn-danger rounded"
              >
                Delete
              </button>
            </div>
          )}

          <button
            disabled={loading || uploading}
            className="btn btn-primary rounded my-3 "
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
          {error && <p className="alert alert-danger text-center my-3">{error}</p>}
        </div>
      </form>
    </main>
  );
}
