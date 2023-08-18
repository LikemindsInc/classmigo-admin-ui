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
}
