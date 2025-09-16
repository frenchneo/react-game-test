import { toast } from "react-toastify";

export function succesAlert(message) {
  toast.success(message);
}

export function errorAlert(message){
    toast.error(message)
}
