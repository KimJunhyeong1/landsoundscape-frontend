import { useMemo, useState } from "react";
import styled from "styled-components";
import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import Select from "react-select";
import countryList from "react-select-country-list";
import { countries, getCitiesByCountryCode } from "country-city-location";
import { useNavigate } from "react-router-dom";
import { BsCloudUpload } from "react-icons/bs";
import RingLoader from "react-spinners/RingLoader";

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
              parseFloat(countryData.Longitude),
              parseFloat(countryData.Latitude),
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
    <>
      {fileUploadMutation.isLoading ? (
        <SpinnersBox>
          <RingLoader size={150} color="#265d6e" />
          <SpinnerContent>Selecting a sound and tags...</SpinnerContent>
        </SpinnersBox>
      ) : (
        <UploadForm onSubmit={handleSubmit}>
          <label htmlFor="inputFile">
            {!previewUrl ? (
              <UploadBox>
                <UploadIcon />
                <UploadContent>to upload your photo</UploadContent>
              </UploadBox>
            ) : (
              <ImagePreview src={previewUrl} alt="preview-img" />
            )}
          </label>
          <input
            id="inputFile"
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            onChange={handleImageChange}
            required
            hidden
          />
          <CountryCityBox>
            <ColumnBox>
              <label htmlFor="countrySelect">COUNTRY</label>
              <Select
                id="countrySelect"
                options={countryOptions}
                value={country}
                onChange={handleCountryChange}
              />
            </ColumnBox>
            <ColumnBox>
              <label htmlFor="citySelect">CITY</label>
              <Select
                id="citySelect"
                options={cityOptions}
                value={city}
                onChange={handelCityChange}
              />
            </ColumnBox>
          </CountryCityBox>
          <SubmitButton type="submit">Submit</SubmitButton>
        </UploadForm>
      )}
    </>
  );
}

const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImagePreview = styled.img`
  margin-top: 2rem;
  width: 25rem;
  height: 18rem;
  object-fit: cover;
`;

const UploadBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 2rem;
  width: 25rem;
  height: 18rem;
  border: 0.16rem dashed #265d6e;
  background-color: #f8f8ff;
`;

const UploadIcon = styled(BsCloudUpload)`
  color: #265d6e;
  font-size: 3rem;
`;

const UploadContent = styled.span`
  color: #265d6e;
  font-size: 2rem;
`;

const CountryCityBox = styled.div`
  width: 90%;
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
`;

const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled.button`
  margin-top: 2rem;
  width: 8rem;
  height: 2.5rem;
  color: white;
  background-color: #265d6e;
  border-radius: 15px;
  border: none;
`;

const SpinnersBox = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SpinnerContent = styled.span`
  margin-top: 2rem;
  color: #265d6e;
  font-size: 2rem;
`;

export default Upload;
