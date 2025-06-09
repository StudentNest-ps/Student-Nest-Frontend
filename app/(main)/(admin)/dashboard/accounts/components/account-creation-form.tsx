'use client';

import type React from 'react';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, User, AtSign, Lock, Phone } from 'lucide-react';
import admin from '@/module/services/Admin';
import { toast } from 'sonner';

type AccountRole = 'admin' | 'owner';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  role: AccountRole;
}

export default function AccountCreationForm() {
  const [activeTab, setActiveTab] = useState<AccountRole>('admin');
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    role: 'admin',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: AccountRole) => {
    setActiveTab(value);
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const values = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      role: formData.role,
    };
    const res = await admin.addAccount(values);
    if (res) {
      toast.success('Account created successfully');
    } else {
      toast.error('Account creation failed');
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full"
    >
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create New Account</CardTitle>
          <CardDescription>
            Add a new owner or admin account to the system
          </CardDescription>
        </CardHeader>

        <Tabs
          value={activeTab}
          onValueChange={(value) => handleRoleChange(value as AccountRole)}
          className="w-full"
        >
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="admin"
                className="cursor-pointer flex items-center gap-2"
              >
                <Shield className="h-4 w-4" />
                <span>Admin Account</span>
              </TabsTrigger>
              <TabsTrigger
                value="owner"
                className="cursor-pointer flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                <span>Owner Account</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {/* Common Fields */}
                <div className="grid gap-6 md:grid-cols-2">
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label
                      htmlFor="username"
                      className="flex items-center gap-2"
                    >
                      <User className="h-4 w-4 text-primary" />
                      Username
                    </Label>
                    <Input
                      id="username"
                      name="username"
                      placeholder="johndoe"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <AtSign className="h-4 w-4 text-primary" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label
                      htmlFor="phoneNumber"
                      className="flex items-center gap-2"
                    >
                      <Phone className="h-4 w-4 text-primary" />
                      Phone Number
                    </Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="flex items-center gap-2"
                    >
                      <Lock className="h-4 w-4 text-primary" />
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="flex items-center gap-2"
                    >
                      <Lock className="h-4 w-4 text-primary" />
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </motion.div>
                </div>
              </motion.div>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center border-t px-6 py-4">
            <Button
              onClick={handleSubmit}
              className="transition duration-200 cursor-pointer bg-primary hover:bg-card-foreground"
            >
              Create Account
            </Button>
          </CardFooter>
        </Tabs>
      </Card>
    </motion.div>
  );
}
