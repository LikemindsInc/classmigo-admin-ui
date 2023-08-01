import { ColumnsType } from "antd/es/table";
import { UserDetails } from "../Pages/PrivatePages/Dashboard/Users/Payments/Components/UserDetails";
import { ModalOptions, Options } from "../Ui_elements";

interface DataType {
  key: string;
  name: string;
  image: string
  username: string
  class: string
  plan: string
  amount: number
  datePurchased: string
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
    title: "PLAN",
    dataIndex: "plan",
    key: "plan",
  },
  {
    title: "AMOUNT (NGN)",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "DATE PURCHASED",
    dataIndex: "datePurchased",
    key: "datePurchased",
  },
  {
    title: "",
    dataIndex: "options",
    key: "options",
    render: () => (
      <ModalOptions/>
    ),
  },
];

export const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    username: "Johnny boy",
    class: "JS1",
    datePurchased: "Aug 1, 2023",
    plan: "3 Months",
    amount:2500,
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image1.jpg' with the actual image URL for the first row
  },
  {
    key: "1",
    name: "John Brown",
    username: "Johnny boy",
    class: "JS1",
    datePurchased: "Aug 1, 2023",
    plan: "3 Months",
    amount:2500,
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image1.jpg' with the actual image URL for the first row
  },

  {
    key: "1",
    name: "John Brown",
    username: "Johnny boy",
    class: "JS1",
    datePurchased: "Aug 1, 2023",
    plan: "3 Months",
    amount:2500,
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image1.jpg' with the actual image URL for the first row
  },

  {
    key: "1",
    name: "John Brown",
    username: "Johnny boy",
    class: "JS1",
    datePurchased: "Aug 1, 2023",
    plan: "3 Months",
    amount:2500,
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image1.jpg' with the actual image URL for the first row
  },

  {
    key: "1",
    name: "John Brown",
    username: "Johnny boy",
    class: "JS1",
    datePurchased: "Aug 1, 2023",
    plan: "3 Months",
    amount:2500,
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image1.jpg' with the actual image URL for the first row
  },

  {
    key: "1",
    name: "John Brown",
    username: "Johnny boy",
    class: "JS1",
    datePurchased: "Aug 1, 2023",
    plan: "3 Months",
    amount:2500,
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image1.jpg' with the actual image URL for the first row
  },

  {
    key: "1",
    name: "John Brown",
    username: "Johnny boy",
    class: "JS1",
    datePurchased: "Aug 1, 2023",
    plan: "3 Months",
    amount:2500,
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image1.jpg' with the actual image URL for the first row
  },

  {
    key: "1",
    name: "John Brown",
    username: "Johnny boy",
    class: "JS1",
    datePurchased: "Aug 1, 2023",
    plan: "3 Months",
    amount:2500,
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image1.jpg' with the actual image URL for the first row
  },

  {
    key: "1",
    name: "John Brown",
    username: "Johnny boy",
    class: "JS1",
    datePurchased: "Aug 1, 2023",
    plan: "3 Months",
    amount:2500,
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image1.jpg' with the actual image URL for the first row
  },

  {
    key: "1",
    name: "John Brown",
    username: "Johnny boy",
    class: "JS1",
    datePurchased: "Aug 1, 2023",
    plan: "3 Months",
    amount:2500,
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image1.jpg' with the actual image URL for the first row
  },

  {
    key: "1",
    name: "John Brown",
    username: "Johnny boy",
    class: "JS1",
    datePurchased: "Aug 1, 2023",
    plan: "3 Months",
    amount:2500,
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image1.jpg' with the actual image URL for the first row
  },

  {
    key: "1",
    name: "John Brown",
    username: "Johnny boy",
    class: "JS1",
    datePurchased: "Aug 1, 2023",
    plan: "3 Months",
    amount:2500,
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image1.jpg' with the actual image URL for the first row
  },

  {
    key: "1",
    name: "John Brown",
    username: "Johnny boy",
    class: "JS1",
    datePurchased: "Aug 1, 2023",
    plan: "3 Months",
    amount:2500,
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image1.jpg' with the actual image URL for the first row
  },

  {
    key: "1",
    name: "John Brown",
    username: "Johnny boy",
    class: "JS1",
    datePurchased: "Aug 1, 2023",
    plan: "3 Months",
    amount:2500,
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image1.jpg' with the actual image URL for the first row
  },

  {
    key: "1",
    name: "John Brown",
    username: "Johnny boy",
    class: "JS1",
    datePurchased: "Aug 1, 2023",
    plan: "3 Months",
    amount:2500,
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image1.jpg' with the actual image URL for the first row
  },

  {
    key: "1",
    name: "John Brown",
    username: "Johnny boy",
    class: "JS1",
    datePurchased: "Aug 1, 2023",
    plan: "3 Months",
    amount:2500,
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000", // Replace 'url_to_image1.jpg' with the actual image URL for the first row
  },


];
