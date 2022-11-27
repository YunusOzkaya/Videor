import { BsCode, BsEmojiSunglasses } from 'react-icons/bs';
import { GiCakeSlice, GiGalaxy, GiLipstick,GiMaterialsScience } from 'react-icons/gi';
import { FaPaw, FaMedal, FaGamepad } from 'react-icons/fa';
import {MdHistoryEdu} from 'react-icons/md'

export const topics = [
  {
    name: 'coding',
    icon: <BsCode />,
  },
  {
    name: 'comedy',
    icon: <BsEmojiSunglasses />,
  },
  {
    name: 'gaming',
    icon: <FaGamepad />,
  },
  {
    name: 'food',
    icon: <GiCakeSlice />,
  },
  {
    name: 'dance',
    icon: <GiGalaxy />,
  },
  {
    name: 'beauty',
    icon: <GiLipstick />,
  },
  {
    name: 'animals',
    icon: <FaPaw />,
  },
  {
    name: 'sports',
    icon: <FaMedal />,
  },
  {
    name: 'Science',
    icon: <GiMaterialsScience />,
  },
  {
    name: 'History',
    icon: <MdHistoryEdu />,
  }
];

export const footerList1 = ['About', 'Newsroom', 'Store', 'Contact', 'Carrers', 'ByteDance', 'Creator Directory']
export const footerList2 = [ 'iShare for Good','Advertise','Developers','Transparency','iShare Rewards' ]
export const footerList3 = [ 'Help', 'Safety', 'Terms', 'Privacy', 'Creator Portal', 'Community Guidelines' ]