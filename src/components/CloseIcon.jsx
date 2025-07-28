import React from "react";
import { MdClose } from "react-icons/md";

export default function CloseIcon({ size = 22, color = "#fff", ...props }) {
    return <MdClose size={size} color={color} {...props} />;
} 