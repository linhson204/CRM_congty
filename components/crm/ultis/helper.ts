export const checkEmail = (email: string) => {

}

export const compareTwoDateTime = (startDate: any, endDate: any) => {

}

export function showModalWithTimeout(setIsModalSuccess:any, timeout:number) {
    setIsModalSuccess(true);
  
    setTimeout(() => {
      setIsModalSuccess(false);
    }, timeout);
  }