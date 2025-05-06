import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getEvn } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/Loading";
import { IoCameraOutline } from "react-icons/io5";
import Dropzone from "react-dropzone";
import { setUser } from "@/redux/user/user.slice";

const Profile = () => {
  const [filePreview, setPreview] = useState();
  const [file, setFile] = useState();
  const user = useSelector((state) => state.user);

  const {
    data: userData,
    loading,
    error,
  } = useFetch(
    `${getEvn("VITE_API_BASE_URL")}/user/get-user/${user.user._id}`,
    { method: "get", credentials: "include" }
  );

  const dispath = useDispatch();

  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 character long."),
    email: z.string().email(),
    bio: z.string().min(3, "Bio must be at least 3 character long."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  });

  useEffect(() => {
    if (userData && userData.success) {
      form.reset({
        name: userData.user.name,
        email: userData.user.email,
        bio: userData.user.bio,
      });
    }
  }, [userData]);

  async function onSubmit(values) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(values));

      const response = await fetch(
        `${getEvn("VITE_API_BASE_URL")}/user/update-user/${userData.user._id}`,
        {
          method: "put",
          credentials: "include",
          body: formData,
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      dispath(setUser(data.user));
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }

  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setPreview(preview);
  };

  if (loading) return <Loading />;
  return (
    <div className="min-h-screen w-full bg-background flex items-stretch justify-center animate-fade-in px-2 sm:px-4">
      <Card className="w-full max-w-2xl flex flex-col flex-1 justify-center shadow-2xl border border-border rounded-3xl overflow-hidden m-0 bg-card text-card-foreground">
        {/* Profile Banner */}
        <div className="relative h-32 sm:h-40 bg-primary">
          {/* Avatar Overlapping Banner */}
          <div className="absolute left-1/2 -bottom-14 sm:-bottom-16 transform -translate-x-1/2">
            <Dropzone
              onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="cursor-pointer group">
                  <input {...getInputProps()} />
                  <Avatar className="w-20 h-20 sm:w-32 sm:h-32 ring-4 ring-accent shadow-lg relative group bg-card">
                    <AvatarImage
                      src={filePreview ? filePreview : userData?.user?.avatar}
                    />
                    <div className="absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-black bg-opacity-20 border-2 border-violet-500 rounded-full group-hover:flex hidden">
                      <IoCameraOutline color="#7c3aed" size={24} />
                    </div>
                  </Avatar>
                </div>
              )}
            </Dropzone>
          </div>
        </div>
        <CardContent className="pt-20 sm:pt-24 pb-8 sm:pb-10 px-4 sm:px-8 flex flex-col items-center flex-1 justify-center w-full">
          {/* Friendly Greeting */}
          <h2 className="text-xl sm:text-2xl font-bold text-card-foreground mb-1 text-center">
            Hello, {userData?.user?.name || "User"}!
          </h2>
          <p className="text-muted-foreground mb-6 text-center text-sm sm:text-base">
            Manage your account information below.
          </p>
          {/* Form Section */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-xs sm:max-w-md mx-auto space-y-5 sm:space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-lg border-border bg-background text-foreground focus:border-accent focus:ring-accent"
                        placeholder="Enter your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-lg border-border bg-background text-foreground focus:border-accent focus:ring-accent"
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        className="rounded-lg border-border bg-background text-foreground focus:border-accent focus:ring-accent"
                        placeholder="Enter bio"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-lg border-border bg-background text-foreground focus:border-accent focus:ring-accent"
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full rounded-lg bg-accent hover:bg-primary text-white font-semibold py-2 transition-all shadow-md"
              >
                Save Changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
