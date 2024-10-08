import { Separator } from "@/Components/ui/separator";
import { IUser } from "@/types";
import { Dot, Minus } from "lucide-react";

export interface Employee {
  mobileNumber: string;
  dateOfBirth: string;
  maritalStatus: string;
  gender: string;
  nationality: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  workHours: string;
  salaryPerHour: string;
  totalSalary: string;
}

const ProfileInformation = ({
  employee,
  user,
}: {
  employee: Employee;
  user: IUser | null;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      <EmployeeInfoItem label="First Name" value={user?.first_name} />
      <EmployeeInfoItem label="Last Name" value={user?.last_name} />
      <EmployeeInfoItem label="Mobile Number" value={employee.mobileNumber} />
      <EmployeeInfoItem label="Email Address" value={user?.email} />
      <EmployeeInfoItem label="Date of Birth" value={employee.dateOfBirth} />
      <EmployeeInfoItem label="Marital Status" value={employee.maritalStatus} />
      <EmployeeInfoItem label="Gender" value={employee.gender} />
      <EmployeeInfoItem label="Nationality" value={employee.nationality} />
      <EmployeeInfoItem label="Address" value={employee.address} />
      <EmployeeInfoItem label="City" value={employee.city} />
      <EmployeeInfoItem label="State" value={employee.state} />
      <EmployeeInfoItem label="Zip Code" value={employee.zipCode} />
      <EmployeeInfoItem label="Work's Hours" value={employee.workHours} />
      <div>
        <div className=" grid grid-cols-2 items-center justify-between">
          <EmployeeInfoItem
            label="Salary/Hour"
            value={employee.salaryPerHour}
          />
          <EmployeeInfoItem
            label="Total Salary"
            value={employee.totalSalary}
            className="text-red-600"
          />
          <Separator />
          <Separator />
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;

const EmployeeInfoItem = ({
  label,
  value,
  className,
}: {
  label: string;
  value?: string;
  className?: string;
}) => {
  const showSeparator = label !== "Salary/Hour" && label !== "Total Salary";

  return (
    <div className={`${showSeparator && "mb-4"}`}>
      <h3
        className={`font-semibold text-sm ${
          className ? className : "text-gray-600"
        }`}
      >
        {label}
      </h3>
      <p className="text-base mb-1">
        {value ? (
          value
        ) : (
          <div className=" flex flex-row items-center gap-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Minus className=" animate-pulse" key={i} />
              ))}
          </div>
        )}
      </p>
      {showSeparator && <Separator />}
    </div>
  );
};
