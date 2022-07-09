import { useMemo, useState } from "react";
import styled from "styled-components";
import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import Select from "react-select";
import countryList from "react-select-country-list";
import { countries, getCitiesByCountryCode } from "country-city-location";
import { useNavigate } from "react-router-dom";

import { fileUpload } from "../../api";
import loginState from "../../recoil/auth";
import useModal from "../../hooks/useModal";

function Upload() {
  const { hideModal } = useModal();
  const navigate = useNavigate();
  const userData = useRecoilValue(loginState);
  const [imageFile, setImageFile] = useState({});
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileUploadMutation = useMutation(fileUpload);
  const countryOptions = useMemo(() => {
    const Options = countryList()
      .getData()
      .map(country => {
        const countryData = countries.find(
          element => element.Alpha2Code === country.value,
        );
        return {
          value: {
            code: country.value,
            name: country.label,
            coordinates: [
              parseFloat(countryData.Latitude),
              parseFloat(countryData.Longitude),
            ],
          },
          label: country.label,
        };
      });

    return Options;
  }, []);

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

  const handleCountryChange = option => {
    setCountry(option);
    const options = getCitiesByCountryCode(option.value.code).map(element => ({
      value: element.name,
      label: element.name,
    }));

    setCityOptions(options);
    setCity("");
  };

  const handelCityChange = option => {
    setCity(option);
  };

  const handleImageChange = e => {
    encodeFileToBase64(e.target.files[0]);
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = e => {
    e.preventDefault();

    fileUploadMutation.mutate(
      {
        file: imageFile,
        input: {
          creator: userData.name,
          country: country.label,
          city: city.label,
          coordinates: country.value.coordinates,
        },
      },
      {
        onSuccess: response => {
          navigate(`/${response._id}`);
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
        onChange={handleImageChange}
        required
      />
      <div>
        {previewUrl && <ImagePreview src={previewUrl} alt="preview-img" />}
      </div>
      <Select
        options={countryOptions}
        value={country}
        onChange={handleCountryChange}
      />
      <Select options={cityOptions} value={city} onChange={handelCityChange} />
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
