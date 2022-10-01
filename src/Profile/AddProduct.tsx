import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Loading } from '../StyledElements';
import { Upload } from '../Firebase/Storage';
// ---------------
interface Props {
  setProductsUpdated: React.Dispatch<React.SetStateAction<number>>
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
  const [isUpdated, setIsUpdated] = useState(false);
  const onSubmit: SubmitHandler<FormData> = data => {
    setAdding(true);
    const json = JSON.stringify(data);
    console.log(json);
    Upload(data)
      .then(result => {
        setAdding(false);
        setIsUpdated(true);
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
      <h2>Add new product</h2>
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
            <option value="chair">Chair</option>
            <option value="clock">Clock</option>
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
          <div>Choose an Image:</div>
          <ChooseFileWrapperInner>
            <ChooseFile type='file' accept='image/*' {...register('image',
            { required: true, onChange: onChooseImage })}/>
            <Image src={image}/>
          </ChooseFileWrapperInner>
          {errors.image != null && <InputError>Image is required</InputError>}
        </ChooseFileWrapper>
        {adding ? (
          <Loading />
        ):(
          <ButtonSubmit>Add</ButtonSubmit>
        )
        }
        <MessageAdded>{isUpdated && 'Your product added!'}</MessageAdded>
      </Form>
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
  width: 300px;
  height: 40px;
`;
const Name = styled(Input)``;
const Category = styled.select`
  border-radius: var(--input-radius);
  border: 2px solid var(--color-soft-gray);
  width: 300px;
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
  max-width: 400px;
`;
const ButtonSubmit = styled(Button)`
  width: fit-content;
  padding: 15px 30px;
`;
const InputError = styled.span`
  color: var(--color-red);
`;
const ChooseFileWrapper = styled.div``;
const ChooseFileWrapperInner = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const ChooseFile = styled.input`
  background-color: var(--color-fill-page);
  padding: 15px 20px;
  border: none;
  border-radius: var(--input-radius);
  font-family: inherit;

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
const MessageAdded = styled.h3`
  color: var(--color-message-success);
`

export default AddProduct;
