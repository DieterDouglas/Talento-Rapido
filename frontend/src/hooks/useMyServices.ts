import { useQuery } from "@tanstack/react-query";
import { fetchMyServices } from "../lib/serviceService";

export function useMyServices() {
    return useQuery({
        queryKey: ['my-services'],
        queryFn: fetchMyServices,
    })
}