import { IconBaseProps } from 'react-icons';
import { AiOutlineSetting, AiOutlineUser } from 'react-icons/ai';

import { FiLogOut } from 'react-icons/fi';
import { GrServices } from 'react-icons/gr';
import { TbCategoryPlus } from 'react-icons/tb';
import { FaStoreAlt } from 'react-icons/fa';
import { TfiDashboard } from 'react-icons/tfi';
import { BsJournalBookmark, BsBookmarkCheck } from 'react-icons/bs';
import { HiOutlineUsers } from 'react-icons/hi';
import { FaCartArrowDown } from 'react-icons/fa6';
import { MdOutlineMoreTime } from 'react-icons/md';
import { CiLocationOn } from 'react-icons/ci';
import { AiOutlineDelete } from 'react-icons/ai';
import { VscAccount } from 'react-icons/vsc';
import { AiOutlineShopping } from 'react-icons/ai';
import { FaRegAddressCard } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IoArrowBackSharp } from 'react-icons/io5';
import { MdPending } from 'react-icons/md';
import { FaRegMessage } from 'react-icons/fa6';

export const icons = {
  user: AiOutlineUser,
  setting: AiOutlineSetting,
  logout: FiLogOut,
  services: GrServices,
  category: TbCategoryPlus,
  hubs: FaStoreAlt,
  dashboard: TfiDashboard,
  booking: BsJournalBookmark,
  categoryy: BsBookmarkCheck,
  users: HiOutlineUsers,
  cart: FaCartArrowDown,
  time: MdOutlineMoreTime,
  location: CiLocationOn,
  delete: AiOutlineDelete,
  account: VscAccount,
  mybooking: AiOutlineShopping,
  address: FaRegAddressCard,
  password: RiLockPasswordLine,
  back: IoArrowBackSharp,
  pending: MdPending,
  message: FaRegMessage,
};

export type CustomIconType = keyof typeof icons;

export interface IconProps extends IconBaseProps {
  icon: CustomIconType;
}
export function Icon({ icon, ...rest }: IconProps) {
  const I = icons[icon];
  return <I className={icon} {...rest} />;
}
