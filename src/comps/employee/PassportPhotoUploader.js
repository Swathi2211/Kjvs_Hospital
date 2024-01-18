import { useEffect, useState } from "react";
import axios from "axios";

function PhotoUpload() {
  const [image, setImage] = useState(null);
  const [allImage, setAllImage] = useState(null);
  const [gender, setGender] = useState(""); // Added gender state

  useEffect(() => {
    getImage();
  }, []);

  const submitImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("gender", gender); // Append gender to formData

    try {
      const result = await axios.post(
        "http://localhost:8080/photos/photo",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(result);
      setPhoto(null);
      // Handle success, e.g., show a success message
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error uploading image:", error);
    }
  };

  const onInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const photoUrl = URL.createObjectURL(file);
      setPhoto(photoUrl);
    }

    setImage(e.target.files[0]);
  };

  const getImage = async () => {
    try {
      const result = await axios.get("http://localhost:8080/photos/visualizePhoto");
      console.log(result);
      setAllImage(result.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleIconClick = () => {
    document.getElementById('fileInput').click();
  };

  const [photo, setPhoto] = useState(null);

  return (
    <div>
      <div style={{ position: "absolute", marginLeft: "650px", marginTop: "200px" }}>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={onInputChange}
        />
        <div
          style={{
            width: '180px',
            height: '200px',
            border: '2px solid #ccc',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {!photo ? (
            <div>
              <i
                className="fa-solid fa-upload"
                onClick={handleIconClick}
                style={{ cursor: 'pointer', position: 'absolute', marginLeft: "60px", fontSize: "20px", marginTop: "70px" }}
              ></i>
              <p id="barlow" style={{ marginTop: "140px", marginLeft: "10px" }}>Upload your photo</p>
            </div>
          ) : (
            <img
              src={photo}
              alt={`uploaded-passport`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </div>
      </div>

      {/* Gender input */}
      <div>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" name="gender" onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          {/* Add more options if needed */}
        </select>
      </div>

      <button onClick={submitImage} type="submit">Submit</button>

      {allImage == null
        ? ""
        : allImage.map((data, index) => (
          <img
            key={index}
            src={require(`../../profile/${data.image}`)}
            height={100}
            width={100}
            alt={`uploaded-profile-${index}`}
          />
        ))}
    </div>
  );
}

export default PhotoUpload;
