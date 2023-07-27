import { ColumnsType } from "antd/es/table";
import { UserDetails } from "../Pages/PrivatePages/Dashboard/Users/Students/Components/UserDetails";
import { Options } from "../Ui_elements";

interface DataType {
  key: string;
  name: string;
  username: string;
  class: string;
  phoneNumber: number;
  status: string;
  subscription: string;
  image: string;
}

export const columns: ColumnsType<DataType> = [
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
    render: (name: string, record: DataType) => (
      <UserDetails image={record.image} name={name} />
    ),
  },
  {
    title: "USERNAME",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "CLASS",
    dataIndex: "class",
    key: "class",
  },
  {
    title: "PHONE NUMBER",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "SUBSCRIPTION",
    dataIndex: "subscription",
    key: "subscription",
  },
  {
    title: "",
    dataIndex: "options",
    key: "options",
    render: () => (
      <Options/>
    ),
  },
];

export const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    username: "Johnny boy",
    class: "JS1",
    phoneNumber: 8089773098,
    status: "Verified",
    subscription: "Subscribed",
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image1.jpg' with the actual image URL for the first row
  },
  {
    key: "2",
    name: "Rita Reyes",
    username: "Rita",
    class: "JS1",
    phoneNumber: 8089773098,
    status: "Unverified",
    subscription: "Unsubscribed",
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image2.jpg' with the actual image URL for the second row
  },
  {
    key: "3",
    name: "Lucas Gray",
    username: "Lucas 123",
    class: "JS1",
    phoneNumber: 8089773098,
    status: "Verified",
    subscription: "Subscribed",
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image3.jpg' with the actual image URL for the third row
  },
  {
    key: "4",
    name: "John Chukwuemeka",
    username: "John",
    class: "JS1",
    phoneNumber: 8089773098,
    status: "Unverified",
    subscription: "Subscribed",
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image3.jpg' with the actual image URL for the third row
  },
  {
    key: "1",
    name: "John Brown",
    username: "Johnny boy",
    class: "JS1",
    phoneNumber: 8089773098,
    status: "Verified",
    subscription: "Subscribed",
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image1.jpg' with the actual image URL for the first row
  },
  {
    key: "2",
    name: "Rita Reyes",
    username: "Rita",
    class: "JS1",
    phoneNumber: 8089773098,
    status: "Unverified",
    subscription: "Unsubscribed",
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image2.jpg' with the actual image URL for the second row
  },
  {
    key: "3",
    name: "Lucas Gray",
    username: "Lucas 123",
    class: "JS1",
    phoneNumber: 8089773098,
    status: "Verified",
    subscription: "Subscribed",
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image3.jpg' with the actual image URL for the third row
  },
  {
    key: "4",
    name: "John Chukwuemeka",
    username: "John",
    class: "JS1",
    phoneNumber: 8089773098,
    status: "Unverified",
    subscription: "Subscribed",
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image3.jpg' with the actual image URL for the third row
  },
  {
    key: "1",
    name: "John Brown",
    username: "Johnny boy",
    class: "JS1",
    phoneNumber: 8089773098,
    status: "Verified",
    subscription: "Subscribed",
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image1.jpg' with the actual image URL for the first row
  },
  {
    key: "2",
    name: "Rita Reyes",
    username: "Rita",
    class: "JS1",
    phoneNumber: 8089773098,
    status: "Unverified",
    subscription: "Unsubscribed",
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image2.jpg' with the actual image URL for the second row
  },
  {
    key: "3",
    name: "Lucas Gray",
    username: "Lucas 123",
    class: "JS1",
    phoneNumber: 8089773098,
    status: "Verified",
    subscription: "Subscribed",
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image3.jpg' with the actual image URL for the third row
  },
  {
    key: "4",
    name: "John Chukwuemeka",
    username: "John",
    class: "JS1",
    phoneNumber: 8089773098,
    status: "Unverified",
    subscription: "Subscribed",
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image3.jpg' with the actual image URL for the third row
  },
  {
    key: "1",
    name: "John Brown",
    username: "Johnny boy",
    class: "JS1",
    phoneNumber: 8089773098,
    status: "Verified",
    subscription: "Subscribed",
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image1.jpg' with the actual image URL for the first row
  },
  {
    key: "2",
    name: "Rita Reyes",
    username: "Rita",
    class: "JS1",
    phoneNumber: 8089773098,
    status: "Unverified",
    subscription: "Unsubscribed",
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image2.jpg' with the actual image URL for the second row
  },
  {
    key: "3",
    name: "Lucas Gray",
    username: "Lucas 123",
    class: "JS1",
    phoneNumber: 8089773098,
    status: "Verified",
    subscription: "Subscribed",
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image3.jpg' with the actual image URL for the third row
  },
  {
    key: "4",
    name: "John Chukwuemeka",
    username: "John",
    class: "JS1",
    phoneNumber: 8089773098,
    status: "Unverified",
    subscription: "Subscribed",
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image3.jpg' with the actual image URL for the third row
  },
];
