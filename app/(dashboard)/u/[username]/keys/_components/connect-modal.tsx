"use client";

import { createIngress } from "@/actions/ingress";
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
import { IngressInput } from "livekit-server-sdk";
import { AlertTriangle } from "lucide-react";
import { ElementRef, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

export const ConnectModal = () => {
  const RTMP = String(IngressInput.RTMP_INPUT);
  const WHIP = String(IngressInput.WHIP_INPUT);
  const closeRef = useRef<ElementRef<"button">>(null)

  type IngressType = typeof RTMP | typeof WHIP;

  const [ingressType, setIngressType] = useState<IngressType>(RTMP);
  const [isPending,  startTransition] = useTransition();
  const onSubmit = ()  => {
    startTransition(() =>  {
      createIngress(parseInt(ingressType))
      .then(() =>  {
        toast.success("Ingress  Created")
        closeRef?.current?.click()
      })
      .catch(() => toast.error("Something went wrong"))
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-white rounded-[10px]">
          Generate Connection
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Connection</DialogTitle>
        </DialogHeader>
        <Select
        disabled={isPending}
          value={ingressType}
          onValueChange={(value) => setIngressType(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress Type"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>MWHIP</SelectItem>
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
          <DialogClose  ref={closeRef} asChild>
            <Button variant={"ghost"}>Cancel</Button>
          </DialogClose>
          <Button onClick={onSubmit} disabled={isPending}>Generate</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
