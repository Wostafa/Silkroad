import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Loading, Notify } from '../StyledElements';
import { QUERIES } from '../Constants';
import { Upload } from '../Firebase/Storage';
import 'react-toastify/dist/ReactToastify.css';
// ---------------
interface Props {
  setProductsUpdated: React.Dispatch<React.SetStateAction<number>>;
}

function AddProduct(props: Props): JSX.Element {
  // -----------------
  interface FormData {
    name: string;
    price: number;
    category: string;
    image: FileList;
    description: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // ----------------- set preview of uploaded image
  const [image, setImage] = useState('./assets/placeholder-upload.svg');
  const [adding, setAdding] = useState(false);
  const onChooseImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const img = URL.createObjectURL(e.target.files?.[0] as Blob);
    setImage(img);
  };

  // ----------------- send product to firebase
  const onSubmit: SubmitHandler<FormData> = data => {
    setAdding(true);

    Upload(data)
      .then(result => {
        Notify.Show.success('Your product added!');
        setAdding(false);
        props.setProductsUpdated(Date.now());
        console.log('Product Added: ', result);
      })
      .catch(e => {
        setAdding(false);
        console.log('Product Adding Failed: ', e);
      });
  };

  // (ignore prettier is for eslint comment inside jsx)
  // prettier-ignore
  return (
    <WrapperForm>
      <h3>Add new product</h3>
      {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
      }<Form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <Label htmlFor="name">Name:</Label>
          <Name id='name' {...register('name', { required: true })} placeholder="" />
          {errors.name != null && <InputError>Name is required</InputError>}
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="category" defaultValue='others'>Category:</Label>
          <Category id="category" {...register('category')}>
            <option value="armchair">Armchair</option>
            <option value="clock">Clock</option>
            <option value="chair">Chair</option>
            <option value="pillow">Pillow</option>
            <option value="plant-pot">Plant pot</option>
            <option value="rug">Rug</option>
            <option value="others">Others</option>
          </Category>
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="price">Price:</Label>
          <Price id="price" type="number" {...register('price', { required: true })} placeholder="" />
          {errors.price != null && <InputError>Price is required</InputError>}
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="description">Description:</Label>
          <Description id="description" {...register('description', { required: true })} />
        </InputWrapper>
        <ChooseFileWrapper>
          <ChooseFileLabel>Choose an Image:</ChooseFileLabel>
          <ChooseFileWrapperInner>
            <ChooseFile type='file' accept='image/*' data-testid='choose-file' {...register('image',
            { required: true, onChange: onChooseImage })}/>
            <Image data-testid='file-preview' src={image}/>
          </ChooseFileWrapperInner>
          {errors.image != null && <InputError>Image is required</InputError>}
        </ChooseFileWrapper>
        {adding ? (
          <Loading data-testid='loading' />
        ):(
          <ButtonSubmit>Add</ButtonSubmit>
        )
        }

      </Form>
      <Notify.Layout />  
    </WrapperForm>
  );
}
// ---------------------------
const WrapperForm = styled.div`
  h2 {
    color: var(--color-off-blue);
    margin-top: 0;
  }
  flex: 1;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  --label-input-gap: 4px;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--label-input-gap);
`;
const Label = styled.label`
  margin-right: 16px;
`;
const Input = styled.input`
  border-radius: var(--input-radius);
  border: 2px solid var(--color-soft-gray);
  font-size: 1rem;
  padding: 0 8px;
  max-width: 300px;
  width: 100%;
  height: 40px;
`;
const Name = styled(Input)``;
const Category = styled.select`
  border-radius: var(--input-radius);
  border: 2px solid var(--color-soft-gray);
  max-width: 300px;
  width: 100%;
  height: 40px;
  padding: 8px;
`;
const Price = styled(Input)``;
const Description = styled.textarea`
  border-radius: var(--input-radius);
  border: 2px solid var(--color-soft-gray);
  font-size: 1rem;
  padding: 10px;
  width: 100%;
  height: 250px;
  resize: none;
  max-width: 500px;
`;
const ButtonSubmit = styled(Button)`
  width: fit-content;
  padding: 15px 30px;
`;
const InputError = styled.span`
  color: var(--color-red);
`;
const ChooseFileWrapper = styled.div``;
const ChooseFileLabel = styled.div`
  @media ${QUERIES.laptopAndSmaller} {
    margin-bottom: 8px;
  }
`;
const ChooseFileWrapperInner = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media ${QUERIES.laptopAndSmaller} {
    flex-direction: column;
    align-items: start;
  }
`;
const ChooseFile = styled.input`
  background-color: var(--color-fill-page);
  padding: 15px 20px;
  border: none;
  border-radius: var(--input-radius);
  font-family: inherit;
  min-width: 250px;
  max-width: 300px;
  width: 100%;

  &::file-selector-button {
    color: white;
    background-color: var(--color-pink);
    border-radius: var(--button-radius);
    border: none;
    padding: 15px 20px;
    font-family: inherit;
    font-weight: 700;
    margin-right: 8px;

    &:hover {
      opacity: 0.8;
    }
  }
`;
const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: var(--image-radius);
`;

export default AddProduct;
