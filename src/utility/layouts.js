import Swal from "sweetalert2"

export const ToastContent = ({ code, res }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6>{code}</h6>
        </div>
        <div className='d-flex justify-content-between'>
        </div>
        <span>Error Happen When Try To Login : {res}</span>
      </div>
    </div>
  )
}

export const SwalError = (status, data) => {
  return Swal.fire({
    title: status,
    text: data,
    icon: 'error',
  })
}

export const SwalTimer = (titled, secTime) => {
  return Swal.fire({
    title: titled,
    showConfirmButton: false,
    timer: secTime
  });
}