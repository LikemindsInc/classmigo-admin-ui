import { ColumnsType } from "antd/es/table";
import { UserDetails } from "../Pages/PrivatePages/Dashboard/Users/Students/Components/UserDetails";
import { Options } from "../Ui_elements";




const realData:any =[
  {
      "_id": "64bf9ebd2c1a9e3848cc2969",
      "phoneNumber": "+2348198989898",
      "isActive": true,
      "firstName": "Victor",
      "lastName": "Adegboye",
      "class": [
          {
              "_id": "64b620526a9ba1865fac3c40",
              "name": "JSS_ONE",
              "value": "JSS One",
              "subjects": [
                  "64b620526a9ba1865fac3c4f",
                  "64b620526a9ba1865fac3c50"
              ],
              "__v": 2,
              "createdAt": "2023-07-18T05:17:06.335Z",
              "updatedAt": "2023-07-18T05:17:08.455Z"
          }
      ],
      "userName": "Vikade",
      "role": "STUDENT",
      "createdAt": "2023-07-25T10:06:53.011Z",
      "updatedAt": "2023-07-25T10:28:03.430Z",
      "__v": 1,
      "dateSubscribed": "2023-07-25T00:00:00.000Z",
      "nextDueDate": "2023-08-01T00:00:00.000Z",
      "subcription": "64bab5ac84911e01a7eb8028",
      "parentCode": "680219"
  },
  {
      "_id": "64bf99092c1a9e3848cc295e",
      "phoneNumber": "+2348101815093",
      "isActive": true,
      "firstName": "Testing",
      "lastName": "Test",
      "class": [
          {
              "_id": "64b620526a9ba1865fac3c40",
              "name": "JSS_ONE",
              "value": "JSS One",
              "subjects": [
                  "64b620526a9ba1865fac3c4f",
                  "64b620526a9ba1865fac3c50"
              ],
              "__v": 2,
              "createdAt": "2023-07-18T05:17:06.335Z",
              "updatedAt": "2023-07-18T05:17:08.455Z"
          }
      ],
      "userName": "Akinlolkik",
      "role": "STUDENT",
      "createdAt": "2023-07-25T09:42:33.159Z",
      "updatedAt": "2023-07-25T09:42:33.211Z",
      "__v": 1,
      "dateSubscribed": "2023-07-25T00:00:00.000Z",
      "nextDueDate": "2023-08-01T00:00:00.000Z",
      "subcription": "64bab5ac84911e01a7eb8028"
  },
  {
      "_id": "64a441467c5ffbe167934fc8",
      "phoneNumber": "+2348101815094",
      "isActive": true,
      "firstName": "Akinlola",
      "lastName": "Adegboye",
      "class": [],
      "userName": "Akinlol",
      "role": "STUDENT",
      "createdAt": "2023-07-04T15:56:54.467Z",
      "updatedAt": "2023-07-04T15:56:54.483Z",
      "__v": 1
  },
  {
      "_id": "64a43db57c5ffbe167934fa2",
      "phoneNumber": "+2348101815094",
      "isActive": true,
      "firstName": "John",
      "lastName": "Doe",
      "class": [],
      "userName": "Johndoe",
      "role": "STUDENT",
      "createdAt": "2023-07-04T15:41:41.837Z",
      "updatedAt": "2023-07-04T15:41:41.876Z",
      "__v": 1
  },
  {
      "_id": "64a314bc89cd51730ced4458",
      "phoneNumber": "+2348163112312",
      "isActive": true,
      "firstName": "Cherry",
      "lastName": "Odum",
      "class": [
          {
              "_id": "64b620526a9ba1865fac3c40",
              "name": "JSS_ONE",
              "value": "JSS One",
              "subjects": [
                  "64b620526a9ba1865fac3c4f",
                  "64b620526a9ba1865fac3c50"
              ],
              "__v": 2,
              "createdAt": "2023-07-18T05:17:06.335Z",
              "updatedAt": "2023-07-18T05:17:08.455Z"
          }
      ],
      "userName": "cheryy",
      "role": "STUDENT",
      "createdAt": "2023-07-03T18:34:36.442Z",
      "updatedAt": "2023-08-08T17:34:54.395Z",
      "__v": 2,
      "parentCode": "795369",
      "profileImageUrl": "http://res.cloudinary.com/dnevwxinm/image/upload/v1691516093/profile/64a314bc89cd51730ced4458/64a314bc89cd51730ced4458.png"
  },
  {
      "_id": "649500f7e823d94070644585",
      "phoneNumber": "+2348055360642",
      "isActive": true,
      "firstName": "Akinlola",
      "lastName": "Adegboye",
      "class": [],
      "userName": "Adegboye",
      "role": "STUDENT",
      "createdAt": "2023-06-23T02:18:31.149Z",
      "updatedAt": "2023-06-23T02:18:31.204Z",
      "__v": 1
  },
  {
      "_id": "648c4710299d11bee57cb097",
      "phoneNumber": "+2348101815094",
      "isActive": true,
      "firstName": "Akinlola",
      "lastName": "Adegboye",
      "class": [
          {
              "_id": "64b620526a9ba1865fac3c40",
              "name": "JSS_ONE",
              "value": "JSS One",
              "subjects": [
                  "64b620526a9ba1865fac3c4f",
                  "64b620526a9ba1865fac3c50"
              ],
              "__v": 2,
              "createdAt": "2023-07-18T05:17:06.335Z",
              "updatedAt": "2023-07-18T05:17:08.455Z"
          }
      ],
      "userName": "Akinlola",
      "role": "STUDENT",
      "createdAt": "2023-06-16T11:27:12.525Z",
      "updatedAt": "2023-08-08T21:52:26.732Z",
      "__v": 2,
      "parentCode": "878388"
  },
  {
      "_id": "64836158a5ff89c68f4f7e09",
      "phoneNumber": "+2348163113450",
      "isActive": true,
      "firstName": "charles",
      "lastName": "onuorah",
      "class": [],
      "userName": "charlesinto2",
      "role": "STUDENT",
      "createdAt": "2023-06-09T17:28:56.339Z",
      "updatedAt": "2023-06-09T17:28:56.983Z",
      "__v": 1
  },
  {
      "isActive": true,
      "role": "STUDENT",
      "_id": "645155958cdd809dd9815068",
      "phoneNumber": "+2348163113450",
      "firstName": "charles",
      "lastName": "email",
      "userName": "charlesinto",
      "createdAt": "2023-05-02T18:25:25.323Z",
      "updatedAt": "2023-05-02T18:25:25.323Z",
      "__v": 0
  }
]


export const data: any = [
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
      "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000",
  },
];

const newData = realData.map((item: any) => ({
  key: item._id, // Use _id instead of id
  name: `${item.firstName} ${item.lastName}`, // Correct string interpolation
  username: item.userName,
  class: item.class.map((classItem: any) => classItem.name) || "",
  status: item.role,
  subscription: item.subscription,
  image: item.image || "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000"
}));

console.log(newData, "new");