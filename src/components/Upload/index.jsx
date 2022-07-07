import { useState } from "react";
import styled from "styled-components";
import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

import { fileUpload } from "../../api";
import loginState from "../../recoil/auth";
import useModal from "../../hooks/useModal";

function Upload() {
  const { hideModal } = useModal();
  const userData = useRecoilValue(loginState);
  const [imageFile, setImageFile] = useState({});
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const fileUploadMutation = useMutation(fileUpload);

  const encodeFileToBase64 = fileBlob => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise(resolve => {
      reader.onload = () => {
        setPreviewUrl(reader.result);
        resolve();
      };
    });
  };

  const handleChange = e => {
    encodeFileToBase64(e.target.files[0]);
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = e => {
    e.preventDefault();

    fileUploadMutation.mutate(
      {
        file: imageFile,
        input: { creator: userData.name, country, city },
      },
      {
        onSuccess: () => {
          hideModal();
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        onChange={handleChange}
        required
      />
      <div>
        {previewUrl && <ImagePreview src={previewUrl} alt="preview-img" />}
      </div>
      <CountryDropdown
        value={country}
        onChange={val => setCountry(val)}
        required
      />
      <RegionDropdown
        country={country}
        value={city}
        onChange={val => setCity(val)}
        required
      />
      <button type="submit">제출</button>
    </form>
  );
}

const ImagePreview = styled.img`
  width: 20rem;
  height: 20rem;
  object-fit: cover;
`;

export default Upload;
