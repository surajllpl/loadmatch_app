import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Button, Upload } from "antd";
import { IoAddOutline } from "react-icons/io5";
import { UploadOutlined } from "@ant-design/icons";
import { MdDelete } from "react-icons/md";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import InputField from "../../../components/SmallComponents/InputField/InputField";
import Inputbox from "../../../components/SmallComponents/BasicInputBox/Inputbox";
import AddButton from "../../../components/SmallComponents/Buttons/AddButton";
import { message } from "antd";
import AutoCompleteInput from "../../../components/InputBoxApi/AutoCompleteInput";
import { useSpaceStore } from "../../../store/useSpaceStore";
import MapLoader from "../../../components/MapLoader/MapLoad";
import { FaArrowLeft } from "react-icons/fa";

function AddLoad({ setShowForm }) {
  const location = useLocation();
  const { spaceData } = location.state || {};
  console.log(spaceData);
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails")) || {}
  );
  const { getUserSearchedSpaces } = useSpaceStore();
  console.log(getUserSearchedSpaces);

  const [formData, setFormData] = useState({
    from_city: "",
    from_pin: "",
    to_city: "",
    to_pin: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    image: [],
    created_by: userDetails?.user_id,
    active: true,
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [fileNames, setFileNames] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleWeightBlur = () => {
    const kgValue = parseFloat(formData.weight);

    if (!isNaN(kgValue)) {
      if (kgValue >= 1000) {
        setFormData((prev) => ({ ...prev, weight: kgValue / 1000 }));
      }
    }
  };
  const handleImageChange = (info) => {
    const selectedFiles = info.fileList.map((file) => file.originFileObj);
    const previews = [];
    const names = [];
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        previews.push(event.target.result);
        names.push(file.name); // Store the file names
        if (previews.length === selectedFiles.length) {
          setFormData((prev) => ({
            ...prev,
            image: [...prev.image, ...selectedFiles], // Append to image array
          }));
          setImagePreviews((prev) => [...prev, ...previews]); // Append to image previews array
          setFileNames((prev) => [...prev, ...names]); // Append to file names array
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteImage = (index) => {
    setFormData((prev) => {
      const updatedImages = [...prev.image];
      const updatedPreviews = [...imagePreviews];
      const updatedFileNames = [...fileNames];
      updatedImages.splice(index, 1);
      updatedPreviews.splice(index, 1);
      updatedFileNames.splice(index, 1);
      return {
        ...prev,
        image: updatedImages,
      };
    });
    setImagePreviews((prev) => {
      const updatedPreviews = [...prev];
      updatedPreviews.splice(index, 1);
      return updatedPreviews;
    });
    setFileNames((prev) => {
      const updatedFileNames = [...prev];
      updatedFileNames.splice(index, 1);
      return updatedFileNames;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "image") {
          value.forEach((file) => {
            formDataToSend.append("image", file);
          });
        } else {
          formDataToSend.append(key, value);
        }
      });
      console.log(import.meta.env.VITE_APP_DOCKER_API_URL);
      const response = await axios.post(
        `${import.meta.env.VITE_APP_DOCKER_API_URL}/load/add`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Load created successfully:", response.data);
      // Reset form data and image previews after successful submission
      setFormData({
        from_city: "",
        from_pin: "",
        to_city: "",
        to_pin: "",
        length: "",
        width: "",
        height: "",
        weight: "",
        image: [],
        active: true,
      });
      setImagePreviews([]);
      setFileNames([]);
      setShowForm(false);
      message.success("Load created successfully");

      const source = formData.from_city;
      const destination = formData.to_city;
      const newLoadAdded = response.data;

      if (spaceData) {
        navigate(`space/bookingv1/${spaceData.space_id}`, {
          state: { newLoadAdded, spaceData: { ...spaceData } },
        });
        return;
      }
      if (!formData.from_city || !formData.to_city) {
        message.error("Please enter both Pickup and Drop Location");
      } else if (formData.from_city === formData.to_city) {
        message.error("Pickup and Drop Location cannot be the same.");
      } else {
        navigate(`/add-load/searchSpace`, {
          state: { source, destination, newLoadAdded },
        });
        return;
      }
    } catch (error) {
      console.error("Error creating Load:", error);
      message.error("Failed to create load. Please try again later.");
    }
  };

  return (
    <ContentWrapper>
      <div className="p-2">
        <form
          onSubmit={handleSubmit}
          className="w-full mx-auto mt-1 border relative bg-white  shadow-md rounded-2xl px-4 py-4 flex flex-col md:w-full md:p-8"
        >
          <div className="flex gap-1 flex-col">
            <AutoCompleteInput
              type="text"
              label="Pickup Point"
              value={formData.from_city}
              onSelect={(value) =>
                handleChange({ target: { name: "from_city", value } })
              }
            />{" "}
            <Inputbox
              type="text"
              name="from_pin"
              label="From Pin"
              placeholder="From PIN"
              value={formData.from_pin}
              onChange={handleChange}
              required
            />
            <AutoCompleteInput
              type="text"
              label="Drop-off Point"
              value={formData.to_city}
              onSelect={(value) =>
                handleChange({ target: { name: "to_city", value } })
              }
            />
            <Inputbox
              type="text"
              name="to_pin"
              label="To Pin"
              placeholder="To PIN"
              value={formData.to_pin}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-2 ">
            <Inputbox
              type="text"
              name="length"
              label="Length"
              placeholder="Ft"
              value={formData.length}
              onChange={handleChange}
              required
            />
            <Inputbox
              type="text"
              name="width"
              label="Width"
              placeholder="Ft"
              value={formData.width}
              onChange={handleChange}
              required
            />
            <Inputbox
              type="text"
              name="height"
              label="Height"
              placeholder="Ft"
              value={formData.height}
              onChange={handleChange}
              required
            />
          </div>
          <Inputbox
            type="text"
            name="weight"
            label="Weight"
            placeholder="Kg"
            value={formData.weight}
            onChange={handleChange}
            onBlur={handleWeightBlur}
            required
          />
          <div className="border p-2 my-2 text-xs rounded-lg">
            <Upload
              onChange={handleImageChange}
              fileList={[]} // Clear the default file list to avoid duplicates
              listType="picture"
              multiple
              showUploadList={false} // Hide the default upload list
            >
              <Button icon={<UploadOutlined />} className="text-[14px] ">
                Select Images
              </Button>
            </Upload>
            {imagePreviews.map((preview, index) => (
              <div
                key={index}
                className="p-2 border flex items-center justify-between mt-2 rounded-lg"
              >
                <div className="flex gap-2 items-center">
                  <img
                    src={preview}
                    alt={`Image ${index}`}
                    className="w-[30px] h-[30px] rounded-lg "
                  />
                  <p className="text-xs  text-center">{fileNames[index]}</p>{" "}
                  {/* Display the file name */}
                </div>
                <div className=" cursor-pointer hover:scale-2">
                  <Button
                    type="link"
                    danger
                    size="small"
                    onClick={() => handleDeleteImage(index)}
                  >
                    <MdDelete />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <AddButton
            label={"Add Load"}
            type="submit"
            onClick={handleSubmit}
            className="px-8 py-2 rounded-full text-base md:text-lg font-semibold
        text-white bg-gradient-to-l from-green-400 via-green-400 to-green-500  active:scale-95  w-fit self-center absolute bottom-[-25px]
        hover:bg-green-600 "
          ></AddButton>
          {/* </MapLoader> */}
        </form>{" "}
      </div>
    </ContentWrapper>
  );
}

export default AddLoad;
