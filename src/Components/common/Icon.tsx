import { IconBaseProps } from 'react-icons';
import { AiOutlineSetting, AiOutlineUser } from 'react-icons/ai';

import { FiLogOut } from 'react-icons/fi';
import { GrServices } from 'react-icons/gr';
import { TbCategoryPlus } from 'react-icons/tb';
import { FaStoreAlt } from 'react-icons/fa';
import { TfiDashboard } from 'react-icons/tfi';
import { BsJournalBookmark, BsBookmarkCheck } from 'react-icons/bs';
import { HiOutlineUsers } from 'react-icons/hi';

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
};

export type CustomIconType = keyof typeof icons;

export interface IconProps extends IconBaseProps {
  icon: CustomIconType;
}
export function Icon({ icon, ...rest }: IconProps) {
  const I = icons[icon];
  return <I className={icon} {...rest} />;
}
