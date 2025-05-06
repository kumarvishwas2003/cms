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
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-violet-50 to-violet-100 flex items-stretch justify-center animate-fade-in">
      <Card className="w-full max-w-2xl flex flex-col flex-1 justify-center shadow-2xl border-0 rounded-3xl overflow-hidden m-0">
        {/* Profile Banner */}
        <div className="relative h-40 bg-gradient-to-r from-[#4F46E5] to-[#6366f1]">
          {/* Avatar Overlapping Banner */}
          <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2">
            <Dropzone
              onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="cursor-pointer group">
                  <input {...getInputProps()} />
                  <Avatar className="w-32 h-32 ring-4 ring-white shadow-lg relative group bg-white">
                    <AvatarImage
                      src={filePreview ? filePreview : userData?.user?.avatar}
                    />
                    <div className="absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-black bg-opacity-20 border-2 border-violet-500 rounded-full group-hover:flex hidden">
                      <IoCameraOutline color="#7c3aed" size={32} />
                    </div>
                  </Avatar>
                </div>
              )}
            </Dropzone>
          </div>
        </div>
        <CardContent className="pt-24 pb-10 px-8 flex flex-col items-center flex-1 justify-center">
          {/* Friendly Greeting */}
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Hello, {userData?.user?.name || "User"}!
          </h2>
          <p className="text-gray-500 mb-6">
            Manage your account information below.
          </p>
          {/* Form Section */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-md mx-auto space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-lg border-violet-200 focus:border-violet-400 focus:ring-violet-400"
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
                        className="rounded-lg border-violet-200 focus:border-violet-400 focus:ring-violet-400"
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
                        className="rounded-lg border-violet-200 focus:border-violet-400 focus:ring-violet-400"
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
                        className="rounded-lg border-violet-200 focus:border-violet-400 focus:ring-violet-400"
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
                className="w-full rounded-lg bg-[#4F46E5] hover:bg-[#4338ca] text-white font-semibold py-2 transition-all shadow-md"
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
