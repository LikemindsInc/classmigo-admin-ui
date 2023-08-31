declare module "@appModel" {
  interface IAdmin {
    _id: string;
    phoneNumber: string;
    isActive: boolean;
    firstName: string;
    lastName: string;
    email: string;
    role: "TEACHER" | "MANAGER";
    createdAt: string;
    updatedAt: string;
    assignedClasses: any[];
  }

  interface ICreateAdminDTO {
    phoneNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    role?: string;
    password: string;
    class?: any;
  }

  interface ISubscription {
    _id: string;
    className: string;
    subscription: string;
    amount: number;
    student: string;
    dateSubscribed: string;
    isActive: boolean;
    nextDueDate: string;
    createdAt: string;
    updatedAt: string;
  }

  interface IParent {
    createdAt: string;
    dependents: [];
    email: sting;
    fullName: string;
    isActive: boolean;
    phoneNumber: string;
    role: "PARENT";
    updatedAt: string;
    _id: string;
  }

  interface IStudent {
    createdAt: string;
    firstName: string;
    isActive: boolean;
    lastName: string;
    parentCode: string;
    phoneNumber: string;
    profileImageUrl: string;
    role: "STUDENT";
    subcription: ISubscription[];
    updatedAt: string;
    userName: string;
    _id:string
  }
}
