import { useRouter } from 'next/router';
import { use, useEffect, useState } from "react";
function YourComponent() {
    const router = useRouter();
    const [close, setClose] = useState(false)
    useEffect(() => {
        const call = async () => {
            const { phone, id } = router.query;
            await router.push(`chat365:/${btoa(String(phone))}/${btoa(String(id))}`)
            setTimeout(() => {
                window.close();
            }, 7000);
        }
        call()
    })


    return null

}

export default YourComponent;