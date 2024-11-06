
// validate id if is only numbers and used by function isInteger
export function validateId(id:number) {
    return Number.isInteger(id) && id > 0;
  }
  
// validate name if is only from a to z and א to ת
  export function validateName(name:string) {
    const nameRegex = /^[A-Za-zא-ת]+$/; 
    return nameRegex.test(name) && name.length >= 2 && name.length <= 50;
  }

  // validate gmail if is only letters and numbers and end is @gmail.com
  export function validateGmail(gmail:string) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(gmail);
  }

  // validate role if it exists in validRoles if is exists will return true
  export function validateRole(role:string, validRoles:string) {
    return validRoles.includes(role);
  }
  
   // validate Phone number if is length is 10 numbers and only numbers
  export function validatePhoneNumber(phoneNumber:string) {
    const phoneRegex = /^\d{10}$/; 
    return phoneRegex.test(phoneNumber);
  }
  