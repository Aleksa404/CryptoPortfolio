import toast from "react-hot-toast";
import axios from "axios";
import { AxiosError } from "axios";

export const handleError = (error: any) => {
  console.log("Error:", error);
  // if (error instanceof AxiosError) {
  //   var err = error.response;
  //   if (Array.isArray(err?.data.errors)) {
  //     for (let val of err?.data.errors) {
  //       toast.error(val.description);
  //     }
  //   } else if (typeof err?.data.errors === "object") {
  //     for (let e in err?.data.errors) {
  //       toast.error(err?.data.errors[e][0]);
  //     }
  //   } else if (err?.data) {
  //     toast.error(err?.data);
  //   } else if (err?.status == 401) {
  //     toast.error("Unauthorized");
  //     window.location.href = "/login";
  //   }
  // }
};
