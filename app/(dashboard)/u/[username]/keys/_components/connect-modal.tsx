"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle } from "lucide-react";

export const ConnectModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Generate Connection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Connection</DialogTitle>
        </DialogHeader>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress Type"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="RTMP">RTMP</SelectItem>
            <SelectItem value="MWHIP">MWHIP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className="size-4" />
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>
            This action will reset all activestreams using current connection.
            Are you sure you want to continue?
          </AlertDescription>
        </Alert>
        <div className="flex justify-between ">
          <DialogClose>
            <Button variant={"ghost"}>Cancel</Button>
          </DialogClose>
          <Button onClick={() => {}} variant={"primary"}>
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
