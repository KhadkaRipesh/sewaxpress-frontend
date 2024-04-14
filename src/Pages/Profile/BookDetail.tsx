import { useNavigate, useParams } from 'react-router-dom';
import ProfileNavbar from '../../Components/Nav/ProfileNavbar';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  cancelBooking,
  getBookDetailByCustomer,
  makePayment,
} from '../../api/connection';
import styles from './BookDetail.module.css';
import { Icon } from '../../Components/common/Icon';
import { Popconfirm } from 'antd';
import { SuccessMessage } from '../../utils/notify';
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from 'react';

function BookingDetails() {
  const { id } = useParams();
  // extracting book id from parameter
  const book_id = id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const session = localStorage.getItem('jwtToken');

  // query for fetching book details
  const { data: bookingDetails } = useQuery('bookDetails', () =>
    book_id
      ? getBookDetailByCustomer(book_id, session).then((res) => res.data.data)
      : Promise.resolve(null)
  );
  // if (isLoading) {
  //   return null;
  // }

  const handleBack = () => {
    navigate(`/profile/mybookings`);
  };

  const cancelBookingMutation = useMutation((book_id: string) => {
    return cancelBooking(book_id, session).then((res) => {
      SuccessMessage(res.data.message);
      queryClient.invalidateQueries(['bookDetails']);
    });
  });

  const confirm = (bookId: string) => {
    cancelBookingMutation.mutate(bookId);
  };

  const payThroughKhalti = (book_id: string) => {
    makePayment(book_id, session).then((res) => {
      const redirect_url: string = res.data.data;
      console.log(redirect_url);
      if (redirect_url) {
        window.location.href = redirect_url;
      }
    });
  };
  return (
    <>
      <ProfileNavbar />
      <div className={styles.book_container}>
        <div className={styles.detailPage}>
          <button className={styles.back} onClick={handleBack}>
            <Icon icon='back' />
            <span>BACK</span>
          </button>
          <h1>Booking Details</h1>
          <table className={styles.content_table}>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Booking Status</th>
                <th>Booking Date</th>
                <th>Booking Address</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{bookingDetails?.book_otp}</td>
                <td>{bookingDetails?.book_status}</td>
                <td>
                  {new Date(bookingDetails?.booking_date).toLocaleDateString()}
                </td>
                <td>{bookingDetails?.booking_address}</td>
              </tr>
            </tbody>
          </table>
          <h1>Service Provider Details</h1>
          <table className={styles.content_table}>
            <thead>
              <tr>
                <th>Hub Name</th>
                <th>Hub Address</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{bookingDetails?.hub.name}</td>
                <td>{bookingDetails?.hub.address}</td>
              </tr>
            </tbody>
          </table>
          <h1>Booked Services Detail</h1>
          <table className={styles.content_table}>
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Estimated Time</th>
                <th>Service Cost</th>
              </tr>
            </thead>
            <tbody>
              {bookingDetails?.booked_services.map(
                (
                  service: {
                    service: {
                      name:
                        | string
                        | number
                        | boolean
                        | ReactElement<any, string | JSXElementConstructor<any>>
                        | Iterable<ReactNode>
                        | ReactPortal
                        | null
                        | undefined;
                      estimated_time:
                        | string
                        | number
                        | boolean
                        | ReactElement<any, string | JSXElementConstructor<any>>
                        | Iterable<ReactNode>
                        | ReactPortal
                        | null
                        | undefined;
                    };
                    price:
                      | string
                      | number
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | ReactPortal
                      | null
                      | undefined;
                  },
                  index: Key | null | undefined
                ) => (
                  <tr key={index}>
                    <td>{service.service.name}</td>
                    <td>{service.service.estimated_time}</td>
                    <td>Rs: {service.price}</td>
                  </tr>
                )
              )}
              <tr>
                <td></td>
                <td className={styles.border}>Total Cost: </td>
                <td className={styles.border}>
                  Rs: {bookingDetails?.sub_total}
                </td>
              </tr>
              <tr>
                <td></td>
                <td className={styles.border}>Negotiated Price: </td>
                <td className={styles.border}>
                  Rs: {bookingDetails?.sub_total - bookingDetails?.grand_total}
                </td>
              </tr>
              <tr>
                <td></td>
                <td className={styles.border}>To Pay: </td>
                <td className={styles.border}>
                  Rs: {bookingDetails?.grand_total}
                </td>
              </tr>
            </tbody>
          </table>
          <div className={styles.payment}>
            {bookingDetails?.book_status === 'BOOKING_CANCELLED' ? (
              <></>
            ) : (
              <>
                Payment Status:
                {bookingDetails?.hasCustomerPaid ? (
                  <>
                    <div className={styles.action}>
                      <p>Paid</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.action}>
                      <p>Pending</p>
                      <button
                        className={styles.pay}
                        onClick={() => payThroughKhalti(bookingDetails.id)}
                      >
                        Pay Now
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          <div className={styles.cancel}>
            {bookingDetails?.book_status !== 'BOOKING_PLACED' ? (
              bookingDetails?.book_status === 'BOOKING_CANCELLED' ? (
                <>
                  <strong>Status: </strong>
                  <div className={styles.cancel_border}>
                    <p>Booking Canceled :( </p>
                  </div>
                </>
              ) : (
                <>
                  <>
                    <strong>Status: </strong>
                    <p>Service is on the way :) </p>
                  </>
                </>
              )
            ) : (
              <>
                <Popconfirm
                  title='Cancel Booking'
                  description='Are you sure want to cancel booking ?'
                  onConfirm={() => confirm(bookingDetails?.id)}
                >
                  <button className={styles.cancel}>Cancel Booking</button>
                </Popconfirm>
              </>
            )}
            <p className={styles.note}>
              <strong> Note:</strong> Service Booking cannot cancelled if
              service provider accepts request.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingDetails;
