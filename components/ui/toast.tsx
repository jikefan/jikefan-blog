"use client";

import { Check, CircleAlert } from "lucide-react";
import toast, { ToastOptions } from "react-hot-toast";

export const successToast = (message: string, opt?: ToastOptions) => {
    // toast(message, {
    //     ...opt,
    //     icon: <Check className="size-5 text-green-500 dark:text-green-600"></Check>,
    //     className:
    //         "border !shadow !shadow-green-500/50 border-green-500 !text-primary dark:!text-primary-foreground dark:border-green-500 !bg-green-50 dark:!bg-green-50 !rounded-2xl !font-semibold !px-3 !py-2 !text-sm",
    // });
    toast.success(message);
}

export const errorToast = (msg: string, opts?: ToastOptions) => {
    toast(msg, {
        ...opts,
        icon: <CircleAlert className="size-5 text-red-500 dark:text-red-600" />,
        className:
            "border !shadow !shadow-red-500/50 border-red-500 !text-primary dark:!text-primary-foreground dark:border-red-500 !bg-red-50 dark:!bg-red-50 !rounded-2xl !font-semibold !px-3 !py-2 !text-sm",
    });
};