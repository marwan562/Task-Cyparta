import { BriefcaseBusiness, Edit3, Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import FormEditUser from "@/Form/FormEditUser";

const UserHeaderDetails = ({ employee }) => {
  return (
    <>
      <div className="flex flex-col   sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-7">
        <Avatar className="size-20">
          <AvatarImage
            src="/placeholder.svg?height=80&width=80"
            alt={`${employee.firstName} ${employee.lastName}`}
          />
          <AvatarFallback>{`${employee.firstName[0]}${employee.lastName[0]}`}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">{`${employee.firstName} ${employee.lastName}`}</h2>
          <p className="text-gray-500 flex flex-row gap-1  items-center">
            <BriefcaseBusiness className="size-5" />
            {employee.position}
          </p>
          <p className="text-gray-500 flex flex-row gap-1  items-center">
            <Mail className="size-5" />
            {employee.email}
          </p>
        </div>
      </div>
      <Dialog>
        <DialogTrigger>
          <Button className=" h-fit">
            <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <FormEditUser />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserHeaderDetails;
