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
import { IUser } from "@/types";
import { useAuth } from "@/context/AuthContext";

const UserHeaderDetails = ({
  first_name,
  last_name,
  email,
  image,
}: {
  first_name?: string;
  last_name?: string;
  email?: string;
  image?: string;
}) => {
  const { updateUserDetails, loading } = useAuth();
  return (
    <>
      <div className="flex flex-col   sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-7">
        <Avatar className="size-20">
          <AvatarImage src={image} alt={`${first_name} ${last_name}`} />
          <AvatarFallback>{`U`}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">{`${first_name} ${last_name}`}</h2>
          <p className="text-gray-500 flex flex-row gap-1  items-center">
            <BriefcaseBusiness className="size-5" />
            UX/UI DESIGNER
          </p>
          <p className="text-gray-500 flex flex-row gap-1  items-center">
            <Mail className="size-5" />
            {email}
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
              Make changes to your profile here. Click save when you{"'"}re
              done.
            </DialogDescription>
          </DialogHeader>
          <FormEditUser
            isLoading={loading}
            onSave={(body) =>
              updateUserDetails(body)
            }
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserHeaderDetails;
