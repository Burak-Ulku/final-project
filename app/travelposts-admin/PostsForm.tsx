'use client';
import { useState } from 'react';
import { Travelpost } from '../../migrations/00006-createTableTravelposts';

type Props = {
  travelposts: Travelpost[];
};

export default function TravelPostForm({ travelposts }: Props) {
  const [imageUrlInput, setImageUrlInput] = useState(travelposts);
  const [adressInput, setAdressInput] = useState('');
  const [placeINput, setPlaceInput] = useState('');

  const [onEditId, setOnEditId] = useState(0);
  const [onEditImageUrlInput, setOnEditImageUrlInput] = useState('');
  const [onEditAdressInput, setOnEditAdressInput] = useState('');
  const [onEditPlaceInput, setOnEditPlaceInput] = useState('');

  async function updateUserById(id: number) {
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: onEditImageUrl,
        lastName: onEditAdress,
        email: onEditPlace,
      }),
    });

    const data = await response.json();

    setTravelPostFormList(
      travelpostList.map((travelpost) => {
        if (user.id === data.user.id) {
          return data.user;
        }
        return user;
      }),
    );
  }

  async function deleteUserById(id: number) {
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    setUserList(userList.filter((user) => user.id !== data.user.id));
  }

  return (
    <>
      <div>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
          }}
        >
          BURAK ÜLKÜ ADMIN
        </form>
      </div>

      <>
        {TravelpostList.map((user) => {
          return (
            <div key={`user-inputs-${user.id}`}>
              <input
                value={
                  user.id !== onEditId ? user.firstName : onEditFirstNameInput
                }
                onChange={(event) =>
                  setOnEditFirstNameInput(event.currentTarget.value)
                }
                disabled={user.id !== onEditId}
              />
              <input
                value={
                  user.id !== onEditId ? user.lastName : onEditLastNameInput
                }
                onChange={(event) =>
                  setOnEditLastNameInput(event.currentTarget.value)
                }
                disabled={user.id !== onEditId}
              />
              <input
                value={user.id !== onEditId ? user.email : onEditEmailInput}
                onChange={(event) =>
                  setOnEditEmailInput(event.currentTarget.value)
                }
                disabled={user.id !== onEditId}
              />
              <input
                value={
                  user.id !== onEditId
                    ? user.phoneNumber
                    : onEditPhoneNumberInput
                }
                onChange={(event) =>
                  setOnEditPhoneNumberInput(event.currentTarget.value)
                }
                disabled={user.id !== onEditId}
              />
              <input
                value={user.id !== onEditId ? user.service : onEditServiceInput}
                onChange={(event) =>
                  setOnEditServiceInput(event.currentTarget.value)
                }
                disabled={user.id !== onEditId}
              />
              {onEditId === user.id ? (
                <button
                  onClick={async () => {
                    await updateUserById(user.id);
                    setOnEditId(0);
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setOnEditFirstNameInput(user.firstName);
                    setOnEditLastNameInput(user.lastName);
                    setOnEditEmailInput(user.email);
                    setOnEditPhoneNumberInput(user.phoneNumber);
                    setOnEditServiceInput(user.service);
                    setOnEditId(user.id);
                  }}
                >
                  Edit
                </button>
              )}
              <button onClick={async () => await deleteUserById(user.id)}>
                Delete
              </button>
              <UploadForm />
            </div>
          );
        })}
      </>
    </>
  );
}

Iwo;
