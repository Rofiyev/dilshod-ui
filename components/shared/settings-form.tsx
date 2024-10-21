"use client";

import { FC, useEffect } from "react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IState } from "@/types";
import { useFormState } from "react-dom";
import { updateUserSettings } from "@/actions";
import toast from "react-hot-toast";
import { useFormStatus } from "react-dom";
import SubmitButton from "./submit-button";

interface SettingsFormProps {
  firstName: string;
  lastName: string;
  email: string;
}

const SettingsForm: FC<SettingsFormProps> = ({
  email,
  firstName,
  lastName,
}) => {
  const initialState: IState = { status: undefined, message: "" };
  const [state, formAction] = useFormState(updateUserSettings, initialState);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state.status === "error") toast.error(state.message!);
    else if (state.status === "success") toast.success(state.message!);
  }, [state]);

  return (
    <form action={formAction}>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Here you will find settings regarding your account
        </CardDescription>
        <CardContent
          className="
          flex
          flex-col
          gap-y-5
          px-0
          !mt-5
          "
        >
          <div
            className="
            flex
            flex-col
            gap-y-2
            "
          >
            <Label>First Name</Label>
            <Input type="text" name="firstName" defaultValue={firstName} />
          </div>
          <div
            className="
            flex
            flex-col
            gap-y-2
            "
          >
            <Label>Last Name</Label>
            <Input type="text" name="lastName" defaultValue={lastName} />
          </div>
          <div
            className="
            flex
            flex-col
            gap-y-2
            "
          >
            <Label>Email</Label>
            <Input type="text" name="email" disabled defaultValue={email} />
          </div>
        </CardContent>
        <CardFooter className="px-0">
          <SubmitButton title="Update your fileds" />
        </CardFooter>
      </CardHeader>
    </form>
  );
};

export default SettingsForm;
